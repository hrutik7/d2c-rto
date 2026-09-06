'use client';

import { useEffect, useRef, useState } from 'react';
import { Rise } from './Rise';
import { useInView } from '../lib/hooks';

const STEPS = [
  {
    t: 'Learn',
    d: 'Read what the brand already produces. No new instrumentation, no courier integration, no tagging pass over historical orders.',
    chips: ['Order history', 'Exchange reasons', 'Size charts', 'SKU specs', 'Courier codes', 'Pose captures'],
  },
  {
    t: 'Attribute',
    d: 'Per style, take the size-reason exchange rate off delivered orders and carry it onto that style’s RTO at its own cost of goods.',
    chips: ['Per-style rate', 'Propensity adjust', 'COGS + 2-way freight', 'Rank by rupees'],
  },
  {
    t: 'Correct',
    d: 'Convert the leak into a centimetre offset and apply it where the mistake is actually made — at the size picker, before checkout.',
    chips: ['Learned offset', 'Size picker', 'Try-on pose', 'PDP widget'],
  },
  {
    t: 'Verify',
    d: 'Score the ranking against styles known to run small, then watch the corrected styles’ RTO rate separate from the rest.',
    chips: ['Recall vs truth', 'RTO delta', 'Exchange decay', 'Holdout styles'],
  },
];

const INTERVAL = 5000;

export function Steps() {
  const [ref, seen] = useInView<HTMLDivElement>(0.35);
  const [active, setActive] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const start = () => {
    if (timer.current) clearInterval(timer.current);
    timer.current = setInterval(() => setActive((i) => (i + 1) % STEPS.length), INTERVAL);
  };

  useEffect(() => {
    if (!seen) return;
    start();
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [seen]);

  const pick = (i: number) => {
    setActive(i);
    start();
  };

  return (
    <section className="section" id="how">
      <div className="wrap">
        <div className="section-head">
          <Rise>
            <div className="eyebrow">How it works</div>
          </Rise>
          <Rise delay={70}>
            <h2 className="t-52">Four passes over data you already own</h2>
          </Rise>
          <Rise delay={140}>
            <p className="t-20">
              Nothing here asks the shopper for anything, and nothing waits on a courier to add a
              reason code they have no way to observe.
            </p>
          </Rise>
        </div>

        <div ref={ref}>
          <div className="rail">
            <div
              className="rail-fill"
              style={{ width: `${((active + 1) / STEPS.length) * 100}%` }}
            />
          </div>

          <div className="steps">
            {STEPS.map((s, i) => (
              <div
                key={s.t}
                className={`step ${i === active ? 'on' : 'off'}`}
                onClick={() => pick(i)}
                onMouseEnter={() => pick(i)}
              >
                <div className="step-n">{String(i + 1).padStart(2, '0')}</div>
                <div className="step-t">{s.t}</div>
                <div className="step-d">{s.d}</div>
                <div className="step-chips">
                  {s.chips.map((c) => (
                    <span key={c} className="step-chip">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
