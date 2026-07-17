import Link from "next/link";
import { notFound } from "next/navigation";
import { getGuide, guides } from "@/lib/guides";
import { createMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) {
    return createMetadata({
      title: "Guide not found",
      description: "Missing guide",
      path: `/guides/${slug}`,
      noIndex: true,
    });
  }
  return createMetadata({
    title: guide.title,
    description: guide.excerpt,
    path: `/guides/${guide.slug}`,
  });
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.excerpt,
    author: { "@type": "Person", name: "Joe" },
  };

  return (
    <article className="mx-auto max-w-3xl space-y-8 px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="space-y-3">
        <Link href="/guides" className="text-sm text-muted-foreground underline">
          ← All guides
        </Link>
        <p className="text-xs uppercase tracking-wide text-muted-foreground">{guide.category}</p>
        <h1 className="text-3xl font-semibold tracking-tight">{guide.title}</h1>
        <p className="text-muted-foreground">{guide.excerpt}</p>
      </div>
      <div className="space-y-8">
        {guide.sections.map((section) => (
          <section key={section.heading} className="space-y-2">
            <h2 className="text-xl font-semibold">{section.heading}</h2>
            <p className="leading-relaxed text-muted-foreground">{section.body}</p>
          </section>
        ))}
      </div>
      <p className="rounded-lg border bg-muted/40 p-4 text-sm">
        Ready to talk bikes?{" "}
        <Link href="/contact" className="font-medium underline">
          Contact Joe
        </Link>{" "}
        or{" "}
        <Link href="/assistant" className="font-medium underline">
          ask the buying assistant
        </Link>
        .
      </p>
    </article>
  );
}
