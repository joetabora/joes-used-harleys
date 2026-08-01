"use client";

export function QrSheetPrintButton() {
  return (
    <button type="button" className="jos-btn jos-btn-primary" onClick={() => window.print()}>
      Print / Save PDF
    </button>
  );
}
