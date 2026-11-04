import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  FB_PROFILE, categories, episodes, glossary, paths, fbEmbed, fmtDate,
  getCategory, getEpisode, getSeen, markSeen, sortedEpisodes, type Episode,
} from './data';

const isPlaceholder = (e: Episode) => e.fbUrl.endsWith('v=0');
const mins = (e: Episode) => String(e.minutes).replace('.', '٫');

export function EpisodeCard({ e, seen }: { e: Episode; seen?: boolean }) {
  const cat = getCategory(e.category);
  return (
    <Link to={`/episodes/${e.slug}`} className={`fh-card ${seen ? 'seen' : ''}`}>
      <div className="fh-card-top">
        <span className="fh-tag">{cat?.emoji} {cat?.name}</span>
        <span className="fh-play" aria-hidden />
      </div>
      <h3 className="fh-display">{e.title}</h3>
      <p>{e.hook}</p>
      <div className="fh-meta">
        <span>{fmtDate(e.date)}</span>
        <span>⏱ {mins(e)} د</span>
      </div>
    </Link>
  );
}

export function Home() {
  const list = sortedEpisodes();
  const [latest, ...rest] = list;
  const [seen] = useState(getSeen);
  return (
    <>
      <div className="fh-wrap fh-hero">
        <div>
          <span className="fh-pill"><i /> حلقة جديدة كل يوم على فيسبوك</span>
          <h1 className="fh-h1 fh-display">
            <span className="fh-spark">✦</span> فهمني <em>تكنولوجي!</em>
          </h1>
          <p className="fh-lead">
            التكنولوجيا من الصفر، بالمصري وبدون تعقيد. كل حلقة أقل من دقيقة ونص، تفهم فيها حاجة جديدة
            وتبدأ بيها خطوتك الأولى في المجال.
          </p>
          <div className="fh-cta">
            <Link to="/episodes" className="fh-btn">▶ شوف الحلقات</Link>
            <Link to="/paths" className="fh-btn ghost">ابدأ مسار تعلّم</Link>
          </div>
          <div className="fh-stats">
            <div><b dir="ltr">{episodes.length}+</b><span>حلقة</span></div>
            <div><b>أقل من ١٫٥</b><span>دقيقة للحلقة</span></div>
            <div><b>{seen.length}/{episodes.length}</b><span>اللي اتفرجت عليه</span></div>
          </div>
        </div>
        <div className="fh-logo-stage">
          <img src="/fahmny/logo.webp" alt="شعار فهمني تكنولوجي" width={460} height={460} fetchPriority="high" />
        </div>
      </div>

      {latest && (
        <section className="fh-sec">
          <div className="fh-wrap">
            <div className="fh-featured">
              <div>
                <span className="fh-pill"><i /> أحدث حلقة</span>
                <h3 className="fh-display">{latest.title}</h3>
                <p className="fh-lead">{latest.hook}</p>
                <div className="fh-cta">
                  <Link to={`/episodes/${latest.slug}`} className="fh-btn ghost">▶ اتفرج واتعلم</Link>
                </div>
              </div>
              <ul className="fh-points">
                {latest.points.map((p) => <li key={p}>{p}</li>)}
              </ul>
            </div>
          </div>
        </section>
      )}

      <section className="fh-sec">
        <div className="fh-wrap">
          <div className="fh-sec-head">
            <h2 className="fh-h2 fh-display">الحلقات <span>الأخيرة</span></h2>
            <Link to="/episodes" className="fh-more">كل الحلقات ←</Link>
          </div>
          <div className="fh-grid">
            {(rest.length ? rest : list).map((e) => <EpisodeCard key={e.slug} e={e} seen={seen.includes(e.slug)} />)}
          </div>
        </div>
      </section>

      <section className="fh-sec">
        <div className="fh-wrap">
          <div className="fh-sec-head">
            <h2 className="fh-h2 fh-display">اختار <span>مجالك</span></h2>
          </div>
          <div className="fh-grid">
            {categories.map((c) => (
              <Link key={c.id} to={`/episodes?cat=${c.id}`} className="fh-card">
                <h3 className="fh-display">{c.emoji} {c.name}</h3>
                <p>{episodes.filter((e) => e.category === c.id).length} حلقة</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export function Episodes() {
  const [cat, setCat] = useState(() => new URLSearchParams(location.search).get('cat') || 'all');
  const [q, setQ] = useState('');
  const [seen] = useState(getSeen);
  const list = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return sortedEpisodes().filter(
      (e) => (cat === 'all' || e.category === cat) && (!needle || (e.title + e.hook).toLowerCase().includes(needle)),
    );
  }, [cat, q]);
  return (
    <div className="fh-wrap">
      <div className="fh-page-title">
        <h1 className="fh-display">كل <span>الحلقات</span></h1>
        <p>اختار المجال اللي يهمك وابدأ.</p>
      </div>
      <div style={{ marginTop: 26 }}>
        <input className="fh-search" placeholder="ابحث في الحلقات..." value={q} onChange={(ev) => setQ(ev.target.value)} />
      </div>
      <div className="fh-chips">
        <button className={`fh-chip ${cat === 'all' ? 'on' : ''}`} onClick={() => setCat('all')}>الكل</button>
        {categories.map((c) => (
          <button key={c.id} className={`fh-chip ${cat === c.id ? 'on' : ''}`} onClick={() => setCat(c.id)}>
            {c.emoji} {c.name}
          </button>
        ))}
      </div>
      <div className="fh-grid" style={{ paddingBottom: 50 }}>
        {list.map((e) => <EpisodeCard key={e.slug} e={e} seen={seen.includes(e.slug)} />)}
      </div>
      {!list.length && <p style={{ color: 'var(--fh-mute)', fontWeight: 800, paddingBottom: 60 }}>مفيش حلقات مطابقة 🤷</p>}
    </div>
  );
}

export function Paths() {
  const [seen] = useState(getSeen);
  return (
    <div className="fh-wrap">
      <div className="fh-page-title">
        <h1 className="fh-display">مسارات <span>التعلّم</span></h1>
        <p>حلقات مترتبة عشان متتوهش. كمّل المسار وتقدّمك بيتحفظ على جهازك.</p>
      </div>
      <div style={{ marginTop: 34, paddingBottom: 40 }}>
        {paths.map((p) => {
          const steps = p.steps.map((s) => episodes.find((e) => e.slug === s)).filter((e): e is Episode => !!e);
          const done = steps.filter((e) => seen.includes(e.slug)).length;
          const pct = steps.length ? Math.round((done / steps.length) * 100) : 0;
          return (
            <div className="fh-card fh-path" key={p.id}>
              <div className="fh-path-head">
                <div>
                  <h3 className="fh-display">{p.title}</h3>
                  <p>{p.desc}</p>
                </div>
                <div className="fh-bar-wrap">
                  {done} من {steps.length} · {pct}٪
                  <div className="fh-bar"><i style={{ width: `${pct}%` }} /></div>
                </div>
              </div>
              <ol className="fh-steps">
                {steps.map((e, i) => (
                  <li key={e.slug}>
                    <Link to={`/episodes/${e.slug}`} className={seen.includes(e.slug) ? 'done' : ''}>
                      <span className="n">{seen.includes(e.slug) ? '✓' : i + 1}</span>
                      {e.title}
                      <small>⏱ {mins(e)} د</small>
                    </Link>
                  </li>
                ))}
              </ol>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Quiz({ e }: { e: Episode }) {
  const [picked, setPicked] = useState<Record<number, number>>({});
  const done = Object.keys(picked).length === e.quiz.length;
  const score = e.quiz.filter((q, i) => picked[i] === q.answer).length;
  return (
    <div className="fh-box">
      <h4 className="fh-display">اختبر نفسك</h4>
      {e.quiz.map((q, i) => (
        <div className="fh-q" key={q.q}>
          <p>{q.q}</p>
          <div className="fh-opts">
            {q.options.map((o, j) => {
              const has = picked[i] !== undefined;
              const cls = has ? (j === q.answer ? 'ok' : j === picked[i] ? 'no' : '') : '';
              return (
                <button key={o} className={`fh-opt ${cls}`} disabled={has} onClick={() => setPicked((p) => ({ ...p, [i]: j }))}>
                  {o}
                </button>
              );
            })}
          </div>
        </div>
      ))}
      {done && <p className="fh-score">نتيجتك: {score} / {e.quiz.length} {score === e.quiz.length ? '🔥 جامد!' : '— جرّب تتفرج تاني 😉'}</p>}
    </div>
  );
}

function ShareButton({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);
  const share = async () => {
    const url = location.href;
    try {
      if (navigator.share) await navigator.share({ title, url });
      else {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch { /* المستخدم لغى المشاركة */ }
  };
  return (
    <button className="fh-btn ghost fh-share" onClick={share}>{copied ? '✓ اتنسخ اللينك' : '↗ شارك الحلقة'}</button>
  );
}

export function EpisodePage() {
  const { slug } = useParams();
  const e = getEpisode(slug);
  useEffect(() => {
    if (e) markSeen(e.slug);
  }, [e]);

  if (!e) {
    return (
      <div className="fh-wrap fh-page-title" style={{ paddingBottom: 80 }}>
        <h1 className="fh-display">الحلقة مش موجودة 😅</h1>
        <p><Link to="/episodes" className="fh-more">ارجع للحلقات</Link></p>
      </div>
    );
  }
  const list = sortedEpisodes();
  const idx = list.findIndex((x) => x.slug === e.slug);
  const next = list[idx + 1] ?? list[0];
  const terms = glossary.filter((t) => e.terms?.includes(t.slug));
  const cat = getCategory(e.category);

  return (
    <div className="fh-wrap">
      <div className="fh-crumb">
        <Link to="/">الرئيسية</Link> / <Link to="/episodes">الحلقات</Link> / {e.title}
      </div>
      <div className="fh-ep">
        <div className="fh-phone">
          {isPlaceholder(e) ? (
            <div className="fh-ph">
              <div>
                <img src="/fahmny/logo.webp" alt="" width={200} height={200} style={{ borderRadius: 24, marginBottom: 16 }} />
                <p>الفيديو هيتضاف هنا قريب.</p>
              </div>
            </div>
          ) : (
            <iframe
              title={e.title}
              src={fbEmbed(e.fbUrl)}
              loading="lazy"
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              allowFullScreen
            />
          )}
        </div>
        <div>
          <span className="fh-tag">{cat?.emoji} {cat?.name}</span>
          <h1 className="fh-display" style={{ fontSize: 'clamp(34px,5vw,58px)', lineHeight: 1.2, margin: '14px 0 8px' }}>
            {e.title}
          </h1>
          <p style={{ color: 'var(--fh-mute)', fontSize: 18, fontWeight: 700 }}>{fmtDate(e.date)} · ⏱ {mins(e)} دقيقة</p>

          <div className="fh-box">
            <h4 className="fh-display">خلاصة الحلقة</h4>
            <ul className="fh-points">{e.points.map((p) => <li key={p}>{p}</li>)}</ul>
          </div>

          <Quiz key={e.slug} e={e} />

          {!!terms.length && (
            <div className="fh-box">
              <h4 className="fh-display">مصطلحات في الحلقة</h4>
              {terms.map((t) => (
                <p key={t.slug} style={{ marginBottom: 10, lineHeight: 1.7, fontWeight: 600 }}>
                  <b style={{ background: 'var(--fh-yellow)', padding: '0 8px', borderRadius: 8, direction: 'ltr', unicodeBidi: 'isolate' }}>{t.word}</b> — {t.meaning}
                </p>
              ))}
            </div>
          )}

          <div className="fh-cta">
            <Link to={`/episodes/${next.slug}`} className="fh-btn">الحلقة اللي بعدها ←</Link>
            <ShareButton title={e.title} />
          </div>
        </div>
      </div>
    </div>
  );
}

export function Glossary() {
  const [q, setQ] = useState('');
  const list = glossary.filter((t) => (t.word + t.meaning).toLowerCase().includes(q.trim().toLowerCase()));
  return (
    <div className="fh-wrap">
      <div className="fh-page-title">
        <h1 className="fh-display">قاموس <span>المصطلحات</span></h1>
        <p>الكلمة الصعبة بتتشرح في سطرين.</p>
      </div>
      <input className="fh-search" style={{ marginTop: 26 }} placeholder="ابحث عن مصطلح..." value={q} onChange={(ev) => setQ(ev.target.value)} />
      <div className="fh-grid" style={{ paddingBottom: 60 }}>
        {list.map((t) => (
          <div className="fh-card fh-term" key={t.slug}>
            <b className="fh-display">{t.word}</b>
            <p>{t.meaning}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function About() {
  return (
    <div className="fh-wrap" style={{ paddingBottom: 70 }}>
      <div className="fh-page-title">
        <h1 className="fh-display">عن <span>البرنامج</span></h1>
      </div>
      <div className="fh-box" style={{ fontSize: 18, lineHeight: 1.9, fontWeight: 600 }}>
        <p>
          «فهمني تكنولوجي» برنامج شبه يومي على فيسبوك، هدفه يبسّط التكنولوجيا للمبتدئين والطلبة وكل
          اللي عايز يبدأ في المجال. كل حلقة أقل من دقيقة ونص، وبالمجان.
        </p>
        <p style={{ marginTop: 12 }}>
          البرنامج جزء من <a href="/" style={{ background: 'var(--fh-yellow)', padding: '0 8px', borderRadius: 8, fontWeight: 900 }}>Blotx Tech Solutions</a>.
        </p>
        <div className="fh-cta">
          <a href={FB_PROFILE} target="_blank" rel="noopener noreferrer" className="fh-btn">تابعنا على فيسبوك</a>
        </div>
      </div>
    </div>
  );
}
