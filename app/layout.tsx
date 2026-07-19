import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import SplashScreen from "@/components/SplashScreen";
import WhatsAppButton from "@/components/WhatsAppButton";
import AiChat from "@/components/AiChat";
import { LanguageProvider } from "@/lib/LanguageContext";
import { Cormorant_Garamond, Inter, Frank_Ruhl_Libre } from "next/font/google";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const frankRuhl = Frank_Ruhl_Libre({
  subsets: ["latin", "hebrew"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-frank-ruhl",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vikos Jewelry | תכשיטים יוקרתיים",
  description: "Vikos Jewelry — תכשיטים מעוצבים בסגנון סקנדינבי מינימליסטי. Handcrafted fine jewelry with Scandinavian elegance.",
  keywords: "תכשיטים, jewelry, luxury, handcrafted, gold, israel, vikos",
  openGraph: {
    title: "Vikos Jewelry | תכשיטים יוקרתיים",
    description: "תכשיטים מעוצבים בסגנון סקנדינבי מינימליסטי. Handcrafted fine jewelry.",
    url: "https://vikosjewelry.com",
    siteName: "Vikos Jewelry",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Vikos Jewelry" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vikos Jewelry",
    description: "Handcrafted fine jewelry with Scandinavian elegance.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="ltr" className={`${cormorant.variable} ${inter.variable} ${frankRuhl.variable}`}>
      <head>
        <meta name="referrer" content="no-referrer" />
      </head>
      <body className="antialiased">
        <LanguageProvider>
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
        </LanguageProvider>
      </body>
    </html>
  );
}
