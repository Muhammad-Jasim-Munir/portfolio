import Link from 'next/link';
import { api } from '@/lib/api';
import { Reveal, SectionHeader } from '@/components/Reveal';
import Typewriter from '@/components/Typewriter';
import Counter from '@/components/Counter';
import ScrollProgress from '@/components/ScrollProgress';

export default async function Home() {
  const [profile, skills, projects, experience] = await Promise.all([
    api.profile(), api.skills(), api.projects(), api.experience(),
  ]);
  const featured = projects.filter(p => p.featured).slice(0, 4);
  const display = featured.length ? featured : projects.slice(0, 4);

  return (
    <>
      <ScrollProgress />

      {/* HERO */}
      <section className="relative overflow-hidden border-b-2 border-current">
        <div className="absolute inset-0 grid-bg opacity-30" aria-hidden />
        <div className="absolute inset-0 scanline pointer-events-none" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-32">
          <div className="mb-6 flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[0.2em]">
            <span className="tag" style={{ background: 'var(--accent)', color: '#000', borderColor: '#000' }}>● online</span>
            <span style={{ color: 'var(--muted)' }}>{profile.location}</span>
            <span style={{ color: 'var(--muted)' }}>·</span>
            <span style={{ color: 'var(--muted)' }}>v1.0</span>
          </div>

          <h1 className="display text-5xl leading-[0.9] md:text-8xl lg:text-9xl">
            MUHAMMAD<br/>
            JASIM<br/>
            <span style={{ color: 'var(--accent)' }}>MUNIR</span>_
          </h1>

          <p className="mt-6 max-w-2xl text-base md:text-lg" style={{ color: 'var(--muted)' }}>
            <span className="font-bold" style={{ color: 'var(--fg)' }}>$ ./jasim --status</span> →{' '}
            <Typewriter />
          </p>

          <p className="mt-4 max-w-2xl text-sm md:text-base">{profile.headline}</p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/projects" className="brut-btn">
              View projects →
            </Link>
            <a href={profile.resumeUrl || '/resume.pdf'} download className="brut-btn brut-btn-ghost">
              ⬇ Download CV
            </a>
            <Link href="/contact" className="brut-btn brut-btn-ghost">
              Hire me →
            </Link>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-4">
            <Counter to={projects.length} label="Projects shipped" />
            <Counter to={skills.length} label="Skills tracked" />
            <Counter to={experience.length} label="Roles" />
            <Counter to={3} label="Certifications" />
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="overflow-hidden border-b-2 border-current py-4" style={{ background: 'var(--fg)', color: 'var(--bg)' }}>
        <div className="marquee">
          <div className="marquee-track display text-2xl">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex gap-12">
                {['C++', 'JavaScript', 'React', 'Node.js', 'MongoDB', 'DSA', 'OOP', 'Git', 'MySQL', 'Java', 'Express'].map(s => (
                  <span key={s + i}>★ {s}</span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FEATURED PROJECTS */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8">
        <Reveal>
          <SectionHeader kicker="01 // selected work" title="Featured projects" />
        </Reveal>
        <div className="grid gap-6 md:grid-cols-2">
          {display.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.05}>
              <article className="brut-card p-6">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="display text-2xl md:text-3xl">{p.title}</h3>
                  {p.featured && <span className="tag" style={{ background: 'var(--accent)', color: '#000' }}>★ featured</span>}
                </div>
                <p className="mt-3 text-sm" style={{ color: 'var(--muted)' }}>{p.description}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.technologies?.slice(0, 6).map(t => <span key={t} className="tag">{t}</span>)}
                </div>
                <div className="mt-5 flex gap-3 text-xs font-bold uppercase tracking-widest">
                  {p.github && <a href={p.github} target="_blank" rel="noreferrer" className="underline">GitHub →</a>}
                  {p.liveUrl && <a href={p.liveUrl} target="_blank" rel="noreferrer" className="underline">Live →</a>}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <div className="mt-10">
          <Link href="/projects" className="brut-btn">All projects →</Link>
        </div>
      </section>

      {/* SKILLS PREVIEW */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8">
        <Reveal><SectionHeader kicker="02 // toolkit" title="What I work with" /></Reveal>
        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {skills.map((s, i) => (
            <Reveal key={s.name} delay={i * 0.02}>
              <div className="brut-card p-4">
                <div className="flex items-center justify-between">
                  <p className="font-bold">{s.name}</p>
                  <span className="text-xs" style={{ color: 'var(--muted)' }}>{s.level}%</span>
                </div>
                <div className="mt-2 h-2 brut-border" style={{ background: 'var(--bg)' }}>
                  <div className="h-full" style={{ width: `${s.level || 70}%`, background: 'var(--accent)' }} />
                </div>
                <p className="mt-2 text-[10px] uppercase tracking-widest" style={{ color: 'var(--muted)' }}>
                  {s.category}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8">
        <div className="brut-card p-10 md:p-16 text-center">
          <h2 className="display text-4xl md:text-6xl">Got a project? Let&apos;s build it.</h2>
          <p className="mx-auto mt-4 max-w-xl" style={{ color: 'var(--muted)' }}>
            Open to internships, freelance work, and collaborations.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="brut-btn">Start a conversation →</Link>
            <a href="mailto:mjmflux@icloud.com" className="brut-btn brut-btn-ghost">mjmflux@icloud.com</a>
          </div>
        </div>
      </section>
    </>
  );
}
