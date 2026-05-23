import type { GoldData } from "@/lib/gold";

interface Props { data: GoldData; }

export default function PriceHero({ data }: Props) {
  const price916 = data.myr_per_gram["916"];
  const price999 = data.myr_per_gram["999"];

  const updatedMY = new Date(data.updated_at).toLocaleString("en-MY", {
    timeZone: "Asia/Kuala_Lumpur",
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <div className="bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-600 rounded-2xl shadow-xl shadow-amber-200/50 p-6 sm:p-8 text-white animate-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

        {/* Main price */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">🥇</span>
            <span className="text-sm font-semibold text-amber-100 uppercase tracking-widest">Gold Price Malaysia</span>
          </div>
          <p className="text-5xl sm:text-6xl font-bold tracking-tight">
            RM {price916.toLocaleString("en-MY", { minimumFractionDigits: 2 })}
          </p>
          <p className="text-amber-100 text-sm mt-1.5">per gram · 916 / 22K (Malaysian standard)</p>
        </div>

        {/* Side stats */}
        <div className="flex sm:flex-col gap-4 sm:gap-2 sm:text-right">
          <div>
            <p className="text-xs text-amber-200 font-semibold uppercase tracking-wide">24K / 999</p>
            <p className="text-xl font-bold">RM {price999.toLocaleString("en-MY", { minimumFractionDigits: 2 })}<span className="text-sm font-normal text-amber-200">/g</span></p>
          </div>
          <div>
            <p className="text-xs text-amber-200 font-semibold uppercase tracking-wide">Spot (USD/oz)</p>
            <p className="text-xl font-bold">${data.spot_usd.toLocaleString("en-US", { minimumFractionDigits: 2 })}</p>
          </div>
        </div>
      </div>

      {/* Meta row */}
      <div className="mt-5 pt-4 border-t border-amber-300/40 flex flex-wrap items-center gap-4 text-xs text-amber-100">
        <span>💱 1 USD = RM {data.usd_myr.toFixed(4)}</span>
        <span>🇸🇬 SGD {data.usd_sgd.toFixed(4)}</span>
        <span className="ml-auto flex items-center gap-1">
          {data.is_stale && <span className="bg-amber-700/60 text-amber-200 px-2 py-0.5 rounded-full">Cached</span>}
          🕒 Updated: {updatedMY} MYT
        </span>
      </div>
    </div>
  );
}
