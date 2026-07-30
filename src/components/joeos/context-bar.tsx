import Link from "next/link";
import { SeverityPill, type JosSeverity } from "@/components/joeos/ui/severity-pill";

export function ContextBar({
  parentHref,
  parentLabel,
  entityLabel,
  status,
  statusSeverity = "muted",
}: {
  parentHref: string;
  parentLabel: string;
  entityLabel: string;
  status?: string;
  statusSeverity?: JosSeverity;
}) {
  return (
    <div className="jos-context-bar">
      <div className="min-w-0 space-y-1">
        <Link href={parentHref} className="jos-context-back">
          ← {parentLabel}
        </Link>
        <p className="jos-item truncate text-base">{entityLabel}</p>
      </div>
      {status ? <SeverityPill severity={statusSeverity}>{status}</SeverityPill> : null}
    </div>
  );
}
