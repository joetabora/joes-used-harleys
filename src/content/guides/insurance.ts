import type { GuideDocument } from "@/lib/content/guide-types";

export const insuranceGuides: GuideDocument[] = [
  {
    slug: 'motorcycle-insurance-questions',
    title: 'Motorcycle insurance questions before you buy',
    excerpt: 'What to ask your insurer — educational only, not insurance advice.',
    topic: 'insurance',
    keywords: ['insurance'],
    models: [],
    updated: "2026-07-29",
    status: "published",
    faqs: [
      {
        question: 'Does Joe sell insurance?',
        answer: 'No. Talk to a licensed insurer. Joe can remind you which bike details to share.',
      },
      {
        question: 'When should I bind coverage?',
        answer: 'Before you ride it home. Confirm exact timing with your insurer and the dealership.',
      }
    ],
    sections: [
      {
        heading: 'Call before you commit',
        body: 'Ask your insurer about the year, model, and your riding history before you put money down.',
      },
      {
        heading: 'Coverage types matter',
        body: 'Liability, comprehensive, collision, and extras vary. Get quotes in writing.',
      },
      {
        heading: 'Mods can change premiums',
        body: 'Aftermarket exhaust, tuning, or custom work may affect coverage — disclose them.',
      }
    ],
  },
];
