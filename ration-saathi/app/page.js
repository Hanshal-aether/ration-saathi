"use client";

import Link from "next/link";
import { types } from "../lib/config";
import { useLang } from "../components/providers";

const copy = {
  en: { eyebrow: "Ration services, made simpler", title: "Get help with your ration card", intro: "Choose what you need. We will guide you one clear step at a time.", trust: ["No confusing forms", "Save progress automatically", "Plain-language updates"], need: "What do you need help with?", track: "Track a request", shops: "Find a nearby shop", ready: "Already submitted a request?", people: "Designed for every household" },
  hi: { eyebrow: "राशन सेवाएँ, अब आसान", title: "अपने राशन कार्ड के लिए मदद पाएँ", intro: "अपनी ज़रूरत चुनें। हम आपको एक-एक स्पष्ट कदम में मार्गदर्शन देंगे।", trust: ["मुश्किल फॉर्म नहीं", "काम अपने आप सेव होता है", "सरल भाषा में अपडेट"], need: "आपको किस मदद की ज़रूरत है?", track: "आवेदन की स्थिति देखें", shops: "नज़दीकी दुकान खोजें", ready: "क्या आपने पहले आवेदन किया है?", people: "हर परिवार के लिए बनाया गया" },
};

export default function Home() {
  const { lang } = useLang(); const t = copy[lang];
  return <main className="mx-auto max-w-2xl px-4 pb-4 pt-8 sm:px-6">
    <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-trust-700 to-service-600 px-6 py-8 text-white shadow-lg sm:px-8">
      <p className="text-base font-bold text-service-100">{t.eyebrow}</p>
      <h1 className="mt-3 text-4xl font-bold leading-tight tracking-tight">{t.title}</h1>
      <p className="mt-4 max-w-lg text-lg leading-7 text-blue-50">{t.intro}</p>
      <div className="mt-6 grid gap-2 sm:grid-cols-3">{t.trust.map((item) => <p key={item} className="rounded-xl bg-white/10 px-3 py-2 text-sm font-semibold">✓ {item}</p>)}</div>
    </section>
    <section className="mt-8"><div className="flex items-end justify-between"><div><p className="text-base font-semibold text-service-600">{t.people}</p><h2 className="mt-1 text-2xl font-bold text-slate-900">{t.need}</h2></div><span aria-hidden="true" className="text-3xl">👋</span></div><div className="mt-5 grid gap-4">{types.map((type, index) => <Link key={type.slug} href={`/apply/${type.slug}`} className="group relative flex min-h-24 items-center gap-4 overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-service-500 hover:shadow-md"><span aria-hidden="true" className={`flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl text-3xl ${index % 2 ? "bg-trust-50" : "bg-service-50"}`}>{type.icon}</span><span className="min-w-0 flex-1"><b className="block text-lg leading-6 text-slate-900">{lang === "hi" ? type.hi : type.en}</b><span className="mt-1 block text-base text-slate-600">{type.desc}</span></span><span aria-hidden="true" className="text-2xl text-trust-700">›</span></Link>)}</div></section>
    <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5"><p className="text-base font-semibold text-slate-700">{t.ready}</p><div className="mt-3 grid grid-cols-2 gap-3"><Link href="/status" className="flex min-h-14 items-center justify-center rounded-xl border border-trust-700 px-3 text-center text-base font-bold text-trust-700">◷ {t.track}</Link><Link href="/shops" className="flex min-h-14 items-center justify-center rounded-xl bg-service-600 px-3 text-center text-base font-bold text-white">⌖ {t.shops}</Link></div></section>
  </main>;
}
