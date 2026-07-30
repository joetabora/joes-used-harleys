import type { GuideDocument } from "@/lib/content/guide-types";

export const buyingGuides: GuideDocument[] = [
  {
    slug: "first-time-harley-buyer-guide",
    title: "First-time used Harley buyer guide",
    excerpt:
      "What to check, what to ignore, and how to buy without feeling pressured on the floor.",
    topic: "buying",
    keywords: ["first motorcycle", "used harley", "buying guide"],
    models: [],
    updated: "2026-07-29",
    status: "published",
    faqs: [
      {
        question: "Do I need motorcycle experience before buying a Harley?",
        answer:
          "More experience helps, but honesty about your skill level matters most. Choose a bike you can handle, take a safety course if you haven't, and don't let anyone rush you.",
      },
      {
        question: "Should I finance before I shop?",
        answer:
          "Knowing your monthly comfort zone before you fall in love with a unit helps you shop with confidence. Talk through payments with Joe when you're ready.",
      },
    ],
    sections: [
      {
        heading: "Start with how you'll ride — not the chrome",
        body: "Be honest about distance, passenger needs, storage, and experience. A Softail and a Touring bike solve different problems. The right bike is the one you'll actually throw a leg over.",
      },
      {
        heading: "Inspect the story, not just the shine",
        body: "Ask for service records, title status, and why it's for sale. Check tires, brakes, fluids, and look for crash damage or cheap wiring. A clean bike with paperwork beats a flashy bike with mysteries.",
      },
      {
        heading: "Financing and trade-ins",
        body: "Know your monthly comfort zone before you fall in love with a unit. Pre-approval conversations help you shop with confidence. Trade-in value depends on condition and demand — get a clear number in writing.",
      },
      {
        heading: "Work with a salesperson you trust",
        body: "Dealerships can feel intimidating. A good salesperson slows the process down, answers dumb questions without judgment, and stays reachable after the sale. That's the point of this site.",
      },
    ],
  },
  {
    slug: "buying-a-harley-out-of-state",
    title: "Buying a Harley out of state",
    excerpt:
      "How remote buyers build trust, inspect a bike, and plan shipping without getting burned.",
    topic: "buying",
    keywords: ["out of state", "shipping", "remote purchase"],
    updated: "2026-07-29",
    status: "published",
    faqs: [
      {
        question: "Can Joe help if I don't live near Milwaukee?",
        answer:
          "Yes. Remote buyers use video walkarounds, detailed photos, and clear paperwork plans. Joe can help you inspect what matters before you travel or ship.",
      },
      {
        question: "Should I send a deposit to a personal account?",
        answer:
          "Never send deposits to personal accounts you can't verify. Use legitimate dealership processes and get everything in writing.",
      },
    ],
    sections: [
      {
        heading: "Trust comes before the wire",
        body: "Ask for a video walkaround, detailed photos, and a live FaceTime or video call. A salesperson who shows you every scratch is doing their job.",
      },
      {
        heading: "Paperwork and transport",
        body: "Confirm title status, payoff if financed, and who handles transport. Get shipping quotes in writing.",
      },
      {
        heading: "Local pickup vs ship",
        body: "If you can fly in and ride home, great. If not, a reputable transporter and a clear handoff plan matter more than saving a few bucks.",
      },
    ],
  },
];
