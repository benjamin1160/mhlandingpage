import Link from 'next/link';
import { homes } from '@/data/homes';

export const metadata = { title: 'Available Homes' };

export default function HomesPage() {
  return (
    <div className="p-8">
      <h1 className="mb-4 text-3xl font-bold">Available Homes</h1>
      <div className="grid gap-4 sm:grid-cols-3">
        {homes.map((home) => (
          <Link
            key={home.slug}
            href={`/homes/${home.slug}`}
            className="rounded border p-4 hover:shadow"
          >
            <img src={home.image} alt={home.model} className="mb-2 h-32 w-full object-cover" />
            <div className="font-semibold">{home.model}</div>
            <div>{`${home.city} · $${home.price.toLocaleString()}`}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
