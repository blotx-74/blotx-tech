import { useEffect, useRef, type FC } from 'react';
import * as THREE from 'three';

export const TechThreeCanvas: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrameId: number;
    let isVisible = true;
    let clock = new THREE.Clock();

    // Scene setup
    const scene = new THREE.Scene();

    // Camera setup with architectural FOV
    const camera = new THREE.PerspectiveCamera(
      38,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 16);

    // Renderer setup with optimized pixel ratio & power preference
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
      stencil: false,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    // Architectural Lighting
    // 1. Crisp ambient base
    const ambientLight = new THREE.AmbientLight(0xf8fafc, 0.9);
    scene.add(ambientLight);

    // 2. Primary directional key light (Clean white with subtle warm cast)
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(12, 18, 14);
    scene.add(keyLight);

    // 3. Technical Cobalt rim light (Catches chamfered edges)
    const rimLight = new THREE.DirectionalLight(0x2563eb, 3.0);
    rimLight.position.set(-14, -10, 8);
    scene.add(rimLight);

    // 4. Subtle cool fill light
    const fillLight = new THREE.DirectionalLight(0x93c5fd, 1.2);
    fillLight.position.set(0, -12, -8);
    scene.add(fillLight);

    // Master kinetic group
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // Sub-groups for multi-layered rotation
    const coreGroup = new THREE.Group();
    const platesGroup = new THREE.Group();
    const ringsGroup = new THREE.Group();

    masterGroup.add(coreGroup);
    masterGroup.add(platesGroup);
    masterGroup.add(ringsGroup);

    // ----------------------------------------------------
    // GEOMETRIES & MATERIALS: Precision Software Monolith
    // ----------------------------------------------------

    // 1. Central Core: Dark Brushed Titanium Polyhedron
    const coreGeo = new THREE.OctahedronGeometry(2.2, 0);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.25,
      metalness: 0.9,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreGroup.add(coreMesh);

    // Subtle edge highlight for core
    const coreEdgesGeo = new THREE.EdgesGeometry(coreGeo);
    const coreEdgesMat = new THREE.LineBasicMaterial({
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.6,
    });
    const coreEdgesMesh = new THREE.LineSegments(coreEdgesGeo, coreEdgesMat);
    coreGroup.add(coreEdgesMesh);

    // 2. Architectural Translucent Glass Prism Plates (Software Layers)
    const plateGeo = new THREE.BoxGeometry(5.2, 0.18, 5.2);
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0.05,
      roughness: 0.1,
      transmission: 0.75, // Realistic frosted glass
      thickness: 1.2,
      transparent: true,
      opacity: 0.85,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      ior: 1.52,
    });

    const plateMeshes: THREE.Mesh[] = [];
    const plateCount = 3;
    const plateSpacings = [-1.4, 0, 1.4];

    for (let i = 0; i < plateCount; i++) {
      const plate = new THREE.Mesh(plateGeo, glassMat);
      plate.position.y = plateSpacings[i];
      plate.rotation.y = (i * Math.PI) / 6;
      platesGroup.add(plate);
      plateMeshes.push(plate);

      // Fine chamfer edge lines for technical aesthetic
      const edges = new THREE.EdgesGeometry(plateGeo);
      const edgeLineMat = new THREE.LineBasicMaterial({
        color: 0x2563eb,
        transparent: true,
        opacity: 0.45,
      });
      const edgeLine = new THREE.LineSegments(edges, edgeLineMat);
      plate.add(edgeLine);
    }

    // 3. Technical Precision Caliper Ring (Rotates independently)
    const ringGeo = new THREE.RingGeometry(4.8, 4.88, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x3b82f6,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.25,
    });
    const ringMesh1 = new THREE.Mesh(ringGeo, ringMat);
    ringMesh1.rotation.x = Math.PI / 2.3;
    ringsGroup.add(ringMesh1);

    const ringMesh2 = new THREE.Mesh(
      new THREE.RingGeometry(6.2, 6.26, 64),
      new THREE.MeshBasicMaterial({
        color: 0x64748b,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.15,
      })
    );
    ringMesh2.rotation.x = -Math.PI / 2.8;
    ringMesh2.rotation.y = Math.PI / 6;
    ringsGroup.add(ringMesh2);

    // Smooth Mouse Interaction State
    let mouseTargetX = 0;
    let mouseTargetY = 0;
    let mouseCurrentX = 0;
    let mouseCurrentY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseTargetX = (e.clientX / innerWidth - 0.5) * 0.8;
      mouseTargetY = (e.clientY / innerHeight - 0.5) * 0.8;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Responsive Canvas Resize
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // Performance Optimization: Intersection Observer to pause rendering when offscreen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // ----------------------------------------------------
    // ANIMATION LOOP: Calm, Balanced & Engineered
    // ----------------------------------------------------
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const elapsedTime = clock.getElapsedTime();

      // Calm breathing oscillation (Vertical float)
      const breathOffset = Math.sin(elapsedTime * 0.7) * 0.25;
      masterGroup.position.y = breathOffset;

      // Slow, poised rotation of core and plates
      coreGroup.rotation.y = elapsedTime * 0.15;
      coreGroup.rotation.x = Math.sin(elapsedTime * 0.2) * 0.1;

      platesGroup.rotation.y = -elapsedTime * 0.08;
      platesGroup.rotation.z = Math.cos(elapsedTime * 0.3) * 0.05;

      // Smooth plate expansion pulsation
      plateMeshes.forEach((mesh, idx) => {
        mesh.position.y = plateSpacings[idx] + Math.sin(elapsedTime * 0.8 + idx) * 0.08;
      });

      // Rings subtle drift
      ringMesh1.rotation.z = elapsedTime * 0.05;
      ringMesh2.rotation.z = -elapsedTime * 0.03;

      // Smooth damped mouse parallax (Inertia easing)
      mouseCurrentX += (mouseTargetX - mouseCurrentX) * 0.04;
      mouseCurrentY += (mouseTargetY - mouseCurrentY) * 0.04;

      masterGroup.rotation.y = platesGroup.rotation.y + mouseCurrentX;
      masterGroup.rotation.x = mouseCurrentY * 0.6;

      renderer.render(scene, camera);
    };

    animate();

    // ----------------------------------------------------
    // CLEANUP & MEMORY MANAGEMENT
    // ----------------------------------------------------
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();

      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      // Dispose geometries
      coreGeo.dispose();
      coreEdgesGeo.dispose();
      plateGeo.dispose();
      ringGeo.dispose();
      ringMesh2.geometry.dispose();

      // Dispose materials
      coreMat.dispose();
      coreEdgesMat.dispose();
      glassMat.dispose();
      ringMat.dispose();
      ringMesh2.material.dispose();

      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden select-none"
      aria-hidden="true"
    />
  );
};
