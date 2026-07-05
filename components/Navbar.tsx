"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
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

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const navLinks = [
    { href: "/",        label: t.nav.home },
    { href: "/shop",    label: t.nav.shop },
    { href: "/gallery", label: t.nav.gallery },
    { href: "/about",   label: t.nav.brand },
    { href: "/custom",  label: t.nav.contact },
  ];

  return (
    <>
      <nav style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        borderBottom: "1px solid #EBEBEB",
        padding: "0 28px",
        height: "70px",
        position: "sticky", top: 0, zIndex: 50,
        background: "#fff",
        boxShadow: scrolled ? "0 1px 8px rgba(0,0,0,0.05)" : "none",
        transition: "box-shadow 0.3s",
      }}>
        {/* Right side (in RTL: nav links; in LTR: nav links) */}
        <div className="nav-desktop-links" style={{ display: "flex", gap: "28px", alignItems: "center" }}>
          {navLinks.map(l => (
            <Link key={l.href} href={l.href} style={{
              fontFamily: "'Inter',sans-serif", fontSize: "12px", fontWeight: 400,
              letterSpacing: "0.06em", color: "#333", textDecoration: "none", transition: "color 0.2s",
            }}
            onMouseEnter={e => (e.currentTarget.style.color = "#C9A96E")}
            onMouseLeave={e => (e.currentTarget.style.color = "#333")}
            >{l.label}</Link>
          ))}
        </div>

        {/* Center: Logo */}
        <Link href="/" style={{ textDecoration: "none", position: "absolute", left: "50%", transform: "translateX(-50%)" }}>
          <div style={{ height: "52px", overflow: "hidden", lineHeight: 0 }}>
            <img
              src="/logo.png"
              alt="VIKOS"
              style={{ height: "77px", width: "auto", display: "block", mixBlendMode: "multiply" }}
            />
          </div>
        </Link>

        {/* Left side: icons + language toggle */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>

          {/* Language toggle */}
          <button
            onClick={() => setLang(lang === "en" ? "he" : "en")}
            style={{
              background: "none", border: "1px solid #E5E5E5", cursor: "pointer",
              fontFamily: "'Inter',sans-serif", fontSize: "9px", letterSpacing: "0.18em",
              color: "#888", padding: "3px 8px", transition: "border-color 180ms ease, color 180ms ease",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#C9A96E"; e.currentTarget.style.color = "#C9A96E"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "#E5E5E5"; e.currentTarget.style.color = "#888"; }}
            aria-label="Switch language"
          >
            {lang === "en" ? "עב" : "EN"}
          </button>

          {/* Wishlist */}
          <Link href="/wishlist" aria-label={t.nav.wishlist} style={{ background: "none", border: "none", cursor: "pointer", color: "#444", padding: "4px", display: "flex", position: "relative", textDecoration: "none" }}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
            {wCount > 0 && (
              <span style={{ position: "absolute", top: 0, insetInlineEnd: 0, width: "14px", height: "14px", borderRadius: "50%", background: "#C9A96E", color: "#fff", fontSize: "7px", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter',sans-serif" }}>{wCount}</span>
            )}
          </Link>

          {/* Cart */}
          <button onClick={toggleCart} aria-label={t.nav.cart} style={{ background: "none", border: "none", cursor: "pointer", color: "#444", padding: "4px", position: "relative", display: "flex" }}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 01-8 0"/>
            </svg>
            {count > 0 && (
              <span style={{ position: "absolute", top: "-2px", insetInlineEnd: "-2px", width: "14px", height: "14px", borderRadius: "50%", background: "#C9A96E", color: "#fff", fontSize: "7px", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter',sans-serif" }}>{count}</span>
            )}
          </button>

          {/* Mobile hamburger */}
          <button onClick={() => setMenuOpen(true)} className="nav-mobile-only" aria-label={t.nav.menu}
            style={{ background: "none", border: "none", cursor: "pointer", padding: "4px", flexDirection: "column", gap: "4px" }}>
            <span style={{ display: "block", width: "20px", height: "1px", background: "#333" }} />
            <span style={{ display: "block", width: "20px", height: "1px", background: "#333" }} />
            <span style={{ display: "block", width: "20px", height: "1px", background: "#333" }} />
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
      `}</style>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{ position: "fixed", inset: 0, zIndex: 50, background: "rgba(0,0,0,0.2)" }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ duration: 0.32, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{ position: "fixed", top: 0, right: 0, zIndex: 51, height: "100%", width: "260px", background: "#fff", display: "flex", flexDirection: "column" }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", borderBottom: "1px solid #EBEBEB" }}>
                <img src="/logo.png" alt="VIKOS" style={{ height: "36px", objectFit: "contain" }} />
                <button onClick={() => setMenuOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "#888" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>
              <nav style={{ display: "flex", flexDirection: "column" }}>
                {navLinks.map((l, i) => (
                  <motion.div key={l.href} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.04 + i * 0.05 }}>
                    <Link href={l.href} onClick={() => setMenuOpen(false)} style={{
                      display: "block", padding: "14px 20px", borderBottom: "1px solid #F5F5F5",
                      fontFamily: "'Inter',sans-serif", fontSize: "13px", color: "#333", textDecoration: "none",
                    }}>
                      {l.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              {/* Language toggle in mobile drawer */}
              <div style={{ padding: "20px", marginTop: "auto", borderTop: "1px solid #F0F0F0" }}>
                <button
                  onClick={() => { setLang(lang === "en" ? "he" : "en"); setMenuOpen(false); }}
                  style={{
                    background: "none", border: "1px solid #E5E5E5", cursor: "pointer",
                    fontFamily: "'Inter',sans-serif", fontSize: "10px", letterSpacing: "0.18em",
                    color: "#888", padding: "6px 14px",
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
