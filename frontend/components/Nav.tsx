'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useTheme } from './ThemeProvider';

const links = [
  { href: '/', label: '/home' },
  { href: '/about', label: '/about' },
  { href: '/projects', label: '/projects' },
  { href: '/experience', label: '/experience' },
  { href: '/education', label: '/education' },
  { href: '/certifications', label: '/certs' },
  { href: '/contact', label: '/contact' },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { theme, toggle } = useTheme();

  return (
    <header className="sticky top-0 z-50 border-b-2 border-current bg-[var(--bg)]/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8">
        <Link href="/" className="display text-xl md:text-2xl">
          MJM<span style={{ color: 'var(--accent)' }}>.</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors ${
                pathname === l.href ? 'bg-[var(--fg)] text-[var(--bg)]' : 'hover:bg-[var(--fg)] hover:text-[var(--bg)]'
              }`}
            >
              {l.label}
            </Link>
          ))}
          <button
            onClick={toggle}
            className="ml-2 brut-border px-3 py-1.5 text-xs font-bold uppercase"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? '☀ light' : '☾ dark'}
          </button>
        </nav>

        <button
          className="brut-border px-3 py-1.5 text-xs font-bold uppercase md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? '✕ close' : '☰ menu'}
        </button>
      </div>

      {open && (
        <div className="border-t-2 border-current md:hidden">
          <div className="flex flex-col">
            {links.map(l => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="border-b border-current px-4 py-3 text-sm font-bold uppercase"
              >
                {l.label}
              </Link>
            ))}
            <button onClick={toggle} className="px-4 py-3 text-left text-sm font-bold uppercase">
              {theme === 'dark' ? '☀ light mode' : '☾ dark mode'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
