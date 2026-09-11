import { useEffect, useRef, useState, type FC } from 'react';
import * as THREE from 'three';
import { ShieldCheck, Brain, Layers, Activity, Send, CheckCircle2 } from 'lucide-react';

export type SelectedNode = 'blotx' | 'taht' | 'efteker' | null;

interface EcosystemNetwork3DProps {
  onNodeSelect?: (node: SelectedNode) => void;
}

export const EcosystemNetwork3D: FC<EcosystemNetwork3DProps> = ({ onNodeSelect }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeNode, setActiveNode] = useState<SelectedNode>('blotx');
  const [transmissionMsg, setTransmissionMsg] = useState<string>('مزامنة تلقائية ونشطة بين كافة أطراف الإيكوسيستم');
  const [pulseCount, setPulseCount] = useState<number>(142);

  const stateRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    networkGroup: THREE.Group;
    curves: { curve: THREE.QuadraticBezierCurve3; pulseMesh: THREE.Mesh; speed: number; progress: number }[];
    orbitRings: THREE.Mesh[];
    nodes: { id: string; mesh: THREE.Group; basePos: THREE.Vector3 }[];
    reqId: number;
    mouseX: number;
    mouseY: number;
    targetRotX: number;
    targetRotY: number;
  } | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 560;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 1.8, 7.5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Studio Lighting (Clean, Apple-like soft radiance)
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.8);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.0);
    keyLight.position.set(5, 8, 5);
    scene.add(keyLight);

    const softFill = new THREE.DirectionalLight(0xecfeff, 1.2);
    softFill.position.set(-5, -3, 4);
    scene.add(softFill);

    const networkGroup = new THREE.Group();
    scene.add(networkGroup);

    // Subtle Ground / Depth Grid Grid Plane in soft gray
    const gridHelper = new THREE.GridHelper(12, 24, 0xd1d5db, 0xe5e7eb);
    gridHelper.position.y = -2.2;
    scene.add(gridHelper);

    // Define Node Positions
    const posCenter = new THREE.Vector3(0, 0.2, 0); // Blotx Stack
    const posTaht = new THREE.Vector3(-2.8, -0.2, 0.5); // تحت البلاطة
    const posEfteker = new THREE.Vector3(2.8, -0.2, 0.5); // افتكر

    // Helper: Create a Luxury Apple Frosted Glass Sphere Node
    const createNodeGroup = (
      name: string,
      colorHex: number,
      innerColor: number,
      size: number,
      position: THREE.Vector3
    ) => {
      const group = new THREE.Group();
      group.position.copy(position);

      // 1. Inner Core Sphere
      const innerGeo = new THREE.SphereGeometry(size * 0.65, 32, 32);
      const innerMat = new THREE.MeshStandardMaterial({
        color: innerColor,
        roughness: 0.2,
        metalness: 0.1,
        emissive: innerColor,
        emissiveIntensity: 0.35,
      });
      const innerMesh = new THREE.Mesh(innerGeo, innerMat);
      group.add(innerMesh);

      // 2. Outer Frosted Glass Shell
      const shellGeo = new THREE.SphereGeometry(size, 32, 32);
      const shellMat = new THREE.MeshPhysicalMaterial({
        color: colorHex,
        roughness: 0.12,
        metalness: 0.05,
        transmission: 0.85,
        thickness: 0.8,
        transparent: true,
        opacity: 0.75,
      });
      const shellMesh = new THREE.Mesh(shellGeo, shellMat);
      group.add(shellMesh);

      // 3. Orbital Concentric Rings around the sphere
      const ringGeo = new THREE.TorusGeometry(size * 1.5, 0.018, 16, 64);
      const ringMat = new THREE.MeshStandardMaterial({
        color: colorHex,
        metalness: 0.8,
        roughness: 0.2,
        transparent: true,
        opacity: 0.7,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = Math.PI / 2.5;
      group.add(ringMesh);

      // 4. Second outer tilted faint ring
      const ring2Geo = new THREE.TorusGeometry(size * 1.85, 0.01, 16, 64);
      const ring2Mat = new THREE.MeshBasicMaterial({
        color: 0x9ca3af,
        transparent: true,
        opacity: 0.35,
      });
      const ring2Mesh = new THREE.Mesh(ring2Geo, ring2Mat);
      ring2Mesh.rotation.y = Math.PI / 3;
      group.add(ring2Mesh);

      networkGroup.add(group);
      return { id: name, mesh: group, basePos: position };
    };

    // Instantiate the 3 Key Nodes
    const nodesList = [
      createNodeGroup('blotx', 0xffffff, 0x1d1d1f, 0.9, posCenter), // Center: Blotx Stack
      createNodeGroup('taht', 0x10b981, 0x059669, 0.7, posTaht), // Left: تحت البلاطة
      createNodeGroup('efteker', 0x3b82f6, 0x2563eb, 0.7, posEfteker), // Right: افتكر
    ];

    // Master Ecosystem Orbiting Ring around everything
    const masterOrbitGeo = new THREE.TorusGeometry(3.6, 0.016, 16, 120);
    const masterOrbitMat = new THREE.MeshBasicMaterial({
      color: 0xcbd5e1,
      transparent: true,
      opacity: 0.5,
    });
    const masterOrbit = new THREE.Mesh(masterOrbitGeo, masterOrbitMat);
    masterOrbit.rotation.x = Math.PI / 2.1;
    masterOrbit.position.copy(posCenter);
    networkGroup.add(masterOrbit);

    // Build Arcs & Traveling Energy Packets (الرسومات الشبكية والخطوط التوصيلية)
    const curveDataList: {
      curve: THREE.QuadraticBezierCurve3;
      pulseMesh: THREE.Mesh;
      speed: number;
      progress: number;
    }[] = [];

    const setupConnection = (
      start: THREE.Vector3,
      end: THREE.Vector3,
      midControl: THREE.Vector3,
      glowColor: number,
      speed = 0.008
    ) => {
      const curve = new THREE.QuadraticBezierCurve3(start, midControl, end);

      // 1. Static delicate track tube
      const tubeGeo = new THREE.TubeGeometry(curve, 40, 0.015, 8, false);
      const tubeMat = new THREE.MeshBasicMaterial({
        color: 0xe2e8f0,
        transparent: true,
        opacity: 0.8,
      });
      const tubeMesh = new THREE.Mesh(tubeGeo, tubeMat);
      networkGroup.add(tubeMesh);

      // 2. Glowing pulse packet moving along the curve
      const pulseGeo = new THREE.SphereGeometry(0.08, 16, 16);
      const pulseMat = new THREE.MeshBasicMaterial({
        color: glowColor,
      });
      const pulseMesh = new THREE.Mesh(pulseGeo, pulseMat);
      networkGroup.add(pulseMesh);

      curveDataList.push({
        curve,
        pulseMesh,
        speed,
        progress: Math.random(),
      });
    };

    // Connection 1: Blotx Stack <-> تحت البلاطة (Emerald Arc)
    setupConnection(
      posCenter,
      posTaht,
      new THREE.Vector3(-1.4, 1.2, 0.4),
      0x10b981,
      0.007
    );

    // Connection 2: Blotx Stack <-> افتكر (Azure Arc)
    setupConnection(
      posCenter,
      posEfteker,
      new THREE.Vector3(1.4, 1.2, 0.4),
      0x3b82f6,
      0.0075
    );

    // Connection 3: تحت البلاطة <-> افتكر (Direct Symbiosis Bridge Arc - Purple/Amber)
    setupConnection(
      posTaht,
      posEfteker,
      new THREE.Vector3(0, -1.5, 0.8),
      0xf59e0b,
      0.009
    );

    // Ambient floating constellation dust particles
    const particleCount = 80;
    const pGeo = new THREE.BufferGeometry();
    const pPositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      pPositions[i] = (Math.random() - 0.5) * 10;
      pPositions[i + 1] = (Math.random() - 0.5) * 6;
      pPositions[i + 2] = (Math.random() - 0.5) * 6;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
    const pMat = new THREE.PointsMaterial({
      size: 0.04,
      color: 0x94a3b8,
      transparent: true,
      opacity: 0.6,
    });
    const constellation = new THREE.Points(pGeo, pMat);
    networkGroup.add(constellation);

    stateRef.current = {
      scene,
      camera,
      renderer,
      networkGroup,
      curves: curveDataList,
      orbitRings: [masterOrbit],
      nodes: nodesList,
      reqId: 0,
      mouseX: 0,
      mouseY: 0,
      targetRotX: 0,
      targetRotY: 0,
    };

    // Parallax mouse tilt
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      if (stateRef.current) {
        stateRef.current.targetRotY = nx * 0.4;
        stateRef.current.targetRotX = -ny * 0.25;
      }
    };
    container.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      if (!container || !stateRef.current) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      stateRef.current.camera.aspect = w / h;
      stateRef.current.camera.updateProjectionMatrix();
      stateRef.current.renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let clock = 0;
    const animate = () => {
      clock += 0.015;

      if (stateRef.current) {
        const { networkGroup, curves, nodes, targetRotX, targetRotY, renderer, scene, camera } =
          stateRef.current;

        // Smooth Parallax
        networkGroup.rotation.y += (targetRotY - networkGroup.rotation.y) * 0.05;
        networkGroup.rotation.x += (targetRotX - networkGroup.rotation.x) * 0.05;

        // Gentle Floating of Nodes
        nodes[0].mesh.position.y = nodes[0].basePos.y + Math.sin(clock * 1.5) * 0.06;
        nodes[1].mesh.position.y = nodes[1].basePos.y + Math.cos(clock * 1.5) * 0.08;
        nodes[2].mesh.position.y = nodes[2].basePos.y + Math.sin(clock * 1.5 + 1) * 0.08;

        // Slow spin of orbital rings
        masterOrbit.rotation.z += 0.002;

        // Move Data Packets along Splines
        curves.forEach((item) => {
          item.progress += item.speed;
          if (item.progress > 1) item.progress = 0;
          const pos = item.curve.getPoint(item.progress);
          item.pulseMesh.position.copy(pos);
        });

        renderer.render(scene, camera);
      }

      stateRef.current!.reqId = requestAnimationFrame(animate);
    };

    stateRef.current.reqId = requestAnimationFrame(animate);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (stateRef.current) {
        cancelAnimationFrame(stateRef.current.reqId);
        renderer.dispose();
      }
    };
  }, []);

  const triggerPacket = (msg: string, node: SelectedNode) => {
    setActiveNode(node);
    setTransmissionMsg(msg);
    setPulseCount((prev) => prev + 1);
    onNodeSelect?.(node);
  };

  return (
    <div className="relative w-full flex flex-col items-center">
      {/* 3D WebGL Canvas */}
      <div
        ref={containerRef}
        className="w-full h-[480px] sm:h-[580px] cursor-grab active:cursor-grabbing relative z-10"
      />

      {/* Floating 3D Node Badges synchronized with nodes */}
      <div className="absolute top-8 inset-x-4 max-w-4xl mx-auto flex justify-between items-start pointer-events-none z-20">
        {/* Node 1 Badge: تحت البلاطة */}
        <div className="bg-white/90 backdrop-blur-md border border-emerald-200/60 rounded-2xl p-3.5 shadow-sm text-right max-w-[200px] pointer-events-auto">
          <div className="flex items-center justify-end gap-1.5 text-xs font-bold text-emerald-700 mb-0.5">
            <span>تحت البلاطة</span>
            <ShieldCheck className="w-3.5 h-3.5" />
          </div>
          <div className="text-[11px] text-[#6e6e73]">حصن الأمان والادخار اليومي</div>
          <div className="mt-2 text-[10px] font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full inline-block">
            FINANCIAL NODE
          </div>
        </div>

        {/* Node 2 Center Badge: Blotx Stack */}
        <div className="bg-white/90 backdrop-blur-md border border-black/[0.08] rounded-2xl p-3.5 shadow-md text-center max-w-[220px] pointer-events-auto">
          <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-[#1d1d1f] mb-0.5">
            <Layers className="w-3.5 h-3.5 text-[#0071e3]" />
            <span>BLOTX STACK</span>
          </div>
          <div className="text-[11px] text-[#6e6e73]">قلب الإيكوسيستم ومحرك المزامنة</div>
          <div className="mt-2 text-[10px] font-mono text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full inline-block">
            CORE PROTOCOL
          </div>
        </div>

        {/* Node 3 Badge: افتكر */}
        <div className="bg-white/90 backdrop-blur-md border border-blue-200/60 rounded-2xl p-3.5 shadow-sm text-right max-w-[200px] pointer-events-auto">
          <div className="flex items-center justify-end gap-1.5 text-xs font-bold text-blue-700 mb-0.5">
            <span>افتكر</span>
            <Brain className="w-3.5 h-3.5" />
          </div>
          <div className="text-[11px] text-[#6e6e73]">العقل الثاني وحارس الذاكرة</div>
          <div className="mt-2 text-[10px] font-mono text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full inline-block">
            COGNITIVE NODE
          </div>
        </div>
      </div>

      {/* Interactive Telemetry & Transmission Triggers */}
      <div className="w-full max-w-3xl -mt-6 z-20 px-4">
        <div className="apple-card p-5 sm:p-6 bg-white/95 backdrop-blur-xl border border-black/[0.08] shadow-lg flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Active Live Status */}
          <div className="text-right space-y-1 w-full md:w-auto">
            <div className="flex items-center justify-end gap-2 text-xs font-semibold text-[#1d1d1f]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>المزامنة التلقائية: {transmissionMsg}</span>
            </div>
            <div className="flex items-center justify-end gap-3 text-[11px] text-[#86868b] font-mono">
              <span>حزم البيانات المتبادلة اليوم: {pulseCount}</span>
              <span>•</span>
              <span className="flex items-center gap-1 text-emerald-600">
                <CheckCircle2 className="w-3 h-3" /> مشفر محلياً
              </span>
            </div>
          </div>

          {/* Action Triggers */}
          <div className="flex flex-wrap items-center justify-end gap-2 w-full md:w-auto">
            <button
              onClick={() =>
                triggerPacket(
                  'تحت البلاطة يرسل تنبيه حجز قسط لـ افتكر',
                  'taht'
                )
              }
              className={`apple-pill-btn px-3.5 py-1.5 text-xs font-medium border transition-all flex items-center gap-1.5 ${
                activeNode === 'taht'
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                  : 'bg-neutral-50 text-[#1d1d1f] border-black/[0.08] hover:bg-neutral-100'
              }`}
            >
              <Send className="w-3 h-3" />
              <span>محاكاة: إشعار قسط مالي</span>
            </button>

            <button
              onClick={() =>
                triggerPacket(
                  'افتكر يطلب حجز ميزانية مناسبة جديدة من تحت البلاطة',
                  'efteker'
                )
              }
              className={`apple-pill-btn px-3.5 py-1.5 text-xs font-medium border transition-all flex items-center gap-1.5 ${
                activeNode === 'efteker'
                  ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                  : 'bg-neutral-50 text-[#1d1d1f] border-black/[0.08] hover:bg-neutral-100'
              }`}
            >
              <Activity className="w-3 h-3" />
              <span>محاكاة: حدث وميزانية</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
