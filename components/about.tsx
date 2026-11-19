import Image from 'next/image';
import sunset from '@/assets/about-sunset.webp';
import gesture from '@/assets/gesture-sky.webp';
import { github, resumeUrl } from '@/lib/site';

export function About() {
  return (
    <section className="about" id="about" aria-labelledby="about-title" tabIndex={-1}>
      <div className="about-picture">
        <Image src={sunset} alt="Koushik in a cream shirt at sunset" sizes="(max-width: 760px) 100vw, 50vw" fill />
        <span className="label about-photo-label">Fig. 02 / Outside the editor</span>
      </div>
      <div className="about-content">
        <div className="section-line label"><span><b>03</b> / About</span><span>Bengaluru, IN</span></div>
        <h2 id="about-title">An engineer.<br /><em>Beyond the code.</em></h2>
        <p>I’m Koushik HS, a final-year computer science student at BMSCE in Bengaluru. I build backend systems and look closely at the decisions that make them dependable, from tenant boundaries to what teams can see when something goes wrong.</p>
        <p>Outside the editor, you’ll usually find me exploring somewhere new, working out, or getting unnecessarily invested in cricket.</p>
        <details className="gesture">
          <summary className="label">
            <span className="gesture-mark" aria-hidden="true">↗︎</span>
            <span className="gesture-open">A less serious side</span>
            <span className="gesture-close">Close the frame</span>
          </summary>
          <figure className="gesture-card">
            <Image src={gesture} alt="Koushik reaching toward the camera against a blue sky" width={960} height={1280} sizes="(max-width: 760px) 62vw, 260px" />
            <figcaption className="label">Fig. 03 / A change of perspective</figcaption>
          </figure>
        </details>
        <div className="about-links label">
          <a href={github}>Explore GitHub <span aria-hidden="true">↗︎</span></a>
          <a href={resumeUrl}>View résumé <span aria-hidden="true">↗︎</span></a>
        </div>
      </div>
    </section>
  );
}
