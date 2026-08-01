"use client";

import { useEffect, useState } from "react";

type Props = {
  images: string[];
  title: string;
  initial?: string | null;
};

export function VehicleGallery({ images, title, initial }: Props) {
  const [active, setActive] = useState(initial ?? images[0] ?? null);

  useEffect(() => {
    setActive(initial ?? images[0] ?? null);
  }, [initial, images]);

  if (!images.length) {
    return (
      <div className="sb-hero" aria-label="No photos available">
        <div
          style={{
            display: "flex",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
            color: "#9aa3ad",
          }}
        >
          No photos
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="sb-hero">
        {active ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={active} alt={title} />
        ) : null}
      </div>
      {images.length > 1 ? (
        <div className="sb-section" style={{ paddingLeft: "1.1rem", paddingRight: "1.1rem" }}>
          <h2>Gallery</h2>
          <div className="sb-gallery">
            {images.map((src, i) => (
              <button
                key={`${src}-${i}`}
                type="button"
                aria-label={`Photo ${i + 1}`}
                onClick={() => {
                  setActive(src);
                  void fetch("/api/analytics/collect", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      type: "SCAN_GALLERY_INTERACTION",
                      sessionId: getSessionId(),
                      path: typeof window !== "undefined" ? window.location.pathname : "",
                      meta: { index: i },
                      product: "SCANBIKE",
                    }),
                  }).catch(() => {});
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="" />
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
}

function getSessionId(): string {
  if (typeof window === "undefined") return "server";
  const key = "sb_sid";
  let id = window.sessionStorage.getItem(key);
  if (!id) {
    id = `sb_${Math.random().toString(36).slice(2)}_${Date.now()}`;
    window.sessionStorage.setItem(key, id);
  }
  return id;
}
