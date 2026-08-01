"use client";

export function VehicleVideo({ bikeId, src }: { bikeId: string; src: string }) {
  return (
    <video
      className="sb-video"
      controls
      playsInline
      src={src}
      onPlay={() => {
        try {
          const key = "sb_sid";
          let id = sessionStorage.getItem(key);
          if (!id) {
            id = `sb_${Math.random().toString(36).slice(2)}_${Date.now()}`;
            sessionStorage.setItem(key, id);
          }
          void fetch("/api/analytics/collect", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              type: "SCAN_VIDEO_PLAY",
              bikeId,
              sessionId: id,
              path: window.location.pathname,
              product: "SCANBIKE",
            }),
          }).catch(() => {});
        } catch {
          /* ignore */
        }
      }}
    />
  );
}
