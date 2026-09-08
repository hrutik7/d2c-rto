import type { Metadata } from 'next';
import { DocShell } from '../components/DocShell';
import { COMPANY } from '../lib/urls';

export const metadata: Metadata = {
  title: `Privacy Policy — ${COMPANY.name}`,
  description: `How ${COMPANY.name} handles personal data on this site, in the sizing widget, and in pre-dispatch confirmation over WhatsApp and voice.`,
  alternates: { canonical: '/privacy' },
};

/*
 * TEMPLATE — reviewed by a lawyer before it means anything.
 *
 * Written to describe what the product actually does today. Two things must be
 * filled in once the entity paperwork exists: the registered legal name and
 * address, and a named grievance officer under the DPDP Act. Both belong in
 * the identity block at the foot of this page.
 */

const UPDATED = 'September 2026';

export default function PrivacyPage() {
  return (
    <DocShell
      eyebrow="Legal"
      title="Privacy Policy"
      standfirst={`How we handle personal data across this website, the ${COMPANY.name} sizing widget, and pre-dispatch confirmation.`}
    >
      <p><strong>Last updated:</strong> {UPDATED}</p>

      <h2>Who we are</h2>
      <p>
        {COMPANY.name} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) provides fit-accuracy and returns-reduction software to
        apparel brands. This policy covers <a href={`https://${COMPANY.domain}`}>{COMPANY.domain}</a>,
        our demonstration storefront, and the sizing widget where it is embedded on a brand&rsquo;s site.
      </p>
      <p>
        Where we process shopper data on behalf of a brand that has engaged us, that brand is the
        data fiduciary and we act as its processor under the brand&rsquo;s instructions and our contract
        with them. This policy describes what we do in that role; the brand&rsquo;s own privacy notice
        governs its relationship with its customers.
      </p>

      <h2>What we process</h2>
      <h3>This website</h3>
      <p>
        The marketing site does not require an account and does not run advertising trackers. We
        collect aggregate, non-identifying request data — pages viewed, referrer, coarse region,
        device class — to understand what people read. If you email us, we hold that correspondence.
      </p>

      <h3>The sizing widget</h3>
      <p>
        When a shopper uses camera-based measurement, the camera stream and the pose estimation
        derived from it are processed <strong>on the shopper&rsquo;s own device, in the browser</strong>.
        Images and video are not uploaded to us and are not stored. What may leave the device are
        the derived measurements needed to make a recommendation — for example an estimated chest or
        shoulder measurement in centimetres, the recommended size, and whether the recommendation was
        followed. Shoppers who do not want to use the camera can get a recommendation from the
        cross-brand path (&ldquo;I am an M in another brand&rdquo;) instead, or skip the widget entirely.
      </p>

      <h3>Pre-dispatch confirmation</h3>
      <p>
        For brands that enable it, an order flagged as high fit-risk triggers a confirmation message
        on WhatsApp, and a voice call if that goes unanswered. To do this we process the order
        details and the contact phone number supplied by the brand, the delivery status of the
        message, the reply, and — for calls — the outcome, duration and, where the brand has enabled
        it and the applicable notice has been given, a recording or transcript. These messages are
        transactional: they confirm an order the shopper has already placed. They are not marketing.
      </p>

      <h2>Why we process it, and on what basis</h2>
      <ul>
        <li><strong>To give a size recommendation</strong> the shopper asked for, when they engaged the widget.</li>
        <li><strong>To confirm an order before dispatch</strong>, on the brand&rsquo;s instruction, as part of fulfilling the purchase.</li>
        <li><strong>To improve accuracy</strong> — learning the per-style offset from aggregate outcomes, so the next shopper gets a better answer.</li>
        <li><strong>To run and secure the service</strong>, including logs kept for reliability and abuse prevention.</li>
      </ul>

      <h2>Who we share it with</h2>
      <p>
        We share personal data only with the brand whose order it is, and with the infrastructure and
        communications providers needed to deliver the service — cloud hosting and database
        providers, and the messaging and voice providers that carry the WhatsApp message and the
        call. They act on our instructions and are bound to protect the data. We do not sell personal
        data, and we do not share it for third-party advertising.
      </p>

      <h2>Where it is held, and for how long</h2>
      <p>
        We host in {COMPANY.country} where the brand&rsquo;s arrangement calls for it, so that customer
        data stays in-region. Order and confirmation records are retained for as long as the brand
        engagement requires and then deleted or aggregated beyond identification. Derived
        measurements are retained in aggregate for model accuracy; the camera imagery they came from
        never reaches us in the first place.
      </p>

      <h2>Your rights</h2>
      <p>
        Subject to applicable law, including India&rsquo;s Digital Personal Data Protection Act, you may
        ask for access to your personal data, correction of it, erasure, or withdrawal of a consent
        you previously gave, and you may raise a grievance about how we have handled it. Write to
        <a href={`mailto:${COMPANY.email}`}> {COMPANY.email}</a> and we will respond within the period
        the law allows. If the data was collected through a brand&rsquo;s storefront, we may need to route
        the request to that brand as the fiduciary, and we will tell you when we do.
      </p>

      <h2>Children</h2>
      <p>The service is not directed at children, and we do not knowingly process their data.</p>

      <h2>Changes</h2>
      <p>
        If this policy changes materially we will update the date at the top and, where the change
        affects an active engagement, tell the brands concerned directly.
      </p>

      <h2>Contact</h2>
      <div className="id-card">
        <div className="id-row">
          <div className="id-k">Company</div>
          <div className="id-v">{COMPANY.name}</div>
        </div>
        <div className="id-row">
          <div className="id-k">Privacy contact</div>
          <div className="id-v"><a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a></div>
        </div>
        <div className="id-row">
          <div className="id-k">Jurisdiction</div>
          <div className="id-v">{COMPANY.country}</div>
        </div>
      </div>
    </DocShell>
  );
}
