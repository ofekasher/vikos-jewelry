"use client";

export default function HeroVideo() {
  return (
    <section style={{
      position: "relative", width: "100%",
      height: "100dvh", minHeight: "560px",
      overflow: "hidden",
      background: "#f5f0eb",
    }}>
      <img
        src="/hero-editorial.jpg"
        alt="VIKOS Jewelry"
        loading="eager"
        style={{
          width: "100%", height: "100%",
          objectFit: "cover",
          objectPosition: "center 40%",
          display: "block",
        }}
      />
    </section>
  );
}
