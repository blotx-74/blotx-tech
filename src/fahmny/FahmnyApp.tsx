import { useEffect } from 'react';
import { BrowserRouter, Link, NavLink, Route, Routes, useLocation } from 'react-router-dom';
import './fahmny.css';
import { About, EpisodePage, Episodes, Glossary, Home, Paths } from './pages';
import { FB_PROFILE } from './data';

const FONT_HREF = 'https://fonts.googleapis.com/css2?family=Lalezar&display=swap';

function Shell() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.lang = 'ar';
    document.documentElement.dir = 'rtl';
    document.documentElement.classList.remove('dark');
  }, [pathname]);

  useEffect(() => {
    const prevTitle = document.title;
    document.title = 'فهمني تكنولوجي! | التكنولوجيا بالمصري في أقل من دقيقة ونص';
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = FONT_HREF;
    document.head.appendChild(link);
    const icon = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
    const prevIcon = icon?.href;
    if (icon) icon.href = '/fahmny/icon-512.png';
    return () => {
      document.title = prevTitle;
      link.remove();
      if (icon && prevIcon) icon.href = prevIcon;
    };
  }, []);

  const cls = ({ isActive }: { isActive: boolean }) => (isActive ? 'on' : '');

  return (
    <div className="fh" dir="rtl">
      <header className="fh-nav">
        <div className="fh-wrap fh-nav-in">
          <Link to="/" className="fh-brand fh-display">
            <img src="/fahmny/icon-512.png" alt="" width={46} height={46} />
            <span>فهمني <b>تكنولوجي!</b></span>
          </Link>
          <nav className="fh-links">
            <NavLink to="/" end className={cls}>الرئيسية</NavLink>
            <NavLink to="/episodes" className={cls}>الحلقات</NavLink>
            <NavLink to="/paths" className={cls}>المسارات</NavLink>
            <NavLink to="/glossary" className={cls}>القاموس</NavLink>
            <NavLink to="/about" className={cls}>عن البرنامج</NavLink>
          </nav>
          <a href="/" className="fh-back">Blotx Tech ↗</a>
        </div>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/episodes" element={<Episodes />} />
          <Route path="/episodes/:slug" element={<EpisodePage />} />
          <Route path="/paths" element={<Paths />} />
          <Route path="/glossary" element={<Glossary />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>

      <footer className="fh-foot">
        <div className="fh-wrap fh-foot-in">
          <span>© {new Date().getFullYear()} فهمني تكنولوجي — جزء من <a href="/">Blotx Tech Solutions</a></span>
          <a href={FB_PROFILE} target="_blank" rel="noopener noreferrer">تابعنا على فيسبوك ↗</a>
        </div>
      </footer>
    </div>
  );
}

export default function FahmnyApp() {
  return (
    <BrowserRouter basename="/fahmny">
      <Shell />
    </BrowserRouter>
  );
}
