import type { GuideDocument } from "@/lib/content/guide-types";

export const routeGuides: GuideDocument[] = [
  {
    slug: "lake-michigan-day-loop",
    title: "Lake Michigan day-loop ideas from Southeast Wisconsin",
    excerpt: "Planning notes for a scenic day ride — not turn-by-turn GPS, and not a claim about the best roads.",
    topic: "routes",
    keywords: ["lake michigan", "wisconsin ride"],
    cities: ["milwaukee", "racine", "kenosha", "port-washington"],
    updated: "2026-07-29",
    status: "published",
    faqs: [
      {
        question: "Is this a GPS route file?",
        answer: "No. It is planning inspiration. Check weather, construction, and your own comfort before you ride.",
      },
      {
        question: "Which bike is best for this?",
        answer: "Touring and baggers are comfortable for longer days; lighter bikes work if you keep mileage realistic. Talk to Joe about what you own or want.",
      },
    ],
    sections: [
      {
        heading: "Keep it honest",
        body: "Southeast Wisconsin offers lake views, small towns, and easy day mileage. Build a loop that matches your experience — not someone else's highlight reel.",
      },
      {
        heading: "Stops and timing",
        body: "Plan fuel, food, and daylight. Shoulder seasons change fast near the lake.",
      },
      {
        heading: "Bike prep",
        body: "Tires, chain/belt condition, lights, and a charged phone matter more than chrome. Ask Joe what to check before a longer day.",
      },
    ],
  },
];
