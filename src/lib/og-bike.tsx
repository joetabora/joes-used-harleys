/* eslint-disable @next/next/no-img-element -- Satori renders plain <img>, not next/image. */
import { ImageResponse } from "next/og";
import { ogFonts } from "@/lib/og-assets";

export const OG_SIZE = { width: 1200, height: 630 };

export type BikeShareCard = {
  label: string;
  price: string;
  miles: string;
  pending: boolean;
  photo: string | null;
  logo: string;
};

export async function renderBikeShareImage(card: BikeShareCard) {
  const fonts = await ogFonts();
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
        {card.photo ? (
          <img
            src={card.photo}
            alt=""
            width={OG_SIZE.width}
            height={OG_SIZE.height}
            style={{ position: "absolute", top: 0, left: 0, objectFit: "cover" }}
          />
        ) : null}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            backgroundImage:
              "linear-gradient(0deg, rgba(8,8,8,0.97) 0%, rgba(8,8,8,0.8) 32%, rgba(8,8,8,0) 70%)",
          }}
        />
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: 56,
            width: "100%",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                padding: "10px 20px 10px 10px",
                background: "rgba(8,8,8,0.78)",
              }}
            >
              <img src={card.logo} alt="" width={64} height={64} />
              <div style={{ fontSize: 26, letterSpacing: 3 }}>JOE&apos;S USED HARLEYS</div>
            </div>
            {card.pending ? (
              <div
                style={{
                  display: "flex",
                  padding: "10px 20px",
                  background: "#f5f5f3",
                  color: "#080808",
                  fontSize: 24,
                  letterSpacing: 3,
                }}
              >
                SALE PENDING
              </div>
            ) : null}
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 76, lineHeight: 1 }}>{card.label}</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 32, marginTop: 18 }}>
              <div style={{ fontSize: 60, color: "#f4511e" }}>{card.price}</div>
              <div style={{ fontSize: 32, letterSpacing: 2, color: "rgba(245,245,243,0.8)" }}>
                {card.miles.toUpperCase()}
              </div>
              <div style={{ fontSize: 32, letterSpacing: 2, color: "rgba(245,245,243,0.8)" }}>
                MILWAUKEE, WI
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts },
  );
}
