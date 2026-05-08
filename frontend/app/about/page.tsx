import { api } from '@/lib/api';
import { SectionHeader, Reveal } from '@/components/Reveal';

export const metadata = { title: 'About', description: 'About Muhammad Jasim Munir.' };

export default async function AboutPage() {
  const [profile, education, skills] = await Promise.all([api.profile(), api.education(), api.skills()]);
  const grouped = skills.reduce<Record<string, typeof skills>>((acc, s) => {
    const k = s.category || 'Other';
    (acc[k] ||= []).push(s);
    return acc;
  }, {});

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
      <SectionHeader kicker="who" title="About" />
      <div className="grid gap-12 md:grid-cols-3">
        <Reveal>
          <div className="brut-card p-6">
            <p className="display text-3xl">{profile.name}</p>
            <p className="mt-2 text-sm" style={{ color: 'var(--muted)' }}>{profile.headline}</p>
            <div className="mt-4 space-y-1 text-sm">
              <p>📍 {profile.location}</p>
              <p>✉ {profile.email}</p>
              <p>☎ {profile.phone}</p>
            </div>
          </div>
        </Reveal>
        <div className="md:col-span-2">
          <Reveal>
            <p className="text-lg leading-relaxed">{profile.summary}</p>
          </Reveal>

          <Reveal delay={0.1}>
            <h3 className="display mt-12 text-3xl">Career goals</h3>
            <p className="mt-2" style={{ color: 'var(--muted)' }}>
              Land a Software Engineering Internship where I can contribute to real-world engineering teams,
              ship production code, and grow into a backend / full-stack engineer comfortable with scalable systems.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <h3 className="display mt-12 text-3xl">Skills by category</h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {Object.entries(grouped).map(([cat, list]) => (
                <div key={cat} className="brut-card p-4">
                  <p className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--accent)' }}>{cat}</p>
                  <ul className="mt-2 space-y-1 text-sm">
                    {list.map(s => <li key={s.name}>→ {s.name}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <h3 className="display mt-12 text-3xl">Education</h3>
            <div className="mt-4 space-y-4">
              {education.map(e => (
                <div key={e.degree} className="brut-card p-4">
                  <p className="display text-xl">{e.degree}</p>
                  <p className="text-sm" style={{ color: 'var(--muted)' }}>{e.institution} · {e.startYear}–{e.endYear}</p>
                  {e.coursework && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {e.coursework.map(c => <span key={c} className="tag">{c}</span>)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
