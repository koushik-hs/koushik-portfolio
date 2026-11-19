import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ProjectArt } from '@/components/project-art';
import { projects, projectHref, repoHref } from '@/lib/projects';
import { siteUrl } from '@/lib/site';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    alternates: siteUrl ? { canonical: projectHref(project) } : undefined,
    openGraph: {
      type: 'article',
      title: `${project.title} — Koushik HS`,
      description: project.summary,
      url: siteUrl ? projectHref(project) : undefined,
      images: [{ url: '/og.jpg', width: 1200, height: 630, alt: 'Control / Chaos, a portfolio by Koushik HS' }],
    },
  };
}

export default async function CaseStudy({ params }: Props) {
  const { slug } = await params;
  const index = projects.findIndex((project) => project.slug === slug);
  if (index === -1) notFound();
  const project = projects[index];
  const next = projects[(index + 1) % projects.length];
  const repository = repoHref(project);

  return (
    <main id="main" tabIndex={-1} className="case">
      <header className="case-header shell">
        <Link href="/#work" className="label case-back">← Selected work</Link>
        <div className="case-hero">
          <div>
            <p className="label case-category"><b>0{index + 1}</b> / {project.category}</p>
            <h1>{project.title}<span>.</span></h1>
            <p className="case-summary">{project.summary}</p>
            {repository && <a className="case-repo label" href={repository}>View repository <span aria-hidden="true">↗︎</span></a>}
          </div>
          <ProjectArt index={index} />
        </div>
      </header>
      <div className="case-body shell">
        <section className="case-section">
          <h2 className="label"><b>01</b> / The problem</h2>
          <div><h3>{project.question}</h3><p>{project.problem}</p></div>
        </section>
        <section className="case-section">
          <h2 className="label"><b>02</b> / Overview</h2>
          <div>
            <p>{project.overview}</p>
            <ul className="stack flex flex-wrap">{project.stack.map((technology) => <li className="label" key={technology}>{technology}</li>)}</ul>
          </div>
        </section>
        <section className="case-section">
          <h2 className="label"><b>03</b> / {project.outputs.length ? 'Architecture' : 'Demonstration flow'}</h2>
          <figure className="system-figure">
            <figcaption>{project.evidence}</figcaption>
            <ol className="flow-list">
              {project.flow.map((stage, step) => (
                <li key={stage.title}><span className="label">0{step + 1}</span><div><strong>{stage.title}</strong><p>{stage.detail}</p></div></li>
              ))}
            </ol>
            {project.outputs.length > 0 && (
              <ul className="flow-outputs">
                {project.outputs.map((stage) => <li key={stage.title}><strong>{stage.title}</strong><p>{stage.detail}</p></li>)}
              </ul>
            )}
          </figure>
        </section>
        <section className="case-section">
          <h2 className="label"><b>04</b> / Decisions</h2>
          <div className="decision-list">
            {project.decisions.map((decision) => <div key={decision.title}><h3>{decision.title}</h3><p>{decision.text}</p></div>)}
          </div>
        </section>
        <section className="case-section">
          <h2 className="label"><b>05</b> / Trade-offs</h2>
          <div>
            <p>{project.tradeoff}</p>
            {repository && project.sources && (
              <ul className="case-sources flex flex-wrap">
                {project.sources.map((source) => <li key={source.path}><a className="label" href={`${repository}/${source.path}`}>{source.label} <span aria-hidden="true">↗︎</span></a></li>)}
              </ul>
            )}
          </div>
        </section>
      </div>
      <footer className="case-next shell">
        <Link href={projectHref(next)}><span className="label">Next case study</span><strong>{next.title}</strong><span className="next-arrow" aria-hidden="true">↗︎</span></Link>
      </footer>
    </main>
  );
}
