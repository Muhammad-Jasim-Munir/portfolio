import { api } from '@/lib/api';
import { SectionHeader, Reveal } from '@/components/Reveal';

export const metadata = { title: 'Certifications', description: 'Issued certifications.' };

export default async function CertsPage() {
  const items = await api.certifications();
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 md:px-8">
      <SectionHeader kicker="credentials" title="Certifications" />
      <div className="grid gap-4 md:grid-cols-2">
        {items.map((c, i) => (
          <Reveal key={c.name + i} delay={i * 0.04}>
            <div className="brut-card p-5">
              <h3 className="display text-xl">{c.name}</h3>
              <p className="text-sm" style={{ color: 'var(--muted)' }}>{c.issuer}</p>
              <p className="mt-2 text-xs uppercase tracking-widest" style={{ color: 'var(--muted)' }}>
                {c.startDate} — {c.endDate}
              </p>
              {c.url && (
                <a href={c.url} target="_blank" rel="noreferrer" className="mt-3 inline-block text-xs font-bold uppercase underline">
                  View certificate →
                </a>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
