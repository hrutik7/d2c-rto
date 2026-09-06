import { Rise } from './Rise';

export function Cta({ shopUrl }: { shopUrl: string }) {
  return (
    <section className="cta-sec">
      <div className="blob" />
      <div className="grid-bg" />
      <div className="wrap cta-in">
        <Rise>
          <h2 className="t-52">
            Stop budgeting against reason codes.
            <br />
            <span className="serif-mark accent">Start reading your own returns.</span>
          </h2>
        </Rise>
        <Rise delay={90}>
          <p className="t-20" style={{ marginTop: 18 }}>
            The join takes an afternoon. The pattern correction takes a season. The freight you stop
            paying for compounds.
          </p>
        </Rise>
        <Rise className="cta-btns" delay={170}>
          <a href={shopUrl} className="btn btn-primary">
            See it on a product page
          </a>
          <a href="#leak" className="btn btn-ghost">
            Replay the re-cut
          </a>
        </Rise>
      </div>
    </section>
  );
}

export function Footer({ shopUrl }: { shopUrl: string }) {
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot-grid">
          <div className="foot-col">
            <div className="nav-mark" style={{ marginBottom: 12 }}>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
                <rect x="1" y="1" width="20" height="20" rx="5" stroke="var(--accent)" strokeWidth="1.6" />
                <path d="M4 11s2.6-4 7-4 7 4 7 4-2.6 4-7 4-7-4-7-4Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                <circle cx="11" cy="11" r="1.9" fill="var(--accent)" />
              </svg>
              openetra
            </div>
            <p className="t-12" style={{ maxWidth: '34ch' }}>
              Openetra — fit-attributed RTO for D2C apparel. Built on the order history you
              already have.
            </p>
          </div>

          <div className="foot-col">
            <h4>The case</h4>
            <a href="#leak">The leak</a>
            <a href="#flip">The re-cut</a>
            <a href="#styles">Styles</a>
          </div>

          <div className="foot-col">
            <h4>Product</h4>
            <a href="#how">How it works</a>
            <a href={shopUrl}>Storefront demo</a>
            <a href="#faq">FAQ</a>
          </div>

          <div className="foot-col">
            <h4>Method</h4>
            <a href="#flip">Attribution</a>
            <a href="#faq">Assumptions</a>
          </div>
        </div>

        <div className="foot-bot">
          <span>Kaira · womenswear · 12 months to Sep 2026</span>
          <span>Synthetic corpus — 45,000 orders, answer key retained</span>
        </div>
      </div>
    </footer>
  );
}
