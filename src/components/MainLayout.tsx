'use client';

import Link from 'next/link';
import { useTheme } from 'next-themes';
import type { ReactNode } from 'react';

export default function MainLayout({ children }: { children: ReactNode }) {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex min-h-screen flex-col">
      <nav className="flex items-center justify-between bg-gray-100 p-4 dark:bg-gray-800">
        <div className="flex space-x-4">
          <Link href="/">Home</Link>
          <Link href="/homes">Homes</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/contact">Contact</Link>
        </div>
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="rounded border px-2 py-1"
        >
          {theme === 'dark' ? 'Light' : 'Dark'}
        </button>
      </nav>
      <main className="flex-1">{children}</main>
      <footer className="bg-gray-100 p-4 text-center dark:bg-gray-800">
        &copy; {new Date().getFullYear()} Mobile Homes
      </footer>
    </div>
  );
}
