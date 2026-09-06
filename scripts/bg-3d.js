/**
 * StrawHats Studios - Aesthetic 3D Straw Hat & Holographic Brand Experience
 * - Authentic 3D Straw Hat (modeled from the site logo) on the right
 * - Luminous 3D "StrawHats Studios" typographic hologram on the left
 * - High-tech cyber aesthetic matching the dark luxury theme (#070913, cyan & violet)
 * - Kinetic celestial orbital rings & floating golden/cyan stardust
 * - Responsive 60 FPS WebGL with interactive mouse and scroll parallax
 */

(function () {
  'use strict';

  function initStrawHat3D() {
    const canvas = document.getElementById('webgl-canvas');
    if (!canvas || typeof THREE === 'undefined') return;

    const scene = new THREE.Scene();

    // Perspective Camera
    const camera = new THREE.PerspectiveCamera(
      40,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );

    function updateCamera() {
      const width = window.innerWidth;
      const isMobile = width < 768;
      const isTablet = width < 1200;
      camera.position.set(0, 0, isMobile ? 18 : (isTablet ? 16 : 14.5));
    }
    updateCamera();

    // WebGL Renderer with alpha channel
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Master 3D Universe Group (centered at origin, coordinates distributed inside)
    const universe = new THREE.Group();
    scene.add(universe);

    // =========================================================================
    // 1. PROCEDURAL WOVEN STRAW TEXTURE
    // =========================================================================
    function createAuthenticStrawTexture() {
      const size = 512;
      const cvs = document.createElement('canvas');
      cvs.width = size;
      cvs.height = size;
      const ctx = cvs.getContext('2d');

      // Authentic golden-wheat straw gradient base
      const grad = ctx.createLinearGradient(0, 0, size, size);
      grad.addColorStop(0, '#e8b556');
      grad.addColorStop(0.3, '#d49b38');
      grad.addColorStop(0.65, '#bd8427');
      grad.addColorStop(1, '#a6701b');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, size, size);

      // Fine criss-cross woven straw threads
      const step = 14;
      for (let y = 0; y < size; y += step) {
        for (let x = 0; x < size; x += step) {
          const isEven = ((x / step) + (y / step)) % 2 === 0;
          ctx.fillStyle = isEven ? 'rgba(255, 235, 175, 0.42)' : 'rgba(107, 65, 12, 0.35)';
          ctx.fillRect(x, y, step - 1, step - 1);

          ctx.strokeStyle = isEven ? 'rgba(255, 248, 220, 0.35)' : 'rgba(78, 44, 7, 0.38)';
          ctx.lineWidth = 1.0;
          ctx.beginPath();
          if (isEven) {
            ctx.moveTo(x, y + step / 2);
            ctx.lineTo(x + step - 1, y + step / 2);
          } else {
            ctx.moveTo(x + step / 2, y);
            ctx.lineTo(x + step / 2, y + step - 1);
          }
          ctx.stroke();
        }
      }

      // Soft concentric weave rings in texture
      ctx.strokeStyle = 'rgba(120, 75, 15, 0.15)';
      ctx.lineWidth = 2;
      for (let r = 20; r < size; r += 28) {
        ctx.beginPath();
        ctx.arc(size / 2, size / 2, r, 0, Math.PI * 2);
        ctx.stroke();
      }

      const tex = new THREE.CanvasTexture(cvs);
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
      tex.repeat.set(8, 6);
      return tex;
    }

    const strawTexture = createAuthenticStrawTexture();

    // =========================================================================
    // 2. STRAW HAT 3D GEOMETRY CONSTRUCTION (RIGHT SIDE OF SCENE)
    // =========================================================================
    const hatGroup = new THREE.Group();
    universe.add(hatGroup);

    const strawMaterial = new THREE.MeshPhysicalMaterial({
      map: strawTexture,
      color: 0xdfa548,
      emissive: 0x3d2406,
      emissiveIntensity: 0.2,
      roughness: 0.52,
      metalness: 0.08,
      clearcoat: 0.2,
      clearcoatRoughness: 0.4,
      side: THREE.DoubleSide
    });

    // Profile curve points matching the logo
    const profilePoints = [];
    profilePoints.push(new THREE.Vector2(0.001, 2.15));
    profilePoints.push(new THREE.Vector2(0.35, 2.13));
    profilePoints.push(new THREE.Vector2(0.70, 2.06));
    profilePoints.push(new THREE.Vector2(1.05, 1.92));
    profilePoints.push(new THREE.Vector2(1.30, 1.68));
    profilePoints.push(new THREE.Vector2(1.46, 1.38));
    profilePoints.push(new THREE.Vector2(1.54, 1.05));
    profilePoints.push(new THREE.Vector2(1.58, 0.70));
    profilePoints.push(new THREE.Vector2(1.60, 0.35));
    profilePoints.push(new THREE.Vector2(1.61, 0.04));

    // Outer Brim Upper Surface
    profilePoints.push(new THREE.Vector2(1.63, 0.0));
    profilePoints.push(new THREE.Vector2(1.92, -0.06));
    profilePoints.push(new THREE.Vector2(2.25, -0.09));
    profilePoints.push(new THREE.Vector2(2.58, -0.06));
    profilePoints.push(new THREE.Vector2(2.88, 0.03));
    profilePoints.push(new THREE.Vector2(3.10, 0.16));

    // Outer Rim Bead
    profilePoints.push(new THREE.Vector2(3.14, 0.13));
    profilePoints.push(new THREE.Vector2(3.12, 0.07));

    // Brim Underside Surface
    profilePoints.push(new THREE.Vector2(2.86, -0.03));
    profilePoints.push(new THREE.Vector2(2.56, -0.11));
    profilePoints.push(new THREE.Vector2(2.22, -0.14));
    profilePoints.push(new THREE.Vector2(1.90, -0.11));
    profilePoints.push(new THREE.Vector2(1.58, -0.04));

    // Hollow Crown Interior
    profilePoints.push(new THREE.Vector2(1.52, 0.35));
    profilePoints.push(new THREE.Vector2(1.48, 0.70));
    profilePoints.push(new THREE.Vector2(1.42, 1.05));
    profilePoints.push(new THREE.Vector2(1.28, 1.35));
    profilePoints.push(new THREE.Vector2(0.98, 1.66));
    profilePoints.push(new THREE.Vector2(0.58, 1.88));
    profilePoints.push(new THREE.Vector2(0.001, 1.98));

    const hatLatheGeo = new THREE.LatheGeometry(profilePoints, 64);

    // Apply iconic organic wavy ripple to outer brim
    const hatPos = hatLatheGeo.attributes.position;
    for (let i = 0; i < hatPos.count; i++) {
      const x = hatPos.getX(i);
      const z = hatPos.getZ(i);
      const r = Math.sqrt(x * x + z * z);
      const theta = Math.atan2(z, x);

      if (r > 1.63) {
        const u = Math.min(1, (r - 1.63) / (3.14 - 1.63));
        const wave = Math.sin(theta * 6) * 0.08 * Math.pow(u, 1.6);
        hatPos.setY(i, hatPos.getY(i) + wave);
      }
    }
    hatLatheGeo.computeVertexNormals();

    const hatMesh = new THREE.Mesh(hatLatheGeo, strawMaterial);
    hatGroup.add(hatMesh);

    // Crimson Satin Ribbon Band
    const ribbonHeight = 0.64;
    const ribbonGeo = new THREE.CylinderGeometry(1.595, 1.62, ribbonHeight, 64, 1, true);
    ribbonGeo.translate(0, ribbonHeight / 2 + 0.03, 0);

    const ribbonMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xc62828,
      emissive: 0x5a0808,
      emissiveIntensity: 0.35,
      roughness: 0.32,
      metalness: 0.08,
      clearcoat: 0.5,
      clearcoatRoughness: 0.25,
      side: THREE.DoubleSide
    });

    const ribbonMesh = new THREE.Mesh(ribbonGeo, ribbonMaterial);
    hatGroup.add(ribbonMesh);

    // Gold Stitch Piping Trim
    const stitchMat = new THREE.MeshBasicMaterial({ color: 0xfde047, transparent: true, opacity: 0.7 });
    const topStitchGeo = new THREE.TorusGeometry(1.60, 0.016, 6, 64);
    topStitchGeo.rotateX(Math.PI / 2);
    topStitchGeo.translate(0, ribbonHeight + 0.03, 0);
    hatGroup.add(new THREE.Mesh(topStitchGeo, stitchMat));

    const botStitchGeo = new THREE.TorusGeometry(1.625, 0.016, 6, 64);
    botStitchGeo.rotateX(Math.PI / 2);
    botStitchGeo.translate(0, 0.03, 0);
    hatGroup.add(new THREE.Mesh(botStitchGeo, stitchMat));

    // Outer Brim Rim Accent
    const rimAccentGeo = new THREE.TorusGeometry(3.14, 0.022, 8, 80);
    rimAccentGeo.rotateX(Math.PI / 2);
    rimAccentGeo.translate(0, 0.12, 0);
    hatGroup.add(new THREE.Mesh(rimAccentGeo, new THREE.MeshBasicMaterial({
      color: 0xb45309,
      transparent: true,
      opacity: 0.45
    })));

    // Celestial Gimbal Rings around the Straw Hat
    const celestialRings = [];
    const ringSpecs = [
      { radius: 4.2, tube: 0.018, color: 0x00e5ff, opacity: 0.6, speed: 0.18, axis: [1, 0.2, 0] },
      { radius: 4.8, tube: 0.015, color: 0x8b5cf6, opacity: 0.5, speed: -0.15, axis: [0.2, 1, 0.3] },
      { radius: 5.4, tube: 0.012, color: 0xf59e0b, opacity: 0.4, speed: 0.12, axis: [0.4, 0.1, 1] }
    ];

    ringSpecs.forEach((spec) => {
      const ringG = new THREE.TorusGeometry(spec.radius, spec.tube, 8, 96);
      const ringM = new THREE.MeshBasicMaterial({
        color: spec.color,
        transparent: true,
        opacity: spec.opacity
      });
      const ringMesh = new THREE.Mesh(ringG, ringM);
      const holder = new THREE.Group();
      holder.add(ringMesh);
      holder.userData = { speed: spec.speed, axis: spec.axis };
      hatGroup.add(holder);
      celestialRings.push(holder);
    });

    // Initial Hat Pose
    hatGroup.rotation.x = 0.44;
    hatGroup.rotation.y = -0.52;
    hatGroup.rotation.z = -0.12;

    // =========================================================================
    // 3. PURE MINIMAL "STRAWHATS STUDIOS" 3D TEXT (NO EXTRA DECORATIONS)
    // Low opacity, moderate size, perfectly distinct from foreground UI
    // =========================================================================
    const textGroup = new THREE.Group();
    universe.add(textGroup);

    const textCanvasWidth = 1024;
    const textCanvasHeight = 512;
    const textCanvas = document.createElement('canvas');
    textCanvas.width = textCanvasWidth;
    textCanvas.height = textCanvasHeight;
    const textCtx = textCanvas.getContext('2d');

    function drawBrandTypography() {
      textCtx.clearRect(0, 0, textCanvasWidth, textCanvasHeight);

      // Line 1: "StrawHats"
      textCtx.font = '800 125px "Exo 2", sans-serif';
      textCtx.letterSpacing = '1px';
      const grad1 = textCtx.createLinearGradient(40, 100, 560, 200);
      grad1.addColorStop(0, '#f8fafc');
      grad1.addColorStop(1, '#38bdf8');
      textCtx.fillStyle = grad1;
      textCtx.fillText('StrawHats', 40, 200);

      // Line 2: "Studios"
      textCtx.font = '800 118px "Exo 2", sans-serif';
      textCtx.letterSpacing = '2px';
      const grad2 = textCtx.createLinearGradient(40, 220, 500, 320);
      grad2.addColorStop(0, '#c4b5fd');
      grad2.addColorStop(1, '#818cf8');
      textCtx.fillStyle = grad2;
      textCtx.fillText('Studios', 40, 320);
    }

    drawBrandTypography();

    // Re-render once web fonts are ready
    if (document.fonts) {
      document.fonts.ready.then(() => {
        drawBrandTypography();
        brandTextTexture.needsUpdate = true;
      });
    }

    const brandTextTexture = new THREE.CanvasTexture(textCanvas);
    brandTextTexture.minFilter = THREE.LinearFilter;
    brandTextTexture.magFilter = THREE.LinearFilter;

    // Moderate size 3D Plane with low ambient opacity (never blends/collides with UI)
    const textPlaneGeo = new THREE.PlaneGeometry(3.1, 1.55);
    const textPlaneMat = new THREE.MeshBasicMaterial({
      map: brandTextTexture,
      transparent: true,
      opacity: 0.28, // Clean, low opacity watermark
      blending: THREE.NormalBlending,
      side: THREE.DoubleSide,
      depthWrite: false
    });
    const textMesh = new THREE.Mesh(textPlaneGeo, textPlaneMat);
    textGroup.add(textMesh);

    // Subtle 3D perspective angle
    textGroup.rotation.y = 0.2;
    textGroup.rotation.x = 0.04;

    // =========================================================================
    // 4. AESTHETIC LUMINOUS STARDUST & CINEMATIC BOKEH ORBS
    // Soft glowing circular sprites with additive blending and individual drift physics
    // =========================================================================
    function createGlowSpriteTexture() {
      const cvs = document.createElement('canvas');
      cvs.width = 64;
      cvs.height = 64;
      const ctx = cvs.getContext('2d');

      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
      grad.addColorStop(0.2, 'rgba(255, 255, 255, 0.85)');
      grad.addColorStop(0.55, 'rgba(255, 255, 255, 0.22)');
      grad.addColorStop(1.0, 'rgba(255, 255, 255, 0.0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 64, 64);

      const tex = new THREE.CanvasTexture(cvs);
      return tex;
    }

    const glowSpriteTex = createGlowSpriteTexture();

    // --- LAYER A: Twinkling Luminous Stardust Embers ---
    const stardustCount = window.innerWidth < 768 ? 70 : 150;
    const stardustGeo = new THREE.BufferGeometry();
    const stardustPos = new Float32Array(stardustCount * 3);
    const stardustColors = new Float32Array(stardustCount * 3);
    const stardustData = [];

    const emberPalette = [
      new THREE.Color(0x00e5ff), // Electric Cyan
      new THREE.Color(0x38bdf8), // Sky Glow
      new THREE.Color(0x8b5cf6), // Studio Violet
      new THREE.Color(0xc084fc), // Soft Lavender
      new THREE.Color(0xf59e0b), // Golden Straw Amber
      new THREE.Color(0xfde047)  // Sun Gold
    ];

    for (let i = 0; i < stardustCount; i++) {
      const idx = i * 3;
      // Wide cinematic distribution framing the entire viewport
      const x = (Math.random() - 0.5) * 24;
      const y = (Math.random() - 0.5) * 14;
      const z = (Math.random() - 0.5) * 8 - 1;

      stardustPos[idx] = x;
      stardustPos[idx + 1] = y;
      stardustPos[idx + 2] = z;

      const col = emberPalette[Math.floor(Math.random() * emberPalette.length)];
      stardustColors[idx] = col.r;
      stardustColors[idx + 1] = col.g;
      stardustColors[idx + 2] = col.b;

      stardustData.push({
        baseX: x,
        baseY: y,
        speedY: 0.003 + Math.random() * 0.008,
        swaySpeed: 0.5 + Math.random() * 1.5,
        swayAmp: 0.08 + Math.random() * 0.16,
        phase: Math.random() * Math.PI * 2
      });
    }

    stardustGeo.setAttribute('position', new THREE.BufferAttribute(stardustPos, 3));
    stardustGeo.setAttribute('color', new THREE.BufferAttribute(stardustColors, 3));

    const stardustMat = new THREE.PointsMaterial({
      size: 0.42,
      map: glowSpriteTex,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const stardustPoints = new THREE.Points(stardustGeo, stardustMat);
    universe.add(stardustPoints);

    // --- LAYER B: Soft Out-of-Focus Bokeh Orbs (Cinematic Depth) ---
    const bokehCount = window.innerWidth < 768 ? 10 : 22;
    const bokehGeo = new THREE.BufferGeometry();
    const bokehPos = new Float32Array(bokehCount * 3);
    const bokehColors = new Float32Array(bokehCount * 3);
    const bokehData = [];

    const bokehPalette = [
      new THREE.Color(0x00e5ff), // Cyan
      new THREE.Color(0x8b5cf6), // Violet
      new THREE.Color(0xf59e0b)  // Amber
    ];

    for (let i = 0; i < bokehCount; i++) {
      const idx = i * 3;
      const x = (Math.random() - 0.5) * 22;
      const y = (Math.random() - 0.5) * 12;
      const z = (Math.random() - 0.5) * 6 - 2;

      bokehPos[idx] = x;
      bokehPos[idx + 1] = y;
      bokehPos[idx + 2] = z;

      const col = bokehPalette[Math.floor(Math.random() * bokehPalette.length)];
      bokehColors[idx] = col.r;
      bokehColors[idx + 1] = col.g;
      bokehColors[idx + 2] = col.b;

      bokehData.push({
        baseX: x,
        baseY: y,
        speedY: 0.002 + Math.random() * 0.004,
        swaySpeed: 0.3 + Math.random() * 0.8,
        swayAmp: 0.15 + Math.random() * 0.25,
        phase: Math.random() * Math.PI * 2
      });
    }

    bokehGeo.setAttribute('position', new THREE.BufferAttribute(bokehPos, 3));
    bokehGeo.setAttribute('color', new THREE.BufferAttribute(bokehColors, 3));

    const bokehMat = new THREE.PointsMaterial({
      size: 1.85,
      map: glowSpriteTex,
      vertexColors: true,
      transparent: true,
      opacity: 0.22, // Dreamy out-of-focus softness
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const bokehPoints = new THREE.Points(bokehGeo, bokehMat);
    universe.add(bokehPoints);

    // =========================================================================
    // 5. CHROMATIC CINEMATIC LIGHTING
    // =========================================================================
    const ambientLight = new THREE.AmbientLight(0x0f172a, 1.8);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfff3d1, 2.0);
    sunLight.position.set(4, 7, 6);
    scene.add(sunLight);

    const cyanLight = new THREE.PointLight(0x00e5ff, 3.2, 35);
    cyanLight.position.set(-6, 4, 5);
    scene.add(cyanLight);

    const violetLight = new THREE.PointLight(0x8b5cf6, 2.8, 35);
    violetLight.position.set(6, -4, 4);
    scene.add(violetLight);

    const amberGlow = new THREE.PointLight(0xf59e0b, 1.2, 20);
    amberGlow.position.set(0, -2, 2);
    scene.add(amberGlow);

    // =========================================================================
    // 6. RESPONSIVE COMPOSITION LAYOUT (DESKTOP & MOBILE)
    // =========================================================================
    let layoutConfig = {
      hatX: 4.5,
      hatY: 0.6,
      hatZ: 0,
      hatScale: 1.05,
      textX: -4.8,
      textY: 0.8,
      textZ: 0,
      textScale: 1.0,
      textVisible: true
    };

    function updateLayout() {
      const width = window.innerWidth;
      if (width < 768) {
        // Mobile: Stack gently or center
        layoutConfig = {
          hatX: 0,
          hatY: 1.6,
          hatZ: -0.5,
          hatScale: 0.72,
          textX: 0,
          textY: 4.4,
          textZ: -2.0,
          textScale: 0.6,
          textVisible: false // Clean on mobile without cluttering
        };
      } else if (width < 1200) {
        // Tablet: Moderate offset
        layoutConfig = {
          hatX: 4.2,
          hatY: 0.7,
          hatZ: -0.5,
          hatScale: 0.85,
          textX: -4.8,
          textY: 0.8,
          textZ: -0.5,
          textScale: 0.8,
          textVisible: true
        };
      } else {
        // Desktop: Full balanced composition, spaced far enough from center UI
        layoutConfig = {
          hatX: 5.4,
          hatY: 0.6,
          hatZ: 0,
          hatScale: 0.98,
          textX: -5.8,
          textY: 0.75,
          textZ: 0,
          textScale: 0.95,
          textVisible: true
        };
      }

      hatGroup.position.set(layoutConfig.hatX, layoutConfig.hatY, layoutConfig.hatZ);
      hatGroup.scale.set(layoutConfig.hatScale, layoutConfig.hatScale, layoutConfig.hatScale);

      textGroup.position.set(layoutConfig.textX, layoutConfig.textY, layoutConfig.textZ);
      textGroup.scale.set(layoutConfig.textScale, layoutConfig.textScale, layoutConfig.textScale);
      textGroup.visible = layoutConfig.textVisible;
    }

    updateLayout();

    // =========================================================================
    // 7. INTERACTIVE PARALLAX & EVENT HANDLERS
    // =========================================================================
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let scrollY = 0;

    window.addEventListener('mousemove', function (e) {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    window.addEventListener('scroll', function () {
      scrollY = window.scrollY || window.pageYOffset;
    }, { passive: true });

    window.addEventListener('resize', function () {
      const width = window.innerWidth;
      const height = window.innerHeight;

      camera.aspect = width / height;
      updateCamera();
      camera.updateProjectionMatrix();

      updateLayout();

      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });

    // =========================================================================
    // 8. SILKY SMOOTH ANIMATION LOOP (60 FPS)
    // =========================================================================
    const clock = new THREE.Clock();

    function animate() {
      requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Gentle floating levitation with slight phase offset
      const floatY = Math.sin(time * 0.9) * 0.22;
      const scrollDrift = Math.min(scrollY * 0.003, 3.5);

      hatGroup.position.y = layoutConfig.hatY + floatY - scrollDrift;
      textGroup.position.y = layoutConfig.textY + Math.sin(time * 0.85 + 2.0) * 0.16 - scrollDrift;

      // Subtle yaw sway on the straw hat
      hatGroup.rotation.y = -0.52 + Math.sin(time * 0.35) * 0.14;
      hatGroup.rotation.z = -0.12 + Math.cos(time * 0.4) * 0.05;

      // Rotate celestial orbital rings
      celestialRings.forEach((ring) => {
        const d = ring.userData;
        ring.rotation.x += d.axis[0] * d.speed * 0.02;
        ring.rotation.y += d.axis[1] * d.speed * 0.025;
        ring.rotation.z += d.axis[2] * d.speed * 0.015;
      });

      // Animate Layer A: Floating Stardust Embers
      const sPos = stardustGeo.attributes.position.array;
      for (let i = 0; i < stardustCount; i++) {
        const idx = i * 3;
        const d = stardustData[i];
        sPos[idx + 1] += d.speedY;
        sPos[idx] = d.baseX + Math.sin(time * d.swaySpeed + d.phase) * d.swayAmp;
        if (sPos[idx + 1] > 7.5) {
          sPos[idx + 1] = -7.5;
        }
      }
      stardustGeo.attributes.position.needsUpdate = true;

      // Animate Layer B: Dreamy Ambient Bokeh Orbs
      const bPos = bokehGeo.attributes.position.array;
      for (let i = 0; i < bokehCount; i++) {
        const idx = i * 3;
        const d = bokehData[i];
        bPos[idx + 1] += d.speedY;
        bPos[idx] = d.baseX + Math.sin(time * d.swaySpeed + d.phase) * d.swayAmp;
        if (bPos[idx + 1] > 6.5) {
          bPos[idx + 1] = -6.5;
        }
      }
      bokehGeo.attributes.position.needsUpdate = true;

      // Interactive parallax physics
      targetX += (mouseX * 0.4 - targetX) * 0.04;
      targetY += (mouseY * 0.3 - targetY) * 0.04;

      universe.rotation.y = targetX * 0.25;
      universe.rotation.x = -targetY * 0.18;

      renderer.render(scene, camera);
    }

    animate();
  }

  // Initialize once DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initStrawHat3D);
  } else {
    initStrawHat3D();
  }
})();
