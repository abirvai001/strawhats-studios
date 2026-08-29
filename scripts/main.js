/**
 * StrawHats Studios - Core Application Logic
 * Studio App Showcase, Filtering, App Details View, and Theme Toggle.
 */

// Official StrawHats Studios Apps (eLab Simulator)
const STUDIO_APPS = [
  {
    id: "app-elab",
    title: "eLab — Virtual EEE Simulator",
    category: "AI & Tools",
    tagline: "Interactive MB-102 Breadboard, Circuit Simulation & Instrument Suite for Android.",
    description: "eLab is a premier virtual electrical & electronics engineering laboratory engineered by StrawHats Studios. Features an authentic MB-102 solderless breadboard, real-time MNA circuit solver, dual-channel digital oscilloscope, and precision digital multimeter.",
    platforms: ["Android"],
    status: "live",
    version: "v2.1",
    techTags: "Android 7.0+, MNA Solver Engine, Dual Oscilloscope, Multimeter, MB-102 Breadboard",
    iconUrl: "https://raw.githubusercontent.com/abirvai001/eLab-Virtual-eee-lab-simulator/main/screenshots/app_icon.jpg",
    iconColor: "linear-gradient(135deg, #00f0ff, #10b981)",
    iconSymbol: "fa-bolt",
    linkIos: "",
    linkAndroid: "https://github.com/abirvai001/eLab-Virtual-eee-lab-simulator/releases/download/v2.1/eLab-v2.1-release.apk",
    linkDemo: "elab.html"
  }
];

let activeFilter = 'all';

// DOM Initialization
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initGalleryFilters();
  renderAppGallery();
  initAppDetailsModal();
  initContactForm();
});

/* ==========================================================================
   THEME TOGGLE
   ========================================================================== */
function initTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  const saved = localStorage.getItem('strawhats_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('strawhats_theme', next);
      showToast(`Switched to ${next.toUpperCase()} theme`);
    });
  }
}

/* ==========================================================================
   APP GALLERY RENDERING & FILTERS
   ========================================================================== */
function initGalleryFilters() {
  const filterTabs = document.querySelectorAll('.filter-tab');
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeFilter = tab.getAttribute('data-filter');
      renderAppGallery();
    });
  });
}

function renderAppGallery() {
  const grid = document.getElementById('gallery-apps-grid');
  const emptyState = document.getElementById('gallery-empty-state');
  const countAll = document.getElementById('count-all');
  if (!grid) return;

  if (countAll) countAll.textContent = STUDIO_APPS.length;

  const filtered = STUDIO_APPS.filter(app => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'ios') return app.platforms && app.platforms.includes('iOS');
    if (activeFilter === 'android') return app.platforms && app.platforms.includes('Android');
    if (activeFilter === 'live') return app.status === 'live';
    if (activeFilter === 'dev') return app.status === 'dev' || app.status === 'beta';
    return true;
  });

  if (filtered.length === 0) {
    grid.innerHTML = '';
    if (emptyState) emptyState.style.display = 'block';
    return;
  }

  if (emptyState) emptyState.style.display = 'none';

  grid.innerHTML = filtered.map(app => {
    const statusClass = app.status === 'live' ? 'status-live' : (app.status === 'beta' ? 'status-beta' : 'status-dev');
    const statusLabel = app.status === 'live' ? 'Live on Store' : (app.status === 'beta' ? 'Beta' : 'In Development');
    
    const iconHtml = app.iconUrl 
      ? `<img src="${app.iconUrl}" alt="${escapeHtml(app.title)}">` 
      : `<i class="fa-solid ${app.iconSymbol || 'fa-mobile-screen'}"></i>`;

    const iconStyle = app.iconUrl ? '' : `style="background: ${app.iconColor || 'linear-gradient(135deg, #e63946, #ffb703)'};"`;

    const platformIcons = (app.platforms || []).map(p => {
      if (p === 'iOS') return `<i class="fa-brands fa-apple" title="iOS"></i>`;
      if (p === 'Android') return `<i class="fa-brands fa-android" title="Android"></i>`;
      return `<i class="fa-solid fa-globe" title="Web"></i>`;
    }).join(' ');

    return `
      <div class="app-item-card" data-appid="${app.id}">
        <div class="app-card-top">
          <div class="app-squircle-icon" ${iconStyle}>
            ${iconHtml}
          </div>
          <div class="app-card-headinfo">
            <span class="app-card-category">${escapeHtml(app.category || 'Mobile App')}</span>
            <h3 class="app-card-title">${escapeHtml(app.title)}</h3>
            <span class="app-card-status ${statusClass}">${statusLabel}</span>
          </div>
        </div>

        <p class="app-card-tagline">${escapeHtml(app.tagline || app.description)}</p>

        <div class="app-card-meta">
          <div class="platform-badges-list">
            ${platformIcons || '<i class="fa-solid fa-mobile"></i>'}
          </div>
          <span class="app-version-badge">${escapeHtml(app.version || 'v1.0')}</span>
        </div>

        <div class="app-card-footer-btns">
          <a href="${app.linkDemo || 'elab.html'}" class="btn btn-secondary btn-sm">
            <span>Details & Specs</span>
            <i class="fa-solid fa-circle-info"></i>
          </a>
          ${app.linkAndroid ? `<a href="${app.linkAndroid}" target="_blank" rel="noopener" class="btn btn-primary btn-sm"><i class="fa-solid fa-download"></i> Download</a>` : (app.linkIos ? `<a href="${app.linkIos}" target="_blank" rel="noopener" class="btn btn-primary btn-sm"><i class="fa-brands fa-apple"></i> Get</a>` : '')}
        </div>
      </div>
    `;
  }).join('');
}

/* ==========================================================================
   APP DETAILS MODAL
   ========================================================================== */
function initAppDetailsModal() {
  const modal = document.getElementById('app-details-modal');
  const closeBtn = document.getElementById('close-details-modal-btn');
  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    });
  }
}

/* ==========================================================================
   CONTACT FORM & TOASTS
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('studio-contact-form');
  const msg = document.getElementById('contact-success-msg');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    form.reset();
    if (msg) {
      msg.style.display = 'block';
      msg.textContent = 'Thanks for reaching out! StrawHats Studios will get back to you soon.';
    }
    showToast('Message sent to StrawHats Studios! 📬');
  });
}

function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class="fa-solid fa-hat-cowboy text-gold"></i> <span>${escapeHtml(message)}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
