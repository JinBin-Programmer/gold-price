import type { GoldData } from "@/lib/gold";
import { KARATS } from "@/lib/gold";

interface Props { data: GoldData; }

export default function GoldPriceTable({ data }: Props) {
  return (
    <div className="bg-white/90 backdrop-blur-sm border border-amber-100 rounded-2xl shadow-lg overflow-hidden animate-in delay-1">
      <div className="px-5 py-4 border-b border-amber-50 flex items-center gap-2">
        <span className="text-lg">📊</span>
        <h2 className="font-bold text-gray-800">Gold Prices by Karat — MYR per Gram</h2>
      </div>

      {/* Desktop table */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-amber-50 text-xs font-semibold text-gray-500 uppercase tracking-wide">
              <th className="text-left px-5 py-3">Karat / Purity</th>
              <th className="text-left px-5 py-3">Use</th>
              <th className="text-right px-5 py-3">MYR / gram</th>
              <th className="text-right px-5 py-3">MYR / tola</th>
              <th className="text-right px-5 py-3">SGD / gram</th>
              <th className="text-right px-5 py-3">USD / gram</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-amber-50">
            {Object.entries(KARATS).map(([karat, { label, desc }], i) => (
              <tr key={karat} className={`hover:bg-amber-50/50 transition-colors ${i === 0 ? "bg-amber-50/30" : ""}`}>
                <td className="px-5 py-3.5 font-bold text-amber-700">{label}</td>
                <td className="px-5 py-3.5 text-gray-500">{desc}</td>
                <td className="px-5 py-3.5 text-right font-bold text-gray-900">
                  RM {data.myr_per_gram[karat].toLocaleString("en-MY", { minimumFractionDigits: 2 })}
                </td>
                <td className="px-5 py-3.5 text-right text-gray-700">
                  RM {data.myr_per_tola[karat].toLocaleString("en-MY", { minimumFractionDigits: 2 })}
                </td>
                <td className="px-5 py-3.5 text-right text-gray-600">
                  S${data.sgd_per_gram[karat].toLocaleString("en-SG", { minimumFractionDigits: 2 })}
                </td>
                <td className="px-5 py-3.5 text-right text-gray-500">
                  ${data.usd_per_gram[karat].toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="sm:hidden divide-y divide-amber-50">
        {Object.entries(KARATS).map(([karat, { label, desc }]) => (
          <div key={karat} className="px-5 py-4">
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-amber-700">{label}</span>
              <span className="text-lg font-bold text-gray-900">
                RM {data.myr_per_gram[karat].toLocaleString("en-MY", { minimumFractionDigits: 2 })}<span className="text-xs text-gray-400 font-normal">/g</span>
              </span>
            </div>
            <p className="text-xs text-gray-400 mb-2">{desc}</p>
            <div className="flex gap-4 text-xs text-gray-500">
              <span>Tola: RM {data.myr_per_tola[karat].toLocaleString("en-MY", { minimumFractionDigits: 2 })}</span>
              <span>SGD: S${data.sgd_per_gram[karat].toFixed(2)}/g</span>
            </div>
          </div>
        ))}
      </div>

      <div className="px-5 py-3 bg-amber-50/50 text-xs text-gray-400 border-t border-amber-50">
        Prices based on LBMA spot rate · 1 tola = 11.6638g · Rates update hourly · For reference only
      </div>
    </div>
  );
}
