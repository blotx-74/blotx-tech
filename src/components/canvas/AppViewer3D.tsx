import { useEffect, useRef, useState, type FC } from 'react';
import * as THREE from 'three';
import { audioHaptics } from '../../utils/audioHaptics';
import { ShieldCheck, Brain, ArrowUpRight, Zap, RefreshCcw } from 'lucide-react';

export type ActiveApp = 'taht-elbalata' | 'efteker';

interface AppViewer3DProps {
  initialApp?: ActiveApp;
}

export const AppViewer3D: FC<AppViewer3DProps> = ({ initialApp = 'taht-elbalata' }) => {
  const [selectedApp, setSelectedApp] = useState<ActiveApp>(initialApp);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isRotating, setIsRotating] = useState<boolean>(true);

  const threeState = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    phoneMesh: THREE.Group;
    reqId: number;
    targetRotY: number;
    targetRotX: number;
  } | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 480;
    const height = container.clientHeight || 580;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0, 5.8);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Studio Lighting
    const amb = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(amb);

    const key = new THREE.DirectionalLight(0xffffff, 2.5);
    key.position.set(5, 7, 5);
    scene.add(key);

    const edgeLight = new THREE.DirectionalLight(0xff5500, 1.8);
    edgeLight.position.set(-5, -4, 3);
    scene.add(edgeLight);

    const phoneGroup = new THREE.Group();
    scene.add(phoneGroup);

    // 1. Phone Chassis (Matte Industrial Titanium Body)
    const phoneWidth = 1.9;
    const phoneHeight = 3.8;
    const phoneDepth = 0.14;
    const cornerRadius = 0.22;

    const shape = new THREE.Shape();
    const x = -phoneWidth / 2;
    const y = -phoneHeight / 2;
    shape.moveTo(x + cornerRadius, y);
    shape.lineTo(x + phoneWidth - cornerRadius, y);
    shape.quadraticCurveTo(x + phoneWidth, y, x + phoneWidth, y + cornerRadius);
    shape.lineTo(x + phoneWidth, y + phoneHeight - cornerRadius);
    shape.quadraticCurveTo(x + phoneWidth, y + phoneHeight, x + phoneWidth - cornerRadius, y + phoneHeight);
    shape.lineTo(x + cornerRadius, y + phoneHeight);
    shape.quadraticCurveTo(x, y + phoneHeight, x, y + phoneHeight - cornerRadius);
    shape.lineTo(x, y + cornerRadius);
    shape.quadraticCurveTo(x, y, x + cornerRadius, y);

    const extrudeSettings = {
      depth: phoneDepth,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 1,
      bevelSize: 0.03,
      bevelThickness: 0.03,
    };

    const chassisGeo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    chassisGeo.center();

    const chassisMat = new THREE.MeshStandardMaterial({
      color: 0x1a1d24,
      metalness: 0.95,
      roughness: 0.25,
    });

    const chassisMesh = new THREE.Mesh(chassisGeo, chassisMat);
    phoneGroup.add(chassisMesh);

    // 2. Chamfered Metal Antenna & Edge Band
    const bandMat = new THREE.MeshStandardMaterial({
      color: 0x484f60,
      metalness: 0.98,
      roughness: 0.1,
    });
    const bandGeo = new THREE.BoxGeometry(phoneWidth + 0.02, phoneHeight + 0.02, 0.02);
    const bandMesh = new THREE.Mesh(bandGeo, bandMat);
    bandMesh.position.z = -0.01;
    phoneGroup.add(bandMesh);

    // 3. Screen Glass (Reflective optical plane)
    const screenGeo = new THREE.PlaneGeometry(phoneWidth - 0.1, phoneHeight - 0.12);
    const screenMat = new THREE.MeshStandardMaterial({
      color: 0x07080a,
      roughness: 0.05,
      metalness: 0.8,
    });
    const screenMesh = new THREE.Mesh(screenGeo, screenMat);
    screenMesh.position.z = phoneDepth / 2 + 0.032;
    phoneGroup.add(screenMesh);

    // 4. Subtle camera punch-hole and speaker slit
    const pillGeo = new THREE.CapsuleGeometry(0.04, 0.18, 4, 16);
    const pillMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const pillMesh = new THREE.Mesh(pillGeo, pillMat);
    pillMesh.rotation.z = Math.PI / 2;
    pillMesh.position.set(0, phoneHeight / 2 - 0.18, phoneDepth / 2 + 0.035);
    phoneGroup.add(pillMesh);

    // 5. Tactical Holo-Projection Rings around the device
    const ringGeo = new THREE.TorusGeometry(2.3, 0.012, 16, 80);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xff5500,
      transparent: true,
      opacity: 0.3,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2.2;
    phoneGroup.add(ring);

    threeState.current = {
      scene,
      camera,
      renderer,
      phoneMesh: phoneGroup,
      reqId: 0,
      targetRotY: 0,
      targetRotX: 0,
    };

    // Mouse Tracking for 3D Tilt
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      if (threeState.current) {
        threeState.current.targetRotY = nx * 0.6;
        threeState.current.targetRotX = -ny * 0.4;
      }
    };

    container.addEventListener('mousemove', handleMouseMove);

    // Resize
    const handleResize = () => {
      if (!container || !threeState.current) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      threeState.current.camera.aspect = w / h;
      threeState.current.camera.updateProjectionMatrix();
      threeState.current.renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Loop
    const animate = () => {
      if (threeState.current) {
        const { phoneMesh, targetRotX, targetRotY } = threeState.current;

        phoneMesh.rotation.y += (targetRotY - phoneMesh.rotation.y) * 0.05;
        phoneMesh.rotation.x += (targetRotX - phoneMesh.rotation.x) * 0.05;

        if (isRotating) {
          phoneMesh.rotation.y += 0.003;
          ring.rotation.z += 0.005;
        }

        threeState.current.renderer.render(scene, camera);
      }
      threeState.current!.reqId = requestAnimationFrame(animate);
    };

    threeState.current.reqId = requestAnimationFrame(animate);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (threeState.current) {
        cancelAnimationFrame(threeState.current.reqId);
        renderer.dispose();
      }
    };
  }, [isRotating]);

  return (
    <div className="w-full flex flex-col lg:flex-row items-center gap-8 py-8">
      {/* 3D Hardware Prototype Render Box */}
      <div className="relative w-full lg:w-1/2 h-[520px] rounded-xl industrial-panel overflow-hidden flex items-center justify-center p-4">
        {/* The 3D Canvas */}
        <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

        {/* Live Overlay HUD inside 3D Phone Screen */}
        <div className="absolute inset-x-12 top-24 bottom-24 pointer-events-none flex flex-col justify-between items-center z-10 text-center select-none">
          <div className="w-full max-w-[220px] bg-[#0d0f14]/85 border border-[#2b313d] rounded-lg p-3 backdrop-blur-md shadow-2xl">
            {selectedApp === 'taht-elbalata' ? (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[10px] font-mono text-[#8c93a0]">
                  <span className="text-[#ff5500] font-bold flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> مشفر بذكاء
                  </span>
                  <span>خزنة رقمية</span>
                </div>
                <div className="text-left font-mono">
                  <div className="text-[10px] text-[#525866]">TOTAL PROTECTED ASSETS</div>
                  <div className="text-lg font-bold text-white tracking-wider">EGP 148,500.00</div>
                </div>
                <div className="h-1.5 w-full bg-[#1e222b] rounded-full overflow-hidden">
                  <div className="h-full bg-[#ff5500] w-[78%] rounded-full" />
                </div>
                <div className="flex justify-between text-[9px] font-mono text-[#8c93a0]">
                  <span>وفرت: 34% هالشهر</span>
                  <span>الهدف: 80%</span>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[10px] font-mono text-[#8c93a0]">
                  <span className="text-[#ff5500] font-bold flex items-center gap-1">
                    <Brain className="w-3 h-3" /> العقل الثاني
                  </span>
                  <span>المزامنة: نشطة</span>
                </div>
                <div className="text-right font-sans">
                  <div className="text-[11px] font-semibold text-white">تجديد استضافة سيرفرات Blotx</div>
                  <div className="text-[9px] font-mono text-[#ff5500]">اليوم - 04:00 عصراً</div>
                </div>
                <div className="border-t border-[#1e222b] pt-1 text-right">
                  <div className="text-[11px] font-semibold text-white">سداد مصاريف الاشتراك الدوري</div>
                  <div className="text-[9px] font-mono text-[#8c93a0]">غداً - متصل مع تحت البلاطة</div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom App Badge */}
          <div className="tactical-tag bg-black/80 px-3 py-1 rounded border border-[#ff5500]/40 text-[#ff5500] text-[9px] tracking-widest">
            {selectedApp === 'taht-elbalata' ? 'TAHT EL BALATA // PROTOCOL' : 'EFTEKER // COGNITIVE ENGINE'}
          </div>
        </div>

        {/* Floating Rotation Control */}
        <button
          onClick={() => {
            audioHaptics.playClick(900);
            setIsRotating(!isRotating);
          }}
          className="absolute bottom-4 right-4 p-2 bg-[#171a22]/90 border border-[#2b313d] hover:border-[#ff5500] rounded text-xs text-[#8c93a0] hover:text-white transition-all flex items-center gap-1.5"
        >
          <RefreshCcw className={`w-3.5 h-3.5 ${isRotating ? 'animate-spin-slow text-[#ff5500]' : ''}`} />
          <span className="tactical-tag">{isRotating ? 'ROTATION: ON' : 'ROTATION: PAUSED'}</span>
        </button>
      </div>

      {/* App Selector & Tactical Information */}
      <div className="w-full lg:w-1/2 space-y-6">
        {/* App Switcher Tabs */}
        <div className="grid grid-cols-2 gap-3 p-1.5 bg-[#12151b] border border-[#222733] rounded-lg">
          <button
            onClick={() => {
              audioHaptics.playRelay();
              setSelectedApp('taht-elbalata');
            }}
            onMouseEnter={() => audioHaptics.playTick()}
            className={`p-4 rounded-md text-right transition-all flex flex-col gap-1.5 ${
              selectedApp === 'taht-elbalata'
                ? 'bg-[#1a1d26] border border-[#ff5500] text-white shadow-lg'
                : 'text-[#8c93a0] hover:text-white hover:bg-[#161920]'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="tactical-tag text-[#ff5500] font-bold">NODE 01</span>
              <ShieldCheck className="w-4 h-4 text-[#ff5500]" />
            </div>
            <h3 className="text-lg font-bold">تحت البلاطة (Taht El Balata)</h3>
            <p className="text-xs text-[#8c93a0] line-clamp-2">
              الحصن المالي المبتكر لإدارة مصاريفك، ادخارك، وحماية أموالك بذكاء بدون تعقيدات البنوك التقليدية.
            </p>
          </button>

          <button
            onClick={() => {
              audioHaptics.playRelay();
              setSelectedApp('efteker');
            }}
            onMouseEnter={() => audioHaptics.playTick()}
            className={`p-4 rounded-md text-right transition-all flex flex-col gap-1.5 ${
              selectedApp === 'efteker'
                ? 'bg-[#1a1d26] border border-[#ff5500] text-white shadow-lg'
                : 'text-[#8c93a0] hover:text-white hover:bg-[#161920]'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="tactical-tag text-[#ff5500] font-bold">NODE 02</span>
              <Brain className="w-4 h-4 text-[#ff5500]" />
            </div>
            <h3 className="text-lg font-bold">افتكر (Efteker)</h3>
            <p className="text-xs text-[#8c93a0] line-clamp-2">
              عقلك الثاني لحفظ الأولويات، تخليد اللحظات، وإلغاء التشتت الذهني بحسابات زمنية وسياقية دقيقة.
            </p>
          </button>
        </div>

        {/* Detailed Specs for Selected App */}
        {selectedApp === 'taht-elbalata' ? (
          <div className="space-y-4 industrial-panel p-6 rounded-lg">
            <div className="flex items-center justify-between border-b border-[#232832] pb-3">
              <div>
                <span className="tactical-tag text-[#ff5500]">FINANCIAL FORTRESS SPECIFICATION</span>
                <h4 className="text-xl font-bold text-white mt-0.5">سد ثغرة الأمان المالي اليومي</h4>
              </div>
              <span className="px-2.5 py-1 bg-[#ff5500]/10 border border-[#ff5500]/30 text-[#ff5500] text-xs font-mono rounded">
                v2.4 STABLE
              </span>
            </div>

            <p className="text-sm text-[#8c93a0] leading-relaxed">
              ليه سميناه "تحت البلاطة"؟ لأن الأجداد كان عندهم مفهوم أصيل للأمان والادخار الخالص. احنا أخدنا المفهوم ده وحولناه لنظام تكنولوجي فائق الدقة، يرصد مصاريفك، يكتشف التسريبات المالية غير المرئية، ويبني لك احتياطي نقدي حقيقي يحميك في الأوقات الصعبة.
            </p>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 bg-[#0a0c10] border border-[#1f242e] rounded">
                <div className="text-[10px] font-mono text-[#525866]">PRIVACY PROTOCOL</div>
                <div className="text-sm font-semibold text-white mt-1">تشفير محلي 100% بدون تجسس</div>
              </div>
              <div className="p-3 bg-[#0a0c10] border border-[#1f242e] rounded">
                <div className="text-[10px] font-mono text-[#525866]">ZERO FRICTION INPUT</div>
                <div className="text-sm font-semibold text-white mt-1">تسجيل المعاملة في أقل من ثانية</div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2 text-xs text-[#8c93a0] font-mono">
                <Zap className="w-3.5 h-3.5 text-[#ff5500]" />
                <span>يرتبط تلقائياً بتطبيق افتكر للتنبيهات المالية</span>
              </div>
              <button
                onClick={() => audioHaptics.playClick(1400)}
                className="flex items-center gap-1 text-xs font-mono text-[#ff5500] hover:underline"
              >
                <span>استكشف المواصفات</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4 industrial-panel p-6 rounded-lg">
            <div className="flex items-center justify-between border-b border-[#232832] pb-3">
              <div>
                <span className="tactical-tag text-[#ff5500]">COGNITIVE ARCHITECTURE SPECIFICATION</span>
                <h4 className="text-xl font-bold text-white mt-0.5">سد ثغرة التشتت وضياع الوقت</h4>
              </div>
              <span className="px-2.5 py-1 bg-[#ff5500]/10 border border-[#ff5500]/30 text-[#ff5500] text-xs font-mono rounded">
                v1.8 RELEASE
              </span>
            </div>

            <p className="text-sm text-[#8c93a0] leading-relaxed">
              الإنسان العصري مخه مجهد بآلاف التفاصيل والمهام والالتزامات المبعثرة. تطبيق "افتكر" اتصمم ليكون ذاكرتك الخارجية التي لا تنسى؛ يلتقط أفكارك ومواعيدك ومهامك في لحظة حدوثها، ويعيد تذكيرك بها في الوقت المناسب بالضبط وبالسياق السليم.
            </p>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 bg-[#0a0c10] border border-[#1f242e] rounded">
                <div className="text-[10px] font-mono text-[#525866]">CONTEXT AWARENESS</div>
                <div className="text-sm font-semibold text-white mt-1">تنبيهات سياقية ذكية للمهام</div>
              </div>
              <div className="p-3 bg-[#0a0c10] border border-[#1f242e] rounded">
                <div className="text-[10px] font-mono text-[#525866]">CROSS-ECOSYSTEM SYNC</div>
                <div className="text-sm font-semibold text-white mt-1">مزامنة تامة مع تحت البلاطة</div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2 text-xs text-[#8c93a0] font-mono">
                <Zap className="w-3.5 h-3.5 text-[#ff5500]" />
                <span>يدعم التدوين الصوتي والتقاط الأفكار الفوري</span>
              </div>
              <button
                onClick={() => audioHaptics.playClick(1400)}
                className="flex items-center gap-1 text-xs font-mono text-[#ff5500] hover:underline"
              >
                <span>استكشف المواصفات</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
