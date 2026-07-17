import { cn } from "@/lib/utils";

export function SectionShell({
  children,
  className,
  id,
  tone = "default",
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  tone?: "default" | "bay" | "asphalt";
}) {
  return (
    <section
      id={id}
      className={cn(
        tone === "bay" && "bg-bay",
        tone === "asphalt" && "joe-asphalt-bay text-primary-foreground",
        className,
      )}
    >
      <div className="mx-auto max-w-6xl px-4 py-20 md:py-24">{children}</div>
    </section>
  );
}
