import { cn } from "@/lib/utils";

export function SectionShell({
  children,
  className,
  id,
  tone = "default",
  spread = false,
  width = "default",
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  tone?: "default" | "bay" | "asphalt";
  /** Wider horizontal padding rhythm for cinematic spreads */
  spread?: boolean;
  /** Column width — full drops the max-width wrapper for bleed/overlap layouts */
  width?: "default" | "wide" | "full";
}) {
  const padding = spread ? "px-4 py-24 md:px-8 md:py-32" : "px-4 py-20 md:py-24";

  return (
    <section
      id={id}
      className={cn(
        tone === "bay" && "bg-bay",
        tone === "asphalt" && "joe-asphalt-bay text-ink",
        className,
      )}
    >
      {width === "full" ? (
        <div className={cn("relative z-[1]", padding)}>{children}</div>
      ) : (
        <div
          className={cn(
            "relative z-[1] mx-auto",
            width === "wide" ? "max-w-7xl" : "max-w-6xl",
            padding,
          )}
        >
          {children}
        </div>
      )}
    </section>
  );
}
