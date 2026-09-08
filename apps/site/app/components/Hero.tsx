'use client';

import { useEffect, useState } from 'react';

import { VideoDemo } from './VideoDemo';

const TYPED = [
  'select reason_code, sum(cogs) from rto group by 1;',
  '-- 11 codes. none of them say "ran small".',
  'join exchanges on order_id where reason = SIZE;',
  '→ ₹8.5L was fit. filed as remorse.',
];

/** Types one line, holds, deletes, moves on. The hero's only loop. */
function Typer() {
  const [line, setLine] = useState(0);
  const [len, setLen] = useState(0);
  const [back, setBack] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setLen(TYPED[0].length);
      return;
    }
    const full = TYPED[line];
    if (!back && len === full.length) {
      const t = setTimeout(() => setBack(true), 2000);
      return () => clearTimeout(t);
    }
    if (back && len === 0) {
      setBack(false);
      setLine((l) => (l + 1) % TYPED.length);
      return;
    }
    const t = setTimeout(() => setLen((n) => n + (back ? -1 : 1)), back ? 18 : 42);
    return () => clearTimeout(t);
  }, [len, back, line]);

  const txt = TYPED[line].slice(0, len);
  const isResult = TYPED[line].startsWith('→');

  return (
    <div className="typer">
      <span className="typer-txt" style={isResult ? { color: 'var(--accent-2)' } : undefined}>
        {txt}
        <i className="cursor" />
      </span>
      <span className="chip hot">live query</span>
    </div>
  );
}

export function Hero({
  totalRtoRupees,
  totalRto,
  totalOrders,
}: {
  totalRtoRupees: number;
  totalRto: number;
  totalOrders: number;
}) {
  const lakhs = (totalRtoRupees / 100000).toFixed(1);

  return (
    <header className="hero" id="top">
      <div className="blob" />
      <div className="grid-bg" />

      <div className="wrap hero-in">
        <div className="chips lift">
          <span className="chip">Kaira · womenswear</span>
          <span className="chip">12 months to Sep 2026</span>
          <span className="chip hot">synthetic corpus</span>
        </div>

        <h1 className="t-72 lift" style={{ ['--d' as any]: '90ms' }}>
          Where the <span className="num accent">₹{lakhs}L</span> actually goes.
        </h1>

        <p className="t-20 hero-sub lift" style={{ ['--d' as any]: '190ms' }}>
          {totalRto.toLocaleString('en-IN')} of {totalOrders.toLocaleString('en-IN')} orders came
          back before anyone opened them. Your courier files it as remorse. Your own exchange
          records say a{' '}
          <span className="serif-mark" style={{ color: 'var(--ink)' }}>
            twelfth
          </span>{' '}
          of it is a size chart that runs small.
        </p>

        <div className="lift" style={{ ['--d' as any]: '290ms' }}>
          <Typer />
        </div>

        <div className="hero-cta lift" style={{ ['--d' as any]: '380ms' }}>
          <a href="#leak" className="btn btn-primary">
            Show me the re-cut
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path d="M7 2v10M3 8l4 4 4-4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a href="#how" className="btn btn-ghost">
            How the attribution works
          </a>
          <span className="hero-note">No courier integration required</span>
        </div>

        <div className="lift" style={{ ['--d' as any]: '470ms' }}>
          <VideoDemo id="yl06MAjIWSE" title="Physisync — fit-attributed RTO, end to end" label="2 min demo" />
        </div>
      </div>
    </header>
  );
}
