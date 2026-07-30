import type { GuideDocument } from "@/lib/content/guide-types";

export const passengerGuides: GuideDocument[] = [
  {
    slug: 'two-up-harley-comfort',
    title: 'Two-up Harley comfort guide',
    excerpt: 'Passenger seats, communication, and what to check on used bikes.',
    topic: 'passenger',
    keywords: ['passenger', 'two-up'],
    models: [],
    updated: "2026-07-29",
    status: "published",
    faqs: [
      {
        question: 'Do all Harleys work two-up?',
        answer: 'No. Some are better for solo riding. Sit with your passenger before you buy.',
      },
      {
        question: 'What about luggage with a passenger?',
        answer: 'Hard bags and trunks help. Confirm capacity on the actual bike.',
      }
    ],
    sections: [
      {
        heading: 'Passenger seat and pegs',
        body: 'Have your passenger sit. Check seat comfort, backrest options, and peg position.',
      },
      {
        heading: 'Talk before you ride',
        body: 'Agree on signals for stops, bumps, and when they need a break.',
      },
      {
        heading: 'Touring vs Softail',
        body: 'Touring bikes often prioritize two-up comfort and luggage. Softails vary widely — sit both ways.',
      }
    ],
  },
];
