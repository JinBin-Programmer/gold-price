"use client";

import { useState } from "react";
import type { GoldData } from "@/lib/gold";
import { KARATS } from "@/lib/gold";

const UNITS = [
  { label: "Gram (g)", value: "gram", toGram: 1 },
  { label: "Tola (11.6638g)", value: "tola", toGram: 11.6638 },
  { label: "Troy Ounce (31.1035g)", value: "troy_oz", toGram: 31.1035 },
  { label: "Kilogram (1000g)", value: "kg", toGram: 1000 },
];

export default function GoldCalculator({ data }: { data: GoldData }) {
  const [weight, setWeight]   = useState("");
  const [unit, setUnit]       = useState("gram");
  const [karat, setKarat]     = useState("916");

  const weightNum  = parseFloat(weight) || 0;
  const toGram     = UNITS.find((u) => u.value === unit)?.toGram ?? 1;
  const grams      = weightNum * toGram;
  const myrPerGram = data.myr_per_gram[karat] ?? 0;
  const totalMYR   = grams * myrPerGram;
  const totalUSD   = grams * (data.usd_per_gram[karat] ?? 0);
  const totalSGD   = grams * (data.sgd_per_gram[karat] ?? 0);

  const fmt = (n: number, currency: string) =>
    n.toLocaleString("en-MY", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ` ${currency}`;

  return (
    <div className="bg-white/90 backdrop-blur-sm border border-amber-100 rounded-2xl shadow-lg p-6">
      <div className="flex items-center gap-2 mb-5">
        <span className="text-xl">⚖️</span>
        <h2 className="font-bold text-gray-800">Gold Value Calculator</h2>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 mb-5">
        {/* Weight */}
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1.5">Weight</label>
          <input
            type="number"
            min="0"
            step="any"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="e.g. 10"
            className="w-full border border-gray-200 bg-gray-50 rounded-xl px-3.5 py-2.5 text-sm
                       text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-400
                       focus:border-transparent focus:bg-white transition-all"
          />
        </div>

        {/* Unit */}
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1.5">Unit</label>
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            className="w-full border border-gray-200 bg-gray-50 rounded-xl px-3.5 py-2.5 text-sm
                       text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-400
                       focus:border-transparent focus:bg-white transition-all appearance-none"
          >
            {UNITS.map((u) => <option key={u.value} value={u.value}>{u.label}</option>)}
          </select>
        </div>

        {/* Karat */}
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1.5">Karat</label>
          <select
            value={karat}
            onChange={(e) => setKarat(e.target.value)}
            className="w-full border border-gray-200 bg-gray-50 rounded-xl px-3.5 py-2.5 text-sm
                       text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-400
                       focus:border-transparent focus:bg-white transition-all appearance-none"
          >
            {Object.entries(KARATS).map(([k, { label }]) => (
              <option key={k} value={k}>{label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Result */}
      {weightNum > 0 ? (
        <div className="bg-gradient-to-br from-amber-400 to-yellow-500 rounded-xl p-5 text-white">
          <p className="text-xs font-semibold text-amber-100 uppercase tracking-widest mb-1">
            {weightNum} {UNITS.find((u) => u.value === unit)?.label} of {KARATS[karat]?.label} =
          </p>
          <p className="text-4xl font-bold tracking-tight mb-1">RM {fmt(totalMYR, "")}</p>
          <div className="flex gap-4 mt-2 text-sm text-amber-100">
            <span>${fmt(totalUSD, "USD")}</span>
            <span>S${fmt(totalSGD, "SGD")}</span>
          </div>
          <p className="text-xs text-amber-200 mt-3">
            {grams.toFixed(3)}g × RM {myrPerGram.toFixed(2)}/g · International spot price · Not retail price
          </p>
        </div>
      ) : (
        <div className="bg-amber-50 border border-amber-100 rounded-xl p-5 text-center text-sm text-amber-600">
          Enter a weight above to calculate the value of your gold
        </div>
      )}

      <p className="text-xs text-gray-400 mt-3">
        Based on live spot price · Retail buy/sell prices may differ by 3–10%
      </p>
    </div>
  );
}
