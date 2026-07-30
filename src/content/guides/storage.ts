import type { GuideDocument } from "@/lib/content/guide-types";

export const storageGuides: GuideDocument[] = [
  {
    slug: 'harley-storage-and-luggage',
    title: 'Harley storage and luggage guide',
    excerpt: 'Bags, trunks, and real-world carrying questions.',
    topic: 'storage',
    keywords: ['saddlebags', 'luggage'],
    models: [],
    updated: "2026-07-29",
    status: "published",
    faqs: [
      {
        question: 'Do Softails have the same storage as Touring?',
        answer: 'Usually no. Softail luggage varies by model and accessories.',
      },
      {
        question: 'Should I buy for luggage first?',
        answer: 'If you tour often, yes. If you mostly solo commute, you may not need full Touring luggage.',
      }
    ],
    sections: [
      {
        heading: 'Hard bags vs soft',
        body: 'Hard bags lock and weather better; soft bags flex and may pack differently. Know your commute and trip needs.',
      },
      {
        heading: 'Passenger plus luggage',
        body: 'Two-up travel needs room for both people and gear. Touring platforms usually win here.',
      },
      {
        heading: 'Check mounts and keys',
        body: "On used bikes, verify bag latches, locks, and that mounts aren't cracked.",
      }
    ],
  },
];
