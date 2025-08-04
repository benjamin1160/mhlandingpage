import Link from 'next/link';
import { notFound } from 'next/navigation';
import { cities } from '@/data/cities';
import { homes } from '@/data/homes';

interface Props {
  params: { city: string };
}

export function generateStaticParams() {
  return cities.map((c) => ({ city: c.slug }));
}

export function generateMetadata({ params }: Props) {
  const city = cities.find((c) => c.slug === params.city);
  if (!city) return {};
  return { title: `Mobile Homes in ${city.name}` };
}

export default function CityPage({ params }: Props) {
  const city = cities.find((c) => c.slug === params.city);
  if (!city) return notFound();
  const featured = homes.filter(
    (h) => h.city.toLowerCase().replace(/\s+/g, '-') === city.slug,
  );
  return (
    <div className="space-y-6 p-8">
      <h1 className="text-3xl font-bold">{city.name}</h1>
      <p>{city.description}</p>
      <h2 className="text-xl">Nearby Parks</h2>
      <ul className="list-inside list-disc">
        {city.parks.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>
      <h2 className="text-xl">Featured Homes</h2>
      <div className="grid gap-4 sm:grid-cols-3">
        {featured.map((home) => (
          <Link
            key={home.slug}
            href={`/homes/${home.slug}`}
            className="rounded border p-4 hover:shadow"
          >
            <img src={home.image} alt={home.model} className="mb-2 h-32 w-full object-cover" />
            <div className="font-semibold">{home.model}</div>
            <div>{`$${home.price.toLocaleString()}`}</div>
          </Link>
        ))}
      </div>
      <Link href="/customizer" className="rounded bg-blue-600 px-4 py-2 text-white">
        Find My Home
      </Link>
    </div>
  );
}
