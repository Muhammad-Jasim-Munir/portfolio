import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const routes = ['', '/about', '/projects', '/experience', '/education', '/certifications', '/contact'];
  return routes.map(r => ({ url: `${base}${r}`, lastModified: new Date() }));
}
