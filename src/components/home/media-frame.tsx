import Image from "next/image";
import { cn } from "@/lib/utils";

type FrameVariant = "portrait" | "bay" | "hero" | "tall";

const aspect: Record<FrameVariant, string> = {
  portrait: "aspect-[3/4]",
  bay: "aspect-[16/9]",
  hero: "aspect-[21/9] min-h-[12rem] md:min-h-[16rem]",
  tall: "aspect-[4/5] min-h-[18rem]",
};

export function MediaFrame({
  label,
  variant = "bay",
  className,
  src,
  alt,
}: {
  label: string;
  variant?: FrameVariant;
  className?: string;
  /** Public path e.g. `/me.jpg` — when set, shows the photo instead of placeholder text */
  src?: string;
  alt?: string;
}) {
  return (
    <div
      className={cn(
        "joe-frame relative overflow-hidden",
        src ? "" : "flex items-center justify-center px-6",
        aspect[variant],
        className,
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={alt ?? label}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 70vw"
          priority={variant === "hero"}
        />
      ) : (
        <p className="font-label text-center text-steel/90">{label}</p>
      )}
    </div>
  );
}
