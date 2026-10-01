import { ImageResponse } from "next/og";
import { ogFonts, publicAssetDataUrl } from "@/lib/og-assets";
import { siteConfig } from "@/lib/site";

export const alt = `${siteConfig.name} — Pull up a stool. Let's talk motorcycles.`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const [hero, logo, fonts] = await Promise.all([
    publicAssetDataUrl("top.png", "image/png"),
    publicAssetDataUrl("logo.png", "image/png"),
    ogFonts(),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          height: "100%",
          width: "100%",
          display: "flex",
          background: "#080808",
          color: "#f5f5f3",
          fontFamily: "Oswald",
        }}
      >
        <img
          src={hero}
          alt=""
          width={1200}
          height={630}
          style={{ position: "absolute", top: 0, left: 0, objectFit: "cover" }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            backgroundImage:
              "linear-gradient(90deg, rgba(8,8,8,0.96) 0%, rgba(8,8,8,0.82) 55%, rgba(8,8,8,0.35) 100%)",
          }}
        />
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: 64,
            width: "100%",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <img src={logo} alt="" width={88} height={88} />
            <div style={{ fontSize: 30, letterSpacing: 4 }}>JOE&apos;S USED HARLEYS</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 100, lineHeight: 0.95 }}>PULL UP A STOOL.</div>
            <div style={{ fontSize: 100, lineHeight: 0.95, color: "#f4511e" }}>
              LET&apos;S TALK MOTORCYCLES.
            </div>
            <div
              style={{
                marginTop: 28,
                fontSize: 28,
                letterSpacing: 3,
                color: "rgba(245,245,243,0.75)",
              }}
            >
              USED HARLEY-DAVIDSONS · MILWAUKEE &amp; SOUTHEASTERN WISCONSIN
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
