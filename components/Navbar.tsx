"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useStore } from "@/lib/store";
import { motion, AnimatePresence } from "framer-motion";
import { useLang, useT } from "@/lib/LanguageContext";

export default function Navbar() {
  const { cartCount, toggleCart, wishlistCount } = useStore();
  const wCount = wishlistCount();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const count = cartCount();
  const { lang, setLang } = useLang();
  const t = useT();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const heroMode = isHome && !scrolled;

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    h();
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  // Only 4 links (no Home) to match the reference design
  const navLinks = [
    { href: "/shop",    label: t.nav.shop },
    { href: "/gallery", label: t.nav.gallery },
    { href: "/about",   label: t.nav.brand },
    { href: "/custom",  label: t.nav.contact },
  ];

  const iconColor = heroMode ? "rgba(255,255,255,0.85)" : "#1a1a1a";

  return (
    <>
      <nav style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 40px",
        height: "76px",
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        background: heroMode ? "transparent" : "#FAFAF8",
        transition: "background 0.4s ease",
      }} className={heroMode ? "navbar-hero-mode" : ""}>

        {/* LEFT — desktop nav links */}
        <div className="nav-desktop-links" style={{ display: "flex", gap: "32px", alignItems: "center", flex: 1 }}>
          {navLinks.map(l => (
            <Link key={l.href} href={l.href} style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "11px",
              fontWeight: 500,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: heroMode ? "rgba(255,255,255,0.85)" : "#1a1a1a",
              textDecoration: "none",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={e => (e.currentTarget.style.color = "#C9A96E")}
            onMouseLeave={e => (e.currentTarget.style.color = heroMode ? "rgba(255,255,255,0.85)" : "#1a1a1a")}
            >{l.label}</Link>
          ))}
        </div>

        {/* CENTER — logo */}
        <Link href="/" style={{
          textDecoration: "none",
          position: "absolute", left: "50%", transform: "translateX(-50%)",
          display: "flex", alignItems: "center",
        }}>
          <span style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "28px",
            fontWeight: 600,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: heroMode ? "#fff" : "#111111",
            transition: "color 0.4s ease",
            lineHeight: 1,
          }}>
            VIKOS
          </span>
        </Link>

        {/* RIGHT — icons */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px", flex: 1, justifyContent: "flex-end" }}>

          {/* Language toggle */}
          <button
            onClick={() => setLang(lang === "en" ? "he" : "en")}
            style={{
              background: "none", border: "none", cursor: "pointer",
              fontFamily: "'Inter', sans-serif", fontSize: "10px",
              fontWeight: 500, letterSpacing: "0.15em",
              color: heroMode ? "rgba(255,255,255,0.75)" : "#888",
              padding: "2px 0",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={e => (e.currentTarget.style.color = "#C9A96E")}
            onMouseLeave={e => (e.currentTarget.style.color = heroMode ? "rgba(255,255,255,0.75)" : "#888")}
            aria-label="Switch language"
          >
            {lang === "en" ? "עב" : "EN"}
          </button>

          {/* Search icon */}
          <button
            aria-label="Search"
            style={{ background: "none", border: "none", cursor: "pointer", color: iconColor, padding: "4px", display: "flex", transition: "color 0.4s ease" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#C9A96E")}
            onMouseLeave={e => (e.currentTarget.style.color = iconColor)}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="7"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </button>

          {/* Account / wishlist icon */}
          <Link href="/wishlist" aria-label={t.nav.wishlist} style={{
            background: "none", border: "none", cursor: "pointer",
            color: iconColor, padding: "4px", display: "flex",
            position: "relative", textDecoration: "none", transition: "color 0.4s ease",
          }}
          onMouseEnter={e => (e.currentTarget.style.color = "#C9A96E")}
          onMouseLeave={e => (e.currentTarget.style.color = iconColor)}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
            {wCount > 0 && (
              <span style={{ position: "absolute", top: 0, right: 0, width: "14px", height: "14px", borderRadius: "50%", background: "#C9A96E", color: "#fff", fontSize: "7px", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter',sans-serif" }}>{wCount}</span>
            )}
          </Link>

          {/* Cart icon */}
          <button onClick={toggleCart} aria-label={t.nav.cart} style={{
            background: "none", border: "none", cursor: "pointer",
            color: iconColor, padding: "4px", position: "relative",
            display: "flex", transition: "color 0.4s ease",
          }}
          onMouseEnter={e => (e.currentTarget.style.color = "#C9A96E")}
          onMouseLeave={e => (e.currentTarget.style.color = iconColor)}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 01-8 0"/>
            </svg>
            {count > 0 && (
              <span style={{ position: "absolute", top: "-2px", right: "-2px", width: "16px", height: "16px", borderRadius: "50%", background: "#C9A96E", color: "#fff", fontSize: "8px", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter',sans-serif", fontWeight: 600 }}>{count}</span>
            )}
          </button>

          {/* Mobile hamburger */}
          <button onClick={() => setMenuOpen(true)} className="nav-mobile-only" aria-label={t.nav.menu}
            style={{ background: "none", border: "none", cursor: "pointer", padding: "4px", flexDirection: "column", gap: "5px" }}>
            <span style={{ display: "block", width: "22px", height: "1.5px", background: iconColor, transition: "background 0.4s ease" }} />
            <span style={{ display: "block", width: "22px", height: "1.5px", background: iconColor, transition: "background 0.4s ease" }} />
            <span style={{ display: "block", width: "14px", height: "1.5px", background: iconColor, transition: "background 0.4s ease" }} />
          </button>
        </div>
      </nav>

      <style>{`
        @media (max-width: 767px) {
          .nav-desktop-links { display: none !important; }
          .nav-mobile-only   { display: flex !important; }
        }
        @media (min-width: 768px) {
          .nav-desktop-links { display: flex !important; }
          .nav-mobile-only   { display: none !important; }
        }
        @media (max-width: 767px) {
          .navbar-hero-mode { display: none !important; }
        }
      `}</style>

      {/* Mobile drawer — slides from left */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{ position: "fixed", inset: 0, zIndex: 50, background: "rgba(0,0,0,0.25)" }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
              transition={{ duration: 0.32, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{ position: "fixed", top: 0, left: 0, zIndex: 51, height: "100%", width: "280px", background: "#FAFAF8", display: "flex", flexDirection: "column" }}
            >
              {/* Drawer header */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 24px", borderBottom: "1px solid #EBEBEB" }}>
                <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "22px", fontWeight: 600, letterSpacing: "0.2em", color: "#111" }}>VIKOS</span>
                <button onClick={() => setMenuOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "#888", padding: "4px" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>

              {/* Drawer links */}
              <nav style={{ display: "flex", flexDirection: "column", padding: "12px 0" }}>
                {navLinks.map((l, i) => (
                  <motion.div key={l.href} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 + i * 0.05 }}>
                    <Link href={l.href} onClick={() => setMenuOpen(false)} style={{
                      display: "block", padding: "15px 24px",
                      fontFamily: "'Inter', sans-serif", fontSize: "11px",
                      fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase",
                      color: "#1a1a1a", textDecoration: "none", borderBottom: "1px solid #F0F0F0",
                    }}>
                      {l.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Language toggle */}
              <div style={{ padding: "24px", marginTop: "auto", borderTop: "1px solid #F0F0F0" }}>
                <button
                  onClick={() => { setLang(lang === "en" ? "he" : "en"); setMenuOpen(false); }}
                  style={{
                    background: "none", border: "1px solid #E0E0E0", cursor: "pointer",
                    fontFamily: "'Inter', sans-serif", fontSize: "10px",
                    fontWeight: 500, letterSpacing: "0.15em",
                    color: "#666", padding: "8px 16px",
                  }}
                >
                  {lang === "en" ? "עברית" : "English"}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
