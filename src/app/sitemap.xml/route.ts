import { NextResponse } from 'next/server';
import { homes } from '@/data/homes';
import { cities } from '@/data/cities';
import { getAllPosts } from '@/lib/posts';

export async function GET() {
  const baseUrl = 'https://example.com';
  const staticRoutes = ['', '/customizer', '/homes', '/blog', '/contact'];
  const urls = [
    ...staticRoutes.map((r) => `${baseUrl}${r}`),
    ...homes.map((h) => `${baseUrl}/homes/${h.slug}`),
    ...cities.map((c) => `${baseUrl}/locations/${c.slug}`),
    ...getAllPosts().map((p) => `${baseUrl}/blog/${p.slug}`),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map((u) => `  <url><loc>${u}</loc></url>`)
    .join('\n')}\n</urlset>`;

  return new NextResponse(xml, {
    headers: { 'Content-Type': 'application/xml' },
  });
}
