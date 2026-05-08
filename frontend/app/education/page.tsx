import { api } from '@/lib/api';
import { SectionHeader, Reveal } from '@/components/Reveal';

export const metadata = { title: 'Education', description: 'Academic background.' };

export default async function EducationPage() {
  const items = await api.education();
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 md:px-8">
      <SectionHeader kicker="study" title="Education" />
      <div className="space-y-6">
        {items.map((e, i) => (
          <Reveal key={i}>
            <div className="brut-card p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="display text-2xl md:text-3xl">{e.degree}</h3>
                <span className="text-xs uppercase tracking-widest" style={{ color: 'var(--muted)' }}>
                  {e.startYear} — {e.endYear}
                </span>
              </div>
              <p className="mt-1" style={{ color: 'var(--muted)' }}>{e.institution}</p>
              {e.description && <p className="mt-3 text-sm">{e.description}</p>}
              {e.coursework && (
                <div className="mt-4">
                  <p className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--accent)' }}>
                    Relevant coursework
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {e.coursework.map(c => <span key={c} className="tag">{c}</span>)}
                  </div>
                </div>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
