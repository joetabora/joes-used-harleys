import { cn } from "@/lib/utils";

export function EditorialMeasure({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("joe-measure mx-auto", className)}>{children}</div>;
}
