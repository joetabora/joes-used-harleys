import { setPageSEO } from '@/lib/seo';
import type { Metadata } from 'next';

export const metadata: Metadata = setPageSEO({
  pageTitle: 'Merch Coming Soon | Joe\'s Used Harleys',
  pageDescription: 'Joe\'s Used Harleys merchandise coming soon. Check back for gear and apparel.',
  path: '/merch'
});

export default function MerchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
