import { setPageSEO } from '@/lib/seo';
import type { Metadata } from 'next';

// Events page SEO - handled in layout since page is Client Component
export const metadata: Metadata = setPageSEO({
  pageTitle: 'Harley Events Milwaukee 2025 | House of Harley-Davidson Events',
  pageDescription: 'Upcoming Harley events in Milwaukee — service workshops, Photos with Santa, Kill Winter Party. Text Joe 414-439-6211',
  pageKeywords: [
    'harley events milwaukee',
    'house of harley events',
    'harley davidson events milwaukee',
    'milwaukee harley events 2025',
    'harley service workshop milwaukee',
    'kill winter party milwaukee',
    'harley events wisconsin'
  ],
  location: 'Milwaukee',
  path: '/events'
});

export default function EventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
