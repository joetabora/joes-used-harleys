import type { ReactNode } from "react";

export function JosSectionHeader({
  section,
  title,
  action,
}: {
  section: string;
  title?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3">
      <div>
        <p className="jos-section">{section}</p>
        {title ? <h2 className="jos-title mt-1 text-2xl md:text-3xl">{title}</h2> : null}
      </div>
      {action}
    </div>
  );
}
