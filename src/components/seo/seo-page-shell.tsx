import Link from "next/link";
import { JsonLd } from "@/components/seo/json-ld";
import { RelatedArticles } from "@/components/seo/related-articles";
import { RelatedInventory } from "@/components/seo/related-inventory";
import { SeoBreadcrumbs } from "@/components/seo/seo-breadcrumbs";
import { SeoFaq } from "@/components/seo/seo-faq";
import type { RelatedBikeCard } from "@/lib/seo/inventory-related";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  buildJsonLdGraph,
  faqJsonLd,
  webPageJsonLd,
  websiteJsonLd,
} from "@/lib/seo/schema";
import type { SeoPageDocument } from "@/lib/seo/types";

export function SeoPageShell({
  doc,
  bikes = [],
  children,
}: {
  doc: SeoPageDocument;
  bikes?: RelatedBikeCard[];
  children?: React.ReactNode;
}) {
  const graph = buildJsonLdGraph([
    websiteJsonLd(),
    doc.ogType === "article" || doc.type === "guide" || doc.type === "article"
      ? articleJsonLd({
          title: doc.title,
          description: doc.description,
          path: doc.path,
        })
      : webPageJsonLd({
          title: doc.title,
          description: doc.description,
          path: doc.path,
        }),
    breadcrumbJsonLd(doc.breadcrumbs),
    faqJsonLd(doc.faqs),
    ...(doc.schemaExtra ?? []),
  ]);

  return (
    <article className="mx-auto max-w-3xl space-y-10 px-4 py-12">
      <JsonLd data={graph} />
      <SeoBreadcrumbs items={doc.breadcrumbs} />
      <header className="space-y-3">
        <h1 className="font-display text-3xl tracking-[0.06em] md:text-4xl">{doc.h1}</h1>
        <p className="text-steel">{doc.description}</p>
      </header>

      {children}

      <div className="space-y-8">
        {doc.sections.map((s) => (
          <section key={s.heading} className="space-y-3">
            <h2 className="font-display text-2xl tracking-[0.04em]">{s.heading}</h2>
            <p className="leading-relaxed text-ink/85 whitespace-pre-wrap">{s.body}</p>
          </section>
        ))}
      </div>

      <SeoFaq faqs={doc.faqs} />
      <RelatedArticles links={doc.relatedLinks} />
      <RelatedInventory bikes={bikes} />

      <div className="joe-panel p-5">
        <p className="font-label text-lamp">Next step</p>
        <p className="mt-2 text-sm text-steel">
          Ready to look at real bikes or ask about payments?{" "}
          <Link href="/contact" className="text-lamp underline-offset-4 hover:underline">
            Contact Joe
          </Link>
          .
        </p>
      </div>
    </article>
  );
}
