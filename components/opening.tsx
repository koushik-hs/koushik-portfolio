import Image from 'next/image';
import hero from '@/assets/hero-window.webp';
import { OpeningMotion } from './opening-motion';

export function Opening() {
  return (
    <OpeningMotion>
      <div className="opening-pin">
        <div className="opening-stage">
          <div className="opening-portrait">
            <Image src={hero} alt="Koushik HS beside a weathered industrial window" fill
              sizes="(max-width: 700px) 100vw, 86vw" preload />
          </div>
          <div className="opening-panel" aria-hidden="true" />
          <div className="hero-copy">
            <div className="hero-main">
              <p className="label hero-credit"><span /> Koushik HS <i /> Bengaluru, India</p>
              <h1 id="hero-title">I build systems.<br /><em>Then question</em><br />what breaks<span>.</span></h1>
              <p className="hero-description">Backend engineering, security, and the interesting questions beyond the happy path.</p>
              <a className="hero-action label" href="#work"><span aria-hidden="true">↘</span> Explore my work</a>
            </div>
            <div className="hero-foot label" aria-hidden="true">
              <span>Control / Chaos</span><span className="hero-scroll">Scroll to transform ↓</span>
              <span className="hero-figure">Fig. 01 / Koushik HS</span>
            </div>
          </div>
        </div>
        <div className="opening-next">
          <div className="next-content">
            <p className="label editorial-marker"><span>01</span> / Point of view</p>
            <h2>Good software<br />asks <em>better</em><br />questions<span>.</span></h2>
            <p>Most things work on the happy path. I care about what happens beyond it.</p>
          </div>
        </div>
      </div>
    </OpeningMotion>
  );
}
