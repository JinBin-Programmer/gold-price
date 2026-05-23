import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — Gold Price Malaysia",
  description: "Privacy Policy for Gold Price Malaysia. Learn how we use cookies, Google AdSense, and handle your data.",
};

export default function PrivacyPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-10 space-y-4">
      <div className="bg-white/90 border border-amber-100 rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">Privacy Policy</h1>
        <p className="text-sm text-gray-400 mb-4">Last updated: 23 May 2025</p>
        <p className="text-sm text-gray-600 leading-relaxed">
          This Privacy Policy explains how <strong>Gold Price Malaysia</strong> (&ldquo;we&rdquo;, &ldquo;our&rdquo;) collects and uses information when you visit this website. By using the site, you agree to this policy.
        </p>
      </div>

      {[
        { title: "1. Information We Collect", body: "We do not collect personal information such as your name or email. We collect standard web usage data (IP address, browser type, pages visited) for security and analytics purposes. No registration or login is required to use this site." },
        { title: "2. Cookies", body: "We use cookies for analytics and advertising. Our advertising partner, Google AdSense, uses cookies (including the DoubleClick cookie) to serve personalised ads based on your browsing history. You can opt out of personalised ads at https://www.google.com/settings/ads or via https://www.aboutads.info/choices/." },
        { title: "3. Google AdSense", body: "We use Google AdSense to display advertisements. Google may use cookies and tracking technologies to show relevant ads. Google's use of the DoubleClick cookie enables it and its partners to serve ads based on visits to this and other sites. See https://policies.google.com/technologies/partner-sites for more information." },
        { title: "4. Third-Party APIs", body: "Gold price data is fetched from Alpha Vantage and exchange rate data from ExchangeRate-API. No personal user data is sent to these services. See their respective privacy policies for details on how they handle data." },
        { title: "5. Children's Privacy", body: "This site is not directed at children under 13. We do not knowingly collect data from children." },
        { title: "6. Changes", body: "We may update this policy at any time. The 'Last updated' date above reflects the latest revision. Continued use of the site constitutes acceptance of any changes." },
        { title: "7. Contact", body: "For privacy questions, email: jinbin@ioti.io" },
      ].map((s) => (
        <div key={s.title} className="bg-white/90 border border-amber-100 rounded-2xl shadow-sm p-6">
          <h2 className="font-bold text-gray-800 mb-2">{s.title}</h2>
          <p className="text-sm text-gray-600 leading-relaxed">{s.body}</p>
        </div>
      ))}

      <div className="flex flex-wrap gap-3 text-sm">
        <Link href="/" className="text-amber-600 hover:underline">← Live Prices</Link>
        <span className="text-gray-300">·</span>
        <Link href="/terms" className="text-amber-600 hover:underline">Terms of Service</Link>
      </div>
    </main>
  );
}
