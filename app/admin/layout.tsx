"use client";
import { useRouter, usePathname } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router   = useRouter();
  const pathname = usePathname();
  const isLogin  = pathname === "/admin/login";

  async function logout() {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push("/admin/login");
  }

  return (
    <div style={{ minHeight: "100vh", background: "#FAFAF8", fontFamily: "'Inter', system-ui, sans-serif" }} dir="rtl">
      {!isLogin && (
        <nav style={{ background: "#fff", borderBottom: "1px solid #E8E8E4", padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", height: "56px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
            <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.25rem", fontWeight: 400, color: "#111", letterSpacing: "0.06em" }}>
              VIKOS Studio
            </span>
            <div style={{ display: "flex", gap: "24px" }}>
              <NavLink href="/admin/dashboard" active={pathname.startsWith("/admin/dashboard")}>מוצרים</NavLink>
            </div>
          </div>
          <button
            onClick={logout}
            style={{ fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#888", background: "none", border: "none", cursor: "pointer", padding: "4px 8px" }}
          >
            יציאה
          </button>
        </nav>
      )}
      <main style={{ padding: isLogin ? "0" : "32px" }}>
        {children}
      </main>
    </div>
  );
}

function NavLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <a
      href={href}
      style={{ fontSize: "13px", color: active ? "#111" : "#888", textDecoration: "none", borderBottom: active ? "1px solid #111" : "1px solid transparent", paddingBottom: "2px", transition: "color 0.15s" }}
    >
      {children}
    </a>
  );
}
