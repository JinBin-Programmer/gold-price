import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Gold Price Malaysia | Harga Emas Hari Ini (MYR)",
    template: "%s | Gold Price Malaysia",
  },
  description:
    "Live gold price in Malaysia (MYR) today. Check harga emas 999, 916, 750 and 375 per gram. Free real-time gold price tracker updated hourly.",
  keywords: [
    "gold price malaysia", "harga emas hari ini", "harga emas 916", "harga emas 999",
    "gold price MYR", "gold price per gram", "emas 24k malaysia", "public gold price",
    "harga emas semasa", "gold rate today malaysia",
  ],
  metadataBase: new URL("https://goldprice-malaysia.com"),
  openGraph: {
    title: "Gold Price Malaysia | Harga Emas Hari Ini",
    description: "Live gold price in MYR — 999, 916, 750, 375 karats. Updated hourly.",
    type: "website",
    locale: "en_MY",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body className="flex flex-col min-h-screen">
        {/* Google AdSense */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7019273666606982"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />

        {/* Navbar */}
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-amber-200/60 shadow-sm">
          <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5 font-bold text-amber-700 hover:text-amber-900 transition-colors">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-yellow-600 text-white shadow-sm shadow-amber-200 text-base">
                🥇
              </span>
              <span className="text-base">Gold Price MY</span>
            </Link>
            <div className="flex items-center gap-0.5">
              <Link href="/" className="text-sm font-medium text-gray-600 hover:text-amber-700 px-3 py-1.5 rounded-lg hover:bg-amber-50 transition-colors">Home</Link>
              <Link href="/calculator" className="text-sm font-medium text-gray-600 hover:text-amber-700 px-3 py-1.5 rounded-lg hover:bg-amber-50 transition-colors">Calculator</Link>
              <Link href="/about" className="text-sm font-medium text-gray-600 hover:text-amber-700 px-3 py-1.5 rounded-lg hover:bg-amber-50 transition-colors">About</Link>
              <Link href="/privacy-policy" className="hidden sm:block text-sm font-medium text-gray-600 hover:text-amber-700 px-3 py-1.5 rounded-lg hover:bg-amber-50 transition-colors">Privacy</Link>
            </div>
          </div>
        </nav>

        {/* Content */}
        <div className="flex-1">{children}</div>

        {/* Footer */}
        <footer className="bg-gray-900 text-gray-400 py-8 mt-12">
          <div className="max-w-5xl mx-auto px-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-white font-semibold text-sm">
                <span>🥇</span> Gold Price Malaysia
              </div>
              <p className="text-xs text-center">
                Prices derived from <span className="text-amber-400">LBMA spot rate</span> via Alpha Vantage · For informational use only.
              </p>
              <div className="flex gap-4 text-xs">
                <Link href="/about" className="hover:text-white transition-colors">About</Link>
                <Link href="/calculator" className="hover:text-white transition-colors">Calculator</Link>
                <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy</Link>
                <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
              </div>
            </div>
            <p className="text-center text-xs text-gray-600 mt-5">
              © {new Date().getFullYear()} Gold Price Malaysia · All rights reserved · Prices update hourly
            </p>
          </div>
        </footer>

        {/* ── The Malaysian Info Hub Banner ── */}
        <a
          href="https://www.themalaysianinfo.online"
          target="_blank"
          rel="noopener noreferrer"
          style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"6px",width:"100%",background:"rgba(100,0,0,0.28)",borderTop:"1px solid rgba(180,40,40,0.2)",padding:"10px 16px",fontSize:"11px",color:"rgba(255,255,255,0.42)",textDecoration:"none"}}
        >
          <span>&#x1F1F2;&#x1F1FE;</span>
          <strong style={{color:"rgba(240,110,110,0.85)",fontWeight:600,fontStyle:"normal"}}>The Malaysian Info</strong>
          <span>&middot;</span>
          <span>Terokai 27 alatan percuma lagi &#x2192;</span>
        </a>
      </body>
    </html>
  );
}
