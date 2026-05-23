import type { Metadata } from "next";
import { getGoldData } from "@/lib/gold";
import GoldCalculator from "@/components/GoldCalculator";
import AdBanner from "@/components/AdBanner";
import Link from "next/link";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Gold Calculator Malaysia — Convert Weight to MYR",
  description:
    "Free gold value calculator for Malaysia. Convert grams, tola, or troy ounces of 999, 916, 750 or 375 gold into MYR using today's live spot price.",
};

export default async function CalculatorPage() {
  const data = await getGoldData();

  const price916 = data.myr_per_gram["916"];
  const price999 = data.myr_per_gram["999"];

  return (
    <main className="max-w-3xl mx-auto px-4 py-8 space-y-5">
      <div className="text-center animate-in">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Gold Value Calculator</h1>
        <p className="text-gray-500 text-sm">
          Calculate how much your gold is worth in MYR using today&apos;s live spot price
        </p>
      </div>

      {/* Live price mini-banner */}
      <div className="bg-gradient-to-r from-amber-400 to-yellow-500 rounded-xl px-5 py-3 text-white text-sm flex flex-wrap items-center justify-between gap-2 animate-in delay-1">
        <span>📍 Live spot price</span>
        <span className="font-bold">916: RM {price916.toFixed(2)}/g</span>
        <span className="font-bold">999: RM {price999.toFixed(2)}/g</span>
        <span className="text-amber-100 text-xs">Spot (USD/oz): ${data.spot_usd.toLocaleString()}</span>
      </div>

      {/* Main calculator */}
      <div className="animate-in delay-2">
        <GoldCalculator data={data} />
      </div>

      {/* Ad */}
      <AdBanner slot="3333333333" format="rectangle" className="min-h-[250px] rounded-xl overflow-hidden" />

      {/* Reference table */}
      <div className="bg-white/90 border border-amber-100 rounded-2xl shadow-sm overflow-hidden animate-in delay-3">
        <div className="px-5 py-4 border-b border-amber-50">
          <h2 className="font-bold text-gray-800">Quick Reference — Today&apos;s Prices</h2>
          <p className="text-xs text-gray-400 mt-0.5">MYR per gram at current spot rate</p>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-amber-50 text-xs text-gray-500 uppercase tracking-wide">
              <th className="text-left px-5 py-2.5">Karat</th>
              <th className="text-right px-5 py-2.5">1g</th>
              <th className="text-right px-5 py-2.5">5g</th>
              <th className="text-right px-5 py-2.5">10g</th>
              <th className="text-right px-5 py-2.5">1 Tola</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-amber-50">
            {["999","916","750","375"].map((k) => (
              <tr key={k} className="hover:bg-amber-50/40 transition-colors">
                <td className="px-5 py-3 font-bold text-amber-700">{k} {k==="999"?"(24K)":k==="916"?"(22K)":k==="750"?"(18K)":"(9K)"}</td>
                <td className="px-5 py-3 text-right">RM {data.myr_per_gram[k].toFixed(2)}</td>
                <td className="px-5 py-3 text-right">RM {(data.myr_per_gram[k]*5).toFixed(2)}</td>
                <td className="px-5 py-3 text-right">RM {(data.myr_per_gram[k]*10).toFixed(2)}</td>
                <td className="px-5 py-3 text-right">RM {data.myr_per_tola[k].toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-center text-sm">
        <Link href="/" className="text-amber-600 hover:underline">← Back to live gold prices</Link>
      </div>
    </main>
  );
}
