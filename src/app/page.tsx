import Link from 'next/link';
import { homes } from '@/data/homes';

export default function HomePage() {
  const featured = homes.slice(0, 3);
  return (
    <section className="space-y-8 p-8">
      <h1 className="text-3xl font-bold">Affordable Mobile Homes</h1>
      <p>We help locals find the best mobile homes in Southwest Florida.</p>
      <Link href="/customizer" className="rounded bg-blue-600 px-4 py-2 text-white">
        Find My Home
      </Link>
      <div>
        <h2 className="mt-8 text-2xl">Featured Homes</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {featured.map((home) => (
            <Link
              key={home.slug}
              href={`/homes/${home.slug}`}
              className="rounded border p-4 hover:shadow"
            >
              <img src={home.image} alt={home.model} className="mb-2 h-32 w-full object-cover" />
              <div className="font-semibold">{home.model}</div>
              <div>
                {home.city} · ${home.price.toLocaleString()}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
