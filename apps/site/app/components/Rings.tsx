import { Rise } from './Rise';

interface RingDetail { ringId: string; members: number; orders: number; rtoCount: number; rtoRate: number; rupees: number }

/**
 * The second thing the re-cut surfaces. Not the pitch — the proof that the
 * same join keeps paying out.
 */
export function Rings({
  rings,
}: {
  rings: {
    count: number; members: number; households: number; orders: number;
    rtoCount: number; rtoRate: number; baselineRtoRate: number; rupees: number;
    detail: RingDetail[];
  };
}) {
  const lift = rings.rtoRate / rings.baselineRtoRate;

  return (
    <section className="section" style={{ background: 'var(--ground-2)', borderBlock: '1px solid var(--line-2)' }}>
      <div className="wrap">
        <div className="section-head">
          <Rise>
            <div className="eyebrow dim">And while we were in there</div>
          </Rise>
          <Rise delay={70}>
            <h2 className="t-36">
              {rings.count} address clusters returning at{' '}
              <span className="accent num">{Math.round(rings.rtoRate * 100)}%</span>
            </h2>
          </Rise>
          <Rise delay={140}>
            <p className="t-16">
              {rings.members} customer identities across {rings.households.toLocaleString('en-IN')}{' '}
              households, {rings.orders} orders, ₹{(rings.rupees / 100000).toFixed(1)}L written off —
              returning at <strong style={{ color: 'var(--ink)' }}>{lift.toFixed(1)}×</strong> the{' '}
              {Math.round(rings.baselineRtoRate * 100)}% baseline. These are not fit failures. They
              are the same graph, asked a different question.
            </p>
          </Rise>
        </div>

        <div className="ring-grid">
          {rings.detail.slice(0, 4).map((r, i) => (
            <Rise key={r.ringId} className="ring-card" delay={i * 80}>
              <div className="ring-id">{r.ringId}</div>
              <div className="ring-rate num">{Math.round(r.rtoRate * 100)}%</div>
              <div className="t-12">
                {r.members} identities · {r.orders} orders · ₹{Math.round(r.rupees / 1000)}k
              </div>
            </Rise>
          ))}
        </div>
      </div>
    </section>
  );
}
