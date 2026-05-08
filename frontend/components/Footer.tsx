import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mt-24 border-t-2 border-current">
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <p className="display text-2xl">MUHAMMAD<br/>JASIM MUNIR</p>
            <p className="mt-2 text-sm" style={{ color: 'var(--muted)' }}>
              Software Engineering Student · Lahore, PK
            </p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest">Contact</p>
            <ul className="mt-3 space-y-1 text-sm">
              <li><a className="hover:underline" href="mailto:mjmflux@icloud.com">mjmflux@icloud.com</a></li>
              <li><a className="hover:underline" href="tel:+923285958656">+92 328 5958656</a></li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest">Elsewhere</p>
            <ul className="mt-3 space-y-1 text-sm">
              <li><a className="hover:underline" href="https://github.com/Muhammad-Jasim-Munir" target="_blank" rel="noreferrer">GitHub →</a></li>
              <li><a className="hover:underline" href="http://linkedin.com/in/muhammad-jasim-enflux" target="_blank" rel="noreferrer">LinkedIn →</a></li>
              <li><Link href="/contact" className="hover:underline">Contact form →</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-start justify-between gap-2 border-t-2 border-current pt-4 text-xs uppercase tracking-widest md:flex-row">
          <span style={{ color: 'var(--muted)' }}>© {new Date().getFullYear()} Muhammad Jasim Munir</span>
          <span style={{ color: 'var(--muted)' }}>Built with Next.js · Express · MongoDB</span>
        </div>
      </div>
    </footer>
  );
}
