'use client';

import { useState } from 'react';
import { Rise } from './Rise';

const QA = [
  {
    q: 'Is this real data?',
    a: 'No. Everything on this page comes from a synthetic corpus of 45,000 orders generated for this project, where a known set of styles was deliberately given a bad size chart. That is the point: it is the only way to score the attribution against an answer key. On your catalogue the same pipeline runs, minus the answer key.',
  },
  {
    q: 'Why adjust the exchange rate at all — why not just count exchanges?',
    a: 'Because most shoppers who receive the wrong size never raise an exchange; they refuse the parcel, or keep it and never buy again. Counting only the exchanges you can see gives a ₹3.0L floor. Dividing by an assumed 35% propensity gives ₹8.5L. Both numbers are on the page, and the floor is defensible on its own.',
  },
  {
    q: 'Where does the 35% come from?',
    a: 'It is a deliberately conservative assumption, not a measurement. Published apparel returns research puts the share of dissatisfied buyers who actually initiate a return well above that in most categories. If your real propensity is higher, the attributed figure shrinks; if it is lower, it grows. We picked the end of the range that makes our own case weaker.',
  },
  {
    q: 'What does the courier have to do for this to work?',
    a: 'Nothing. That is the design constraint. The attribution runs entirely on order history, exchange records and size charts — data the brand already owns. No new reason codes, no manifest changes, no integration.',
  },
  {
    q: 'What does the offset actually change?',
    a: 'It shifts the recommendation at the size picker on the product page, and feeds the try-on pose estimate. A −4.0cm offset on a style means the size chart overstates the garment by four centimetres at the binding measurement, so the shopper is guided up.',
  },
  {
    q: 'How do you know the ranking is any good?',
    a: 'Against this corpus, ranking styles by attributed cost recovers 100% of the styles that were injected with a bad chart, and the total attributed sits under the true injected cost. Recall is the number worth watching; a ranking that surfaces the wrong styles wastes a pattern-making cycle.',
  },
];

function Item({ q, a, i }: { q: string; a: string; i: number }) {
  const [open, setOpen] = useState(i === 0);
  return (
    <div className={`faq-item ${open ? 'open' : ''}`}>
      <button className="faq-q" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
        {q}
        <svg className="faq-ic" viewBox="0 0 13 13" fill="none" aria-hidden>
          <path d="M6.5 1v11M1 6.5h11" stroke="var(--accent)" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
      </button>
      <div className="faq-a">
        <div className="faq-a-in">
          <p>{a}</p>
        </div>
      </div>
    </div>
  );
}

export function Faq() {
  return (
    <section className="section" id="faq">
      <div className="wrap" style={{ maxWidth: 860 }}>
        <div className="section-head">
          <Rise>
            <div className="eyebrow">FAQ</div>
          </Rise>
          <Rise delay={70}>
            <h2 className="t-52">The obvious objections</h2>
          </Rise>
        </div>
        <Rise delay={120}>
          <div className="faq">
            {QA.map((x, i) => (
              <Item key={x.q} q={x.q} a={x.a} i={i} />
            ))}
          </div>
        </Rise>
      </div>
    </section>
  );
}
