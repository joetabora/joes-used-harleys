import type { GuideDocument } from "@/lib/content/guide-types";

export const modelGuides: GuideDocument[] = [
  {
    slug: "used-street-glide-buying-tips",
    title: "Used Street Glide buying tips",
    excerpt:
      "What first-time bagger buyers should ask before they put money down on a Street Glide.",
    topic: "models",
    keywords: ["street glide", "used", "touring"],
    models: ["street-glide", "street-glide-special"],
    updated: "2026-07-29",
    status: "published",
    faqs: [
      {
        question: "Does higher mileage ruin a Street Glide?",
        answer:
          "Not automatically. Touring bikes often see highway miles. Documented maintenance can matter more than a low odometer with neglect.",
      },
      {
        question: "What mods should I worry about?",
        answer:
          "Aftermarket exhaust, bars, seats, and audio are common. Verify quality installs and keep original parts if possible.",
      },
    ],
    sections: [
      {
        heading: "Know the generation",
        body: "Street Glides span many years and platform updates. Infotainment, motors, and chassis details change across generations. Confirm year and options so you're comparing apples to apples.",
      },
      {
        heading: "Mileage context",
        body: "Touring bikes often see highway miles. Higher mileage with documented maintenance can be healthier than low mileage with neglect.",
      },
      {
        heading: "Common mod checklist",
        body: "Aftermarket exhaust, bars, seats, and audio are common. Mods aren't bad — just verify quality installs.",
      },
    ],
  },
];
