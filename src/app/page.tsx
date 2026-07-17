import { HomeAbout } from "@/components/home/home-about";
import { HomeContactCta } from "@/components/home/home-contact-cta";
import { HomeEducation } from "@/components/home/home-education";
import { HomeFeaturedInventory } from "@/components/home/home-featured-inventory";
import { HomeHarleyMatchCta } from "@/components/home/home-harley-match-cta";
import { HomeHero } from "@/components/home/home-hero";
import { HomeWhyJoe } from "@/components/home/home-why-joe";
import { createMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata = createMetadata({
  title: siteConfig.name,
  description: siteConfig.description,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <HomeAbout />
      <HomeWhyJoe />
      <HomeHarleyMatchCta />
      <HomeFeaturedInventory />
      <HomeEducation />
      <HomeContactCta />
    </>
  );
}
