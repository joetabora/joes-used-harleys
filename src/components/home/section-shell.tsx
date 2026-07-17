import { cn } from "@/lib/utils";

export function SectionShell({
  children,
  className,
  id,
  tone = "default",
  spread = false,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  tone?: "default" | "bay" | "asphalt";
  /** Wider horizontal padding rhythm for cinematic spreads */
  spread?: boolean;
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
      <div
        className={cn(
          "mx-auto max-w-6xl",
          spread ? "px-4 py-24 md:px-8 md:py-32" : "px-4 py-20 md:py-24",
        )}
      >
        {children}
      </div>
    </section>
  );
}
