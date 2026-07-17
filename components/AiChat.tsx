"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

type Msg = { role: "user" | "assistant"; content: string };

const WELCOME = "שלום! אני עוזרת הבינה המלאכותית של VIKOS 💎\nאשמח לעזור לך למצוא את התכשיט המושלם.";

export default function AiChat() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasNew, setHasNew] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) { setHasNew(false); bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }
  }, [msgs, open]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;
    const next: Msg[] = [...msgs, { role: "user", content: text }];
    setMsgs(next);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = await res.json();
      setMsgs(m => [...m, { role: "assistant", content: data.text }]);
      if (!open) setHasNew(true);
    } catch {
      setMsgs(m => [...m, { role: "assistant", content: "מצטערת, אירעה שגיאה. נסה שוב." }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Floating button */}
      <motion.button
        onClick={() => setOpen(o => !o)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="ai-fab"
        style={{
          position: "fixed", bottom: "92px", right: "28px", zIndex: 9000,
          width: "52px", height: "52px", borderRadius: "50%",
          background: "#111", border: "1.5px solid #8B7355",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
        }}
        aria-label="עוזר AI"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.svg key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8B7355" strokeWidth="1.5">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </motion.svg>
          ) : (
            <motion.svg key="ai" initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.7, opacity: 0 }} transition={{ duration: 0.2 }} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8B7355" strokeWidth="1.4">
              <path d="M12 2a4 4 0 0 1 4 4v1h1a3 3 0 0 1 0 6h-1v1a4 4 0 0 1-8 0v-1H7a3 3 0 0 1 0-6h1V6a4 4 0 0 1 4-4z"/>
              <circle cx="9" cy="9" r="1" fill="#8B7355"/><circle cx="15" cy="9" r="1" fill="#8B7355"/>
            </motion.svg>
          )}
        </AnimatePresence>
        {hasNew && (
          <span style={{ position: "absolute", top: 0, right: 0, width: "10px", height: "10px", borderRadius: "50%", background: "#8B7355", border: "2px solid #111" }} />
        )}
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="ai-chat-window"
            style={{
              position: "fixed", bottom: "156px", right: "28px", zIndex: 9000,
              width: "340px", maxHeight: "480px",
              background: "#0D0C0A", border: "1px solid rgba(139,115,85,0.25)",
              borderRadius: "4px", display: "flex", flexDirection: "column",
              boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
              overflow: "hidden",
            }}
          >
            {/* Header */}
            <div style={{ padding: "16px 20px", borderBottom: "1px solid rgba(139,115,85,0.15)", display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#8B7355", boxShadow: "0 0 8px #8B7355" }} />
              <div>
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "12px", fontWeight: 500, color: "#fff", margin: 0, letterSpacing: "0.05em" }}>עוזרת VIKOS</p>
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "9px", color: "rgba(139,115,85,0.7)", margin: 0, letterSpacing: "0.1em", textTransform: "uppercase" }}>AI · זמינה עכשיו</p>
              </div>
            </div>

            {/* Messages */}
            <div style={{ flex: 1, overflowY: "auto", padding: "16px", display: "flex", flexDirection: "column", gap: "12px" }}>
              {/* Welcome */}
              <div style={{ alignSelf: "flex-start", maxWidth: "80%" }}>
                <div style={{ background: "rgba(139,115,85,0.1)", border: "1px solid rgba(139,115,85,0.2)", borderRadius: "2px 12px 12px 12px", padding: "10px 14px" }}>
                  <p style={{ fontFamily: "'Frank Ruhl Libre',serif", fontSize: "13px", color: "rgba(255,255,255,0.85)", margin: 0, lineHeight: 1.6, whiteSpace: "pre-line" }}>{WELCOME}</p>
                </div>
              </div>

              {msgs.map((m, i) => (
                <div key={i} style={{ alignSelf: m.role === "user" ? "flex-end" : "flex-start", maxWidth: "80%" }}>
                  <div style={{
                    background: m.role === "user" ? "#8B7355" : "rgba(255,255,255,0.05)",
                    border: m.role === "user" ? "none" : "1px solid rgba(255,255,255,0.08)",
                    borderRadius: m.role === "user" ? "12px 2px 12px 12px" : "2px 12px 12px 12px",
                    padding: "10px 14px",
                  }}>
                    <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "13px", color: m.role === "user" ? "#111" : "rgba(255,255,255,0.85)", margin: 0, lineHeight: 1.6 }}>{m.content}</p>
                  </div>
                </div>
              ))}

              {loading && (
                <div style={{ alignSelf: "flex-start" }}>
                  <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "2px 12px 12px 12px", padding: "12px 16px", display: "flex", gap: "5px", alignItems: "center" }}>
                    {[0, 1, 2].map(i => (
                      <span key={i} style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#8B7355", animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite` }} />
                    ))}
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div style={{ padding: "12px 16px", borderTop: "1px solid rgba(255,255,255,0.07)", display: "flex", gap: "10px", alignItems: "center" }}>
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && send()}
                placeholder="שאל/י אותי כל דבר..."
                style={{
                  flex: 1, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "4px", padding: "9px 12px",
                  fontFamily: "'Inter',sans-serif", fontSize: "12px", color: "#fff",
                  outline: "none",
                }}
              />
              <button
                onClick={send}
                disabled={loading || !input.trim()}
                style={{
                  background: input.trim() ? "#8B7355" : "rgba(139,115,85,0.2)",
                  border: "none", borderRadius: "4px",
                  width: "36px", height: "36px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: input.trim() ? "pointer" : "default",
                  transition: "background 0.2s",
                  flexShrink: 0,
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={input.trim() ? "#111" : "#666"} strokeWidth="2">
                  <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-6px); }
        }
        @media (max-width: 767px) {
          .ai-fab { width: 44px !important; height: 44px !important; bottom: 76px !important; right: 20px !important; }
          .ai-chat-window { right: 12px !important; left: 12px !important; width: auto !important; bottom: 132px !important; }
        }
      `}</style>
    </>
  );
}
