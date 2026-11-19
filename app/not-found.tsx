import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="missing shell" id="main" tabIndex={-1}>
      <p className="label">404 / Page missing</p>
      <h1>Off the <em>happy path.</em></h1>
      <p>That page couldn’t be found.</p>
      <Link className="label case-back" href="/#work">Back to selected work ↗︎</Link>
    </main>
  );
}
