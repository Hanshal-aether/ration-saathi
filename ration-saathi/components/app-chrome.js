"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "./language-provider";
import { dictionaries } from "../lib/dictionaries";

const items = [["/", "⌂", "home"], ["/apply/new", "＋", "apply"], ["/status", "◷", "status"], ["/shops", "⌖", "shops"]];

export function BottomNavigation() {
  const pathname = usePathname();
  const { language } = useLanguage();
  const copy = dictionaries[language];
  return <nav aria-label="Main navigation" className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-200 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur"><div className="mx-auto flex max-w-2xl">{items.map(([href, icon, label]) => { const active = pathname === href || (label === "apply" && pathname.startsWith("/apply")); return <Link key={label} href={href} aria-current={active ? "page" : undefined} className={`flex min-h-16 flex-1 flex-col items-center justify-center gap-1 text-sm font-bold ${active ? "text-trust-700" : "text-slate-600"}`}><span aria-hidden="true" className="text-xl">{icon}</span>{copy[label]}</Link>; })}</div></nav>;
}

export function PrototypeFooter() {
  const { language } = useLanguage();
  return <footer className="mx-auto max-w-2xl px-5 pb-24 pt-8 text-center text-sm leading-6 text-slate-500">{dictionaries[language].prototypeNote}</footer>;
}
