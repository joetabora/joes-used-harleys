import type { GuideDocument } from "@/lib/content/guide-types";

export const eventGuides: GuideDocument[] = [
  {
    slug: "how-to-use-motorcycle-events",
    title: "How to use motorcycle events when you're shopping",
    excerpt: "Events can help you sit on bikes and talk to riders — without treating every flyer as a buying mandate.",
    topic: "events",
    keywords: ["motorcycle events", "harley events"],
    updated: "2026-07-29",
    status: "published",
    faqs: [
      {
        question: "Does Joe host events?",
        answer: "Ask Joe about current meetups or demo opportunities. This page does not invent a calendar.",
      },
      {
        question: "Should I buy at an event?",
        answer: "Events are great for research. Still inspect paperwork, condition, and payment terms like any other purchase.",
      },
    ],
    sections: [
      {
        heading: "Research, don't rush",
        body: "Use events to sit on models, compare ergonomics, and ask experienced riders what they wish they knew. Keep your budget written down.",
      },
      {
        heading: "Bring a checklist",
        body: "Fit, passenger needs, storage, and monthly payment comfort beat impulse chrome.",
      },
      {
        heading: "Follow up with Joe",
        body: "If an event clarifies what you want, Joe can help you look at live inventory that matches — when stock exists.",
      },
    ],
  },
];
