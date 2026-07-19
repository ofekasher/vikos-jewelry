import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "VIKOS Jewelry — תכשיטי יוקרה ישראלים";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#1A1A18",
          position: "relative",
        }}
      >
        {/* Gold accent line top */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: "#C9A96E", display: "flex" }} />

        {/* Brand name */}
        <div
          style={{
            fontFamily: "serif",
            fontSize: "96px",
            fontWeight: 600,
            letterSpacing: "0.3em",
            color: "#FFFFFF",
            textTransform: "uppercase",
            display: "flex",
          }}
        >
          VIKOS
        </div>

        {/* Gold divider */}
        <div style={{ width: "60px", height: "1px", background: "#C9A96E", margin: "20px 0", display: "flex" }} />

        {/* Tagline */}
        <div
          style={{
            fontFamily: "serif",
            fontSize: "20px",
            fontWeight: 300,
            letterSpacing: "0.25em",
            color: "#C9A96E",
            textTransform: "uppercase",
            display: "flex",
          }}
        >
          JEWELRY
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontFamily: "sans-serif",
            fontSize: "16px",
            fontWeight: 300,
            letterSpacing: "0.15em",
            color: "rgba(255,255,255,0.45)",
            marginTop: "24px",
            display: "flex",
          }}
        >
          תכשיטי יוקרה ישראלים
        </div>

        {/* Gold accent line bottom */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "3px", background: "#C9A96E", display: "flex" }} />
      </div>
    ),
    { ...size }
  );
}
