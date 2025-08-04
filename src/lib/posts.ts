import fs from 'fs';
import path from 'path';
import { marked } from 'marked';

const postsDir = path.join(process.cwd(), 'src/content/blog');

export interface PostMeta {
  slug: string;
  title: string;
}

export function getAllPosts(): PostMeta[] {
  return fs
    .readdirSync(postsDir)
    .filter((f) => f.endsWith('.md'))
    .map((file) => {
      const slug = file.replace(/\.md$/, '');
      const [titleLine = ''] = fs
        .readFileSync(path.join(postsDir, file), 'utf8')
        .split('\n');
      const title = titleLine.replace(/^#\s*/, '');
      return { slug, title };
    });
}

export function getPostContent(slug: string) {
  const file = fs.readFileSync(path.join(postsDir, `${slug}.md`), 'utf8');
  const [titleLine = '', ...contentLines] = file.split('\n');
  const title = titleLine.replace(/^#\s*/, '');
  const html = marked(contentLines.join('\n'));
  return { title, html };
}
