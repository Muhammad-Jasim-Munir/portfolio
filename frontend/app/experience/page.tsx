import { api } from '@/lib/api';
import { SectionHeader, Reveal } from '@/components/Reveal';

export const metadata = { title: 'Experience', description: 'Work and project experience.' };

function fmt(d?: string) {
  if (!d) return '';
  const dt = new Date(d);
  if (isNaN(dt.getTime())) return d;
  return dt.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

export default async function ExperiencePage() {
  const exp = await api.experience();
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
      <SectionHeader kicker="career" title="Experience" />
      <ol className="relative ml-3 border-l-2 border-current">
        {exp.map((e, i) => (
          <Reveal key={e.role + i} delay={i * 0.05}>
            <li className="ml-6 mb-10">
              <span
                className="absolute -left-[9px] mt-2 h-4 w-4 brut-border"
                style={{ background: e.current ? 'var(--accent)' : 'var(--bg)' }}
              />
              <div className="brut-card p-5">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="display text-xl md:text-2xl">{e.role}</h3>
                  <span className="text-xs uppercase tracking-widest" style={{ color: 'var(--muted)' }}>
                    {fmt(e.startDate)} — {e.current ? 'present' : fmt(e.endDate) || 'completed'}
                  </span>
                </div>
                <p className="mt-1 text-sm" style={{ color: 'var(--muted)' }}>
                  {e.company} · {e.type}
                </p>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm">
                  {e.bullets?.map((b, j) => <li key={j}>{b}</li>)}
                </ul>
                {e.technologies && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {e.technologies.map(t => <span key={t} className="tag">{t}</span>)}
                  </div>
                )}
              </div>
            </li>
          </Reveal>
        ))}
      </ol>
    </div>
  );
}
