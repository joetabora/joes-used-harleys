import type { LucideIcon } from "lucide-react";

const sizes = { 16: "size-4", 20: "size-5", 24: "size-6" } as const;

export function JosIcon({
  icon: Icon,
  size = 16,
  className = "",
}: {
  icon: LucideIcon;
  size?: 16 | 20 | 24;
  className?: string;
}) {
  return <Icon className={`${sizes[size]} ${className}`.trim()} aria-hidden />;
}
