import type { Metadata } from 'next';
import { DocShell } from '../components/DocShell';
import { COMPANY } from '../lib/urls';

export const metadata: Metadata = {
  title: `About ${COMPANY.name} — the company behind fit-attributed RTO`,
  description: `${COMPANY.name} builds the accuracy layer that stops apparel returns before dispatch: fit attribution on a brand's own order history, a size picker that applies a learned offset, and pre-dispatch confirmation over WhatsApp and voice.`,
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <DocShell
      eyebrow="Company"
      title={`About ${COMPANY.name}`}
      standfirst="We build the accuracy layer that stops apparel returns before the parcel leaves the warehouse."
    >
      <h2>What we do</h2>
      <p>
        In Indian direct-to-consumer apparel, a large share of cash-on-delivery orders comes back
        to the seller as RTO — return to origin. The brand pays freight in both directions, carries
        the stock lock-up, and learns nothing from it, because a courier manifest has around eleven
        reason codes and not one of them can say <em>it ran small</em>. A size failure is filed as a
        refused delivery, so the money gets budgeted against fraud and address hygiene, and the
        pattern that caused it never changes.
      </p>
      <p>
        {COMPANY.name} re-cuts that spend against the brand&rsquo;s own records. The attribution runs on
        order history, exchange reasons and size charts a brand already has — no courier
        integration, no manifest change, no re-tagging of historical orders — and returns a ranked
        list of styles whose size charts are provably wrong, each with a rupee figure attached.
      </p>
      <p>
        The correction then lands where the mistake is actually made. Each style earns a learned
        centimetre offset that the size picker applies before checkout, with optional camera-based
        body measurement that runs on the shopper&rsquo;s own device. What sizing cannot catch is caught
        before dispatch: a WhatsApp confirmation on high-risk orders, and a Hinglish voice call when
        that goes unanswered. Both fire before pickup, which is where the economics are — a
        cancellation before dispatch costs nothing, an RTO costs two legs of freight.
      </p>

      <h2>How we build</h2>
      <ul>
        <li>
          <strong>Nothing new to instrument.</strong> Every number we produce comes from data the
          brand already owns. If a claim needs a new integration to be true, it is not our claim.
        </li>
        <li>
          <strong>Measurement stays on the device.</strong> Camera sizing runs in the browser. Body
          imagery is not uploaded and not stored.
        </li>
        <li>
          <strong>The numbers carry their assumptions.</strong> Our published figures come from a
          synthetic corpus with a retained answer key, and the site says so on the page where the
          figures appear. We would rather be checkable than impressive.
        </li>
      </ul>

      <h2>Company details</h2>
      <div className="id-card">
        <div className="id-row">
          <div className="id-k">Company</div>
          <div className="id-v">{COMPANY.name}</div>
        </div>
        <div className="id-row">
          <div className="id-k">Website</div>
          <div className="id-v">
            <a href={`https://${COMPANY.domain}`}>{COMPANY.domain}</a>
          </div>
        </div>
        <div className="id-row">
          <div className="id-k">Contact</div>
          <div className="id-v">
            <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
          </div>
        </div>
        <div className="id-row">
          <div className="id-k">Based in</div>
          <div className="id-v">{COMPANY.country}</div>
        </div>
        <div className="id-row">
          <div className="id-k">Sector</div>
          <div className="id-v">Retail technology — returns and fit accuracy for D2C apparel</div>
        </div>
      </div>

      <h2>Get in touch</h2>
      <p>
        Brand teams looking at their own RTO line, and anyone who wants the method walked through in
        detail, can write to <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>. The working
        demo — attribution, size picker and pre-dispatch confirmation, end to end — is linked from
        every page of this site.
      </p>
    </DocShell>
  );
}
