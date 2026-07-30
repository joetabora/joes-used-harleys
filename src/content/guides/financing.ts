import type { GuideDocument } from "@/lib/content/guide-types";

export const financingGuides: GuideDocument[] = [
  {
    slug: 'harley-payment-basics',
    title: 'Used Harley financing basics',
    excerpt: 'How to think about payments before you fall in love with a bike.',
    topic: 'financing',
    keywords: ['financing', 'payments'],
    models: [],
    updated: "2026-07-29",
    status: "published",
    faqs: [
      {
        question: 'Can Joe guarantee financing?',
        answer: 'No. Financing depends on lenders and your situation. Joe helps you prepare questions and shop honestly.',
      },
      {
        question: 'Should I get pre-qualified?',
        answer: 'Knowing a payment range before you shop often reduces stress.',
      }
    ],
    sections: [
      {
        heading: 'Know your monthly comfort zone',
        body: "Decide what payment fits your life before you negotiate. It keeps emotion from writing checks your budget can't cash.",
      },
      {
        heading: 'Ask clear questions',
        body: 'Ask about rate, term, down payment, and total cost. Get numbers in writing.',
      },
      {
        heading: 'Joe can help you talk it through',
        body: "He won't invent approvals. He will help you shop with a realistic payment target.",
      }
    ],
  },
];
