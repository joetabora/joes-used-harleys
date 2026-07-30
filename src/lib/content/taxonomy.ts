import modelsJson from "@/content/taxonomy/models.json";
import enginesJson from "@/content/taxonomy/engines.json";
import colorsJson from "@/content/taxonomy/colors.json";
import geoJson from "@/content/taxonomy/geo.json";
import comparisonsJson from "@/content/taxonomy/comparisons.json";
import topicsJson from "@/content/taxonomy/topics.json";

export type HarleyModel = {
  slug: string;
  displayName: string;
  family: "Touring" | "Softail" | "Sportster" | "Trike" | "Dyna" | "CVO" | "Other";
  aliases: string[];
  yearsInProduction: number[];
  engineIds: string[];
  relatedModels: string[];
  comparisonIds: string[];
  summary: string;
  whoItsFor: string;
};

export type HarleyEngine = {
  slug: string;
  name: string;
  era: string;
  notes: string;
};

export type HarleyColor = {
  slug: string;
  name: string;
  eras: string[];
};

export type GeoPlace = {
  slug: string;
  name: string;
  state: string;
  tier: "primary" | "secondary";
  region: string;
  headline: string;
  intro: string;
};

export type ComparisonPair = {
  slug: string;
  a: string;
  b: string;
  title: string;
  excerpt: string;
  sections: { heading: string; body: string }[];
  faqs: { question: string; answer: string }[];
};

export type GuideTopic = {
  slug: string;
  label: string;
  description: string;
};

export const models = modelsJson as HarleyModel[];
export const engines = enginesJson as HarleyEngine[];
export const colors = colorsJson as HarleyColor[];
export const geoPlaces = geoJson as GeoPlace[];
export const comparisons = comparisonsJson as ComparisonPair[];
export const topics = topicsJson as GuideTopic[];

export function listModels() {
  return models;
}
export function getModel(slug: string) {
  return models.find((m) => m.slug === slug);
}
export function listEngines() {
  return engines;
}
export function getEngine(slug: string) {
  return engines.find((e) => e.slug === slug);
}
export function listColors() {
  return colors;
}
export function getColor(slug: string) {
  return colors.find((c) => c.slug === slug);
}
export function listGeo() {
  return geoPlaces;
}
export function getGeo(slug: string) {
  return geoPlaces.find((g) => g.slug === slug);
}
export function listComparisons() {
  return comparisons;
}
export function getComparison(slug: string) {
  return comparisons.find((c) => c.slug === slug);
}
export function listTopics() {
  return topics;
}
export function getTopic(slug: string) {
  return topics.find((t) => t.slug === slug);
}

export const FAMILIES = [
  "Touring",
  "Softail",
  "Sportster",
  "Dyna",
  "CVO",
  "Trike",
  "Other",
] as const;
