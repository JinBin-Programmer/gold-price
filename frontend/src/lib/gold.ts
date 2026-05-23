export interface GoldData {
  spot_usd: number;          // USD per troy oz (e.g. 2900.50)
  spot_usd_per_gram: number; // USD per gram of 24K gold
  usd_myr: number;           // USD/MYR exchange rate
  usd_sgd: number;           // USD/SGD exchange rate
  myr_per_gram: Record<string, number>;
  sgd_per_gram: Record<string, number>;
  usd_per_gram: Record<string, number>;
  myr_per_tola: Record<string, number>;  // 1 tola = 11.6638g
  updated_at: string;        // ISO timestamp
  is_stale: boolean;         // true if we returned cached data due to API error
}

export const KARATS: Record<string, { purity: number; label: string; desc: string }> = {
  "999": { purity: 0.999, label: "999 / 24K", desc: "Investment grade · Bars & coins" },
  "916": { purity: 0.916, label: "916 / 22K", desc: "Malaysian standard · Jewellery" },
  "750": { purity: 0.750, label: "750 / 18K", desc: "Fine jewellery" },
  "375": { purity: 0.375, label: "375 / 9K",  desc: "Affordable jewellery" },
};

const TROY_OZ_TO_GRAM = 31.1035;
const TOLA_IN_GRAMS   = 11.6638;
const CACHE_TTL_MS    = 60 * 60 * 1000; // 1 hour

let _cache: { data: GoldData; ts: number } | null = null;

export async function getGoldData(): Promise<GoldData> {
  if (_cache && Date.now() - _cache.ts < CACHE_TTL_MS) {
    return _cache.data;
  }

  const avKey = process.env.ALPHA_VANTAGE_KEY ?? "";
  const erKey = process.env.EXCHANGE_RATE_KEY ?? "";

  try {
    const [avRes, erRes] = await Promise.all([
      fetch(
        `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=XAU&to_currency=USD&apikey=${avKey}`,
        { cache: "no-store" }
      ),
      fetch(
        `https://v6.exchangerate-api.com/v6/${erKey}/latest/USD`,
        { cache: "no-store" }
      ),
    ]);

    const avJson = await avRes.json();
    const erJson = await erRes.json();

    const rateInfo = avJson["Realtime Currency Exchange Rate"];
    if (!rateInfo || avJson["Note"] || avJson["Information"]) {
      // API limit hit — return stale cache if available
      if (_cache) return { ..._cache.data, is_stale: true };
      throw new Error("Alpha Vantage rate limit or missing key");
    }

    const spot_usd = parseFloat(rateInfo["5. Exchange Rate"]);
    const spot_usd_per_gram = spot_usd / TROY_OZ_TO_GRAM;

    const usd_myr = erJson.conversion_rates?.MYR ?? 4.72;
    const usd_sgd = erJson.conversion_rates?.SGD ?? 1.35;

    const myr_per_gram: Record<string, number>  = {};
    const sgd_per_gram: Record<string, number>  = {};
    const usd_per_gram: Record<string, number>  = {};
    const myr_per_tola: Record<string, number>  = {};

    for (const [karat, { purity }] of Object.entries(KARATS)) {
      const base = spot_usd_per_gram * purity;
      usd_per_gram[karat]  = round2(base);
      myr_per_gram[karat]  = round2(base * usd_myr);
      sgd_per_gram[karat]  = round2(base * usd_sgd);
      myr_per_tola[karat]  = round2(base * usd_myr * TOLA_IN_GRAMS);
    }

    const data: GoldData = {
      spot_usd:          round2(spot_usd),
      spot_usd_per_gram: round2(spot_usd_per_gram),
      usd_myr,
      usd_sgd,
      myr_per_gram,
      sgd_per_gram,
      usd_per_gram,
      myr_per_tola,
      updated_at: new Date().toISOString(),
      is_stale: false,
    };

    _cache = { data, ts: Date.now() };
    return data;
  } catch {
    if (_cache) return { ..._cache.data, is_stale: true };
    // Absolute fallback with approximate values (clearly labelled as estimate)
    return fallbackData();
  }
}

function round2(n: number) {
  return Math.round(n * 100) / 100;
}

function fallbackData(): GoldData {
  const spot_usd = 2900;
  const usd_myr  = 4.72;
  const usd_sgd  = 1.35;
  const spot_g   = spot_usd / TROY_OZ_TO_GRAM;

  const myr_per_gram: Record<string, number>  = {};
  const sgd_per_gram: Record<string, number>  = {};
  const usd_per_gram: Record<string, number>  = {};
  const myr_per_tola: Record<string, number>  = {};

  for (const [karat, { purity }] of Object.entries(KARATS)) {
    const base = spot_g * purity;
    usd_per_gram[karat]  = round2(base);
    myr_per_gram[karat]  = round2(base * usd_myr);
    sgd_per_gram[karat]  = round2(base * usd_sgd);
    myr_per_tola[karat]  = round2(base * usd_myr * TOLA_IN_GRAMS);
  }

  return {
    spot_usd, spot_usd_per_gram: round2(spot_g),
    usd_myr, usd_sgd,
    myr_per_gram, sgd_per_gram, usd_per_gram, myr_per_tola,
    updated_at: new Date().toISOString(),
    is_stale: true,
  };
}
