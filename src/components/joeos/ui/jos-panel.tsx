import type { HTMLAttributes, ReactNode } from "react";

export function JosPanel({
  raised = false,
  hero = false,
  className = "",
  children,
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  raised?: boolean;
  hero?: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className={`${raised ? "jos-panel-raised" : "jos-panel"} ${hero ? "jos-pad-hero" : "jos-pad"} ${className}`.trim()}
      {...props}
    >
      {children}
    </div>
  );
}
