import { useEffect, useRef, useState, type FC } from 'react';
import * as THREE from 'three';
import { ShieldCheck, Brain, Sparkles, Smartphone } from 'lucide-react';

interface AppleHero3DProps {
  onSelectApp?: (app: 'taht' | 'efteker') => void;
}

export const AppleHero3D: FC<AppleHero3DProps> = ({ onSelectApp }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeFocus, setActiveFocus] = useState<'both' | 'taht' | 'efteker'>('both');

  const stateRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    phoneGroupA: THREE.Group; // Taht El Balata
    phoneGroupB: THREE.Group; // Efteker
    reqId: number;
    mouseX: number;
    mouseY: number;
    targetCamX: number;
    targetCamY: number;
  } | null>(null);

  // Helper to draw realistic UI canvas texture for "تحت البلاطة"
  const createTahtElBalataTexture = (): THREE.CanvasTexture => {
    const canvas = document.createElement('canvas');
    canvas.width = 720;
    canvas.height = 1440;
    const ctx = canvas.getContext('2d')!;

    // Clean Apple-style app background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Subtle gradient header
    const grad = ctx.createLinearGradient(0, 0, 0, 360);
    grad.addColorStop(0, '#f0fdf4');
    grad.addColorStop(1, '#ffffff');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, 360);

    // Top status bar simulation
    ctx.fillStyle = '#1d1d1f';
    ctx.font = 'bold 28px -apple-system, sans-serif';
    ctx.fillText('9:41', 50, 60);

    // App Header
    ctx.fillStyle = '#059669';
    ctx.font = 'bold 32px Cairo, -apple-system, sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText('تحت البلاطة', 660, 140);

    ctx.fillStyle = '#6e6e73';
    ctx.font = '500 22px Cairo, sans-serif';
    ctx.fillText('خزنتك المالية الذكية', 660, 180);

    // Balance Card
    ctx.fillStyle = '#18181b';
    ctx.beginPath();
    ctx.roundRect(50, 230, 620, 280, 24);
    ctx.fill();

    ctx.fillStyle = '#a1a1aa';
    ctx.font = '22px Cairo, sans-serif';
    ctx.fillText('إجمالي الأصول المحمية', 630, 280);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 54px -apple-system, sans-serif';
    ctx.fillText('148,500 ج.م', 630, 360);

    // Progress pill inside card
    ctx.fillStyle = '#27272a';
    ctx.beginPath();
    ctx.roundRect(80, 420, 560, 40, 20);
    ctx.fill();

    ctx.fillStyle = '#10b981';
    ctx.beginPath();
    ctx.roundRect(80, 420, 420, 40, 20);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 18px Cairo, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('وفرت 75% من هدف هذا الشهر', 105, 447);

    // Sub-Cards: Smart Vaults
    const vaults = [
      { title: 'خزنة الطوارئ', amount: '60,000 ج.م', color: '#10b981' },
      { title: 'استثمار الذهب', amount: '55,000 ج.م', color: '#f59e0b' },
      { title: 'سفرية العائلة', amount: '33,500 ج.م', color: '#3b82f6' },
    ];

    vaults.forEach((v, idx) => {
      const y = 550 + idx * 170;
      ctx.fillStyle = '#f4f4f5';
      ctx.beginPath();
      ctx.roundRect(50, y, 620, 140, 20);
      ctx.fill();

      // Dot
      ctx.fillStyle = v.color;
      ctx.beginPath();
      ctx.arc(630, y + 70, 12, 0, Math.PI * 2);
      ctx.fill();

      ctx.textAlign = 'right';
      ctx.fillStyle = '#18181b';
      ctx.font = 'bold 30px Cairo, sans-serif';
      ctx.fillText(v.title, 600, y + 65);

      ctx.fillStyle = '#71717a';
      ctx.font = 'bold 26px -apple-system, sans-serif';
      ctx.fillText(v.amount, 600, y + 105);

      ctx.textAlign = 'left';
      ctx.fillStyle = '#059669';
      ctx.font = 'bold 22px Cairo, sans-serif';
      ctx.fillText('مؤمنة تماماً ✓', 80, y + 80);
    });

    // Bottom ecosystem link pill
    ctx.fillStyle = '#ecfdf5';
    ctx.strokeStyle = '#a7f3d0';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(50, 1100, 620, 110, 20);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#065f46';
    ctx.font = 'bold 24px Cairo, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('متصل بتطبيق «افتكر» لتأمين أقساطك ومواعيدك', 360, 1165);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  };

  // Helper to draw realistic UI canvas texture for "افتكر"
  const createEftekerTexture = (): THREE.CanvasTexture => {
    const canvas = document.createElement('canvas');
    canvas.width = 720;
    canvas.height = 1440;
    const ctx = canvas.getContext('2d')!;

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Subtle gradient header
    const grad = ctx.createLinearGradient(0, 0, 0, 360);
    grad.addColorStop(0, '#eff6ff');
    grad.addColorStop(1, '#ffffff');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, 360);

    // Top status bar simulation
    ctx.fillStyle = '#1d1d1f';
    ctx.font = 'bold 28px -apple-system, sans-serif';
    ctx.fillText('9:41', 50, 60);

    // App Header
    ctx.fillStyle = '#2563eb';
    ctx.font = 'bold 32px Cairo, -apple-system, sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText('افتكر', 660, 140);

    ctx.fillStyle = '#6e6e73';
    ctx.font = '500 22px Cairo, sans-serif';
    ctx.fillText('عقلك الثاني.. وحارس أولوياتك', 660, 180);

    // Memory Summary Card
    ctx.fillStyle = '#1e293b';
    ctx.beginPath();
    ctx.roundRect(50, 230, 620, 260, 24);
    ctx.fill();

    ctx.fillStyle = '#94a3b8';
    ctx.font = '22px Cairo, sans-serif';
    ctx.fillText('الحالة الذهنية اليوم', 630, 280);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 44px Cairo, sans-serif';
    ctx.fillText('صفاء تام • 0 مشتتات', 630, 350);

    ctx.fillStyle = '#38bdf8';
    ctx.font = '22px Cairo, sans-serif';
    ctx.fillText('كل التزاماتك ومواعيدك مؤمنة وفي وقتها', 630, 410);

    // Daily Priorities
    const tasks = [
      { time: 'اليوم • 04:00 م', text: 'سداد قسط السيارة (محجوز في تحت البلاطة)', tag: 'مالي ومهم', color: '#10b981' },
      { time: 'اليوم • 07:30 م', text: 'اجتماع مناقشة إطلاق منتج Blotx الجديد', tag: 'شغل وابتكار', color: '#3b82f6' },
      { time: 'غداً • 10:00 ص', text: 'شراء هدية عيد ميلاد الوالدة', tag: 'عائلي', color: '#ec4899' },
    ];

    tasks.forEach((t, idx) => {
      const y = 530 + idx * 180;
      ctx.fillStyle = '#f8fafc';
      ctx.beginPath();
      ctx.roundRect(50, y, 620, 150, 20);
      ctx.fill();

      ctx.textAlign = 'right';
      ctx.fillStyle = '#64748b';
      ctx.font = '20px Cairo, sans-serif';
      ctx.fillText(t.time, 630, y + 45);

      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 26px Cairo, sans-serif';
      ctx.fillText(t.text, 630, y + 90);

      // Tag
      ctx.textAlign = 'left';
      ctx.fillStyle = t.color;
      ctx.font = 'bold 20px Cairo, sans-serif';
      ctx.fillText(`● ${t.tag}`, 80, y + 120);
    });

    // Bottom quick capture button
    ctx.fillStyle = '#2563eb';
    ctx.beginPath();
    ctx.roundRect(50, 1100, 620, 110, 20);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 26px Cairo, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('＋ دوّن فكرة أو التزام جديد بصوتك', 360, 1165);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 600;

    // 1. Scene
    const scene = new THREE.Scene();

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.8);

    // 3. Renderer with luxury Apple-style lighting & shadow
    const isMobile = window.innerWidth < 768;
    const renderer = new THREE.WebGLRenderer({
      antialias: !isMobile,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isMobile ? Math.min(window.devicePixelRatio, 1.5) : Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Studio Ambient Light (Soft & Pure)
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    // Key Light
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(6, 9, 7);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    scene.add(keyLight);

    // Soft Rim Light from below
    const rimLight = new THREE.DirectionalLight(0xffffff, 0.9);
    rimLight.position.set(-6, -5, 4);
    scene.add(rimLight);

    // Ground Shadow Receiver Plane
    const shadowPlaneGeo = new THREE.PlaneGeometry(16, 16);
    const shadowPlaneMat = new THREE.ShadowMaterial({ opacity: 0.08 });
    const shadowPlane = new THREE.Mesh(shadowPlaneGeo, shadowPlaneMat);
    shadowPlane.position.y = -2.6;
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.receiveShadow = true;
    scene.add(shadowPlane);

    // Helper to build an Apple luxury phone mesh
    const buildPhone = (screenTexture: THREE.CanvasTexture, bezelColor: number) => {
      const group = new THREE.Group();

      const phoneW = 1.95;
      const phoneH = 3.9;
      const phoneD = 0.12;
      const radius = 0.24;

      // Rounded rectangle chassis
      const shape = new THREE.Shape();
      const x = -phoneW / 2;
      const y = -phoneH / 2;
      shape.moveTo(x + radius, y);
      shape.lineTo(x + phoneW - radius, y);
      shape.quadraticCurveTo(x + phoneW, y, x + phoneW, y + radius);
      shape.lineTo(x + phoneW, y + phoneH - radius);
      shape.quadraticCurveTo(x + phoneW, y + phoneH, x + phoneW - radius, y + phoneH);
      shape.lineTo(x + radius, y + phoneH);
      shape.quadraticCurveTo(x, y + phoneH, x, y + phoneH - radius);
      shape.lineTo(x, y + radius);
      shape.quadraticCurveTo(x, y, x + radius, y);

      const extrudeSettings = {
        depth: phoneD,
        bevelEnabled: true,
        bevelSegments: 5,
        steps: 1,
        bevelSize: 0.03,
        bevelThickness: 0.03,
      };

      const chassisGeo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
      chassisGeo.center();

      // Apple Natural Titanium / Silver Polished Material
      const chassisMat = new THREE.MeshStandardMaterial({
        color: bezelColor,
        metalness: 0.92,
        roughness: 0.18,
      });

      const chassis = new THREE.Mesh(chassisGeo, chassisMat);
      chassis.castShadow = true;
      group.add(chassis);

      // Glass Screen with App UI
      const screenGeo = new THREE.PlaneGeometry(phoneW - 0.09, phoneH - 0.09);
      const screenMat = new THREE.MeshStandardMaterial({
        map: screenTexture,
        roughness: 0.12,
        metalness: 0.1,
      });
      const screen = new THREE.Mesh(screenGeo, screenMat);
      screen.position.z = phoneD / 2 + 0.032;
      group.add(screen);

      // Dynamic Island / Camera Pill
      const pillGeo = new THREE.CapsuleGeometry(0.045, 0.22, 4, 16);
      const pillMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
      const pill = new THREE.Mesh(pillGeo, pillMat);
      pill.rotation.z = Math.PI / 2;
      pill.position.set(0, phoneH / 2 - 0.18, phoneD / 2 + 0.035);
      group.add(pill);

      return group;
    };

    // Phone A: تحت البلاطة (Taht El Balata)
    const phoneGroupA = buildPhone(createTahtElBalataTexture(), 0xe2e8f0);
    phoneGroupA.position.set(-1.25, 0.1, 0.4);
    phoneGroupA.rotation.set(-0.06, 0.32, -0.04);
    scene.add(phoneGroupA);

    // Phone B: افتكر (Efteker)
    const phoneGroupB = buildPhone(createEftekerTexture(), 0xd1d5db);
    phoneGroupB.position.set(1.25, -0.1, -0.2);
    phoneGroupB.rotation.set(0.06, -0.32, 0.04);
    scene.add(phoneGroupB);

    stateRef.current = {
      scene,
      camera,
      renderer,
      phoneGroupA,
      phoneGroupB,
      reqId: 0,
      mouseX: 0,
      mouseY: 0,
      targetCamX: 0,
      targetCamY: 0,
    };

    // Parallax mouse follow
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      if (stateRef.current) {
        stateRef.current.mouseX = nx;
        stateRef.current.mouseY = ny;
        stateRef.current.targetCamX = nx * 0.6;
        stateRef.current.targetCamY = ny * 0.4;
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

    // Smooth render loop with gentle floating and IntersectionObserver battery savings
    let clock = 0;
    let isVisible = true;

    const animate = () => {
      if (!isVisible) {
        if (stateRef.current) stateRef.current.reqId = 0;
        return;
      }

      clock += 0.02;

      if (stateRef.current) {
        const { camera, phoneGroupA, phoneGroupB, targetCamX, targetCamY, renderer, scene } = stateRef.current;

        // Smooth camera drift
        camera.position.x += (targetCamX - camera.position.x) * 0.05;
        camera.position.y += (targetCamY - camera.position.y) * 0.05;
        camera.lookAt(0, 0, 0);

        // Apple floating gentle oscillation
        phoneGroupA.position.y = 0.1 + Math.sin(clock) * 0.08;
        phoneGroupB.position.y = -0.1 + Math.cos(clock + 1.2) * 0.08;

        phoneGroupA.rotation.y = 0.32 + Math.sin(clock * 0.5) * 0.04;
        phoneGroupB.rotation.y = -0.32 - Math.cos(clock * 0.5) * 0.04;

        renderer.render(scene, camera);
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
        cancelAnimationFrame(stateRef.current.reqId);
        renderer.dispose();
      }
    };
  }, []);

  // Update focus animation
  useEffect(() => {
    if (!stateRef.current) return;
    const { phoneGroupA, phoneGroupB } = stateRef.current;

    if (activeFocus === 'taht') {
      phoneGroupA.position.set(0, 0.1, 0.8);
      phoneGroupA.rotation.set(0, 0, 0);
      phoneGroupB.position.set(2.2, -0.4, -1.2);
    } else if (activeFocus === 'efteker') {
      phoneGroupB.position.set(0, 0.1, 0.8);
      phoneGroupB.rotation.set(0, 0, 0);
      phoneGroupA.position.set(-2.2, -0.4, -1.2);
    } else {
      phoneGroupA.position.set(-1.25, 0.1, 0.4);
      phoneGroupA.rotation.set(-0.06, 0.32, -0.04);
      phoneGroupB.position.set(1.25, -0.1, -0.2);
      phoneGroupB.rotation.set(0.06, -0.32, 0.04);
    }
  }, [activeFocus]);

  return (
    <div className="relative w-full flex flex-col items-center select-none">
      {/* 3D Canvas Stage */}
      <div
        ref={containerRef}
        className="w-full h-[520px] sm:h-[620px] cursor-grab active:cursor-grabbing"
      />

      {/* Apple-style Interactive Focus Switcher Pill */}
      <div className="flex items-center gap-1.5 p-1.5 bg-white/80 backdrop-blur-xl border border-black/[0.08] rounded-full shadow-lg -mt-8 z-20">
        <button
          onClick={() => {
            setActiveFocus('both');
          }}
          className={`px-4 py-2 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
            activeFocus === 'both'
              ? 'bg-[#1d1d1f] text-white shadow-sm'
              : 'text-[#6e6e73] hover:text-[#1d1d1f]'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>الإيكوسيستم معاً</span>
        </button>

        <button
          onClick={() => {
            setActiveFocus('taht');
            onSelectApp?.('taht');
          }}
          className={`px-4 py-2 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
            activeFocus === 'taht'
              ? 'bg-[#059669] text-white shadow-sm'
              : 'text-[#6e6e73] hover:text-[#1d1d1f]'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>تحت البلاطة (المال والأمان)</span>
        </button>

        <button
          onClick={() => {
            setActiveFocus('efteker');
            onSelectApp?.('efteker');
          }}
          className={`px-4 py-2 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
            activeFocus === 'efteker'
              ? 'bg-[#2563eb] text-white shadow-sm'
              : 'text-[#6e6e73] hover:text-[#1d1d1f]'
          }`}
        >
          <Brain className="w-3.5 h-3.5" />
          <span>افتكر (الذاكرة والصفاء)</span>
        </button>
      </div>

      {/* Floating Hint */}
      <div className="flex items-center gap-2 mt-4 text-xs text-[#86868b]">
        <Smartphone className="w-3.5 h-3.5" />
        <span>حرّك الماوس للتفاعل ثلاثي الأبعاد والاطلاع على الشاشات الحية</span>
      </div>
    </div>
  );
};
