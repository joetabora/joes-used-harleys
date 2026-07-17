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
  tone?: "default" | "muted" | "asphalt";
}) {
  return (
    <section
      id={id}
      className={cn(
        tone === "muted" && "bg-muted/50",
        tone === "asphalt" && "bg-asphalt text-primary-foreground",
        className,
      )}
    >
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">{children}</div>
    </section>
  );
}
