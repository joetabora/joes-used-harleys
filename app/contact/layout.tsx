import { setPageSEO } from '@/lib/seo';
import type { Metadata } from 'next';

// Contact page SEO
export const metadata: Metadata = setPageSEO({
  pageTitle: 'Contact Joe\'s Used Harleys Milwaukee | Text 414-439-6211',
  pageDescription: 'Text or call Joe at 414-439-6211 for used Harleys in Milwaukee. $499 nationwide shipping. Bad credit OK.',
  pageKeywords: [
    'contact joe used harleys',
    'joe tabora phone number',
    'harley dealer milwaukee contact',
    'text joe harleys',
    'house of harley contact',
    'milwaukee harley dealer phone'
  ],
  location: 'Milwaukee',
  path: '/contact'
});

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
