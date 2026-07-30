import type { JosSeverity } from "@/components/joeos/ui/severity-pill";

export function Gauge({
  percent,
  severity,
}: {
  percent: number;
  severity?: JosSeverity;
}) {
  const width = Math.max(0, Math.min(100, percent));
  return (
    <div className="jos-gauge-track">
      <div
        className="jos-gauge-fill"
        data-severity={severity}
        style={{ width: `${width}%` }}
      />
    </div>
  );
}
