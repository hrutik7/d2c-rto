import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Openetra — your RTO is a fit problem',
  description:
    'Eleven courier reason codes, and not one of them can say "ran small". Openetra re-cuts ₹70 lakh of returned freight against your own exchange records.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&family=Instrument+Serif:ital@0;1&display=swap"
        />
        {/* Reveal animations are opt-in: without this flag the page renders
            fully visible, so a failed script never costs anyone the copy. */}
        <script
          dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
