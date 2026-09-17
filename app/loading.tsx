const T = { gold: "#8B7355", warm: "#FAFAF8" };

export default function Loading() {
  return (
    <div style={{ minHeight: "100vh", background: T.warm, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div
        style={{
          width: "28px", height: "28px", borderRadius: "50%",
          border: `2px solid rgba(139,115,85,0.2)`, borderTopColor: T.gold,
          animation: "vikos-spin 0.8s linear infinite",
        }}
      />
      <style>{`@keyframes vikos-spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
