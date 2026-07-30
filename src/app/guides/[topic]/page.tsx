import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getGuideBySlug, getGuidesByTopic } from "@/lib/content/guides";
import { listPublishedGuideLinks } from "@/lib/knowledge/compose-from-entity";
import { getTopic, listTopics } from "@/lib/content/taxonomy";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const revalidate = 3600;

type Props = { params: Promise<{ topic: string }> };

export function generateStaticParams() {
  const topics = listTopics().map((t) => ({ topic: t.slug }));
  return topics;
}

export async function generateMetadata({ params }: Props) {
  const { topic } = await params;
  const t = getTopic(topic);
  if (t) {
    return buildPageMetadata({
      title: t.label,
      description: t.description,
      path: `/guides/${t.slug}`,
    });
  }
  const legacy = getGuideBySlug(topic);
  if (legacy) {
    return buildPageMetadata({
      title: legacy.title,
      description: legacy.excerpt,
      path: `/guides/${legacy.topic}/${legacy.slug}`,
    });
  }
  return buildPageMetadata({ title: "Guides", description: "", path: "/guides", noIndex: true });
}

export default async function GuideTopicHubPage({ params }: Props) {
  const { topic } = await params;

  const legacy = getGuideBySlug(topic);
  if (legacy && !getTopic(topic)) {
    redirect(`/guides/${legacy.topic}/${legacy.slug}`);
  }

  const t = getTopic(topic);
  if (!t) notFound();
  const fileGuides = getGuidesByTopic(topic);
  const graphGuides = await listPublishedGuideLinks(topic);
  const seen = new Set(fileGuides.map((g) => `/guides/${g.topic}/${g.slug}`));
  const merged = [
    ...fileGuides.map((g) => ({
      href: `/guides/${g.topic}/${g.slug}`,
      title: g.title,
      excerpt: g.excerpt,
    })),
    ...graphGuides.filter((g) => !seen.has(g.href)),
  ];

  return (
    <div className="mx-auto max-w-3xl space-y-8 px-4 py-12">
      <p className="font-label text-lamp">
        <Link href="/guides" className="hover:underline">
          Guides
        </Link>
      </p>
      <h1 className="font-display text-3xl tracking-[0.06em]">{t.label}</h1>
      <p className="text-steel">{t.description}</p>
      <ul className="space-y-3">
        {merged.map((g) => (
          <li key={g.href}>
            <Link href={g.href} className="joe-panel block p-4 hover:border-lamp/40">
              <p className="font-display text-lg">{g.title}</p>
              <p className="mt-2 text-sm text-steel">{g.excerpt}</p>
            </Link>
          </li>
        ))}
      </ul>
      {merged.length === 0 ? (
        <p className="text-sm text-steel">More guides coming in this topic.</p>
      ) : null}
    </div>
  );
}
