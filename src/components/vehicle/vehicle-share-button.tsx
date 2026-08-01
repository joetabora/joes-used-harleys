"use client";

type Props = {
  url: string;
  title: string;
};

function sessionId(): string {
  const key = "sb_sid";
  let id = window.sessionStorage.getItem(key);
  if (!id) {
    id = `sb_${Math.random().toString(36).slice(2)}_${Date.now()}`;
    window.sessionStorage.setItem(key, id);
  }
  return id;
}

export function VehicleShareButton({ url, title }: Props) {
  return (
    <button
      type="button"
      className="sb-btn sb-btn-secondary"
      onClick={async () => {
        void fetch("/api/analytics/collect", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "SCAN_SHARE",
            sessionId: sessionId(),
            path: window.location.pathname,
            meta: { url },
            product: "SCANBIKE",
          }),
        }).catch(() => {});

        try {
          if (navigator.share) {
            await navigator.share({ title, url });
            return;
          }
        } catch {
          /* fall through to clipboard */
        }
        try {
          await navigator.clipboard.writeText(url);
          alert("Link copied");
        } catch {
          prompt("Copy this link", url);
        }
      }}
    >
      Share
    </button>
  );
}
