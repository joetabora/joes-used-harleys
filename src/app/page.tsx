import { HomeCinematicOpen } from "@/components/home/home-cinematic-open";
import { HomeComeTalk } from "@/components/home/home-come-talk";
import { HomeFindYourFit } from "@/components/home/home-find-your-fit";
import { HomeFromTheBench } from "@/components/home/home-from-the-bench";
import { HomeHowWeTalkBikes } from "@/components/home/home-how-we-talk";
import { HomeMeetJoe } from "@/components/home/home-meet-joe";
import { HomeOnTheFloor } from "@/components/home/home-on-the-floor";
import { HomeOpeningLetter } from "@/components/home/home-opening-letter";
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
      <HomeCinematicOpen />
      <HomeOpeningLetter />
      <HomeMeetJoe />
      <HomeHowWeTalkBikes />
      <HomeOnTheFloor />
      <HomeFromTheBench />
      <HomeFindYourFit />
      <HomeComeTalk />
    </>
  );
}
