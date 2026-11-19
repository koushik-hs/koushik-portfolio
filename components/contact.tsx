import { contactEmail, emailLink, github, resumeUrl } from '@/lib/site';

export function Contact() {
  return (
    <footer className="contact shell" id="contact" tabIndex={-1}>
      <div className="section-line label"><span>04 / Contact</span><span>Bengaluru, India</span></div>
      <h2>Good systems start<br />with <em>good</em> questions<span>.</span></h2>
      <div className="contact-links label">
        <a className="contact-email" href={emailLink}>{contactEmail} <span aria-hidden="true">↗︎</span></a>
        <a href={github}>Find me on GitHub <span aria-hidden="true">↗︎</span></a>
        <a href={resumeUrl}>View résumé <span aria-hidden="true">↗︎</span></a>
      </div>
      <div className="contact-foot label"><span>Koushik HS © 2026</span><a href="#top">Back to top ↑</a></div>
    </footer>
  );
}
