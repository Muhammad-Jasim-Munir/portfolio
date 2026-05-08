const BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export type Profile = {
  name?: string; headline?: string; location?: string; email?: string; phone?: string;
  summary?: string; avatar?: string; resumeUrl?: string;
  socials?: { github?: string; linkedin?: string; twitter?: string };
};
export type Skill = { _id?: string; name: string; category?: string; level?: number; order?: number };
export type Project = {
  _id?: string; title: string; slug?: string; description?: string; longDescription?: string;
  technologies?: string[]; category?: string; github?: string; liveUrl?: string;
  images?: string[]; cover?: string; featured?: boolean; completedAt?: string;
};
export type Experience = {
  _id?: string; role: string; company?: string; type?: string;
  startDate?: string; endDate?: string; current?: boolean; bullets?: string[]; technologies?: string[];
};
export type Education = {
  _id?: string; degree: string; institution?: string; startYear?: string; endYear?: string;
  coursework?: string[]; description?: string;
};
export type Certification = {
  _id?: string; name: string; issuer?: string; startDate?: string; endDate?: string; url?: string; image?: string;
};

async function get<T>(path: string, fallback: T): Promise<T> {
  try {
    const res = await fetch(`${BASE}${path}`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error(String(res.status));
    return (await res.json()) as T;
  } catch (err) {
    console.warn(`API fallback for ${path}:`, (err as Error).message);
    return fallback;
  }
}

import { fallback } from './fallback';

export const api = {
  profile:        () => get<Profile>('/api/profile', fallback.profile),
  skills:         () => get<Skill[]>('/api/skills', fallback.skills),
  projects:       () => get<Project[]>('/api/projects', fallback.projects),
  experience:     () => get<Experience[]>('/api/experience', fallback.experience),
  education:      () => get<Education[]>('/api/education', fallback.education),
  certifications:() => get<Certification[]>('/api/certifications', fallback.certifications),
  sendMessage: async (payload: { name: string; email: string; subject?: string; message: string }) => {
    const res = await fetch(`${BASE}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Failed to send message');
    return res.json();
  },
};
