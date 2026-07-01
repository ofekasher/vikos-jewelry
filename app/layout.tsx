import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import SplashScreen from "@/components/SplashScreen";
import WhatsAppButton from "@/components/WhatsAppButton";
import AiChat from "@/components/AiChat";

export const metadata: Metadata = {
  title: "Vikos Jewelry | תכשיטים יוקרתיים",
  description: "Vikos Jewelry — תכשיטים מעוצבים בסגנון סקנדינבי מינימליסטי. Handcrafted fine jewelry with Scandinavian elegance.",
  keywords: "תכשיטים, jewelry, luxury, handcrafted, gold, israel, vikos",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl">
      <head>
        <meta name="referrer" content="no-referrer" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Inter:wght@300;400;500;600&family=Frank+Ruhl+Libre:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <SplashScreen />
        {children}
        <WhatsAppButton />
        <AiChat />
        <Toaster
          position="bottom-center"
          toastOptions={{
            style: {
              fontFamily: "'Inter', sans-serif",
              fontSize: "12px",
              letterSpacing: "0.02em",
              borderRadius: "0",
              border: "1px solid #E5E5E5",
              background: "#fff",
              color: "#111",
            },
          }}
        />
      </body>
    </html>
  );
}
