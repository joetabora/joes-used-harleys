import { cn } from "@/lib/utils";

type FrameVariant = "portrait" | "bay" | "hero";

const aspect: Record<FrameVariant, string> = {
  portrait: "aspect-[3/4]",
  bay: "aspect-[16/9]",
  hero: "aspect-[21/9] min-h-[12rem] md:min-h-[16rem]",
};

export function MediaFrame({
  label,
  variant = "bay",
  className,
}: {
  label: string;
  variant?: FrameVariant;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "joe-frame flex items-center justify-center px-6",
        aspect[variant],
        className,
      )}
    >
      <p className="font-label text-center text-steel/90">{label}</p>
    </div>
  );
}
