import { getAllPosts, getPostContent } from '@/lib/posts';
import { notFound } from 'next/navigation';

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props) {
  const post = getAllPosts().find((p) => p.slug === params.slug);
  return post ? { title: post.title } : {};
}

export default function BlogPostPage({ params }: Props) {
  try {
    const post = getPostContent(params.slug);
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
