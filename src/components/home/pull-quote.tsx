/**
 * Renders only when a real quote string is provided.
 * Pass nothing / empty / PLACEHOLDER → renders null (no invented quotes).
 */
export function PullQuote({ quote, attribution }: { quote?: string; attribution?: string }) {
  if (!quote || quote.includes("PLACEHOLDER") || quote.trim().length === 0) {
    return null;
  }

  return (
    <blockquote className="joe-pull-quote my-8">
      <p>{quote}</p>
      {attribution && !attribution.includes("PLACEHOLDER") ? (
        <footer className="mt-3 font-label not-italic text-steel">— {attribution}</footer>
      ) : null}
    </blockquote>
  );
}
