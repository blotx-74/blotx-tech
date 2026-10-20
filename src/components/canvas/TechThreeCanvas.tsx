import { useEffect, useRef, type FC } from 'react';
import * as THREE from 'three';

export const TechThreeCanvas: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrameId: number;
    let isVisible = true;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.z = 18;

    // Renderer (lightweight, clamped pixel ratio, powerPreference)
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x3b82f6, 2.0); // Cobalt blue
    dirLight1.position.set(10, 15, 10);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x8b5cf6, 1.5); // Purple
    dirLight2.position.set(-10, -10, 10);
    scene.add(dirLight2);

    // Group for objects
    const group = new THREE.Group();
    scene.add(group);

    // 1. Central floating core: Wireframe icosahedron
    const coreGeo = new THREE.IcosahedronGeometry(4.2, 1);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x2563eb,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
      roughness: 0.2,
      metalness: 0.8,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    group.add(coreMesh);

    // 2. Inner smooth poly
    const innerGeo = new THREE.OctahedronGeometry(2.4, 0);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0x6366f1,
      roughness: 0.1,
      metalness: 0.9,
      transparent: true,
      opacity: 0.6,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    group.add(innerMesh);

    // 3. Ambient floating nodes (particles)
    const particlesCount = 35;
    const posArray = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 22;
      posArray[i + 1] = (Math.random() - 0.5) * 14;
      posArray[i + 2] = (Math.random() - 0.5) * 10;
    }
    const particlesGeo = new THREE.BufferGeometry();
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMat = new THREE.PointsMaterial({
      size: 0.18,
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.7,
    });
    const particlesMesh = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particlesMesh);

    // Mouse movement parallax
    let targetX = 0;
    let targetY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      targetX = ((e.clientX / innerWidth) - 0.5) * 1.5;
      targetY = ((e.clientY / innerHeight) - 0.5) * 1.5;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Visibility Observer to pause loop when not on screen
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    observer.observe(container);

    // Render loop
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isVisible) return;

      coreMesh.rotation.x += 0.003;
      coreMesh.rotation.y += 0.005;

      innerMesh.rotation.x -= 0.004;
      innerMesh.rotation.y -= 0.006;

      particlesMesh.rotation.y += 0.0008;

      // Parallax easing
      group.rotation.y += (targetX - group.rotation.y) * 0.05;
      group.rotation.x += (-targetY - group.rotation.x) * 0.05;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      coreGeo.dispose();
      coreMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      particlesGeo.dispose();
      particlesMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden"
      aria-hidden="true"
    />
  );
};
