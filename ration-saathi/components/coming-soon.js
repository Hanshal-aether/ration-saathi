"use client";
import { useStateContext } from "./providers";
import { useLang } from "./providers";
import Link from "next/link";

export function ComingSoonScreen() {
  const { state, setState } = useStateContext();
  const { lang } = useLang();

  if (state === "Maharashtra") return null;

  const handleExplore = () => {
    setState("Maharashtra");
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-service-50 to-trust-50 px-4 pb-24">
      <div className="max-w-md w-full text-center">
        <div className="mb-6 text-6xl">🚀</div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          {lang === "hi" ? "जल्द आ रहा है" : "Coming Soon"}
        </h1>
        <p className="text-xl font-semibold text-service-600 mb-4">
          {state}
        </p>
        <p className="text-base text-slate-600 mb-8 leading-relaxed">
          {lang === "hi"
            ? `Ration Saathi ${state} में जल्द उपलब्ध होगा। हम महाराष्ट्र में फिलहाल एक पायलट चला रहे हैं।`
            : `Ration Saathi is expanding to ${state} soon. We're currently running a pilot in Maharashtra.`}
        </p>
        
        <button
          onClick={handleExplore}
          className="w-full bg-service-600 hover:bg-service-700 text-white font-bold py-3 px-4 rounded-xl transition-colors mb-3"
        >
          {lang === "hi" ? "महाराष्ट्र में खोजें" : "Explore Maharashtra Pilot"}
        </button>
        
        <button
          onClick={() => setState(null)}
          className="w-full bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold py-3 px-4 rounded-xl transition-colors"
        >
          {lang === "hi" ? "अन्य राज्य चुनें" : "Choose Another State"}
        </button>
      </div>
    </main>
  );
}
