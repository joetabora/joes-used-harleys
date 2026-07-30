import type { GuideDocument } from "@/lib/content/guide-types";

export const shortGuides: GuideDocument[] = [
  {
    slug: 'short-rider-harley-fit',
    title: 'Short rider Harley fit notes',
    excerpt: 'Reach, seat height, and confidence — sit flat-footed if you can.',
    topic: 'short',
    keywords: ['short riders', 'seat height'],
    models: [],
    updated: "2026-07-29",
    status: "published",
    faqs: [
      {
        question: 'Are lowered bikes always better?',
        answer: 'Not always. Geometry changes handling. Sit and evaluate carefully.',
      },
      {
        question: 'Can Joe help me find a manageable bike?',
        answer: 'Yes. Tell him your height and comfort priorities and look at live inventory together.',
      }
    ],
    sections: [
      {
        heading: 'Flat-foot confidence',
        body: 'Being able to plant your feet matters for stops and low-speed work. Prioritize that feel.',
      },
      {
        heading: 'Consider lighter platforms',
        body: 'Many shorter or newer riders look at Sportsters or lower Softails — still sit multiple options.',
      },
      {
        heading: "Don't get talked into stretch",
        body: 'A salesperson should help you find confidence, not talk you into a bike that scares you.',
      }
    ],
  },
];
