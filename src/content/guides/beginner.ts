import type { GuideDocument } from "@/lib/content/guide-types";

export const beginnerGuides: GuideDocument[] = [
  {
    slug: 'first-harley-confidence',
    title: 'Building confidence for your first Harley',
    excerpt: 'Mindset, fit, and questions first-time buyers should ask.',
    topic: 'beginner',
    keywords: ['beginner', 'first harley'],
    models: [],
    updated: "2026-07-29",
    status: "published",
    faqs: [
      {
        question: 'Is a Sportster always the right first bike?',
        answer: "Often it's a good starting point, but sit first. Softails and other models can fit some new riders better.",
      },
      {
        question: 'How much experience do I need?',
        answer: 'Be honest about your skill. Match the bike to your confidence, not your Instagram.',
      }
    ],
    sections: [
      {
        heading: 'Fit before chrome',
        body: 'Sit on bikes. Check reach to the ground, bars, and controls. Confidence starts with a bike that feels manageable.',
      },
      {
        heading: 'Training and practice',
        body: "A safety course helps. Practice in empty lots before highway miles. Don't let anyone shame you for starting small.",
      },
      {
        heading: 'Ask for patience',
        body: "A good salesperson answers basic questions without rushing. That's what Joe is for.",
      }
    ],
  },
];
