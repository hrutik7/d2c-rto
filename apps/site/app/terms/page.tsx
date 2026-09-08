import type { Metadata } from 'next';
import { DocShell } from '../components/DocShell';
import { COMPANY } from '../lib/urls';

export const metadata: Metadata = {
  title: `Terms of Use — ${COMPANY.name}`,
  description: `The terms that govern use of the ${COMPANY.name} website and demonstration storefront.`,
  alternates: { canonical: '/terms' },
};

/*
 * TEMPLATE — reviewed by a lawyer before it means anything. These terms cover
 * the public site and the demo only; a customer engagement runs on a signed
 * agreement, not on this page.
 */

const UPDATED = 'September 2026';

export default function TermsPage() {
  return (
    <DocShell
      eyebrow="Legal"
      title="Terms of Use"
      standfirst="The terms that govern this website and the public demonstration. Customer engagements run on a separate signed agreement."
    >
      <p><strong>Last updated:</strong> {UPDATED}</p>

      <h2>1. These terms</h2>
      <p>
        By using <a href={`https://${COMPANY.domain}`}>{COMPANY.domain}</a> or the demonstration
        storefront linked from it, you agree to these terms. If you are evaluating {COMPANY.name} on
        behalf of a company, you confirm you are authorised to do so.
      </p>

      <h2>2. What the site is</h2>
      <p>
        This site explains our product and shows a working demonstration of it. The storefront, the
        brand and the catalogue in that demonstration are <strong>fictional</strong>, built to
        exercise the fit layer. No goods are offered for sale, no order placed in the demonstration
        will be fulfilled, and no payment is taken.
      </p>

      <h2>3. The figures we publish</h2>
      <p>
        Financial and accuracy figures shown on this site are derived from a synthetic corpus of
        orders generated for this project, in which a known set of styles was deliberately given a
        faulty size chart so the attribution could be scored against an answer key. They are stated
        as such on the pages where they appear. They illustrate a method; they are not a forecast of
        the result on any particular catalogue, and nothing here is a guarantee of savings.
      </p>

      <h2>4. Acceptable use</h2>
      <ul>
        <li>Do not attempt to breach, probe or disrupt the service or its infrastructure.</li>
        <li>Do not scrape, resell or systematically extract the content or the demonstration data.</li>
        <li>Do not reverse engineer the widget or the models beyond what applicable law permits.</li>
        <li>Do not upload another person&rsquo;s image or personal data to the demonstration.</li>
      </ul>

      <h2>5. Intellectual property</h2>
      <p>
        The software, models, copy, design and marks on this site belong to {COMPANY.name} or its
        licensors. Using the site grants you no licence to them beyond viewing the site as intended.
      </p>

      <h2>6. Third-party services</h2>
      <p>
        The demonstration uses third-party infrastructure and communications providers, and may link
        to sites we do not control. We are not responsible for the content or practices of those
        sites.
      </p>

      <h2>7. No warranty</h2>
      <p>
        The site and the demonstration are provided &ldquo;as is&rdquo;. To the fullest extent permitted by
        law we disclaim implied warranties of merchantability, fitness for a particular purpose and
        non-infringement, and we do not warrant that the site will be uninterrupted or error-free.
      </p>

      <h2>8. Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, {COMPANY.name} is not liable for indirect,
        incidental, special or consequential loss, or for loss of profit, revenue or data, arising
        from use of this site or the demonstration. Nothing in these terms excludes liability that
        cannot lawfully be excluded.
      </p>

      <h2>9. Privacy</h2>
      <p>
        Our handling of personal data is described in the <a href="/privacy">Privacy Policy</a>,
        which forms part of these terms.
      </p>

      <h2>10. Changes</h2>
      <p>
        We may update these terms; the date above shows when they last changed. Continued use of the
        site after a change means you accept the revised terms.
      </p>

      <h2>11. Governing law</h2>
      <p>
        These terms are governed by the laws of {COMPANY.country}, and the courts of
        {' '}{COMPANY.country} have exclusive jurisdiction over any dispute arising from them.
      </p>

      <h2>12. Contact</h2>
      <p>
        Questions about these terms go to <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>.
      </p>
    </DocShell>
  );
}
