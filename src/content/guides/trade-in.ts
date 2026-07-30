import type { GuideDocument } from "@/lib/content/guide-types";

export const tradeInGuides: GuideDocument[] = [
  {
    slug: 'harley-trade-in-basics',
    title: 'Harley trade-in basics',
    excerpt: 'How trade-ins work in plain English — get the number in writing.',
    topic: 'trade-in',
    keywords: ['trade-in'],
    models: [],
    updated: "2026-07-29",
    status: "published",
    faqs: [
      {
        question: 'Does Joe invent trade values?',
        answer: 'No. Trade value depends on condition and the dealership process. Joe helps you ask the right questions.',
      },
      {
        question: 'Should I sell privately instead?',
        answer: 'Sometimes. Private sale can net more but takes time and risk. Compare both paths.',
      }
    ],
    sections: [
      {
        heading: 'Condition tells the story',
        body: 'Photos, maintenance records, tires, and cosmetics all matter. Be honest about scratches and mods.',
      },
      {
        heading: 'Get the number in writing',
        body: 'Verbal estimates change. Ask for a clear trade allowance on paper.',
      },
      {
        heading: 'Separate the deals mentally',
        body: 'Know the price of the bike you want and the value of your trade as two conversations.',
      }
    ],
  },
];
