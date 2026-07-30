export type JosSeverity = "hot" | "watch" | "ok" | "aging" | "muted";

const pillMap: Record<JosSeverity, string> = {
  hot: "jos-pill jos-pill-hot",
  watch: "jos-pill jos-pill-watch",
  ok: "jos-pill jos-pill-ok",
  aging: "jos-pill jos-pill-aging",
  muted: "jos-pill jos-pill-muted",
};

export function SeverityPill({
  severity,
  children,
}: {
  severity: JosSeverity;
  children: React.ReactNode;
}) {
  return <span className={pillMap[severity]}>{children}</span>;
}
