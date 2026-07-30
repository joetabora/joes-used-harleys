/**
 * Back-compat city pages — data now lives in taxonomy geo.json.
 */
import { getGeo, listGeo, type GeoPlace } from "@/lib/content/taxonomy";

export type CityPage = {
  slug: string;
  name: string;
  state: string;
  headline: string;
  intro: string;
};

export const cityPages: CityPage[] = listGeo().map((g: GeoPlace) => ({
  slug: g.slug,
  name: g.name,
  state: g.state,
  headline: g.headline,
  intro: g.intro,
}));

export function getCityPage(slug: string): CityPage | undefined {
  const g = getGeo(slug);
  if (!g) return undefined;
  return {
    slug: g.slug,
    name: g.name,
    state: g.state,
    headline: g.headline,
    intro: g.intro,
  };
}
