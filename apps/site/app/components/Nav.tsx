'use client';

import { useEffect, useState } from 'react';

const LINKS = [
  { href: '#leak', label: 'The leak' },
  { href: '#how', label: 'How it works' },
  { href: '#styles', label: 'Styles' },
  { href: '#faq', label: 'FAQ' },
];

export function Nav({ tryOnUrl }: { tryOnUrl: string }) {
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`nav ${stuck ? 'stuck' : ''}`}>
      <div className="wrap nav-in">
        <a href="#top" className="nav-mark">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
            <rect x="1" y="1" width="20" height="20" rx="5" stroke="var(--accent)" strokeWidth="1.6" />
            <path d="M4 11s2.6-4 7-4 7 4 7 4-2.6 4-7 4-7-4-7-4Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            <circle cx="11" cy="11" r="1.9" fill="var(--accent)" />
          </svg>
          openetra
        </a>

        <div className="nav-links">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="nav-link">
              {l.label}
            </a>
          ))}
        </div>

        <a href={tryOnUrl} className="btn btn-primary btn-sm">
          Try it on a real product page
        </a>
      </div>
    </nav>
  );
}
