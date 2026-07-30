import type { GuideDocument } from "@/lib/content/guide-types";

export const maintenanceGuides: GuideDocument[] = [
  {
    slug: 'used-harley-inspection-checklist',
    title: 'Used Harley inspection checklist',
    excerpt: 'What to look at and ask about on a used Harley — not a shop manual.',
    topic: 'maintenance',
    keywords: ['inspection', 'maintenance'],
    models: [],
    updated: "2026-07-29",
    status: "published",
    faqs: [
      {
        question: 'Can Joe inspect remotely?',
        answer: "Video walkarounds help. They don't replace a careful in-person look or a trusted mechanic.",
      },
      {
        question: 'Should I get a PPI?',
        answer: 'A pre-purchase inspection by a qualified tech is smart on higher-dollar bikes.',
      }
    ],
    sections: [
      {
        heading: 'Fluids, tires, brakes',
        body: 'Look for leaks, uneven tire wear, soft brakes, and overdue service intervals.',
      },
      {
        heading: 'Electrical and charging',
        body: 'Test lights, charging system symptoms, and aftermarket wiring quality.',
      },
      {
        heading: 'Paperwork trail',
        body: 'Service records and title status reduce surprises more than polish does.',
      }
    ],
  },
];
