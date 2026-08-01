"use client";

import { useEffect, useState, type ReactNode } from "react";

type Props = {
  images: string[];
  title: string;
  initial?: string | null;
  /** Rendered between the hero image and the thumbnail strip (title, description, etc.). */
  children?: ReactNode;
};

export function VehicleGallery({ images, title, initial, children }: Props) {
  const [active, setActive] = useState(initial ?? images[0] ?? null);

  useEffect(() => {
    setActive(initial ?? images[0] ?? null);
  }, [initial, images]);

  return (
    <>
      <div className="sb-hero" aria-label={images.length ? undefined : "No photos available"}>
        {active ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={active} alt={title} />
        ) : (
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
        )}
      </div>

      {children}

      {images.length > 1 ? (
        <div className="sb-thumb-strip" role="list" aria-label="Photos">
          {images.map((src, i) => (
            <button
              key={`${src}-${i}`}
              type="button"
              role="listitem"
              aria-label={`Photo ${i + 1}`}
              aria-pressed={active === src}
              className={active === src ? "sb-thumb is-active" : "sb-thumb"}
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
