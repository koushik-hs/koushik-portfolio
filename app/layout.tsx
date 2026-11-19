import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import { Navigation } from '@/components/navigation';
import { emailLink, siteDescription, siteUrl } from '@/lib/site';
import './globals.css';

const serif = localFont({
  src: [
    { path: '../node_modules/@fontsource/instrument-serif/files/instrument-serif-latin-400-normal.woff2', weight: '400' },
    { path: '../node_modules/@fontsource/instrument-serif/files/instrument-serif-latin-400-italic.woff2', weight: '400', style: 'italic' },
  ],
  variable: '--serif',
  display: 'swap',
});
const sans = localFont({
  src: '../node_modules/@fontsource-variable/instrument-sans/files/instrument-sans-latin-wght-normal.woff2',
  variable: '--sans',
  display: 'swap',
});

export const viewport: Viewport = { themeColor: '#100e0d' };

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl ?? "http://localhost:3000"),
  title: { default: 'Koushik HS — Control / Chaos', template: '%s — Koushik HS' },
  description: siteDescription,
  openGraph: {
    title: 'Koushik HS — Control / Chaos',
    description: siteDescription,
    siteName: 'Control / Chaos',
    type: 'website',
    images: [{ url: '/og.jpg', width: 1200, height: 630, alt: 'Control / Chaos, a portfolio by Koushik HS' }],
  },
  twitter: { card: 'summary_large_image' },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body id="top">
        <a href="#main" className="skip-link">Skip to content</a>
        <Navigation contact={emailLink} />
        {children}
      </body>
    </html>
  );
}
