import type { ReactNode } from "react";

export function JosLabel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`jos-label ${className}`.trim()}>{children}</p>;
}

export function JosData({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`jos-data ${className}`.trim()}>{children}</p>;
}

export function JosKpi({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`jos-kpi ${className}`.trim()}>{children}</p>;
}

export function JosItem({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`jos-item ${className}`.trim()}>{children}</p>;
}

export function JosBody({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`jos-body ${className}`.trim()}>{children}</p>;
}
