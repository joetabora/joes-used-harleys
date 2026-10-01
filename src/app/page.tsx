import { HomeCinematicOpen } from "@/components/home/home-cinematic-open";
import { HomeComeTalk } from "@/components/home/home-come-talk";
import { HomeFindYourFit } from "@/components/home/home-find-your-fit";
import { HomeFromTheBench } from "@/components/home/home-from-the-bench";
import { HomeHowWeTalkBikes } from "@/components/home/home-how-we-talk";
import { HomeMeetJoe } from "@/components/home/home-meet-joe";
import { HomeOnTheFloor } from "@/components/home/home-on-the-floor";
import { HomeOpeningLetter } from "@/components/home/home-opening-letter";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Used Harley-Davidson Motorcycles Near Milwaukee",
  description:
    "Joe helps Milwaukee and Southeastern Wisconsin riders find and buy used Harley-Davidson motorcycles — honest guidance, live inventory, and a salesperson you can actually talk to.",
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
