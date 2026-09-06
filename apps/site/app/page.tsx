import diagnosis from '../../../data/diagnosis.json';

import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { Marquee } from './components/Marquee';
import { Problem } from './components/Problem';
import { AxisFlip } from './components/AxisFlip';
import { Stats } from './components/Stats';
import { Steps } from './components/Steps';
import { Transparency } from './components/Transparency';
import { Rings } from './components/Rings';
import { StylesTable } from './components/StylesTable';
import { Faq } from './components/Faq';
import { Cta, Footer } from './components/Closing';

/**
 * The two apps deploy to separate origins — this landing page to the apex, the
 * @rto/web storefront to a subdomain — so every cross-app link is built from
 * one configured origin rather than a relative path.
 *
 *   NEXT_PUBLIC_STORE_URL=https://demo.physisync.co.in
 *
 * NEXT_PUBLIC_* is inlined at BUILD time, not read at runtime, so this has to
 * be set in the build environment. A container started with the right value
 * but built without it still ships localhost.
 */
const STORE_URL = (process.env.NEXT_PUBLIC_STORE_URL ?? 'http://localhost:3000').replace(/\/+$/, '');

const SHOP_URL = `${STORE_URL}/shop`;

/**
 * The catalogue index has no size picker, so it has no try-on. A CTA that
 * promises one has to land on an actual product page, and `#find-my-size`
 * tells widget.js to open the camera straight away rather than leaving the
 * visitor standing next to the button.
 */
const pdp = (styleId: string) => `${SHOP_URL}/${styleId}#find-my-size`;

export default function Page() {
  const d = diagnosis as any;
  const sizePct = (d.adjustedSizeRupees / d.totalRtoRupees) * 100;
  // The worst offender by attributed cost — the page where the offset matters
  // most is the right place to show the offset working.
  const tryOnUrl = pdp(d.styles[0].styleId);

  return (
    <>
      <Nav tryOnUrl={tryOnUrl} />

      <Hero
        totalRtoRupees={d.totalRtoRupees}
        totalRto={d.totalRto}
        totalOrders={d.totalOrders}
      />

      <div className="ticker-band">
        <div className="ticker-label">Every reason code on the manifest</div>
        <Marquee items={d.courierBreakdown.map((c: any) => c.code)} speed={50} />
      </div>

      <Problem codeCount={d.courierBreakdown.length} />

      <AxisFlip
        courier={d.courierBreakdown}
        totalRtoRupees={d.totalRtoRupees}
        floorRupees={d.attributedSizeRupees}
        adjustedRupees={d.adjustedSizeRupees}
        propensity={d.assumedExchangePropensity}
        recall={d.recall}
      />

      <Stats
        stats={[
          { value: d.totalOrders, label: 'Orders in the corpus' },
          { value: (d.totalRto / d.totalOrders) * 100, decimals: 1, suffix: '%', label: 'Came back undelivered' },
          { value: d.totalRtoRupees / 100000, decimals: 1, prefix: '₹', suffix: 'L', label: 'Goods and freight written off' },
          { value: sizePct, decimals: 0, suffix: '%', label: 'Of it attributable to fit', hot: true },
        ]}
      />

      <Steps />
      <Transparency />
      <Rings rings={d.rings} />
      <StylesTable styles={d.styles.slice(0, 12)} pdp={pdp} tryOnUrl={tryOnUrl} />
      <Faq />
      <Cta tryOnUrl={tryOnUrl} />
      <Footer shopUrl={SHOP_URL} tryOnUrl={tryOnUrl} />
    </>
  );
}
