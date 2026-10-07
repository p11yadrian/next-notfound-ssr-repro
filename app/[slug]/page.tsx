import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (slug !== 'exists') notFound();
  return <p>Page {slug}</p>;
}
