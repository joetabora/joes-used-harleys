import type { ReactNode } from "react";
import { JosPanel } from "@/components/joeos/ui/jos-panel";

export function EmptyState({
  label,
  children,
  warn = false,
  action,
}: {
  label: string;
  children: ReactNode;
  warn?: boolean;
  action?: ReactNode;
}) {
  return (
    <JosPanel>
      <p className={`jos-label ${warn ? "text-[var(--jos-warn)]" : ""}`.trim()}>{label}</p>
      <div className="jos-body mt-2">{children}</div>
      {action ? <div className="mt-4">{action}</div> : null}
    </JosPanel>
  );
}
