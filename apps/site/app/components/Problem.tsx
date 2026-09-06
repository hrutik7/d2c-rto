import { Marquee } from './Marquee';
import { Rise } from './Rise';

const MEASURES = ['Bust', 'Waist', 'Hip', 'Shoulder', 'Sleeve', 'Length', 'Rise', 'Inseam', 'Armhole', 'Neck drop'];
const OWNERS = ['Merchandiser', 'Pattern maker', 'Sampling', 'Photoshoot', 'Listing ops', 'Customer care', 'Finance'];

export function Problem({ codeCount }: { codeCount: number }) {
  return (
    <section className="pm" id="leak">
      <div className="grid-bg" />
      <div className="blob" />

      <Marquee items={MEASURES} speed={54} big />

      <div className="wrap pm-in">
        <Rise>
          <div className="eyebrow">The reason code you cannot file</div>
        </Rise>

        <Rise delay={80}>
          <h2 className="t-52">
            <span className="pm-strike">Customer remorse.</span>
            <br />
            Your size chart.
          </h2>
        </Rise>

        <ol className="pm-list">
          <Rise as="li" className="pm-li" delay={140}>
            <span className="pm-num">01</span>
            <span className="pm-glyph">↑</span>
            <p className="pm-text">
              {codeCount} reason codes on the manifest, and not one of them can say{' '}
              <strong>ran small</strong>.
            </p>
          </Rise>
          <Rise as="li" className="pm-li" delay={200}>
            <span className="pm-num">02</span>
            <span className="pm-glyph">⌖</span>
            <p className="pm-text">
              A fit failure reaches you as <strong>REFUSED_COD</strong> — owner listed as checkout,
              marked rarely savable.
            </p>
          </Rise>
          <Rise as="li" className="pm-li" delay={260}>
            <span className="pm-num">03</span>
            <span className="pm-glyph">∅</span>
            <p className="pm-text">
              So the fix gets budgeted as <strong>fraud, freight and address hygiene</strong> — and
              the pattern never changes.
            </p>
          </Rise>
        </ol>

        <Rise delay={320}>
          <p className="t-14" style={{ marginTop: 30, maxWidth: '58ch' }}>
            Nobody in this list owns the number. That is the whole problem.
          </p>
        </Rise>
      </div>

      <Marquee items={OWNERS} speed={44} reverse />
    </section>
  );
}
