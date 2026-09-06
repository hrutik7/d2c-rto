'use client';

import { useCountUp, useInView } from '../lib/hooks';

interface Stat { value: number; decimals?: number; prefix?: string; suffix?: string; label: string; hot?: boolean }

function Cell({ s, run }: { s: Stat; run: boolean }) {
  const v = useCountUp(s.value, run, 1900);
  const txt =
    s.decimals != null
      ? v.toFixed(s.decimals)
      : Math.floor(v).toLocaleString('en-IN');
  return (
    <div className="stat">
      <div className={`stat-val ${s.hot ? 'hot' : ''}`}>
        {s.prefix}
        {txt}
        {s.suffix}
      </div>
      <div className="stat-label">{s.label}</div>
    </div>
  );
}

export function Stats({ stats }: { stats: Stat[] }) {
  const [ref, seen] = useInView<HTMLDivElement>(0.3);
  return (
    <section className="section stats">
      <div className="wrap">
        <div className="stat-grid" ref={ref}>
          {stats.map((s) => (
            <Cell key={s.label} s={s} run={seen} />
          ))}
        </div>
      </div>
    </section>
  );
}
