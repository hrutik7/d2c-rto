import { Rise } from './Rise';

const ITEMS = [
  {
    h: 'Every rupee traces to an order',
    p: 'Click any style and the number decomposes into the exchanges that produced it — order id, size ordered, size kept, reason string.',
  },
  {
    h: 'The estimate is deliberately low',
    p: 'A 35% exchange propensity is the conservative end of the range. Raise it and the attributed figure goes up, not down. We show the floor.',
  },
  {
    h: 'Ground truth is never an input',
    p: 'Styles injected with a bad chart are marked in the table only to score the estimator. The attribution never sees the flag.',
  },
];

/** Static SVG, animated by CSS: dashed edges flow, nodes breathe. */
function FlowDiagram() {
  const node = (x: number, y: number, label: string, hot = false) => (
    <g key={label}>
      <rect
        x={x} y={y} width="132" height="38" rx="9"
        fill={hot ? 'rgba(255,88,0,0.13)' : 'rgba(255,255,255,0.035)'}
        stroke={hot ? 'var(--accent-line)' : 'var(--line)'}
      />
      <text
        x={x + 66} y={y + 23} textAnchor="middle"
        fontFamily="var(--mono)" fontSize="10.5"
        letterSpacing="0.08em"
        fill={hot ? 'var(--accent-2)' : 'var(--ink-3)'}
      >
        {label}
      </text>
    </g>
  );

  return (
    <div className="flow-card">
      <svg viewBox="0 0 420 300" width="100%" role="img" aria-label="Attribution flow: orders and exchanges resolve to a per-style centimetre offset.">
        <g stroke="var(--line)" strokeWidth="1.4" fill="none">
          <path d="M76 58 V 96 H 210 V 128" />
          <path d="M344 58 V 96 H 210 V 128" />
          <path d="M210 166 V 208" />
          <path d="M210 246 V 262" />
        </g>
        <g className="flow-edge" stroke="var(--accent)" strokeWidth="1.6" fill="none" opacity="0.9">
          <path d="M76 58 V 96 H 210 V 128" />
          <path d="M344 58 V 96 H 210 V 128" />
          <path d="M210 166 V 208" />
        </g>

        {node(10, 20, 'RTO ORDERS')}
        {node(278, 20, 'EXCHANGES')}
        <g className="flow-node">{node(144, 128, 'ATTRIBUTION', true)}</g>
        {node(144, 208, 'OFFSET cm', true)}

        <text x="210" y="286" textAnchor="middle" fontFamily="var(--mono)" fontSize="10" letterSpacing="0.12em" fill="var(--ink-3)">
          → SIZE PICKER
        </text>
      </svg>
    </div>
  );
}

export function Transparency() {
  return (
    <section className="section">
      <div className="wrap">
        <div className="section-head">
          <Rise>
            <div className="eyebrow">Transparent by construction</div>
          </Rise>
          <Rise delay={70}>
            <h2 className="t-52">See why every rupee was attributed</h2>
          </Rise>
        </div>

        <div className="trans-grid">
          <div>
            {ITEMS.map((it, i) => (
              <Rise key={it.h} className="trans-item" delay={i * 90}>
                <h3>{it.h}</h3>
                <p className="t-14">{it.p}</p>
              </Rise>
            ))}
          </div>
          <Rise delay={120}>
            <FlowDiagram />
          </Rise>
        </div>
      </div>
    </section>
  );
}
