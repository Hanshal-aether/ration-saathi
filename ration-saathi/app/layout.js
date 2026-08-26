import "./globals.css";
import { Providers } from "../components/providers";
import { Chrome } from "../components/chrome";

export const metadata = { title: "Ration Saathi", description: "Ration services prototype" };

export default function Layout({ children }) {
  return <html lang="en"><body><Providers><Chrome />{children}<footer className="mx-auto max-w-2xl px-5 pb-24 pt-8 text-center text-sm leading-6 text-slate-500">About this prototype: mock data only; no real Aadhaar or government systems are accessed. Built for Build What Moves INDIA hackathon.</footer></Providers></body></html>;
}
