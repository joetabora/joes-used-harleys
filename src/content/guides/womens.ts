import type { GuideDocument } from "@/lib/content/guide-types";

export const womensGuides: GuideDocument[] = [
  {
    slug: 'women-harley-buyers',
    title: 'Women buying a used Harley',
    excerpt: 'Fit, confidence, and buying process — no stereotypes as product claims.',
    topic: 'womens',
    keywords: ['women riders'],
    models: [],
    updated: "2026-07-29",
    status: "published",
    faqs: [
      {
        question: 'Are there Harleys only for women?',
        answer: 'No. Buy the bike that fits how you ride. Joe helps you compare real options.',
      },
      {
        question: 'Should I bring someone with me?',
        answer: 'If it helps you feel comfortable, yes — but the decision is yours.',
      }
    ],
    sections: [
      {
        heading: 'Fit is personal',
        body: 'Seat height, reach, and control feel matter more than marketing. Sit on multiple families.',
      },
      {
        heading: 'Ask every question',
        body: 'There are no dumb questions on the floor. A good salesperson treats you like a buyer, not a guest.',
      },
      {
        heading: 'Bring your priorities',
        body: 'Distance, passenger needs, storage, and confidence beat chrome trends.',
      }
    ],
  },
];
