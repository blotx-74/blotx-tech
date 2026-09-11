import { useState, type FC } from 'react';
import { audioHaptics } from '../../utils/audioHaptics';
import { Terminal, Send, CheckCircle2, Shield } from 'lucide-react';

export const TacticalFooter: FC = () => {
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalOutput, setTerminalOutput] = useState<string[]>([
    'BLOTX OS v2.6 // TERMINAL ACTIVE',
    'Type "apps", "philosophy", "manifesto", or "contact" to execute telemetry.',
  ]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!terminalInput.trim()) return;

    audioHaptics.playClick(1000);
    const cmd = terminalInput.trim().toLowerCase();
    const newLogs = [...terminalOutput, `> ${terminalInput}`];

    switch (cmd) {
      case 'apps':
        newLogs.push('ACTIVE NODES:');
        newLogs.push('1. [تحت البلاطة] — Financial Fortification & Wealth Guardian.');
        newLogs.push('2. [افتكر] — Cognitive Architecture & Daily Priority Keeper.');
        break;
      case 'philosophy':
        newLogs.push('PHILOSOPHY:');
        newLogs.push('We observe what humans lack in their daily lives and engineer precision solutions.');
        newLogs.push('Blotx Tech is not software. It is an intentional lifestyle.');
        break;
      case 'manifesto':
        newLogs.push('CREDO: Built for humans, prototyped with hardware-grade precision.');
        break;
      case 'contact':
        newLogs.push('COMMUNICATION FREQUENCY:');
        newLogs.push('Email: dispatch@blotx.tech');
        newLogs.push('Base Station: Cairo, Egypt // Earth');
        break;
      case 'clear':
        setTerminalOutput(['BLOTX OS v2.6 // TERMINAL CLEARED']);
        setTerminalInput('');
        return;
      default:
        newLogs.push(`Command not recognized: "${cmd}". Available: apps, philosophy, manifesto, contact, clear.`);
    }

    setTerminalOutput(newLogs);
    setTerminalInput('');
  };

  return (
    <footer id="terminal" className="border-t border-[#1c202a] bg-[#07080a] pt-16 pb-12 relative overflow-hidden">
      {/* Background Micro Grid */}
      <div className="absolute inset-0 cad-grid-bg opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Interactive Tactical Command Console */}
        <div className="industrial-panel p-6 rounded-2xl border border-[#232936] bg-[#0c0e14] mb-16 shadow-2xl">
          <div className="flex items-center justify-between border-b border-[#1f2532] pb-3 mb-4">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-[#ff5500]" />
              <span className="tactical-tag text-[#ff5500] font-bold">BLOTX SYSTEM TERMINAL</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#202530]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#202530]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5500]" />
            </div>
          </div>

          {/* Terminal Console Output */}
          <div className="font-mono text-xs text-[#8c93a0] space-y-1.5 h-36 overflow-y-auto pr-2 mb-4">
            {terminalOutput.map((line, idx) => (
              <div
                key={idx}
                className={
                  line.startsWith('>')
                    ? 'text-white font-bold'
                    : line.startsWith('BLOTX')
                    ? 'text-[#ff5500]'
                    : 'text-[#8c93a0]'
                }
              >
                {line}
              </div>
            ))}
          </div>

          {/* Quick Telemetry Chips */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="text-[10px] font-mono text-[#525866]">QUICK TELEMETRY:</span>
            {['apps', 'philosophy', 'manifesto', 'contact', 'clear'].map((cmd) => (
              <button
                key={cmd}
                type="button"
                onClick={() => {
                  audioHaptics.playClick(1200);
                  setTerminalInput(cmd);
                }}
                className="px-2 py-0.5 rounded bg-[#161a22] hover:bg-[#ff5500] hover:text-black border border-[#272e3c] text-[10px] font-mono text-[#8c93a0] transition-colors"
              >
                ${cmd}
              </button>
            ))}
          </div>

          {/* Command Input Form */}
          <form onSubmit={handleCommand} className="flex items-center gap-2">
            <span className="text-[#ff5500] font-mono text-sm">&gt;</span>
            <input
              type="text"
              value={terminalInput}
              onChange={(e) => setTerminalInput(e.target.value)}
              placeholder="اكتب أمراً هنا (مثلاً: apps أو philosophy)..."
              className="flex-1 bg-[#12151b] border border-[#242a36] focus:border-[#ff5500] rounded-lg px-3 py-2 text-xs font-mono text-white focus:outline-none transition-colors"
            />
            <button
              type="submit"
              className="p-2 rounded-lg bg-[#ff5500] hover:bg-[#e04b00] text-black transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-[#1c202a]">
          {/* Col 1: Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded bg-[#161a22] border border-[#2b3342] flex items-center justify-center">
                <div className="w-3 h-3 bg-[#ff5500] rounded-sm" />
              </div>
              <span className="font-mono font-black text-white text-base tracking-wider">BLOTX TECH</span>
            </div>
            <p className="text-xs text-[#8c93a0] leading-relaxed">
              هندسة أسلوب حياة، وسد احتياجات الإنسان اليومية بأدوات وإيكوسيستم فائق الدقة.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-[#525866]">
              <Shield className="w-3.5 h-3.5 text-[#ff5500]" />
              <span>HARDWARE-GRADE DISCIPLINE</span>
            </div>
          </div>

          {/* Col 2: Active Apps */}
          <div className="space-y-2 font-mono text-xs">
            <div className="tactical-tag text-white font-bold mb-3">المنتجات النشطة</div>
            <div>
              <a
                href="#ecosystem"
                onClick={() => audioHaptics.playClick()}
                className="text-[#8c93a0] hover:text-[#ff5500] transition-colors block py-1"
              >
                // تحت البلاطة (Taht El Balata)
              </a>
              <span className="text-[10px] text-[#525866]">إدارة الثروة وحماية الأصول</span>
            </div>
            <div className="pt-2">
              <a
                href="#ecosystem"
                onClick={() => audioHaptics.playClick()}
                className="text-[#8c93a0] hover:text-[#ff5500] transition-colors block py-1"
              >
                // افتكر (Efteker)
              </a>
              <span className="text-[10px] text-[#525866]">العقل الثاني وحارس الذاكرة</span>
            </div>
          </div>

          {/* Col 3: Research Pipeline */}
          <div className="space-y-2 font-mono text-xs">
            <div className="tactical-tag text-white font-bold mb-3">مشاريع قيد التطوير</div>
            <div className="text-[#8c93a0] py-1">// شباك (Shebbak) — تواصل إنساني هادئ</div>
            <div className="text-[#8c93a0] py-1">// المسطرة (El-Mastara) — ضبط العادات</div>
            <div className="text-[#8c93a0] py-1">// الكبسولة (El-Capsule) — التشفير الحياتي</div>
          </div>

          {/* Col 4: Systems Spec */}
          <div className="space-y-2 font-mono text-xs">
            <div className="tactical-tag text-white font-bold mb-3">مواصفات النظام</div>
            <div className="flex justify-between text-[#8c93a0] py-1">
              <span>SYSTEM:</span>
              <span className="text-white">BLOTX-CORE-2026</span>
            </div>
            <div className="flex justify-between text-[#8c93a0] py-1">
              <span>SECURITY:</span>
              <span className="text-[#ff5500]">ZERO-KNOWLEDGE</span>
            </div>
            <div className="flex justify-between text-[#8c93a0] py-1">
              <span>DEPLOYMENT:</span>
              <span className="text-white">EDGE DISTRIBUTED</span>
            </div>
          </div>
        </div>

        {/* Copyright & Coordinates */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs font-mono text-[#525866] gap-4">
          <div>
            © 2026 BLOTX TECH LABS. صُنع بعناية وشغف لخدمة الإنسان وأسلوب الحياة.
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[#8c93a0]">30°02'40.0"N 31°14'08.5"E</span>
            <span>•</span>
            <span className="text-[#ff5500] flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> VERIFIED DEPLOYMENT
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
