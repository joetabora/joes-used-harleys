import type { GuideDocument } from "@/lib/content/guide-types";

export const dealerGuides: GuideDocument[] = [
  {
    slug: 'questions-to-ask-any-harley-salesperson',
    title: 'Questions to ask any Harley salesperson',
    excerpt: 'Process guide — not a dealer ranking.',
    topic: 'dealer',
    keywords: ['dealership', 'questions'],
    models: [],
    updated: "2026-07-29",
    status: "published",
    faqs: [
      {
        question: 'Is this a ranking of dealers?',
        answer: "No. It's a question list so you can evaluate any salesperson or store.",
      },
      {
        question: 'Why work with Joe?',
        answer: "Joe's goal is a human-paced process and honest answers — inventory is mirrored from real stock.",
      }
    ],
    sections: [
      {
        heading: "Ask about the bike's story",
        body: "Service records, title status, why it's for sale, and known issues.",
      },
      {
        heading: 'Ask about the number',
        body: 'Out-the-door thinking, fees, and trade allowance in writing.',
      },
      {
        heading: 'Ask about after-sale support',
        body: 'Who do you call when you have questions after you buy?',
      }
    ],
  },
];
