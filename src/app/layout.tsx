import type { ReactNode } from 'react';
import { ThemeProvider } from 'next-themes';
import '@/styles/globals.css';
import MainLayout from '@/components/MainLayout';

export const metadata = {
  title: 'Mobile Homes',
  description: 'Find your perfect mobile home',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" disableTransitionOnChange>
          <MainLayout>{children}</MainLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
