"use client";
import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setLoading(false);
    if (res.ok) {
      router.push(params.get("from") || "/admin/dashboard");
    } else {
      const { error: msg } = await res.json();
      setError(msg || "שגיאה");
    }
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#FAFAF8", fontFamily: "'Inter', system-ui, sans-serif" }}>
      <div style={{ width: "100%", maxWidth: "380px", padding: "48px 40px", background: "#fff", boxShadow: "0 1px 24px rgba(0,0,0,0.07)" }}>
        <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "2rem", fontWeight: 300, color: "#111", marginBottom: "8px" }}>
          VIKOS Studio
        </h1>
        <p style={{ fontSize: "13px", color: "#888", marginBottom: "32px" }}>ניהול חנות תכשיטים</p>

        <form onSubmit={handleSubmit}>
          <label style={{ display: "block", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#555", marginBottom: "6px" }}>
            סיסמה
          </label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            autoFocus
            required
            style={{ width: "100%", padding: "11px 14px", border: "1px solid #E0E0E0", fontSize: "14px", outline: "none", boxSizing: "border-box", fontFamily: "inherit" }}
            onFocus={e => (e.currentTarget.style.borderColor = "#8B7355")}
            onBlur={e => (e.currentTarget.style.borderColor = "#E0E0E0")}
          />

          {error && (
            <p style={{ color: "#e53e3e", fontSize: "12px", marginTop: "8px" }}>{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{ width: "100%", marginTop: "20px", padding: "13px", background: loading ? "#999" : "#111", color: "#fff", border: "none", fontSize: "12px", letterSpacing: "0.18em", textTransform: "uppercase", cursor: loading ? "not-allowed" : "pointer", transition: "background 0.2s" }}
          >
            {loading ? "..." : "כניסה"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function AdminLogin() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
