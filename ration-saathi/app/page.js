"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { types } from "../lib/config";
import { useLang, useStateContext } from "../components/providers";
import { StateSelector } from "../components/state-selector";

const copy = {
  en: {
    welcome: "Welcome back",
    subtitle: "Your ration services, streamlined",
    quick: "Quick Access",
    services: "All Services",
  },
  hi: {
    welcome: "स्वागत है",
    subtitle: "आपकी राशन सेवाएं, सरलीकृत",
    quick: "त्वरित पहुंच",
    services: "सभी सेवाएं",
  },
};

export default function Home() {
  const { lang } = useLang();
  const { stateSelected } = useStateContext();
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isLoggedIn = localStorage.getItem("ration_saathi_logged_in") === "true";
      if (!isLoggedIn) {
        router.replace("/login");
        return;
      }
      setIsReady(true);
      setIsChecking(false);
    }
  }, [router]);

  if (isChecking || !isReady || !stateSelected) return null;

  const t = copy[lang];

  return (
    <>
      <StateSelector />
      <main className="pb-24 pt-8 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-1">{t.welcome}</h1>
            <p className="text-gray-500 text-lg">{t.subtitle}</p>
          </div>

          {/* Quick Access */}
          <div className="mb-12">
            <h2 className="text-lg font-bold text-gray-900 mb-4">{t.quick}</h2>
            <div className="grid grid-cols-3 gap-3">
              <Link
                href="/status"
                className="bg-white border border-gray-200 rounded-xl p-4 hover:border-sky-500 hover:shadow-lg hover:scale-105 transition text-center"
              >
                <div className="text-3xl mb-2">◷</div>
                <div className="text-xs font-semibold text-gray-900">Status</div>
              </Link>
              <Link
                href="/shops"
                className="bg-white border border-gray-200 rounded-xl p-4 hover:border-sky-500 hover:shadow-lg hover:scale-105 transition text-center"
              >
                <div className="text-3xl mb-2">🏪</div>
                <div className="text-xs font-semibold text-gray-900">Shops</div>
              </Link>
              <Link
                href="/apply/new_card"
                className="bg-white border border-gray-200 rounded-xl p-4 hover:border-sky-500 hover:shadow-lg hover:scale-105 transition text-center"
              >
                <div className="text-3xl mb-2">➕</div>
                <div className="text-xs font-semibold text-gray-900">Apply</div>
              </Link>
            </div>
          </div>

          {/* All Services */}
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-4">{t.services}</h2>
            <div className="space-y-2">
              {types.map((type) => (
                <Link
                  key={type.slug}
                  href={`/apply/${type.slug}`}
                  className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-xl hover:border-sky-500 hover:shadow-lg hover:bg-sky-50/30 transition"
                >
                  <div className="text-2xl">{type.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-gray-900">
                      {lang === "hi" ? type.hi : type.en}
                    </div>
                    <p className="text-xs text-gray-500">{type.desc}</p>
                  </div>
                  <span className="text-gray-300">→</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
