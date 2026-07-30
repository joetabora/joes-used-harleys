import type { FaqItem } from "@/lib/seo/types";

export function SeoFaq({ faqs }: { faqs: FaqItem[] }) {
  if (faqs.length === 0) return null;
  return (
    <section className="space-y-4">
      <h2 className="font-display text-2xl tracking-[0.04em]">FAQ</h2>
      <dl className="space-y-4">
        {faqs.map((f) => (
          <div key={f.question} className="joe-panel p-4">
            <dt className="font-display text-lg tracking-[0.04em] text-ink">{f.question}</dt>
            <dd className="mt-2 text-sm leading-relaxed text-steel">{f.answer}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
