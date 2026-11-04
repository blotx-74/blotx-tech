import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import './admin.css';
import { categories, type Content, type Episode, type LearnPath, type QuizQ, type Term } from '../data';
import {
  DEFAULT_REPO, clearCfg, loadCfg, loadContent, publish, saveCfg, verify,
  type GhConfig, type PendingFile,
} from './github';

const VIDEO_DIR = 'fahmny/videos';
const MAX_MB = 90;
const WARN_MB = 25;
const today = () => new Date().toISOString().slice(0, 10);
const mb = (n: number) => (n / 1048576).toFixed(1);
const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

/** بيطلّع مدة الفيديو وصورة غلاف من أول ثانية، من الملف نفسه (من غير رفع) */
function readVideo(file: File): Promise<{ minutes: number; poster: Blob | null }> {
  return new Promise((resolve) => {
    const url = URL.createObjectURL(file);
    const v = document.createElement('video');
    v.muted = true;
    v.preload = 'metadata';
    v.playsInline = true;
    const done = (poster: Blob | null) => {
      const minutes = isFinite(v.duration) ? Math.round((v.duration / 60) * 10) / 10 : 0;
      URL.revokeObjectURL(url);
      resolve({ minutes, poster });
    };
    v.onerror = () => done(null);
    v.onloadedmetadata = () => { v.currentTime = Math.min(1, (v.duration || 2) / 2); };
    v.onseeked = () => {
      try {
        const c = document.createElement('canvas');
        const w = Math.min(480, v.videoWidth || 480);
        c.width = w;
        c.height = Math.round((w / (v.videoWidth || 9)) * (v.videoHeight || 16));
        c.getContext('2d')?.drawImage(v, 0, 0, c.width, c.height);
        c.toBlob((b) => done(b), 'image/jpeg', 0.8);
      } catch { done(null); }
    };
    v.src = url;
  });
}

type Staged = Map<string, Blob>; // مسار الملف في الريبو -> الملف

const videoPaths = (e: Episode) =>
  [e.video?.src, e.video?.poster, e.video?.captions]
    .filter((p): p is string => !!p && p.startsWith(`/${VIDEO_DIR}/`))
    .map((p) => `public${p}`);
const repoFilesOf = (c: Content) => new Set(c.episodes.flatMap(videoPaths));

/* ───────────────────────── Login ───────────────────────── */
function Login({ onDone }: { onDone: (c: GhConfig) => void }) {
  const [token, setToken] = useState('');
  const [repo, setRepo] = useState(DEFAULT_REPO);
  const [branch, setBranch] = useState('main');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');

  const go = async () => {
    setBusy(true);
    setErr('');
    const cfg: GhConfig = { token: token.trim(), repo: repo.trim(), branch: branch.trim() };
    try {
      await verify(cfg);
      saveCfg(cfg);
      onDone(cfg);
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'حصل خطأ');
    }
    setBusy(false);
  };

  return (
    <div className="fh-wrap fha">
      <div className="fh-page-title">
        <h1 className="fh-display">لوحة <span>التحكم</span></h1>
        <p>أضف حلقاتك ومحتواك من هنا، من غير كود.</p>
      </div>
      <div className="fh-box">
        <h4 className="fh-display">دخول (مرة واحدة بس)</h4>
        <ol className="fha-steps">
          <li>افتح <a href="https://github.com/settings/personal-access-tokens/new" target="_blank" rel="noopener noreferrer">صفحة إنشاء التوكن ↗</a> (إنت لازم تكون مسجل دخول على GitHub).</li>
          <li>الاسم: <b>fahmny-admin</b>، المدة: اختار اللي يريحك (مثلًا 90 يوم).</li>
          <li><b>Repository access</b> ← Only select repositories ← اختار <b>blotx-tech</b>.</li>
          <li><b>Permissions</b> ← Repository permissions ← <b>Contents</b> ← <b>Read and write</b>.</li>
          <li>اضغط Generate token وانسخه والصقه تحت. التوكن بيتحفظ على متصفحك إنت بس.</li>
        </ol>
        <label className="fha-l">التوكن</label>
        <input className="fh-in" dir="ltr" type="password" placeholder="github_pat_..." value={token} onChange={(e) => setToken(e.target.value)} />
        <div className="fha-2">
          <div><label className="fha-l">الريبو</label><input className="fh-in" dir="ltr" value={repo} onChange={(e) => setRepo(e.target.value)} /></div>
          <div><label className="fha-l">البرانش</label><input className="fh-in" dir="ltr" value={branch} onChange={(e) => setBranch(e.target.value)} /></div>
        </div>
        {err && <p className="fh-bad">❌ {err}</p>}
        <button className="fh-btn" disabled={busy || !token} onClick={go}>{busy ? 'بتأكد...' : 'ادخل'}</button>
      </div>
    </div>
  );
}

/* ───────────────────────── Episode form ───────────────────────── */
const blankQuiz = (): QuizQ => ({ q: '', options: ['', '', ''], answer: 0 });

function EpisodeForm({
  ep, isNew, glossary, existing, onCancel, onSave,
}: {
  ep: Episode;
  isNew: boolean;
  glossary: Term[];
  existing: string[];
  onCancel: () => void;
  onSave: (e: Episode, files: PendingFile[]) => void;
}) {
  const [d, setD] = useState<Episode>(ep);
  const [pointsText, setPointsText] = useState(ep.points.join('\n'));
  const [vFile, setVFile] = useState<File | null>(null);
  const [poster, setPoster] = useState<Blob | null>(null);
  const [posterFile, setPosterFile] = useState<File | null>(null);
  const [vtt, setVtt] = useState<File | null>(null);
  const [err, setErr] = useState('');
  const set = <K extends keyof Episode>(k: K, v: Episode[K]) => setD((p) => ({ ...p, [k]: v }));

  const pickVideo = async (f: File | null) => {
    setVFile(f);
    if (!f) return;
    const m = await readVideo(f);
    setPoster(m.poster);
    if (m.minutes) set('minutes', m.minutes);
  };

  const setQ = (i: number, fn: (q: QuizQ) => QuizQ) => set('quiz', d.quiz.map((q, j) => (j === i ? fn(q) : q)));

  const save = () => {
    const points = pointsText.split('\n').map((s) => s.trim()).filter(Boolean);
    const slug = d.slug.trim();
    if (!d.title.trim()) return setErr('اكتب عنوان الحلقة');
    if (!/^[a-z0-9][a-z0-9-]*$/.test(slug)) return setErr('الـ slug لازم حروف إنجليزي صغيرة وأرقام وشرطة');
    if (isNew && existing.includes(slug)) return setErr('الـ slug ده مستخدم قبل كده');
    if (!points.length) return setErr('اكتب نقطة واحدة على الأقل في الخلاصة');
    if (!vFile && !d.video && !d.fbUrl.trim()) return setErr('اختار فيديو أو حط لينك فيسبوك');
    if (vFile && vFile.size > MAX_MB * 1048576) return setErr(`الفيديو أكبر من ${MAX_MB}MB. اضغطه الأول (شوف الشرح تحت)`);
    for (const q of d.quiz) {
      if (!q.q.trim() || q.options.some((o) => !o.trim())) return setErr('كمّل أسئلة الكويز أو امسحها');
    }
    const files: PendingFile[] = [];
    const out: Episode = { ...d, slug, title: d.title.trim(), hook: d.hook.trim(), points };
    if (vFile || vtt || posterFile) {
      const video = { ...(d.video ?? { src: '' }) } as NonNullable<Episode['video']>;
      if (vFile) {
        video.src = `/${VIDEO_DIR}/${slug}.mp4`;
        files.push({ path: `public${video.src}`, blob: vFile });
        const pb = posterFile ?? poster;
        if (pb) { video.poster = `/${VIDEO_DIR}/${slug}.jpg`; files.push({ path: `public${video.poster}`, blob: pb }); }
      } else if (posterFile) {
        video.poster = `/${VIDEO_DIR}/${slug}.jpg`;
        files.push({ path: `public${video.poster}`, blob: posterFile });
      }
      if (vtt) { video.captions = `/${VIDEO_DIR}/${slug}.vtt`; files.push({ path: `public${video.captions}`, blob: vtt }); }
      out.video = video;
    }
    if (!out.demo) delete out.demo;
    if (!out.terms?.length) delete out.terms;
    onSave(out, files);
  };

  return (
    <div className="fh-box fha">
      <h4 className="fh-display">{isNew ? 'حلقة جديدة' : 'تعديل الحلقة'}</h4>

      <label className="fha-l">عنوان الحلقة</label>
      <input className="fh-in" value={d.title} onChange={(e) => set('title', e.target.value)} placeholder="يعني إيه Cloud؟" />

      <label className="fha-l">الجملة اللي تشدّ الناس (hook)</label>
      <input className="fh-in" value={d.hook} onChange={(e) => set('hook', e.target.value)} placeholder="الكلاود مش سحابة، دي سيرفرات في مكان بعيد!" />

      <div className="fha-3">
        <div>
          <label className="fha-l">المجال</label>
          <select className="fh-in" value={d.category} onChange={(e) => set('category', e.target.value)}>
            {categories.map((c) => <option key={c.id} value={c.id}>{c.emoji} {c.name}</option>)}
          </select>
        </div>
        <div>
          <label className="fha-l">التاريخ</label>
          <input className="fh-in" dir="ltr" type="date" value={d.date} onChange={(e) => set('date', e.target.value)} />
        </div>
        <div>
          <label className="fha-l">المدة (دقيقة)</label>
          <input className="fh-in" dir="ltr" type="number" step="0.1" min="0" value={d.minutes} onChange={(e) => set('minutes', Number(e.target.value))} />
        </div>
      </div>

      <div className="fha-card">
        <label className="fha-l">🎬 الفيديو (mp4)</label>
        <input className="fh-in" type="file" accept="video/mp4,video/webm" onChange={(e) => pickVideo(e.target.files?.[0] ?? null)} />
        {vFile && (
          <p className={vFile.size > WARN_MB * 1048576 ? 'fh-bad' : 'fha-ok'}>
            {vFile.name}: {mb(vFile.size)}MB {vFile.size > WARN_MB * 1048576 ? '(كبير، يفضّل تضغطه)' : '✓'} {poster && ' · الغلاف اتولّد تلقائيًا ✓'}
          </p>
        )}
        {!vFile && d.video && <p className="fha-ok">فيه فيديو حاليًا: {d.video.src} (اختار ملف جديد لو عايز تستبدله)</p>}
        <div className="fha-2">
          <div><label className="fha-l">غلاف مخصص (اختياري)</label><input className="fh-in" type="file" accept="image/*" onChange={(e) => setPosterFile(e.target.files?.[0] ?? null)} /></div>
          <div><label className="fha-l">ترجمة .vtt (اختياري)</label><input className="fh-in" type="file" accept=".vtt" onChange={(e) => setVtt(e.target.files?.[0] ?? null)} /></div>
        </div>
        <label className="fha-l">أو لينك فيديو فيسبوك (بديل لو مفيش ملف)</label>
        <input className="fh-in" dir="ltr" value={d.fbUrl} onChange={(e) => set('fbUrl', e.target.value)} placeholder="https://www.facebook.com/watch/?v=..." />
      </div>

      <label className="fha-l">خلاصة الحلقة (كل نقطة في سطر)</label>
      <textarea className="fh-in" rows={4} value={pointsText} onChange={(e) => setPointsText(e.target.value)} />

      <div className="fha-card">
        <label className="fha-l">❓ الكويز</label>
        {d.quiz.map((q, i) => (
          <div className="fha-q" key={i}>
            <div className="fha-row">
              <input className="fh-in" value={q.q} placeholder={`سؤال ${i + 1}`} onChange={(e) => setQ(i, (x) => ({ ...x, q: e.target.value }))} />
              <button className="fha-x" onClick={() => set('quiz', d.quiz.filter((_, j) => j !== i))} aria-label="امسح السؤال">✕</button>
            </div>
            {q.options.map((o, j) => (
              <div className="fha-row" key={j}>
                <input type="radio" name={`ans${i}`} checked={q.answer === j} onChange={() => setQ(i, (x) => ({ ...x, answer: j }))} aria-label="الإجابة الصحيحة" />
                <input className="fh-in" value={o} placeholder={`اختيار ${j + 1}`} onChange={(e) => setQ(i, (x) => ({ ...x, options: x.options.map((y, k) => (k === j ? e.target.value : y)) }))} />
                {q.options.length > 2 && (
                  <button className="fha-x" onClick={() => setQ(i, (x) => ({ ...x, options: x.options.filter((_, k) => k !== j), answer: x.answer >= j && x.answer > 0 ? x.answer - 1 : x.answer }))} aria-label="امسح الاختيار">✕</button>
                )}
              </div>
            ))}
            {q.options.length < 4 && <button className="fh-btn sm ghost" onClick={() => setQ(i, (x) => ({ ...x, options: [...x.options, ''] }))}>+ اختيار</button>}
            <small>الدايرة = الإجابة الصح</small>
          </div>
        ))}
        <button className="fh-btn sm ghost" onClick={() => set('quiz', [...d.quiz, blankQuiz()])}>+ سؤال</button>
      </div>

      <label className="fha-l">مصطلحات من القاموس في الحلقة</label>
      <div className="fh-chips">
        {glossary.map((t) => {
          const on = d.terms?.includes(t.slug);
          return (
            <button key={t.slug} className={`fh-chip ${on ? 'on' : ''}`} onClick={() => set('terms', on ? d.terms?.filter((x) => x !== t.slug) : [...(d.terms ?? []), t.slug])}>
              {t.word}
            </button>
          );
        })}
      </div>

      <div className="fha-2">
        <div>
          <label className="fha-l">تجربة تفاعلية "جرّب بنفسك"</label>
          <select className="fh-in" value={d.demo ?? ''} onChange={(e) => set('demo', (e.target.value || undefined) as Episode['demo'])}>
            <option value="">بدون</option>
            <option value="api">API (الجرسون)</option>
            <option value="ai">AI (توقّع الكلمة)</option>
            <option value="2fa">التحقق بخطوتين</option>
            <option value="binary">Binary (أصفار وواحدات)</option>
          </select>
        </div>
        <div>
          <label className="fha-l">Slug (الرابط)</label>
          <input className="fh-in" dir="ltr" value={d.slug} disabled={!isNew} onChange={(e) => set('slug', slugify(e.target.value))} />
        </div>
      </div>

      {err && <p className="fh-bad">❌ {err}</p>}
      <div className="fh-cta">
        <button className="fh-btn" onClick={save}>✓ حفظ الحلقة</button>
        <button className="fh-btn ghost" onClick={onCancel}>إلغاء</button>
      </div>
    </div>
  );
}

/* ───────────────────────── Dashboard ───────────────────────── */
function Dashboard({ cfg, onLogout }: { cfg: GhConfig; onLogout: () => void }) {
  const [content, setContent] = useState<Content | null>(null);
  const [saved, setSaved] = useState('');
  const [repoFiles, setRepoFiles] = useState<Set<string>>(new Set());
  const [staged, setStaged] = useState<Staged>(new Map());
  const [deletes, setDeletes] = useState<string[]>([]);
  const [tab, setTab] = useState<'eps' | 'gl' | 'paths'>('eps');
  const [editing, setEditing] = useState<{ ep: Episode; isNew: boolean } | null>(null);
  const [loadErr, setLoadErr] = useState('');
  const [busy, setBusy] = useState(false);
  const [step, setStep] = useState('');
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  useEffect(() => {
    loadContent(cfg)
      .then((c) => { setContent(c); setSaved(JSON.stringify(c)); setRepoFiles(repoFilesOf(c)); })
      .catch((e) => setLoadErr(e instanceof Error ? e.message : 'تعذر تحميل المحتوى'));
  }, [cfg]);

  const changes = useMemo(
    () => (content && JSON.stringify(content) !== saved ? 1 : 0) + staged.size + deletes.length,
    [content, saved, staged, deletes],
  );

  useEffect(() => {
    if (!changes) return;
    const h = (e: BeforeUnloadEvent) => { e.preventDefault(); };
    window.addEventListener('beforeunload', h);
    return () => window.removeEventListener('beforeunload', h);
  }, [changes]);

  if (loadErr) return <div className="fh-wrap fha"><p className="fh-bad">❌ {loadErr}</p><button className="fh-btn" onClick={onLogout}>رجوع للدخول</button></div>;
  if (!content) return <div className="fh-wrap fha"><p className="fh-lead">بحمّل المحتوى من GitHub...</p></div>;

  const up = (fn: (c: Content) => Content) => setContent((c) => (c ? fn(c) : c));

  const newEpisode = (): Episode => {
    let slug = `ep-${today()}`;
    let n = 2;
    while (content.episodes.some((e) => e.slug === slug)) slug = `ep-${today()}-${n++}`;
    return { slug, title: '', hook: '', category: categories[0].id, date: today(), minutes: 1, fbUrl: '', points: [], quiz: [blankQuiz()] };
  };

  const saveEpisode = (e: Episode, files: PendingFile[]) => {
    up((c) => ({
      ...c,
      episodes: c.episodes.some((x) => x.slug === e.slug) ? c.episodes.map((x) => (x.slug === e.slug ? e : x)) : [...c.episodes, e],
    }));
    setStaged((s) => { const m = new Map(s); files.forEach((f) => m.set(f.path, f.blob)); return m; });
    setEditing(null);
  };

  const removeEpisode = (e: Episode) => {
    if (!confirm(`تمسح حلقة "${e.title}"؟ (هتتمسح من الموقع بعد النشر)`)) return;
    const paths = videoPaths(e);
    setStaged((s) => { const m = new Map(s); paths.forEach((p) => m.delete(p)); return m; });
    // نمسح من الريبو بس الملفات اللي موجودة فيه فعلًا
    setDeletes((d) => [...d, ...paths.filter((p) => repoFiles.has(p) && !d.includes(p))]);
    up((c) => ({
      ...c,
      episodes: c.episodes.filter((x) => x.slug !== e.slug),
      paths: c.paths.map((p) => ({ ...p, steps: p.steps.filter((s) => s !== e.slug) })),
    }));
  };

  const doPublish = async () => {
    setBusy(true);
    setMsg(null);
    try {
      const files = [...staged].map(([path, blob]) => ({ path, blob }));
      const sha = await publish(cfg, `content: update Fahmny episodes (${new Date().toISOString().slice(0, 10)})`, content, files, deletes, setStep);
      setSaved(JSON.stringify(content));
      setRepoFiles(repoFilesOf(content));
      setStaged(new Map());
      setDeletes([]);
      setMsg({ ok: true, text: `اتنشر! (commit ${sha.slice(0, 7)}). Vercel هيبني الموقع وهيظهر خلال دقيقة تقريبًا.` });
    } catch (e) {
      setMsg({ ok: false, text: e instanceof Error ? e.message : 'فشل النشر' });
    }
    setStep('');
    setBusy(false);
  };

  const sorted = [...content.episodes].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="fh-wrap fha">
      <div className="fha-bar">
        <div>
          <h1 className="fh-display" style={{ fontSize: 40 }}>لوحة التحكم</h1>
          <small>{cfg.repo} · {cfg.branch}</small>
        </div>
        <div className="fh-cta" style={{ margin: 0 }}>
          <button className="fh-btn" disabled={busy || !changes} onClick={doPublish}>
            {busy ? step || 'بنشر...' : `🚀 انشر${changes ? ` (${changes})` : ''}`}
          </button>
          <button className="fh-btn sm ghost" onClick={onLogout}>خروج</button>
        </div>
      </div>
      {msg && <p className={msg.ok ? 'fha-ok big' : 'fh-bad'}>{msg.ok ? '✅' : '❌'} {msg.text}</p>}
      {!!changes && !busy && <p className="fha-warn">عندك تغييرات لسه ما اتنشرتش. دوس "انشر" لما تخلص.</p>}

      {editing ? (
        <EpisodeForm
          ep={editing.ep}
          isNew={editing.isNew}
          glossary={content.glossary}
          existing={content.episodes.map((e) => e.slug)}
          onCancel={() => setEditing(null)}
          onSave={saveEpisode}
        />
      ) : (
        <>
          <div className="fh-chips">
            <button className={`fh-chip ${tab === 'eps' ? 'on' : ''}`} onClick={() => setTab('eps')}>🎬 الحلقات ({content.episodes.length})</button>
            <button className={`fh-chip ${tab === 'gl' ? 'on' : ''}`} onClick={() => setTab('gl')}>📖 القاموس ({content.glossary.length})</button>
            <button className={`fh-chip ${tab === 'paths' ? 'on' : ''}`} onClick={() => setTab('paths')}>🧭 المسارات ({content.paths.length})</button>
          </div>

          {tab === 'eps' && (
            <>
              <button className="fh-btn" onClick={() => setEditing({ ep: newEpisode(), isNew: true })}>+ حلقة جديدة</button>
              <div className="fha-list">
                {sorted.map((e) => (
                  <div className="fh-card fha-item" key={e.slug}>
                    <div>
                      <h3 className="fh-display">{e.title}</h3>
                      <small>{e.date} · {e.minutes} د · {e.video ? '🎬 فيديو داخلي' : e.fbUrl && !e.fbUrl.endsWith('v=0') ? '🔗 فيسبوك' : '⚠️ من غير فيديو'}</small>
                    </div>
                    <div className="fha-act">
                      <Link className="fh-btn sm ghost" to={`/episodes/${e.slug}`} target="_blank">شوف</Link>
                      <button className="fh-btn sm" onClick={() => setEditing({ ep: e, isNew: false })}>تعديل</button>
                      <button className="fh-btn sm ghost" onClick={() => removeEpisode(e)}>مسح</button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {tab === 'gl' && <GlossaryEditor content={content} up={up} />}
          {tab === 'paths' && <PathsEditor content={content} up={up} />}
        </>
      )}
    </div>
  );
}

function GlossaryEditor({ content, up }: { content: Content; up: (fn: (c: Content) => Content) => void }) {
  const edit = (slug: string, patch: Partial<Term>) =>
    up((c) => ({ ...c, glossary: c.glossary.map((t) => (t.slug === slug ? { ...t, ...patch } : t)) }));
  const add = () => up((c) => ({ ...c, glossary: [...c.glossary, { slug: `t${Date.now().toString(36)}`, word: '', meaning: '' }] }));
  const del = (slug: string) =>
    up((c) => ({
      ...c,
      glossary: c.glossary.filter((t) => t.slug !== slug),
      episodes: c.episodes.map((e) => (e.terms ? { ...e, terms: e.terms.filter((x) => x !== slug) } : e)),
    }));
  return (
    <>
      <button className="fh-btn" onClick={add}>+ مصطلح</button>
      <div className="fha-list">
        {content.glossary.map((t) => (
          <div className="fh-card" key={t.slug}>
            <div className="fha-row">
              <input className="fh-in" dir="ltr" value={t.word} placeholder="API" onChange={(e) => edit(t.slug, { word: e.target.value })} />
              <button className="fha-x" onClick={() => del(t.slug)} aria-label="امسح المصطلح">✕</button>
            </div>
            <textarea className="fh-in" rows={2} value={t.meaning} placeholder="المعنى في سطرين بالمصري" onChange={(e) => edit(t.slug, { meaning: e.target.value })} />
          </div>
        ))}
      </div>
    </>
  );
}

function PathsEditor({ content, up }: { content: Content; up: (fn: (c: Content) => Content) => void }) {
  const edit = (id: string, patch: Partial<LearnPath>) =>
    up((c) => ({ ...c, paths: c.paths.map((p) => (p.id === id ? { ...p, ...patch } : p)) }));
  const move = (p: LearnPath, i: number, d: number) => {
    const s = [...p.steps];
    const j = i + d;
    if (j < 0 || j >= s.length) return;
    [s[i], s[j]] = [s[j], s[i]];
    edit(p.id, { steps: s });
  };
  const title = (slug: string) => content.episodes.find((e) => e.slug === slug)?.title ?? slug;
  return (
    <>
      <button className="fh-btn" onClick={() => up((c) => ({ ...c, paths: [...c.paths, { id: `p${Date.now().toString(36)}`, title: '', desc: '', steps: [] }] }))}>+ مسار</button>
      <div className="fha-list">
        {content.paths.map((p) => (
          <div className="fh-card" key={p.id}>
            <div className="fha-row">
              <input className="fh-in" value={p.title} placeholder="اسم المسار 🚀" onChange={(e) => edit(p.id, { title: e.target.value })} />
              <button className="fha-x" onClick={() => up((c) => ({ ...c, paths: c.paths.filter((x) => x.id !== p.id) }))} aria-label="امسح المسار">✕</button>
            </div>
            <input className="fh-in" value={p.desc} placeholder="وصف قصير" onChange={(e) => edit(p.id, { desc: e.target.value })} />
            <ol className="fha-steps2">
              {p.steps.map((s, i) => (
                <li key={s}>
                  <span>{title(s)}</span>
                  <button className="fha-x" onClick={() => move(p, i, -1)} aria-label="فوق">↑</button>
                  <button className="fha-x" onClick={() => move(p, i, 1)} aria-label="تحت">↓</button>
                  <button className="fha-x" onClick={() => edit(p.id, { steps: p.steps.filter((x) => x !== s) })} aria-label="شيل">✕</button>
                </li>
              ))}
            </ol>
            <select className="fh-in" value="" onChange={(e) => e.target.value && edit(p.id, { steps: [...p.steps, e.target.value] })}>
              <option value="">+ ضيف حلقة للمسار...</option>
              {content.episodes.filter((e) => !p.steps.includes(e.slug)).map((e) => <option key={e.slug} value={e.slug}>{e.title}</option>)}
            </select>
          </div>
        ))}
      </div>
    </>
  );
}

/* ───────────────────────── Page ───────────────────────── */
export default function Admin() {
  const [cfg, setCfg] = useState<GhConfig | null>(loadCfg);
  useEffect(() => {
    const m = document.createElement('meta');
    m.name = 'robots';
    m.content = 'noindex,nofollow';
    document.head.appendChild(m);
    return () => m.remove();
  }, []);
  if (!cfg) return <Login onDone={setCfg} />;
  return <Dashboard cfg={cfg} onLogout={() => { clearCfg(); setCfg(null); }} />;
}
