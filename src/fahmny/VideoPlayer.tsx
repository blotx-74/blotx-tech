import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react';

export interface VideoSource {
  src: string;
  poster?: string;
  captions?: string; // ملف .vtt بالعربي
}

interface Props extends VideoSource {
  title: string;
  next?: { title: string; onGo: () => void };
}

const RATES = [0.75, 1, 1.25, 1.5, 2];
const fmt = (s: number) => {
  if (!isFinite(s)) return '0:00';
  const m = Math.floor(s / 60);
  return `${m}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
};
const posKey = (src: string) => `fh_pos_${src}`;

type FsEl = HTMLElement & { webkitRequestFullscreen?: () => void };
type FsVideo = HTMLVideoElement & { webkitEnterFullscreen?: () => void };

export function VideoPlayer({ src, poster, captions, title, next }: Props) {
  const wrap = useRef<HTMLDivElement>(null);
  const vid = useRef<HTMLVideoElement>(null);
  const hideTimer = useRef<number>(0);
  const lastSave = useRef(0);

  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const [time, setTime] = useState(0);
  const [dur, setDur] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const [muted, setMuted] = useState(false);
  const [rate, setRate] = useState(1);
  const [cc, setCc] = useState(false);
  const [ended, setEnded] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const [error, setError] = useState(false);
  const [ctl, setCtl] = useState(true);
  const [ratio, setRatio] = useState(9 / 16);
  const [full, setFull] = useState(false);
  const [toast, setToast] = useState('');
  const toastTimer = useRef<number>(0);

  useEffect(() => () => { clearTimeout(hideTimer.current); clearTimeout(toastTimer.current); }, []);

  useEffect(() => {
    const onFs = () => setFull(document.fullscreenElement === wrap.current);
    document.addEventListener('fullscreenchange', onFs);
    return () => document.removeEventListener('fullscreenchange', onFs);
  }, []);

  const say = (t: string) => {
    setToast(t);
    clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(''), 900);
  };

  const poke = useCallback(() => {
    setCtl(true);
    clearTimeout(hideTimer.current);
    hideTimer.current = window.setTimeout(() => {
      if (vid.current && !vid.current.paused) setCtl(false);
    }, 2600);
  }, []);

  const toggle = useCallback(() => {
    const v = vid.current;
    if (!v) return;
    if (v.ended) v.currentTime = 0;
    if (v.paused) v.play().catch(() => setError(true));
    else v.pause();
    poke();
  }, [poke]);

  const seekBy = (d: number) => {
    const v = vid.current;
    if (!v) return;
    v.currentTime = Math.max(0, Math.min(v.duration || 0, v.currentTime + d));
    say(d > 0 ? `+${d} ث ⏩` : `⏪ ${d} ث`);
    poke();
  };

  const toggleMute = () => {
    const v = vid.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    poke();
  };

  const cycleRate = () => {
    const v = vid.current;
    if (!v) return;
    const r = RATES[(RATES.indexOf(rate) + 1) % RATES.length];
    v.playbackRate = r;
    setRate(r);
    say(`السرعة ${r}x`);
    poke();
  };

  const toggleCc = () => {
    const v = vid.current;
    if (!v?.textTracks[0]) return;
    const on = !cc;
    v.textTracks[0].mode = on ? 'showing' : 'hidden';
    setCc(on);
    say(on ? 'الترجمة شغالة' : 'الترجمة مقفولة');
    poke();
  };

  const toggleFull = () => {
    const w = wrap.current as FsEl | null;
    const v = vid.current as FsVideo | null;
    if (!w || !v) return;
    if (document.fullscreenElement) document.exitFullscreen();
    else if (w.requestFullscreen) w.requestFullscreen().catch(() => undefined);
    else if (v.webkitEnterFullscreen) v.webkitEnterFullscreen(); // iPhone
  };

  /* السحب على شريط التقدّم */
  const bar = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const seekTo = (e: PointerEvent) => {
    const v = vid.current;
    const r = bar.current?.getBoundingClientRect();
    if (!v || !r || !v.duration) return;
    const p = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width));
    v.currentTime = p * v.duration;
    setTime(v.currentTime);
  };
  const onDown = (e: PointerEvent) => {
    dragging.current = true;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    seekTo(e);
    poke();
  };
  const onMove = (e: PointerEvent) => { if (dragging.current) seekTo(e); };
  const onUp = () => { dragging.current = false; };

  const onKey = (e: KeyboardEvent) => {
    const k = e.key.toLowerCase();
    if (k === ' ' || k === 'k') toggle();
    else if (k === 'arrowright') seekBy(5);
    else if (k === 'arrowleft') seekBy(-5);
    else if (k === 'm') toggleMute();
    else if (k === 'f') toggleFull();
    else if (k === 'c') toggleCc();
    else return;
    e.preventDefault();
  };

  // بيشتغل من onLoadedMetadata/onDurationChange ومن الـ ref (لو الميتاداتا وصلت قبل ما React يربط الـ handlers)
  const init = (v: HTMLVideoElement) => {
    if (!isFinite(v.duration) || !v.duration) return;
    setDur(v.duration);
    if (v.videoWidth && v.videoHeight) setRatio(v.videoWidth / v.videoHeight);
    if (v.textTracks[0] && v.textTracks[0].mode === 'disabled') v.textTracks[0].mode = 'hidden';
    if (v.currentTime > 0) return;
    try {
      const p = parseFloat(localStorage.getItem(posKey(src)) || '0');
      if (p > 3 && p < v.duration - 3) v.currentTime = p;
    } catch { /* ignore */ }
  };
  const setVid = (node: HTMLVideoElement | null) => {
    vid.current = node;
    if (node && node.readyState >= 1) init(node);
  };

  const pct = dur ? (time / dur) * 100 : 0;

  return (
    <div
      ref={wrap}
      className={`fhp ${ctl || !playing ? 'show' : ''} ${full ? 'full' : ''}`}
      style={{ aspectRatio: String(ratio) }}
      dir="ltr"
      tabIndex={0}
      onKeyDown={onKey}
      onMouseMove={poke}
      onTouchStart={poke}
      role="region"
      aria-label={`مشغّل الفيديو: ${title}`}
    >
      <video
        ref={setVid}
        src={src}
        poster={poster}
        playsInline
        preload="metadata"
        onClick={toggle}
        onLoadedMetadata={(e) => init(e.currentTarget)}
        onDurationChange={(e) => init(e.currentTarget)}
        onTimeUpdate={(e) => {
          const v = e.currentTarget;
          if (!dragging.current) setTime(v.currentTime);
          if (v.buffered.length) setBuffered(v.buffered.end(v.buffered.length - 1));
          const now = Date.now();
          if (now - lastSave.current > 2000) {
            lastSave.current = now;
            try { localStorage.setItem(posKey(src), String(v.currentTime)); } catch { /* ignore */ }
          }
        }}
        onPlay={() => { setPlaying(true); setStarted(true); setEnded(false); }}
        onPause={() => setPlaying(false)}
        onWaiting={() => setWaiting(true)}
        onPlaying={() => setWaiting(false)}
        onCanPlay={() => setWaiting(false)}
        onEnded={() => {
          setEnded(true);
          setPlaying(false);
          try { localStorage.removeItem(posKey(src)); } catch { /* ignore */ }
        }}
        onError={() => setError(true)}
      >
        {captions && <track kind="subtitles" srcLang="ar" label="عربي" src={captions} />}
      </video>

      {error && (
        <div className="fhp-overlay">
          <span className="fhp-emoji">😵</span>
          <p>الفيديو مش راضي يشتغل.<br />جرّب تعمل ريفريش.</p>
        </div>
      )}

      {!started && !error && (
        <button className="fhp-big" onClick={toggle} aria-label="شغّل الحلقة">
          <span className="fhp-tri" />
          <b className="fh-display">شغّل الحلقة</b>
        </button>
      )}

      {waiting && playing && <div className="fhp-spin" aria-label="جاري التحميل" />}
      {toast && <div className="fhp-toast">{toast}</div>}

      {ended && (
        <div className="fhp-overlay">
          <span className="fhp-emoji">🎉</span>
          <h4 className="fh-display">خلصت الحلقة!</h4>
          <div className="fhp-actions">
            <button className="fh-btn sm" onClick={toggle}>↺ شوف تاني</button>
            {next && <button className="fh-btn sm ghost" onClick={next.onGo}>الحلقة اللي بعدها ←</button>}
          </div>
          {next && <small>{next.title}</small>}
        </div>
      )}

      <div className="fhp-ctl" onClick={(e) => e.stopPropagation()}>
        <div
          ref={bar}
          className="fhp-bar"
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
          role="slider"
          aria-label="التقدّم"
          aria-valuemin={0}
          aria-valuemax={Math.round(dur)}
          aria-valuenow={Math.round(time)}
        >
          <i className="buf" style={{ width: `${dur ? (buffered / dur) * 100 : 0}%` }} />
          <i className="fill" style={{ width: `${pct}%` }} />
          <b className="thumb" style={{ left: `${pct}%` }} />
        </div>
        <div className="fhp-row">
          <button className="fhp-btn" onClick={toggle} aria-label={playing ? 'إيقاف' : 'تشغيل'}>{playing ? '❚❚' : '▶'}</button>
          <button className="fhp-btn seek" onClick={() => seekBy(-5)} aria-label="رجوع 5 ثواني">⏪</button>
          <button className="fhp-btn seek" onClick={() => seekBy(5)} aria-label="تقديم 5 ثواني">⏩</button>
          <span className="fhp-time">{fmt(time)} / {fmt(dur)}</span>
          <span className="fhp-sp" />
          {captions && <button className={`fhp-btn txt ${cc ? 'on' : ''}`} onClick={toggleCc} aria-pressed={cc}>CC</button>}
          <button className="fhp-btn txt" onClick={cycleRate} aria-label="السرعة">{rate}x</button>
          <button className="fhp-btn" onClick={toggleMute} aria-label={muted ? 'تشغيل الصوت' : 'كتم الصوت'}>{muted ? '🔇' : '🔊'}</button>
          <button className="fhp-btn" onClick={toggleFull} aria-label="ملء الشاشة">{full ? '⤡' : '⤢'}</button>
        </div>
      </div>
    </div>
  );
}
