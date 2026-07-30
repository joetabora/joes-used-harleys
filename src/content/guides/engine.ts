import type { GuideDocument } from "@/lib/content/guide-types";

export const engineGuides: GuideDocument[] = [
  {
    slug: 'harley-engine-families-overview',
    title: 'Harley engine families overview',
    excerpt: 'Public-facing overview — confirm specs on the actual VIN and year.',
    topic: 'engine',
    keywords: ['milwaukee-eight', 'twin cam'],
    models: ['milwaukee-eight', 'twin-cam', 'revolution-max'],
    updated: "2026-07-29",
    status: "published",
    faqs: [
      {
        question: 'Can Joe tell me exact horsepower?',
        answer: 'Only from documented specs for that year/model — not invented numbers.',
      },
      {
        question: 'Which engine is most reliable?',
        answer: 'Reliability depends on maintenance and use. Evaluate the specific bike.',
      }
    ],
    sections: [
      {
        heading: 'Milwaukee-Eight and Twin Cam',
        body: 'Many used Softails and Touring bikes use these big-twin families. Confirm displacement and year details on the bike.',
      },
      {
        heading: 'Sportster motors',
        body: 'Classic air-cooled Sportsters differ from Revolution Max Sportster S / Nightster platforms — compare carefully.',
      },
      {
        heading: 'Service history beats myths',
        body: "Ask what was done and when. Don't buy on internet legends alone.",
      }
    ],
  },
];
