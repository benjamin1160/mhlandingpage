import ClientHomePage from "./ClientHomePage";

// Pre-generate IDs 1–1000 for static pages
export async function generateStaticParams() {
  const total = 1000;
  return Array.from({ length: total }, (_, i) => ({
    id: String(i + 1),
  }));
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ClientHomePage id={id} />;
}
