import type { Metadata } from 'next';
import { About } from '@/components/about';
import { Contact } from '@/components/contact';
import { Gallery } from '@/components/gallery';
import { Opening } from '@/components/opening';
import { siteUrl } from '@/lib/site';

export const metadata: Metadata = { alternates: siteUrl ? { canonical: '/' } : undefined };

export default function Home() {
  return (
    <>
      <main id="main" tabIndex={-1}>
        <Opening />
        <section className="approach shell" aria-labelledby="approach-title">
          <div className="approach-inner">
            <h2 id="approach-title">Curiosity with<br /><em>consequences.</em></h2>
            <p>I work where software engineering meets security. After the first successful build, I want to know who has access, what happens under pressure, and which assumptions survive contact with reality.</p>
          </div>
        </section>
        <Gallery />
        <About />
      </main>
      <Contact />
    </>
  );
}
