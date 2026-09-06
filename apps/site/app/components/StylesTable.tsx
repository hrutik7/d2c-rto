import { Rise } from './Rise';

interface StyleRow {
  styleId: string; styleName: string; rtoCount: number;
  sizeExchangeRate: number; adjustedRupees: number;
  learnedOffsetCm: number; actuallyRunsSmall: boolean;
}

/** The one inverted section — light ground, because this is the worksheet. */
export function StylesTable({ styles, shopUrl }: { styles: StyleRow[]; shopUrl: string }) {
  return (
    <section className="cream-sec" id="styles">
      <div className="wrap">
        <div className="section-head">
          <Rise>
            <div className="eyebrow">Where to fix it</div>
          </Rise>
          <Rise delay={70}>
            <h2 className="t-52" style={{ color: 'var(--cream-ink)' }}>
              Twelve styles carry most of it
            </h2>
          </Rise>
          <Rise delay={140}>
            <p className="t-20">
              Ranked by size-attributed cost. The offset is what the widget applies at the product
              page — a negative number means the garment runs small and the shopper should be sized
              up.
            </p>
          </Rise>
        </div>

        <Rise delay={120}>
          <div className="tbl-wrap">
            <table className="styles">
              <thead>
                <tr>
                  <th>Style</th>
                  <th style={{ textAlign: 'right' }}>RTO</th>
                  <th style={{ textAlign: 'right' }}>Size exch.</th>
                  <th style={{ textAlign: 'right' }}>Attributed</th>
                  <th style={{ textAlign: 'right' }}>Offset</th>
                </tr>
              </thead>
              <tbody>
                {styles.map((s) => (
                  <tr key={s.styleId}>
                    <td>
                      {s.styleName}
                      {s.actuallyRunsSmall && (
                        <span
                          className="tag-small"
                          title="Injected in the synthetic corpus — shown to score the estimator, never used as an input to it"
                        >
                          truly small
                        </span>
                      )}
                    </td>
                    <td className="r">{s.rtoCount}</td>
                    <td className="r">{(s.sizeExchangeRate * 100).toFixed(1)}%</td>
                    <td className="r">₹{Math.round(s.adjustedRupees / 1000)}k</td>
                    <td className={`r ${s.learnedOffsetCm > 0 ? 'off-pos' : 'off-nil'}`}>
                      {s.learnedOffsetCm > 0 ? `−${s.learnedOffsetCm.toFixed(1)}cm` : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Rise>

        <Rise delay={180}>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center', marginTop: 26 }}>
            <a href={shopUrl} className="btn btn-cream">
              See the offset on a live product page
            </a>
            <p className="t-12" style={{ maxWidth: '46ch' }}>
              <strong style={{ color: '#a8571a' }}>Truly small</strong> is ground truth from the
              generator, shown only to validate the estimate. The model never sees it.
            </p>
          </div>
        </Rise>
      </div>
    </section>
  );
}
