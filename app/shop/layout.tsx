import { setPageSEO } from '@/lib/seo';
import type { Metadata } from 'next';

export const metadata: Metadata = setPageSEO({
  pageTitle: 'Joe\'s Shop | Biker Clothing, Accessories & Parts Milwaukee',
  pageDescription: 'Biker tees, gloves, parts & gear. Free shipping over $100. Text Joe 414-439-6211. Milwaukee\'s rider shop.',
  path: '/shop'
});

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
