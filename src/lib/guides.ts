/**
 * Static educational guide content.
 * Public model knowledge only — no inventory, prices, dealership claims, or reviews.
 */

export type Guide = {
  slug: string;
  title: string;
  excerpt: string;
  category: "models" | "buying" | "comparisons";
  keywords: string[];
  sections: { heading: string; body: string }[];
};

export const guides: Guide[] = [
  {
    slug: "road-glide-vs-street-glide",
    title: "Road Glide vs Street Glide: which Harley fits you?",
    excerpt:
      "The two most popular baggers, explained in plain English — fairing style, feel, and who each bike is for.",
    category: "comparisons",
    keywords: ["road glide", "street glide", "bagger", "touring"],
    sections: [
      {
        heading: "The short version",
        body: "Both are Harley Touring baggers with saddlebags and similar powertrains across generations. The big difference is the fairing: Road Glide mounts the fairing to the frame (sharknose); Street Glide mounts it to the forks (batwing). That changes how the bike feels in crosswinds and how the handlebars respond.",
      },
      {
        heading: "Road Glide — frame-mounted fairing",
        body: "Riders often describe Road Glides as calmer at highway speed and more planted in wind. The frame-mounted fairing keeps mass off the forks. Great if you do long interstate miles or ride in open Midwestern weather.",
      },
      {
        heading: "Street Glide — fork-mounted fairing",
        body: "Street Glides tend to feel more traditional and connected through the bars. Many riders prefer the batwing look. If you want the classic bagger silhouette and a slightly more lively front end, this is usually the starting point.",
      },
      {
        heading: "How to decide",
        body: "Sit on both. Take a short test ride if you can. Ask about year, mileage, service history, and mods — those matter more than the badge on the fairing. When you're ready, talk to Joe about what's actually available and what payment looks like for your situation.",
      },
    ],
  },
  {
    slug: "first-time-harley-buyer-guide",
    title: "First-time used Harley buyer guide",
    excerpt:
      "What to check, what to ignore, and how to buy without feeling pressured on the floor.",
    category: "buying",
    keywords: ["first motorcycle", "used harley", "buying guide"],
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
    slug: "used-street-glide-buying-tips",
    title: "Used Street Glide buying tips",
    excerpt:
      "What first-time bagger buyers should ask before they put money down on a Street Glide.",
    category: "models",
    keywords: ["street glide", "used", "touring"],
    sections: [
      {
        heading: "Know the generation",
        body: "Street Glides span many years and platform updates. Infotainment, motors, and chassis details change across generations. Confirm year and options so you're comparing apples to apples.",
      },
      {
        heading: "Mileage context",
        body: "Touring bikes often see highway miles. Higher mileage with documented maintenance can be healthier than low mileage with neglect. Ask what was done and when.",
      },
      {
        heading: "Common mod checklist",
        body: "Aftermarket exhaust, bars, seats, and audio are common. Mods aren't bad — just verify quality installs and keep the original parts if possible.",
      },
    ],
  },
  {
    slug: "buying-a-harley-out-of-state",
    title: "Buying a Harley out of state",
    excerpt:
      "How remote buyers build trust, inspect a bike, and plan shipping without getting burned.",
    category: "buying",
    keywords: ["out of state", "shipping", "remote purchase"],
    sections: [
      {
        heading: "Trust comes before the wire",
        body: "Ask for a video walkaround, detailed photos, and a live FaceTime or video call. A salesperson who shows you every scratch is doing their job.",
      },
      {
        heading: "Paperwork and transport",
        body: "Confirm title status, payoff if financed, and who handles transport. Get shipping quotes in writing. Never send deposits to personal accounts you can't verify.",
      },
      {
        heading: "Local pickup vs ship",
        body: "If you can fly in and ride home, great. If not, a reputable transporter and a clear handoff plan matter more than saving a few bucks.",
      },
    ],
  },
];

export function getGuide(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}

export function getGuidesByCategory(category: Guide["category"]): Guide[] {
  return guides.filter((g) => g.category === category);
}

/** Lightweight knowledge base text for the Phase 4 assistant (no invented inventory). */
export function getAssistantKnowledgeBase(): string {
  return guides
    .map(
      (g) =>
        `# ${g.title}\n${g.sections.map((s) => `## ${s.heading}\n${s.body}`).join("\n")}`,
    )
    .join("\n\n");
}
