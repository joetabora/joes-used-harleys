/**
 * SEO city landing pages.
 * Educational + lead capture only. No invented local inventory counts or dealership claims.
 */

export type CityPage = {
  slug: string;
  name: string;
  state: string;
  headline: string;
  intro: string;
};

export const cityPages: CityPage[] = [
  {
    slug: "milwaukee",
    name: "Milwaukee",
    state: "WI",
    headline: "Used Harleys in Milwaukee — buy with a salesperson you can trust",
    intro:
      "Looking for a used Harley in the Milwaukee area? Joe helps buyers compare models, understand payments, and move at a human pace — whether you're local or shopping from out of town.",
  },
  {
    slug: "madison",
    name: "Madison",
    state: "WI",
    headline: "Used Harley help for Madison riders",
    intro:
      "Madison buyers who want a straight conversation about used Harleys can work with Joe — education first, pressure never.",
  },
  {
    slug: "chicago",
    name: "Chicago",
    state: "IL",
    headline: "Chicago-area used Harley buyers",
    intro:
      "If you're in Chicagoland and want help finding the right used Harley, Joe can walk you through options, alerts, and next steps without inventing stock that isn't there.",
  },
];

export function getCityPage(slug: string): CityPage | undefined {
  return cityPages.find((c) => c.slug === slug);
}
