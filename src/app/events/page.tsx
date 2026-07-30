import Link from "next/link";
import { listEventGuides } from "@/lib/content/guides";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Motorcycle events & shopping",
  description: "How to use motorcycle events when shopping for a used Harley — no invented calendars.",
  path: "/events",
});

export default function EventsIndexPage() {
  const events = listEventGuides();
  return (
    <div className="mx-auto max-w-3xl space-y-8 px-4 py-12">
      <h1 className="font-display text-3xl tracking-[0.06em]">Events</h1>
      <ul className="space-y-3">
        {events.map((e) => (
          <li key={e.slug}>
            <Link href={`/events/${e.slug}`} className="joe-panel block p-4 hover:border-lamp/40">
              <p className="font-display text-lg">{e.title}</p>
              <p className="mt-2 text-sm text-steel">{e.excerpt}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
