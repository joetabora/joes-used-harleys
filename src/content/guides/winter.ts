import type { GuideDocument } from "@/lib/content/guide-types";

export const winterGuides: GuideDocument[] = [
  {
    slug: 'wisconsin-harley-winter-storage',
    title: 'Wisconsin Harley winter storage basics',
    excerpt: 'Battery, fuel, and spring checkout ideas for Midwest winters.',
    topic: 'winter',
    keywords: ['winter', 'storage', 'wisconsin'],
    models: [],
    updated: "2026-07-29",
    status: "published",
    faqs: [
      {
        question: 'Can I ride all winter in Wisconsin?',
        answer: 'Some riders do with the right gear and conditions; many store bikes. Be honest about your risk tolerance.',
      },
      {
        question: 'Does Joe store bikes for customers?',
        answer: "Ask Joe about current options — don't assume services that aren't offered.",
      }
    ],
    sections: [
      {
        heading: 'Battery and fuel',
        body: 'Ask about tender use, fuel stabilizer, and where the bike will sleep. Midwest winters are hard on neglected batteries.',
      },
      {
        heading: 'Tires and rodents',
        body: 'Park clean, consider tire pressure over long sits, and protect against nesting pests in sheds.',
      },
      {
        heading: 'Spring checkout',
        body: 'Before the first ride: fluids, tires, brakes, lights, and a careful walkaround.',
      }
    ],
  },
];
