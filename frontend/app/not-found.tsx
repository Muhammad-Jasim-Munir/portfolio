import Link from 'next/link';
export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-32 text-center">
      <p className="display text-9xl" style={{ color: 'var(--accent)' }}>404</p>
      <h1 className="display mt-4 text-4xl">Page not found</h1>
      <p className="mt-2" style={{ color: 'var(--muted)' }}>The route you tried doesn&apos;t exist.</p>
      <Link href="/" className="brut-btn mt-8 inline-flex">← back home</Link>
    </div>
  );
}
