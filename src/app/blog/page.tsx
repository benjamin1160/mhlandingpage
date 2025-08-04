import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';

export const metadata = { title: 'Blog' };

export default function BlogPage() {
  const posts = getAllPosts();
  return (
    <div className="p-8">
      <h1 className="mb-4 text-3xl font-bold">Blog</h1>
      <ul className="list-disc pl-4">
        {posts.map((p) => (
          <li key={p.slug}>
            <Link href={`/blog/${p.slug}`}>{p.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
