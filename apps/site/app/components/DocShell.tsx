import { COMPANY, SHOP_URL, TRY_ON_URL } from '../lib/urls';
import { Footer } from './Closing';

/**
 * Chrome for the standing pages — about, privacy, terms. The landing page's
 * <Nav> is a set of same-page anchors, which mean nothing off the home route,
 * so these get a slim header that only has to do one thing: get back.
 */
export function DocShell({
  eyebrow,
  title,
  standfirst,
  children,
}: {
  eyebrow: string;
  title: string;
  standfirst?: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <nav className="nav">
        <div className="wrap nav-in">
          <a href="/" className="nav-mark">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
              <rect x="1" y="1" width="20" height="20" rx="5" stroke="var(--accent)" strokeWidth="1.6" />
              <path d="M4 11s2.6-4 7-4 7 4 7 4-2.6 4-7 4-7-4-7-4Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
              <circle cx="11" cy="11" r="1.9" fill="var(--accent)" />
            </svg>
            {COMPANY.name.toLowerCase()}
          </a>
          <div className="nav-links">
            <a href="/#how" className="nav-link">How it works</a>
            <a href="/about" className="nav-link">Company</a>
          </div>
          <a href={TRY_ON_URL} className="btn btn-primary btn-sm">Try it live</a>
        </div>
      </nav>

      <main className="section doc">
        <div className="wrap" style={{ maxWidth: 760 }}>
          <div className="eyebrow">{eyebrow}</div>
          <h1 className="t-52" style={{ margin: '10px 0 0' }}>{title}</h1>
          {standfirst ? (
            <p className="t-20" style={{ marginTop: 18, color: 'var(--ink-2)' }}>{standfirst}</p>
          ) : null}
          <div className="doc-body">{children}</div>
        </div>
      </main>

      <Footer shopUrl={SHOP_URL} tryOnUrl={TRY_ON_URL} />
    </>
  );
}
