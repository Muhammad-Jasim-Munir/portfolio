import { api } from '@/lib/api';
import { SectionHeader, Reveal } from '@/components/Reveal';

export const metadata = { title: 'Projects', description: 'Selected engineering work.' };

export default async function ProjectsPage() {
  const projects = await api.projects();
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
      <SectionHeader kicker="work" title="All projects" />
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.04}>
            <article className="brut-card flex h-full flex-col p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--accent)' }}>
                    {p.category || 'Project'}
                  </p>
                  <h3 className="display mt-1 text-2xl md:text-3xl">{p.title}</h3>
                </div>
                {p.featured && <span className="tag" style={{ background: 'var(--accent)', color: '#000' }}>★</span>}
              </div>
              <p className="mt-3 text-sm" style={{ color: 'var(--muted)' }}>{p.description}</p>
              {p.longDescription && (
                <p className="mt-2 text-sm">{p.longDescription}</p>
              )}
              <div className="mt-4 flex flex-wrap gap-1.5">
                {p.technologies?.map(t => <span key={t} className="tag">{t}</span>)}
              </div>
              <div className="mt-auto pt-5 flex gap-4 text-xs font-bold uppercase tracking-widest">
                {p.github && <a href={p.github} target="_blank" rel="noreferrer" className="underline">GitHub →</a>}
                {p.liveUrl && <a href={p.liveUrl} target="_blank" rel="noreferrer" className="underline">Live demo →</a>}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
