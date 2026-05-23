import type { Metadata } from "next";
import { getGoldData } from "@/lib/gold";
import PriceHero from "@/components/PriceHero";
import GoldPriceTable from "@/components/GoldPriceTable";
import GoldCalculator from "@/components/GoldCalculator";
import AdBanner from "@/components/AdBanner";
import Link from "next/link";

export const revalidate = 3600; // ISR: rebuild page every hour

export const metadata: Metadata = {
  title: "Gold Price Malaysia | Harga Emas Hari Ini Live (MYR)",
  description:
    "Live gold price Malaysia today in MYR. Harga emas 999 (24K), 916 (22K), 750 (18K) per gram. Updated hourly from international spot rate.",
};

export default async function HomePage() {
  const data = await getGoldData();

  return (
    <main className="max-w-4xl mx-auto px-4 py-8 space-y-5">

      {/* Hero price card */}
      <PriceHero data={data} />

      {/* Ad — leaderboard */}
      <AdBanner slot="1111111111" format="horizontal" className="min-h-[90px] rounded-xl overflow-hidden" />

      {/* Price table */}
      <GoldPriceTable data={data} />

      {/* Quick calculator */}
      <div className="animate-in delay-2">
        <GoldCalculator data={data} />
      </div>

      {/* Ad — rectangle */}
      <AdBanner slot="2222222222" format="rectangle" className="min-h-[250px] rounded-xl overflow-hidden" />

      {/* Info section — good for SEO */}
      <div className="grid sm:grid-cols-2 gap-4 animate-in delay-3">
        <InfoCard
          icon="🏅"
          title="What is 916 Gold?"
          body="916 gold (22 karat) is the Malaysian standard for jewellery. It contains 91.6% pure gold, giving it a rich yellow colour while being more durable than 24K gold. Most gold jewellery sold in Malaysia is 916."
        />
        <InfoCard
          icon="📈"
          title="How is gold price determined?"
          body="Gold price is set by the LBMA (London Bullion Market Association) twice daily — the London Fix. The price is expressed in USD per troy ounce and converted to local currency like MYR using live exchange rates."
        />
        <InfoCard
          icon="🏦"
          title="Where to buy gold in Malaysia?"
          body="Popular options include Public Gold (investment bars), Maybank Gold Investment Account, CIMB Gold, and jewellery shops. Prices at retailers may be 3–8% higher than the spot price shown here."
        />
        <InfoCard
          icon="⚖️"
          title="Gold weight units"
          body="In Malaysia, gold is sold by gram and tola (11.6638g). Internationally, the troy ounce (31.1035g) is standard. Use our calculator above to convert between any unit and get the current value."
        />
      </div>

      {/* CTA to full calculator */}
      <div className="bg-gradient-to-r from-amber-400 to-yellow-500 rounded-2xl p-6 text-white text-center animate-in delay-4">
        <p className="text-lg font-bold mb-1">Need a detailed calculation?</p>
        <p className="text-amber-100 text-sm mb-4">Convert any weight in grams, tola, or troy oz to MYR instantly.</p>
        <Link href="/calculator"
          className="inline-block bg-white text-amber-700 font-bold px-6 py-2.5 rounded-xl
                     hover:bg-amber-50 transition-colors shadow-sm">
          Open Full Calculator →
        </Link>
      </div>

    </main>
  );
}

function InfoCard({ icon, title, body }: { icon: string; title: string; body: string }) {
  return (
    <div className="bg-white/90 border border-amber-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xl">{icon}</span>
        <h3 className="font-bold text-gray-800 text-sm">{title}</h3>
      </div>
      <p className="text-sm text-gray-600 leading-relaxed">{body}</p>
    </div>
  );
}
