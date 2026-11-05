import { Fragment, useEffect, useState } from 'react';
import type { Episode, Lesson } from './data';

const SITE = 'https://blotxtech.site';

/* نص بسيط فيه `كود` و **تقيل** */
export function Rich({ text }: { text: string }) {
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((s, i) => {
        if (s.startsWith('`') && s.endsWith('`') && s.length > 2) return <code key={i} className="fh-ic" dir="ltr">{s.slice(1, -1)}</code>;
        if (s.startsWith('**') && s.endsWith('**') && s.length > 4) return <b key={i}>{s.slice(2, -2)}</b>;
        return <Fragment key={i}>{s}</Fragment>;
      })}
    </>
  );
}

const fmt = (t: number) => `${Math.floor(t / 60)}:${String(t % 60).padStart(2, '0')}`;

/* SEO: العنوان + الوصف + canonical + JSON-LD (VideoObject و FAQPage) */
export function useLessonHead(e?: Episode) {
  useEffect(() => {
    const L = e?.lesson;
    if (!e || !L) return;
    const url = `${SITE}/fahmny/episodes/${e.slug}`;
    // الـ Shell بيحط عنوانه في effect بيشتغل بعدنا أول تحميل، فبنأجّل خطوة
    let prevTitle = document.title;
    const titleTimer = window.setTimeout(() => { prevTitle = document.title; document.title = L.seoTitle; }, 0);
    const added: Element[] = [];
    const restore: (() => void)[] = [];

    const setMeta = (attr: 'name' | 'property', key: string, value: string) => {
      let m = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
      if (m) {
        const old = m.content;
        restore.push(() => { m!.content = old; });
      } else {
        m = document.createElement('meta');
        m.setAttribute(attr, key);
        document.head.appendChild(m);
        added.push(m);
      }
      m.content = value;
    };
    setMeta('name', 'description', L.metaDescription);
    setMeta('property', 'og:title', L.seoTitle);
    setMeta('property', 'og:description', L.metaDescription);
    setMeta('property', 'og:url', url);
    if (e.video?.poster) setMeta('property', 'og:image', SITE + e.video.poster);

    const canon = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canon) {
      const old = canon.href;
      canon.href = url;
      restore.push(() => { canon.href = old; });
    }

    const ld = (data: object) => {
      const s = document.createElement('script');
      s.type = 'application/ld+json';
      s.text = JSON.stringify(data);
      document.head.appendChild(s);
      added.push(s);
    };
    if (e.video) {
      ld({
        '@context': 'https://schema.org',
        '@type': 'VideoObject',
        name: e.title,
        alternateName: L.titleEn,
        description: L.metaDescription,
        thumbnailUrl: e.video.poster ? [SITE + e.video.poster] : undefined,
        uploadDate: e.date,
        duration: L.durationIso,
        contentUrl: SITE + e.video.src,
        inLanguage: 'ar',
        url,
        publisher: { '@type': 'Organization', name: 'فهمني تكنولوجي!', logo: { '@type': 'ImageObject', url: `${SITE}/fahmny/icon-512.png` } },
        hasPart: L.chapters.map((c, i) => ({
          '@type': 'Clip',
          name: c.label,
          startOffset: c.t,
          endOffset: L.chapters[i + 1]?.t ?? Math.round(e.minutes * 60),
          url: `${url}?t=${c.t}`,
        })),
      });
    }
    ld({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: L.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    });

    return () => {
      clearTimeout(titleTimer);
      document.title = prevTitle;
      added.forEach((n) => n.remove());
      restore.forEach((f) => f());
    };
  }, [e]);
}

export function LessonIntro({ L }: { L: Lesson }) {
  return (
    <>
      <p className="fh-en" dir="ltr">Episode {String(L.number).padStart(2, '0')} · {L.titleEn}</p>
      <p className="fh-intro"><Rich text={L.intro} /></p>
    </>
  );
}

const SECTIONS = [
  ['ep-chapters', 'الفصول'],
  ['ep-article', 'المقال'],
  ['ep-points', 'أهم النقاط'],
  ['ep-quiz', 'اختبر نفسك'],
  ['ep-challenge', 'التحدي'],
  ['ep-terms', 'المصطلحات'],
  ['ep-faq', 'أسئلة شائعة'],
  ['ep-transcript', 'نص الحلقة'],
] as const;

export function LessonNav() {
  return (
    <nav className="fh-toc" aria-label="أقسام الدرس">
      {SECTIONS.map(([id, label]) => (
        <a key={id} href={`#${id}`} onClick={(ev) => {
          ev.preventDefault();
          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }}>{label}</a>
      ))}
    </nav>
  );
}

export function Chapters({ L, now, onSeek }: { L: Lesson; now: number; onSeek: (t: number) => void }) {
  const active = L.chapters.reduce((a, c, i) => (now >= c.t ? i : a), 0);
  return (
    <div className="fh-box" id="ep-chapters">
      <h4 className="fh-display">فصول الحلقة</h4>
      <ol className="fh-chapters">
        {L.chapters.map((c, i) => (
          <li key={c.t}>
            <button className={i === active && now > 0 ? 'on' : ''} onClick={() => onSeek(c.t)}>
              <span className="t" dir="ltr">{fmt(c.t)}</span>
              <span><Rich text={c.label} /></span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function Article({ L }: { L: Lesson }) {
  return (
    <article className="fh-box fh-article" id="ep-article">
      <h4 className="fh-display">المقال: الحلقة بالتفصيل</h4>
      {L.article.map((s) => (
        <section key={s.h} className={s.deeper ? 'deeper' : ''}>
          {s.deeper && <span className="fh-deeper">🔍 تفاصيل أكتر · مش في الفيديو</span>}
          <h2><Rich text={s.h} /></h2>
          {s.p.map((t) => <p key={t}><Rich text={t} /></p>)}
          {s.steps && <ol>{s.steps.map((t) => <li key={t}><Rich text={t} /></li>)}</ol>}
          {s.code && <pre className="fh-code" dir="ltr">{s.code}</pre>}
          {s.after?.map((t) => <p key={t}><Rich text={t} /></p>)}
        </section>
      ))}
    </article>
  );
}

function TrueFalse({ items }: { items: Lesson['trueFalse'] }) {
  const [picked, setPicked] = useState<Record<number, boolean>>({});
  return (
    <div className="fh-box">
      <h4 className="fh-display">صح ولا غلط؟</h4>
      {items.map((it, i) => {
        const has = picked[i] !== undefined;
        return (
          <div className="fh-q" key={it.s}>
            <p><Rich text={it.s} /></p>
            <div className="fh-tf">
              {[true, false].map((v) => (
                <button
                  key={String(v)}
                  disabled={has}
                  className={`fh-opt ${has ? (v === it.answer ? 'ok' : v === picked[i] ? 'no' : '') : ''}`}
                  onClick={() => setPicked((p) => ({ ...p, [i]: v }))}
                >
                  {v ? '✓ صح' : '✗ غلط'}
                </button>
              ))}
            </div>
            {has && <p className="fh-why">{picked[i] === it.answer ? '👏 ' : '💡 '}<Rich text={it.why} /></p>}
          </div>
        );
      })}
    </div>
  );
}

function Discuss({ items }: { items: Lesson['discuss'] }) {
  return (
    <div className="fh-box">
      <h4 className="fh-display">فكّر فيها 🤔</h4>
      <p className="fh-demo-hint">مفيش إجابة واحدة صح. فكّر شوية، وبعدين افتح الفكرة اللي تساعدك، أو اكتب رأيك في الكومنتات على فيسبوك.</p>
      {items.map((d) => (
        <details className="fh-acc" key={d.q}>
          <summary><Rich text={d.q} /></summary>
          <p><Rich text={d.hint} /></p>
        </details>
      ))}
    </div>
  );
}

export function LessonExtras({ L }: { L: Lesson }) {
  return (
    <>
      <TrueFalse items={L.trueFalse} />
      <Discuss items={L.discuss} />
    </>
  );
}

function PrintSim() {
  const [name, setName] = useState('');
  const text = name.trim() || 'Hello World';
  return (
    <div className="fh-sim">
      <label className="fh-demo-hint" htmlFor="fh-sim-in">اكتب اسمك وشوف الكود والناتج (محاكاة بسيطة، مش Python حقيقي):</label>
      <input id="fh-sim-in" className="fh-search" value={name} maxLength={30} placeholder="مثلًا: Ziad" onChange={(ev) => setName(ev.target.value)} />
      <pre className="fh-code" dir="ltr">
        <span className="fh-c-mute"># hello.py</span>{'\n'}print("<span className="fh-c-ar">{text}</span>"){'\n\n'}
        <span className="fh-c-mute">$ python hello.py</span>{'\n'}<span className="fh-c-out fh-c-ar">{text}</span>
      </pre>
    </div>
  );
}

export function Challenge({ L }: { L: Lesson }) {
  return (
    <div className="fh-box fh-demo" id="ep-challenge">
      <h4 className="fh-display">💪 التحدي العملي</h4>
      <p className="fh-demo-hint">شغّل أول سطر كود ليك:</p>
      <ol className="fh-steps-txt">{L.challenge.steps.map((s) => <li key={s}><Rich text={s} /></li>)}</ol>
      <p className="fh-bonus"><b>⭐ تحدي إضافي:</b> <Rich text={L.challenge.bonus} /></p>
      <PrintSim />
    </div>
  );
}

export function Faq({ L }: { L: Lesson }) {
  return (
    <div className="fh-box" id="ep-faq">
      <h4 className="fh-display">أسئلة شائعة</h4>
      {L.faq.map((f) => (
        <details className="fh-acc" key={f.q}>
          <summary>{f.q}</summary>
          <p><Rich text={f.a} /></p>
        </details>
      ))}
    </div>
  );
}

export function Transcript({ L }: { L: Lesson }) {
  return (
    <div className="fh-box" id="ep-transcript">
      <details className="fh-acc fh-transcript">
        <summary className="fh-display">📜 نص الحلقة كامل</summary>
        {L.transcript.map((t) => <p key={t}>{t}</p>)}
      </details>
    </div>
  );
}
