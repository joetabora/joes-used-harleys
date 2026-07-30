import type { GuideDocument } from "@/lib/content/guide-types";

export const comparisonGuides: GuideDocument[] = [
  {
    slug: "road-glide-vs-street-glide",
    title: "Road Glide vs Street Glide: which Harley fits you?",
    excerpt:
      "The two most popular baggers, explained in plain English — fairing style, feel, and who each bike is for.",
    topic: "comparisons",
    keywords: ["road glide", "street glide", "bagger", "touring"],
    models: ["road-glide", "street-glide"],
    relatedModelSlugs: ["road-glide", "street-glide"],
    updated: "2026-07-29",
    status: "published",
    faqs: [
      {
        question: "Which fairing is better?",
        answer:
          "Neither is universally better. Road Glide's frame-mounted fairing often feels calmer in wind; Street Glide's batwing feels more traditional. Sit on both.",
      },
      {
        question: "Are the powertrains the same?",
        answer:
          "Across many years they share Touring platforms and similar engines within a generation — still confirm year, options, and condition on the actual bike.",
      },
    ],
    sections: [
      {
        heading: "The short version",
        body: "Both are Harley Touring baggers with saddlebags and similar powertrains across generations. The big difference is the fairing: Road Glide mounts the fairing to the frame (sharknose); Street Glide mounts it to the forks (batwing).",
      },
      {
        heading: "Road Glide — frame-mounted fairing",
        body: "Riders often describe Road Glides as calmer at highway speed and more planted in wind. Great if you do long interstate miles or ride in open Midwestern weather.",
      },
      {
        heading: "Street Glide — fork-mounted fairing",
        body: "Street Glides tend to feel more traditional and connected through the bars. Many riders prefer the batwing look.",
      },
      {
        heading: "How to decide",
        body: "Sit on both. Take a short test ride if you can. Ask about year, mileage, service history, and mods — then talk to Joe about what's actually available.",
      },
    ],
  },
];
