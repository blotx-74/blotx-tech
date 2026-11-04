import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  FB_PROFILE, categories, episodes, glossary, fbEmbed, fmtDate,
  getCategory, getEpisode, sortedEpisodes, type Episode,
} from './data';

const isPlaceholder = (e: Episode) => e.fbUrl.endsWith('v=0');

export function EpisodeCard({ e }: { e: Episode }) {
  const cat = getCategory(e.category);
  return (
    <Link to={`/episodes/${e.slug}`} className="fh-card">
      <div className="fh-card-top">
        <span className="fh-tag">{cat?.emoji} {cat?.name}</span>
        <span className="fh-play" aria-hidden />
      </div>
      <h3 className="fh-display">{e.title}</h3>
      <p>{e.hook}</p>
      <div className="fh-meta">
        <span>{fmtDate(e.date)}</span>
        <span>⏱ {String(e.minutes).replace('.', '٫')} د</span>
      </div>
    </Link>
  );
}

export function Home() {
  const list = sortedEpisodes();
  const [latest, ...rest] = list;
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
            <a href={FB_PROFILE} target="_blank" rel="noopener noreferrer" className="fh-btn ghost">تابعني على فيسبوك</a>
          </div>
          <div className="fh-stats">
            <div><b dir="ltr">{episodes.length}+</b><span>حلقة</span></div>
            <div><b>أقل من ١٫٥</b><span>دقيقة للحلقة</span></div>
            <div><b>{categories.length}</b><span>مجالات</span></div>
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
                  <Link to={`/episodes/${latest.slug}`} className="fh-btn">▶ اتفرج واتعلم</Link>
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
            {(rest.length ? rest : list).map((e) => <EpisodeCard key={e.slug} e={e} />)}
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
  const list = useMemo(
    () => sortedEpisodes().filter((e) => cat === 'all' || e.category === cat),
    [cat],
  );
  return (
    <div className="fh-wrap">
      <div className="fh-page-title">
        <h1 className="fh-display">كل <span style={{ color: 'var(--fh-yellow)' }}>الحلقات</span></h1>
        <p>اختار المجال اللي يهمك وابدأ.</p>
      </div>
      <div className="fh-chips" style={{ marginTop: 24 }}>
        <button className={`fh-chip ${cat === 'all' ? 'on' : ''}`} onClick={() => setCat('all')}>الكل</button>
        {categories.map((c) => (
          <button key={c.id} className={`fh-chip ${cat === c.id ? 'on' : ''}`} onClick={() => setCat(c.id)}>
            {c.emoji} {c.name}
          </button>
        ))}
      </div>
      <div className="fh-grid" style={{ paddingBottom: 50 }}>
        {list.map((e) => <EpisodeCard key={e.slug} e={e} />)}
      </div>
      {!list.length && <p style={{ color: 'var(--fh-mute)', paddingBottom: 60 }}>مفيش حلقات في المجال ده لسه.</p>}
    </div>
  );
}

function Quiz({ e }: { e: Episode }) {
  const [picked, setPicked] = useState<Record<number, number>>({});
  useEffect(() => setPicked({}), [e.slug]);
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

export function EpisodePage() {
  const { slug } = useParams();
  const e = getEpisode(slug);
  useEffect(() => {
    if (!e) return;
    try {
      const k = 'fh_seen';
      const seen: string[] = JSON.parse(localStorage.getItem(k) || '[]');
      if (!seen.includes(e.slug)) localStorage.setItem(k, JSON.stringify([...seen, e.slug]));
    } catch { /* ignore */ }
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
            <div style={{ height: 560, display: 'grid', placeItems: 'center', textAlign: 'center', padding: 24, color: 'var(--fh-mute)' }}>
              <div>
                <img src="/fahmny/logo.webp" alt="" width={200} height={200} style={{ borderRadius: 24, marginBottom: 16 }} />
                <p>الفيديو هيتضاف هنا قريب.<br />(حط لينك الحلقة في <code>data.ts</code>)</p>
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
          <h1 className="fh-display" style={{ fontSize: 'clamp(34px,5vw,56px)', lineHeight: 1.2, margin: '14px 0 8px', textShadow: '0 4px 0 #000' }}>
            {e.title}
          </h1>
          <p style={{ color: 'var(--fh-mute)', fontSize: 18 }}>{fmtDate(e.date)} · ⏱ {String(e.minutes).replace('.', '٫')} دقيقة</p>

          <div className="fh-box">
            <h4 className="fh-display">خلاصة الحلقة</h4>
            <ul className="fh-points">{e.points.map((p) => <li key={p}>{p}</li>)}</ul>
          </div>

          <Quiz e={e} />

          {!!terms.length && (
            <div className="fh-box">
              <h4 className="fh-display">مصطلحات في الحلقة</h4>
              {terms.map((t) => (
                <p key={t.slug} style={{ marginBottom: 10, lineHeight: 1.7 }}>
                  <b style={{ color: 'var(--fh-yellow)', direction: 'ltr', unicodeBidi: 'isolate' }}>{t.word}</b> — {t.meaning}
                </p>
              ))}
            </div>
          )}

          <div className="fh-cta">
            <Link to={`/episodes/${next.slug}`} className="fh-btn">الحلقة اللي بعدها ←</Link>
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
        <h1 className="fh-display">قاموس <span style={{ color: 'var(--fh-yellow)' }}>المصطلحات</span></h1>
        <p>الكلمة الصعبة بتتشرح في سطرين.</p>
      </div>
      <input className="fh-search" style={{ marginTop: 24 }} placeholder="ابحث عن مصطلح..." value={q} onChange={(ev) => setQ(ev.target.value)} />
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
        <h1 className="fh-display">عن <span style={{ color: 'var(--fh-yellow)' }}>البرنامج</span></h1>
      </div>
      <div className="fh-box" style={{ fontSize: 18, lineHeight: 1.9 }}>
        <p>
          «فهمني تكنولوجي» برنامج شبه يومي على فيسبوك، هدفه يبسّط التكنولوجيا للمبتدئين والطلبة وكل
          اللي عايز يبدأ في المجال. كل حلقة أقل من دقيقة ونص، وبالمجان.
        </p>
        <p style={{ marginTop: 12 }}>
          البرنامج جزء من <a href="/" style={{ color: 'var(--fh-yellow)', fontWeight: 800 }}>Blotx Tech Solutions</a>.
        </p>
        <div className="fh-cta">
          <a href={FB_PROFILE} target="_blank" rel="noopener noreferrer" className="fh-btn">تابعنا على فيسبوك</a>
        </div>
      </div>
    </div>
  );
}
