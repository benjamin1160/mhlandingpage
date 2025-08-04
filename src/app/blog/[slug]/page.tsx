import { getAllPosts, getPostContent } from '@/lib/posts';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getAllPosts().find((p) => p.slug === slug);
  return post ? { title: post.title } : {};
}

export default async function BlogPostPage({ params }: Props) {
  try {
    const { slug } = await params;
    const post: { title: string; html: string } = getPostContent(slug);
    return (
      <article className="prose p-8 dark:prose-invert">
        <h1>{post.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </article>
    );
  } catch {
    return notFound();
  }
}
