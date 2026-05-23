import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service — Gold Price Malaysia",
  description: "Terms of Service for Gold Price Malaysia.",
};

export default function TermsPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-10 space-y-4">
      <div className="bg-white/90 border border-amber-100 rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">Terms of Service</h1>
        <p className="text-sm text-gray-400 mb-4">Last updated: 23 May 2025</p>
        <p className="text-sm text-gray-600 leading-relaxed">
          By using Gold Price Malaysia, you agree to these terms. Please read them carefully.
        </p>
      </div>

      {[
        { title: "1. Informational Use Only", body: "All gold prices shown are derived from international spot rates and are for informational purposes only. They do not represent actual buy or sell prices from any Malaysian retailer, bank, or gold dealer. Always verify prices directly with your dealer before any transaction." },
        { title: "2. No Financial Advice", body: "Nothing on this site constitutes financial, investment, or trading advice. We are not licensed financial advisors. Gold investment carries risk, and past price performance does not guarantee future results." },
        { title: "3. Accuracy", body: "We strive to display accurate, up-to-date prices but cannot guarantee accuracy at all times. Prices are updated hourly and may be delayed. We are not liable for any losses arising from reliance on information on this site." },
        { title: "4. Acceptable Use", body: "You may use this site for personal, non-commercial purposes. You may not scrape, copy, or redistribute our data or content without permission. You may not use automated tools to excessively request data." },
        { title: "5. Advertising", body: "This site displays ads via Google AdSense. We are not responsible for the content of third-party advertisements." },
        { title: "6. Limitation of Liability", body: "To the maximum extent permitted by law, Gold Price Malaysia is not liable for any direct, indirect, or consequential damages arising from your use of this site." },
        { title: "7. Governing Law", body: "These terms are governed by the laws of Malaysia. Disputes are subject to Malaysian jurisdiction." },
        { title: "8. Contact", body: "Questions about these terms: jinbin@ioti.io" },
      ].map((s) => (
        <div key={s.title} className="bg-white/90 border border-amber-100 rounded-2xl shadow-sm p-6">
          <h2 className="font-bold text-gray-800 mb-2">{s.title}</h2>
          <p className="text-sm text-gray-600 leading-relaxed">{s.body}</p>
        </div>
      ))}

      <div className="flex flex-wrap gap-3 text-sm">
        <Link href="/" className="text-amber-600 hover:underline">← Live Prices</Link>
        <span className="text-gray-300">·</span>
        <Link href="/privacy-policy" className="text-amber-600 hover:underline">Privacy Policy</Link>
      </div>
    </main>
  );
}
