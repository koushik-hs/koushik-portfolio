import Link from 'next/link';
import { projects, projectHref } from '@/lib/projects';
import { ProjectArt } from './project-art';

export function Gallery() {
  return (
    <section className="work shell" id="work" aria-labelledby="work-title" tabIndex={-1}>
      <div className="section-line label"><span><b>02</b> / Selected work</span><span>2025–2026</span></div>
      <div className="work-heading">
        <h2 id="work-title">A little order.<br /><em>A lot of questions.</em></h2>
        <p>Four projects exploring who gets access, what connects the dots, and how systems behave under pressure.</p>
      </div>
      <ul className="project-prints">
        {projects.map((project, index) => (
          <li key={project.slug}>
            <Link className="project-print" href={projectHref(project)}>
              <ProjectArt index={index} />
              <div className="print-meta">
                <span className="label">{project.category.split(' / ')[1]}</span>
                <strong>{project.title}</strong><span className="print-arrow" aria-hidden="true">↗︎</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <div className="work-directory">
        {projects.map((project, index) => (
          <Link href={projectHref(project)} className="work-row" key={project.slug}>
            <span className="label">0{index + 1}</span>
            <h3>{project.title}</h3>
            <p>{project.summary}</p>
            <span className="work-arrow" aria-hidden="true">↗︎</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
