import { useEffect, useRef, useState, type FC } from 'react';
import * as THREE from 'three';
import { audioHaptics } from '../../utils/audioHaptics';
import { RotateCw, Cpu, Layers, Eye } from 'lucide-react';

interface BlotxCoreSceneProps {
  cadMode?: boolean;
}

export const BlotxCoreScene: FC<BlotxCoreSceneProps> = ({ cadMode = false }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [viewMode, setViewMode] = useState<'solid' | 'wireframe' | 'telemetry'>('solid');
  const [fps, setFps] = useState<number>(60);
  const [activeRotation, setActiveRotation] = useState<boolean>(true);

  // References for Three.js state
  const stateRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    coreGroup: THREE.Group;
    rings: THREE.Mesh[];
    particles: THREE.Points;
    materials: THREE.Material[];
    reqId: number;
    mouseX: number;
    mouseY: number;
    targetRotationX: number;
    targetRotationY: number;
  } | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 500;

    // 1. Scene
    const scene = new THREE.Scene();

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 8.5);

    // 3. Renderer with antialiasing and high precision
    const isMobile = window.innerWidth < 768;
    const renderer = new THREE.WebGLRenderer({
      antialias: !isMobile,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isMobile ? Math.min(window.devicePixelRatio, 1.5) : Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 4. Lighting (Studio Key + Tactical Rim Lighting)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(6, 8, 6);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x404856, 1.2);
    fillLight.position.set(-6, -4, 4);
    scene.add(fillLight);

    // Blotx Tactical Orange Rim Light
    const orangeRimLight = new THREE.PointLight(0xff5500, 4.0, 15);
    orangeRimLight.position.set(0, -3, 2);
    scene.add(orangeRimLight);

    // 5. Build The Monolith & Gyroscope Core
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    const materialsList: THREE.Material[] = [];

    // Monolith Core: Titanium Octahedron/Beveled Cube
    const coreGeo = new THREE.OctahedronGeometry(1.9, 0);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x181a20,
      metalness: 0.92,
      roughness: 0.22,
      flatShading: true,
    });
    materialsList.push(coreMat);
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreGroup.add(coreMesh);

    // Laser Wireframe Cage for the core
    const wireGeo = new THREE.OctahedronGeometry(1.92, 0);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xff5500,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    materialsList.push(wireMat);
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    coreGroup.add(wireMesh);

    // Inner glowing power nucleus
    const nucleusGeo = new THREE.IcosahedronGeometry(0.75, 1);
    const nucleusMat = new THREE.MeshBasicMaterial({
      color: 0xff5500,
      wireframe: true,
      transparent: true,
      opacity: 0.8,
    });
    materialsList.push(nucleusMat);
    const nucleusMesh = new THREE.Mesh(nucleusGeo, nucleusMat);
    coreGroup.add(nucleusMesh);

    // Outer Precision Gimbal / Gyroscope Rings
    const rings: THREE.Mesh[] = [];
    const ringConfigs = [
      { radius: 2.7, tube: 0.035, color: 0x5a6375, rotSpeed: 0.006 },
      { radius: 3.3, tube: 0.025, color: 0x3d4350, rotSpeed: -0.004 },
      { radius: 3.8, tube: 0.015, color: 0xff5500, rotSpeed: 0.008, wireframe: true },
    ];

    ringConfigs.forEach((cfg) => {
      const ringGeo = new THREE.TorusGeometry(cfg.radius, cfg.tube, 16, 100);
      const ringMat = new THREE.MeshStandardMaterial({
        color: cfg.color,
        metalness: 0.95,
        roughness: 0.15,
        wireframe: !!cfg.wireframe,
      });
      materialsList.push(ringMat);
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      coreGroup.add(ringMesh);
      rings.push(ringMesh);
    });

    // Precision Tactical Coordinate Markings (Orbiting Satellite Data Pods)
    const podGeo = new THREE.BoxGeometry(0.18, 0.18, 0.18);
    const podMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.9,
      roughness: 0.1,
    });
    materialsList.push(podMat);

    const podGroup = new THREE.Group();
    for (let i = 0; i < 4; i++) {
      const angle = (i / 4) * Math.PI * 2;
      const pod = new THREE.Mesh(podGeo, podMat);
      pod.position.set(Math.cos(angle) * 3.3, Math.sin(angle) * 3.3, 0);
      podGroup.add(pod);
    }
    coreGroup.add(podGroup);

    // Background CAD Dust / Micro Quantum Particles
    const particleCount = 180;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 14;
      positions[i + 1] = (Math.random() - 0.5) * 14;
      positions[i + 2] = (Math.random() - 0.5) * 10;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.035,
      color: 0xff5500,
      transparent: true,
      opacity: 0.45,
    });
    materialsList.push(particleMat);
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    stateRef.current = {
      scene,
      camera,
      renderer,
      coreGroup,
      rings,
      particles,
      materials: materialsList,
      reqId: 0,
      mouseX: 0,
      mouseY: 0,
      targetRotationX: 0,
      targetRotationY: 0,
    };

    // Mouse Interaction
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      if (stateRef.current) {
        stateRef.current.mouseX = x;
        stateRef.current.mouseY = y;
        stateRef.current.targetRotationY = x * 0.8;
        stateRef.current.targetRotationX = -y * 0.8;
      }
    };

    container.addEventListener('mousemove', handleMouseMove);

    // Resize Handler
    const handleResize = () => {
      if (!container || !stateRef.current) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      stateRef.current.camera.aspect = w / h;
      stateRef.current.camera.updateProjectionMatrix();
      stateRef.current.renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop with battery saving when offscreen
    let lastTime = performance.now();
    let frameCount = 0;
    let lastFpsUpdate = lastTime;
    let isVisible = true;

    const animate = (time: number) => {
      if (!isVisible) {
        if (stateRef.current) stateRef.current.reqId = 0;
        return;
      }

      lastTime = time;

      frameCount++;
      if (time - lastFpsUpdate > 1000) {
        setFps(Math.round((frameCount * 1000) / (time - lastFpsUpdate)));
        frameCount = 0;
        lastFpsUpdate = time;
      }

      if (stateRef.current) {
        const { coreGroup, rings, particles, targetRotationX, targetRotationY } = stateRef.current;

        // Smooth inertial dampening
        coreGroup.rotation.y += (targetRotationY - coreGroup.rotation.y) * 0.04;
        coreGroup.rotation.x += (targetRotationX - coreGroup.rotation.x) * 0.04;

        if (activeRotation) {
          coreGroup.rotation.y += 0.005;
          nucleusMesh.rotation.y -= 0.012;
          nucleusMesh.rotation.x += 0.008;

          rings[0].rotation.x += 0.006;
          rings[0].rotation.y += 0.003;

          rings[1].rotation.y -= 0.007;
          rings[1].rotation.z += 0.005;

          rings[2].rotation.z += 0.009;
          rings[2].rotation.x -= 0.004;

          podGroup.rotation.z -= 0.004;
        }

        particles.rotation.y += 0.001;
        stateRef.current.renderer.render(scene, camera);
      }

      stateRef.current!.reqId = requestAnimationFrame(animate);
    };

    stateRef.current.reqId = requestAnimationFrame(animate);

    // Battery & Performance: Pause WebGL when container is out of view
    const observer = new IntersectionObserver(
      ([entry]) => {
        const wasVisible = isVisible;
        isVisible = entry.isIntersecting;
        if (isVisible && !wasVisible) {
          if (stateRef.current && !stateRef.current.reqId) {
            stateRef.current.reqId = requestAnimationFrame(animate);
          }
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    return () => {
      observer.disconnect();
      container.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (stateRef.current) {
        if (stateRef.current.reqId) {
          cancelAnimationFrame(stateRef.current.reqId);
        }
        renderer.dispose();
      }
    };
  }, [activeRotation]);

  // Update modes
  useEffect(() => {
    if (!stateRef.current) return;
    const { materials } = stateRef.current;

    materials.forEach((mat) => {
      if (mat instanceof THREE.MeshStandardMaterial || mat instanceof THREE.MeshBasicMaterial) {
        if (viewMode === 'wireframe' || cadMode) {
          mat.wireframe = true;
        } else if (viewMode === 'telemetry') {
          mat.wireframe = false;
        } else {
          // Solid
          if (mat !== materials[1] && mat !== materials[2] && mat !== materials[5]) {
            mat.wireframe = false;
          }
        }
      }
    });
  }, [viewMode, cadMode]);

  return (
    <div className="relative w-full h-[520px] md:h-[620px] flex items-center justify-center select-none">
      {/* 3D WebGL Canvas */}
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Industrial Heads-Up Display (HUD) Overlays */}
      <div className="absolute top-4 left-4 flex flex-col gap-1 pointer-events-none text-left">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#ff5500] animate-pulse" />
          <span className="tactical-tag text-[#ff5500] font-bold">CORE ENGINE: ACTIVE</span>
        </div>
        <span className="tactical-tag text-[#525866]">REF: BLX-MKIV-2026</span>
        <span className="tactical-tag text-[#525866]">FPS: {fps} // REND: PBR_METAL</span>
      </div>

      <div className="absolute top-4 right-4 text-right pointer-events-none">
        <span className="tactical-tag text-[#8c93a0] block">COORDINATES:</span>
        <span className="tactical-tag text-[#ff5500]">30.0444° N, 31.2357° E</span>
        <span className="tactical-tag text-[#525866] block">PRECISION: ±0.001mm</span>
      </div>

      {/* Tactical Mode Selector Controls */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-1 p-1 bg-[#13161c]/90 border border-[#232832] rounded-md backdrop-blur-md shadow-2xl">
        <button
          onClick={() => {
            audioHaptics.playRelay();
            setViewMode('solid');
          }}
          onMouseEnter={() => audioHaptics.playTick()}
          className={`px-3 py-1.5 rounded flex items-center gap-1.5 transition-all text-xs font-mono tracking-wider ${
            viewMode === 'solid'
              ? 'bg-[#ff5500] text-black font-bold shadow-md'
              : 'text-[#8c93a0] hover:text-white hover:bg-[#1f242e]'
          }`}
        >
          <Cpu className="w-3.5 h-3.5" />
          <span>SOLID</span>
        </button>

        <button
          onClick={() => {
            audioHaptics.playRelay();
            setViewMode('wireframe');
          }}
          onMouseEnter={() => audioHaptics.playTick()}
          className={`px-3 py-1.5 rounded flex items-center gap-1.5 transition-all text-xs font-mono tracking-wider ${
            viewMode === 'wireframe'
              ? 'bg-[#ff5500] text-black font-bold shadow-md'
              : 'text-[#8c93a0] hover:text-white hover:bg-[#1f242e]'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>CAD / WIRE</span>
        </button>

        <button
          onClick={() => {
            audioHaptics.playRelay();
            setViewMode('telemetry');
          }}
          onMouseEnter={() => audioHaptics.playTick()}
          className={`px-3 py-1.5 rounded flex items-center gap-1.5 transition-all text-xs font-mono tracking-wider ${
            viewMode === 'telemetry'
              ? 'bg-[#ff5500] text-black font-bold shadow-md'
              : 'text-[#8c93a0] hover:text-white hover:bg-[#1f242e]'
          }`}
        >
          <Eye className="w-3.5 h-3.5" />
          <span>TELEMETRY</span>
        </button>

        <div className="w-[1px] h-4 bg-[#2e3442] mx-1" />

        <button
          onClick={() => {
            audioHaptics.playClick(800);
            setActiveRotation(!activeRotation);
          }}
          onMouseEnter={() => audioHaptics.playTick()}
          title="Toggle Auto Rotation"
          className={`p-1.5 rounded text-xs font-mono transition-all ${
            activeRotation ? 'text-[#ff5500]' : 'text-[#525866] hover:text-white'
          }`}
        >
          <RotateCw className={`w-3.5 h-3.5 ${activeRotation ? 'animate-spin-slow' : ''}`} />
        </button>
      </div>
    </div>
  );
};
