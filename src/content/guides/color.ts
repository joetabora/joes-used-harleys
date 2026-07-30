import type { GuideDocument } from "@/lib/content/guide-types";

export const colorGuides: GuideDocument[] = [
  {
    slug: 'used-harley-paint-and-color',
    title: 'Used Harley paint and color tips',
    excerpt: 'What to inspect on used paint — no rarity or demand claims.',
    topic: 'color',
    keywords: ['paint', 'color'],
    models: [],
    updated: "2026-07-29",
    status: "published",
    faqs: [
      {
        question: 'Does color affect price?',
        answer: "Sometimes buyers prefer certain colors, but condition and year usually matter more. Joe won't invent market premiums.",
      },
      {
        question: 'Should I reject a bike for chips?',
        answer: 'Cosmetic chips are common on used bikes. Decide what you can live with after a real look.',
      }
    ],
    sections: [
      {
        heading: 'Inspect in daylight',
        body: 'Look for mismatched panels, overspray, rock chips, and faded plastics.',
      },
      {
        heading: 'Two-tones and customs',
        body: 'Custom paint can look great and complicate matching later. Factor that into ownership.',
      },
      {
        heading: 'Color is preference',
        body: 'Buy the bike that fits — paint is secondary to mechanical condition.',
      }
    ],
  },
];
