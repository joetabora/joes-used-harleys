import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const runtime = "edge";
export const alt = siteConfig.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: 64,
          background: "#080808",
          color: "#f5f5f3",
          fontSize: 56,
          fontWeight: 700,
          letterSpacing: 2,
        }}
      >
        <div style={{ color: "#f4511e", fontSize: 28, letterSpacing: 6, marginBottom: 16 }}>
          JOE&apos;S USED HARLEYS
        </div>
        <div style={{ maxWidth: 900, lineHeight: 1.1 }}>
          Used Harley buying help for Southeast Wisconsin
        </div>
      </div>
    ),
    { ...size },
  );
}
