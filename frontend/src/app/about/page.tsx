import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About — Gold Price Malaysia",
  description: "About Gold Price Malaysia — a free tool tracking live gold prices in MYR for investors and jewellery buyers in Malaysia and Singapore.",
};

export default function AboutPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-10 space-y-4">
      <div className="bg-white/90 border border-amber-100 rounded-2xl shadow-lg p-8">
        <div className="flex items-center gap-3 mb-5">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-yellow-600 text-xl shadow-md">🥇</span>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">About Gold Price Malaysia</h1>
            <p className="text-sm text-gray-400">Free live gold tracker · Updated hourly</p>
          </div>
        </div>
        <p className="text-gray-700 leading-relaxed mb-3">
          <strong>Gold Price Malaysia</strong> provides free, real-time gold prices in Malaysian Ringgit (MYR) for all common gold karats — 999 (24K), 916 (22K), 750 (18K), and 375 (9K). Prices are derived from the international LBMA spot rate and updated every hour.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Whether you&apos;re an investor tracking your gold holdings, a jewellery buyer comparing prices, or a traveller checking rates — this site gives you the information you need in one clean, fast interface.
        </p>
      </div>

      {[
        { icon: "📡", title: "Data Sources", body: "Gold spot price from Alpha Vantage (LBMA-derived). USD/MYR and USD/SGD exchange rates from ExchangeRate-API. Prices update every hour. These are international spot prices — retail buy/sell prices from jewellers or banks may differ by 3–10%." },
        { icon: "🇲🇾", title: "Why 916 Gold?", body: "916 (22K) gold is the Malaysian standard — used for the majority of jewellery sold in Malaysia. It contains 91.6% pure gold. The remaining 8.4% is usually copper and silver for durability. Look for the '916' hallmark stamp on certified Malaysian jewellery." },
        { icon: "📊", title: "Investment Grade: 999", body: "999 (24K) gold, also called fine gold, is 99.9% pure. It is the standard for gold bars, coins, and investment products. In Malaysia, Public Gold and Maybank sell 999 gold bars and wafers." },
        { icon: "⚠️", title: "Disclaimer", body: "All prices are for informational purposes only and should not be taken as financial advice. Always verify prices with your gold dealer before making any purchase or sale. We are not responsible for trading decisions made based on this data." },
      ].map((s) => (
        <div key={s.title} className="bg-white/90 border border-amber-100 rounded-2xl shadow-sm p-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">{s.icon}</span>
            <h2 className="font-bold text-gray-800">{s.title}</h2>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">{s.body}</p>
        </div>
      ))}

      <div className="flex flex-wrap gap-3 text-sm">
        <Link href="/" className="text-amber-600 hover:underline">← Live Prices</Link>
        <span className="text-gray-300">·</span>
        <Link href="/calculator" className="text-amber-600 hover:underline">Calculator</Link>
        <span className="text-gray-300">·</span>
        <Link href="/privacy-policy" className="text-amber-600 hover:underline">Privacy Policy</Link>
        <span className="text-gray-300">·</span>
        <Link href="/terms" className="text-amber-600 hover:underline">Terms</Link>
      </div>
    </main>
  );
}
