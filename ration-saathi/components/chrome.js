"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useLang, useStateContext } from "./providers";
import { useState } from "react";

const nav = [
  ["/", "⌂", "Home", "होम"],
  ["/apply/new_card", "➕", "Apply", "आवेदन"],
  ["/status", "◷", "Status", "स्थिति"],
  ["/shops", "🏪", "Shops", "दुकानें"],
];

const STATES = [
  "Maharashtra",
  "Andhra Pradesh",
  "Karnataka",
  "Tamil Nadu",
  "Telangana",
];

export function Chrome() {
  const { lang, setLang } = useLang();
  const { state, setState } = useStateContext();
  const pathname = usePathname();
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);
  const [showStateMenu, setShowStateMenu] = useState(false);

  const logout = () => {
    localStorage.removeItem("ration_saathi_logged_in");
    localStorage.removeItem("ration_saathi_phone");
    router.replace("/login");
  };

  if (pathname === "/login") return null;

  return (
    <>
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/80 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center text-white font-bold text-lg">
              🍚
            </div>
            <span className="font-bold text-gray-900 group-hover:text-sky-600 transition text-sm sm:text-base">
              {lang === "hi" ? "राशन साथी" : "Ration Saathi"}
            </span>
          </Link>

          {/* Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* State Selector */}
            <div className="relative">
              <button
                onClick={() => setShowStateMenu(!showStateMenu)}
                className="px-2 sm:px-3 py-1.5 text-xs sm:text-sm font-semibold text-gray-700 hover:bg-gray-100 rounded-lg transition border border-gray-200"
              >
                {state || "State"}
              </button>
              {showStateMenu && (
                <div className="absolute right-0 top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-xl p-1 text-sm w-40 z-50">
                  {STATES.map((s) => (
                    <button
                      key={s}
                      onClick={() => {
                        setState(s);
                        setShowStateMenu(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded transition text-xs sm:text-sm ${
                        state === s
                          ? "bg-sky-50 text-sky-700 font-semibold"
                          : "hover:bg-gray-50 text-gray-700"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Language Toggle */}
            <div className="flex items-center gap-1 border border-gray-200 rounded-lg p-0.5">
              <button
                onClick={() => setLang("en")}
                className={`px-2 py-1 text-xs font-semibold rounded transition ${
                  lang === "en"
                    ? "bg-sky-500 text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLang("hi")}
                className={`px-2 py-1 text-xs font-semibold rounded transition ${
                  lang === "hi"
                    ? "bg-sky-500 text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                हिं
              </button>
            </div>

            {/* Menu */}
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-1.5 hover:bg-gray-100 rounded-lg transition text-lg"
              >
                ⚙️
              </button>
              {showMenu && (
                <div className="absolute right-0 top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden z-50 min-w-[160px]">
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-red-50 hover:text-red-700 transition"
                  >
                    {lang === "hi" ? "लॉग आउट" : "Logout"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Bottom Navigation */}
      <nav
        aria-label="Main navigation"
        className="fixed inset-x-0 bottom-0 z-20 flex justify-around border-t border-gray-200 bg-white/80 backdrop-blur-xl"
      >
        {nav.map(([href, icon, en, hi]) => {
          const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));
          return (
            <Link
              key={en}
              href={href}
              aria-current={isActive ? "page" : undefined}
              className={`flex flex-col items-center justify-center flex-1 py-2.5 text-xs font-semibold transition ${
                isActive
                  ? "text-sky-600 border-t-2 border-sky-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <span aria-hidden="true" className="text-lg mb-0.5">
                {icon}
              </span>
              {lang === "hi" ? hi : en}
            </Link>
          );
        })}
      </nav>
    </>
  );
}
