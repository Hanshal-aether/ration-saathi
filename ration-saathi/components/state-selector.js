"use client";import { useStateContext } from "./providers";import { useLang } from "./providers";import Link from "next/link";export function StateSelector() {
  const { state, setState, allStates } = useStateContext();
  const { lang } = useLang();
  
  if (state === "Maharashtra") return null;
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[80vh] overflow-auto p-6">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">
          {lang === "hi" ? "अपना राज्य चुनें" : "Select your state"}
        </h1>
        <p className="text-sm text-slate-600 mb-6">
          {lang === "hi" 
            ? "Ration Saathi फिलहाल महाराष्ट्र में उपलब्ध है।" 
            : "Ration Saathi is currently available in Maharashtra."}
        </p>
        <div className="grid grid-cols-2 gap-2">
          {allStates.map((s) => (
            <button
              key={s}
              onClick={() => setState(s)}
              className={`p-3 text-sm font-medium rounded-lg transition ${
                s === "Maharashtra"
                  ? "bg-service-600 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        {state && state !== "Maharashtra" && (
          <div className="mt-6 text-center">
            <p className="text-sm text-slate-600 mb-3">
              {lang === "hi" 
                ? `${state} में जल्द आ रहा है।` 
                : `Coming soon to ${state}.`}
            </p>
            <button
              onClick={() => setState("Maharashtra")}
              className="w-full bg-service-600 hover:bg-service-700 text-white font-semibold py-2 rounded-lg transition"
            >
              {lang === "hi" ? "महाराष्ट्र खोजें" : "Explore Maharashtra"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
