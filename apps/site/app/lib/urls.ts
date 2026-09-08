import diagnosis from '../../../../data/diagnosis.json';

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

export const SHOP_URL = `${STORE_URL}/shop`;

/**
 * The catalogue index has no size picker, so it has no try-on. A CTA that
 * promises one has to land on an actual product page, and `#find-my-size`
 * tells widget.js to open the camera straight away rather than leaving the
 * visitor standing next to the button.
 */
export const pdp = (styleId: string) => `${SHOP_URL}/${styleId}#find-my-size`;

/** The worst offender by attributed cost — where the offset matters most. */
export const TRY_ON_URL = pdp((diagnosis as any).styles[0].styleId);

/** Public company identity. Kept in one place so the site cannot disagree with itself. */
export const COMPANY = {
  name: 'Physisync',
  domain: 'physisync.co.in',
  email: 'hrutik@physisync.co.in',
  country: 'India',
} as const;
