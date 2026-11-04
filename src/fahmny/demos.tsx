import { useEffect, useRef, useState } from 'react';
import type { Episode } from './data';

/* ───── 1) API: الجرسون بين الزبون والمطبخ ───── */
const dishes = [
  { id: 'koshary', label: 'كشري 🍝' },
  { id: 'falafel', label: 'فلافل 🧆' },
  { id: 'tea', label: 'شاي 🍵' },
];

function ApiDemo() {
  const [step, setStep] = useState(-1); // -1 جاهز، 0 طلب، 1 مطبخ، 2 رد
  const [dish, setDish] = useState(dishes[0]);
  const timers = useRef<number[]>([]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const order = (d: (typeof dishes)[number]) => {
    timers.current.forEach(clearTimeout);
    setDish(d);
    setStep(0);
    timers.current = [
      window.setTimeout(() => setStep(1), 900),
      window.setTimeout(() => setStep(2), 1900),
    ];
  };

  const actors = [
    { e: '🧑', t: 'إنت (التطبيق)', on: step === 0 || step === 2 },
    { e: '🛎️', t: 'الجرسون (API)', on: step >= 0 },
    { e: '👨‍🍳', t: 'المطبخ (السيرفر)', on: step === 1 },
  ];
  return (
    <>
      <p className="fh-demo-hint">اطلب أكلة وشوف الـ API بيعمل إيه:</p>
      <div className="fh-chips">
        {dishes.map((d) => (
          <button key={d.id} className={`fh-chip ${step >= 0 && dish.id === d.id ? 'on' : ''}`} onClick={() => order(d)}>
            {d.label}
          </button>
        ))}
      </div>
      <div className="fh-actors">
        {actors.map((a) => (
          <div key={a.t} className={`fh-actor ${a.on ? 'on' : ''}`}>
            <span>{a.e}</span>
            <small>{a.t}</small>
          </div>
        ))}
      </div>
      <pre className="fh-code" dir="ltr">
        {step < 0 && '// اضغط على أكلة...'}
        {step === 0 && `→ GET /order?item=${dish.id}`}
        {step === 1 && '… المطبخ بيجهّز'}
        {step === 2 && `← 200 OK\n{ "item": "${dish.id}", "status": "ready" }`}
      </pre>
    </>
  );
}

/* ───── 2) AI: توقّع الكلمة اللي بعدها ───── */
const tree: Record<string, [string, number][]> = {
  '': [['أنا', 50], ['الذكاء', 30], ['الجو', 20]],
  أنا: [['بحب', 60], ['عايز', 30], ['رايح', 10]],
  بحب: [['البرمجة', 45], ['القهوة', 35], ['الكورة', 20]],
  عايز: [['أتعلم', 55], ['أنام', 30], ['أشتغل', 15]],
  رايح: [['الشغل', 50], ['الجيم', 30], ['النادي', 20]],
  الذكاء: [['الاصطناعي', 85], ['الأخضر', 10], ['العاطفي', 5]],
  الجو: [['حر', 50], ['جميل', 30], ['بارد', 20]],
};

function AiDemo() {
  const [words, setWords] = useState<string[]>([]);
  const last = words[words.length - 1] ?? '';
  const options = tree[last];
  return (
    <>
      <p className="fh-demo-hint">كوّن جملة بإنك تختار الكلمة اللي بعدها، زي ما النموذج بيعمل:</p>
      <div className="fh-sentence">{words.length ? words.join(' ') : '…'}</div>
      {options ? (
        <div className="fh-opts">
          {options.map(([w, p]) => (
            <button key={w} className="fh-opt fh-prob" onClick={() => setWords((s) => [...s, w])}>
              <i style={{ width: `${p}%` }} />
              <span>{w}</span>
              <b>{p}٪</b>
            </button>
          ))}
        </div>
      ) : (
        <p className="fh-score">خلصت الجملة! النموذج بيعمل كده بس بملايين الاحتمالات ✨</p>
      )}
      <button className="fh-btn sm ghost" style={{ marginTop: 14 }} onClick={() => setWords([])}>↺ ابدأ من الأول</button>
    </>
  );
}

/* ───── 3) 2FA: كود بيتغيّر كل 10 ثواني ───── */
const TTL = 10;
// الكود بيتولّد من الوقت (زي TOTP الحقيقي): نفس الـ 10 ثواني = نفس الكود
const codeAt = (now: number) => {
  const slot = Math.floor(now / 1000 / TTL);
  return String((Math.imul(slot, 2654435761) >>> 0) % 900000 + 100000);
};

function TwoFADemo() {
  const [pw, setPw] = useState(false);
  const [now, setNow] = useState(() => Date.now());
  const [input, setInput] = useState('');
  const [res, setRes] = useState<'' | 'ok' | 'bad'>('');

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 500);
    return () => clearInterval(id);
  }, []);

  const code = codeAt(now);
  const left = TTL - (Math.floor(now / 1000) % TTL);

  return (
    <>
      <p className="fh-demo-hint">الخطوة 1: الباسورد. الخطوة 2: الكود من موبايلك.</p>
      <div className="fh-2fa">
        <div className="fh-phone-mini">
          <small>📱 تطبيق المصادقة</small>
          <b dir="ltr">{code.slice(0, 3)} {code.slice(3)}</b>
          <div className="fh-bar"><i style={{ width: `${(left / TTL) * 100}%` }} /></div>
          <small>بيتغيّر بعد {left} ث</small>
        </div>
        <div className="fh-2fa-form">
          {!pw ? (
            <>
              <input className="fh-search" type="password" defaultValue="••••••••" readOnly aria-label="الباسورد" />
              <button className="fh-btn sm" onClick={() => setPw(true)}>دخول بالباسورد</button>
              <small>تخيّل إن المخترق سرق الباسورد وعدّى الخطوة دي 😈</small>
            </>
          ) : (
            <>
              <input
                className="fh-search" dir="ltr" inputMode="numeric" maxLength={6} placeholder="اكتب الكود الـ 6 أرقام"
                value={input} onChange={(e) => { setInput(e.target.value.replace(/\D/g, '')); setRes(''); }}
              />
              <button className="fh-btn sm" onClick={() => setRes(input === code ? 'ok' : 'bad')}>تأكيد</button>
              {res === 'ok' && <p className="fh-score">✅ دخلت! الكود صح</p>}
              {res === 'bad' && <p className="fh-bad">❌ الكود غلط أو انتهى. المخترق مش معاه موبايلك فهيقف هنا.</p>}
            </>
          )}
        </div>
      </div>
    </>
  );
}

/* ───── 4) Binary: اسمك بالأصفار والواحدات ───── */
function BinaryDemo() {
  const [text, setText] = useState('Ziad');
  const chars = [...text].slice(0, 12);
  return (
    <>
      <p className="fh-demo-hint">اكتب أي كلمة وشوف الكمبيوتر بيشوفها إزاي:</p>
      <input className="fh-search" dir="ltr" value={text} maxLength={12} onChange={(e) => setText(e.target.value)} aria-label="النص" />
      <div className="fh-bits" dir="ltr">
        {chars.map((c, i) => (
          <div key={i}>
            <b>{c}</b>
            <code>
              {c.charCodeAt(0).toString(2).padStart(c.charCodeAt(0) > 255 ? 16 : 8, '0').split('').map((bit, j) => (
                <span key={j} className={bit === '1' ? 'one' : ''}>{bit}</span>
              ))}
            </code>
          </div>
        ))}
      </div>
    </>
  );
}

export function Demo({ ep }: { ep: Episode }) {
  if (!ep.demo) return null;
  const body = { api: <ApiDemo />, ai: <AiDemo />, '2fa': <TwoFADemo />, binary: <BinaryDemo /> }[ep.demo];
  return (
    <div className="fh-box fh-demo">
      <h4 className="fh-display">🧪 جرّب بنفسك</h4>
      {body}
    </div>
  );
}
