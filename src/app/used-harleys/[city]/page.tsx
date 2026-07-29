import Link from "next/link";
import { notFound } from "next/navigation";
import { LeadForm } from "@/components/lead-form";
import { cityPages, getCityPage } from "@/lib/cities";
import { createMetadata } from "@/lib/seo";

type Props = { params: Promise<{ city: string }> };

export function generateStaticParams() {
  return cityPages.map((city) => ({ city: city.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { city: slug } = await params;
  const city = getCityPage(slug);
  if (!city) {
    return createMetadata({
      title: "City",
      description: "City page",
      path: `/used-harleys/${slug}`,
      noIndex: true,
    });
  }
  return createMetadata({
    title: `Used Harleys ${city.name}`,
    description: city.intro,
    path: `/used-harleys/${city.slug}`,
  });
}

export default async function CityLandingPage({ params }: Props) {
  const { city: slug } = await params;
  const city = getCityPage(slug);
  if (!city) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: city.headline,
    description: city.intro,
  };

  return (
    <div className="mx-auto max-w-3xl space-y-8 px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="space-y-3">
        <p className="font-label text-lamp">
          {city.name}, {city.state}
        </p>
        <h1 className="font-display text-3xl tracking-[0.04em] md:text-4xl">{city.headline}</h1>
        <p className="text-steel">{city.intro}</p>
      </div>
      <p className="text-sm text-steel">
        Live inventory is listed only when configured — we do not invent local stock counts.{" "}
        <Link href="/inventory" className="text-lamp underline-offset-4 hover:underline">
          Check inventory
        </Link>{" "}
        or{" "}
        <Link href="/guides" className="text-lamp underline-offset-4 hover:underline">
          read the guides
        </Link>
        .
      </p>
      <div className="joe-panel p-5">
        <p className="font-label mb-4 text-lamp">Talk to Joe about a {city.name} purchase</p>
        <LeadForm source={`/used-harleys/${city.slug}`} />
      </div>
    </div>
  );
}
