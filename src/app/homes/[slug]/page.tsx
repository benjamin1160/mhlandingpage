import { homes } from '@/data/homes';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return homes.map((h) => ({ slug: h.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const home = homes.find((h) => h.slug === slug);
  if (!home) return {};
  return {
    title: `${home.model} in ${home.city} – ${home.beds} Bed Mobile Home`,
  };
}

export default async function HomeDetailPage({ params }: Props) {
  const { slug } = await params;
  const home = homes.find((h) => h.slug === slug);
  if (!home) return notFound();
  return (
    <div className="space-y-6 p-8">
      <h1 className="text-3xl font-bold">{home.model}</h1>
      <img src={home.image} alt={home.model} className="h-64 w-full object-cover" />
      <div>
        <h2 className="text-xl">Specifications</h2>
        <ul className="list-inside list-disc">
          <li>City: {home.city}</li>
          <li>Beds: {home.beds}</li>
          <li>Baths: {home.baths}</li>
          <li>Price: ${home.price.toLocaleString()}</li>
        </ul>
      </div>
      <form action="/api/contact" method="post" className="space-y-2">
        <h2 className="text-xl">Request Info</h2>
        <input name="name" placeholder="Name" className="block w-full border p-2" />
        <input name="email" placeholder="Email" type="email" className="block w-full border p-2" />
        <button className="rounded bg-blue-600 px-4 py-2 text-white">Send</button>
      </form>
    </div>
  );
}
