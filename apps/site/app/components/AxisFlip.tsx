'use client';

import { useEffect, useState } from 'react';
import { useInView } from '../lib/hooks';

/**
 * The pitch. Not a new chart — the SAME ₹70L, re-cut on a different axis.
 *
 * View A is how the courier codes it, which structurally cannot name size.
 * View B is how the brand's own exchange records explain it, and a slice
 * appears that view A had no vocabulary for. The transition is the argument,
 * so the bars animate from their old width rather than being swapped out.
 */

interface CourierRow { code: string; count: number; rupees: number }

const lakh = (r: number) => `₹${(r / 100000).toFixed(1)}L`;

export function AxisFlip({
  courier,
  totalRtoRupees,
  floorRupees,
  adjustedRupees,
  propensity,
  recall,
}: {
  courier: CourierRow[];
  totalRtoRupees: number;
  floorRupees: number;
  adjustedRupees: number;
  propensity: number;
  recall: number;
}) {
  const [flipped, setFlipped] = useState(false);
  const [ref, seen] = useInView<HTMLDivElement>(0.25);

  // Nudge the visitor once: if they have looked at the courier view for six
  // seconds without touching it, flip it for them. It only ever fires once.
  const [nudged, setNudged] = useState(false);
  useEffect(() => {
    if (!seen || nudged) return;
    const t = setTimeout(() => {
      setNudged(true);
      setFlipped(true);
    }, 6000);
    return () => clearTimeout(t);
  }, [seen, nudged]);

  const rows = courier.slice(0, 8);
  const max = Math.max(...rows.map((c) => c.rupees));
  const sizePct = (adjustedRupees / totalRtoRupees) * 100;

  return (
    <section className="section" id="flip">
      <div className="wrap">
        <div className="section-head">
          <div className="eyebrow">One number, two axes</div>
          <h2 className="t-52">
            All you have to do is{' '}
            <span className="serif-mark accent">change the cut</span>
          </h2>
          <p className="t-20">
            Same {lakh(totalRtoRupees)}. Same orders. The left column is the axis your courier
            hands you; the right is the one your returns desk already keeps.
          </p>
        </div>

        <div className="flip" ref={ref}>
          <div className="flip-head">
            <h3 className="flip-title">
              {flipped ? 'What your exchange records explain' : 'What your courier tells you'}
            </h3>
            <button
              className={`btn btn-sm ${flipped ? 'btn-ghost' : 'btn-primary'}`}
              onClick={() => {
                setNudged(true);
                setFlipped((v) => !v);
              }}
            >
              {flipped ? 'Back to the courier view' : 'Overlay exchange data'}
            </button>
          </div>

          {!flipped ? (
            <>
              <div>
                {rows.map((c, i) => (
                  <div key={c.code} className={`bar-row ${i === 0 ? 'lead' : ''}`}>
                    <span className="bar-code">{c.code}</span>
                    <div className="bar-track">
                      <div
                        className={`bar-fill ${seen ? 'grow' : ''}`}
                        style={{
                          width: `${(c.rupees / max) * 100}%`,
                          ['--d' as any]: `${i * 70}ms`,
                        }}
                      />
                    </div>
                    <span className="bar-val">{lakh(c.rupees)}</span>
                  </div>
                ))}
              </div>
              <p className="t-14" style={{ marginTop: 22, maxWidth: '62ch' }}>
                Every one of these is a delivery outcome. None is a product defect. The biggest bar,{' '}
                <span className="num" style={{ color: 'var(--ink-2)' }}>REFUSED_COD</span>, is the
                bucket a customer lands in when the size was wrong and they never told you.
              </p>
            </>
          ) : (
            <>
              <div className="split">
                <div className="split-a" style={{ width: `${sizePct}%` }}>
                  {lakh(adjustedRupees)}
                </div>
                <div className="split-b">{lakh(totalRtoRupees - adjustedRupees)} everything else</div>
              </div>

              <p className="t-22" style={{ marginBottom: 8 }}>
                <strong style={{ color: 'var(--accent)' }}>{lakh(adjustedRupees)} of it is fit</strong>{' '}
                — {sizePct.toFixed(0)}% of your RTO cost, recovered from returns you already have.
              </p>

              <div className="method">
                <div className="method-row">
                  <span>Size-reason exchanges, matched to style and cost</span>
                  <b>{lakh(floorRupees)} floor</b>
                </div>
                <div className="method-row">
                  <span>
                    Adjusted for shoppers who never raise one — assumed propensity{' '}
                    {Math.round(propensity * 100)}%, deliberately conservative
                  </span>
                  <b>÷ {propensity.toFixed(2)}</b>
                </div>
                <div className="method-row total">
                  <span>Attributed to size failure</span>
                  <b>{lakh(adjustedRupees)}</b>
                </div>
                <div className="method-row">
                  <span>
                    Styles injected with a bad size chart that this ranking recovers, against a
                    corpus where the answer is known
                  </span>
                  <b style={{ color: 'var(--good)' }}>{Math.round(recall * 100)}% recall</b>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
