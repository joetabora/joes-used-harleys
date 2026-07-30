import type { GuideDocument } from "@/lib/content/guide-types";

export const tallGuides: GuideDocument[] = [
  {
    slug: 'tall-rider-harley-fit',
    title: 'Tall rider Harley fit notes',
    excerpt: 'Ergonomics tips for taller riders — always sit before you buy.',
    topic: 'tall',
    keywords: ['tall riders', 'ergonomics'],
    models: [],
    updated: "2026-07-29",
    status: "published",
    faqs: [
      {
        question: 'Is Road Glide better for tall riders?',
        answer: 'Some tall riders like it; others prefer different models. Fit is personal.',
      },
      {
        question: 'Will forward controls fix everything?',
        answer: "They help some riders, not all. Sit with the controls you'll actually use.",
      }
    ],
    sections: [
      {
        heading: 'Watch legroom and bar reach',
        body: 'Taller riders often care about forward controls, seat shape, and bar height/reach.',
      },
      {
        heading: 'Touring and Softail options',
        body: 'Many taller riders prefer Touring or certain Softails, but preferences vary — sit first.',
      },
      {
        heading: "Aftermarket isn't required day one",
        body: 'You can change bars and seats later. Start with a bike that already feels close.',
      }
    ],
  },
];
