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

/** The storefront lives in @rto/web on 3000; override for a deployed origin. */
const SHOP_URL = process.env.NEXT_PUBLIC_SHOP_URL ?? 'http://localhost:3000/shop';

export default function Page() {
  const d = diagnosis as any;
  const sizePct = (d.adjustedSizeRupees / d.totalRtoRupees) * 100;

  return (
    <>
      <Nav shopUrl={SHOP_URL} />

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
      <StylesTable styles={d.styles.slice(0, 12)} shopUrl={SHOP_URL} />
      <Faq />
      <Cta shopUrl={SHOP_URL} />
      <Footer shopUrl={SHOP_URL} />
    </>
  );
}
