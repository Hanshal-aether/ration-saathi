"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { getType } from "../../../lib/config";
import { useLang } from "../../../components/providers";
import { ProtectedRoute } from "../../../components/protected-route";

function ApplyContent({ params }) {
  const type = getType(params.type);
  const { lang } = useLang();

  if (!type) return notFound();

  return (
    <main className="pb-24 pt-6 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="inline-flex items-center text-sky-600 hover:text-sky-700 font-semibold transition-colors mb-8">
          ← {lang === "hi" ? "वापस जाएँ" : "Back to home"}
        </Link>

        <section>
          <div className="mb-8">
            <p className="text-sm font-semibold text-sky-600">
              {lang === "hi" ? "शुरू करने से पहले" : "Before you begin"}
            </p>
            <h1 className="mt-2 text-3xl font-bold text-gray-900">
              {lang === "hi" ? type.hi : type.en}
            </h1>
            <p className="mt-3 text-lg text-gray-600">
              {lang === "hi" ? "ये दस्तावेज़ तैयार रखें।" : "Keep these documents ready."}
            </p>
          </div>

          {/* Documents List */}
          <div className="space-y-4 mb-8">
            {(type.docs || ["Identification", "Address proof", "Photo"]).map(
              (doc, i) => (
                <article
                  key={doc}
                  className="rounded-2xl border border-gray-200 bg-white p-6 hover:border-sky-500 hover:shadow-md transition"
                >
                  <div className="flex gap-4">
                    <div className="text-3xl flex-shrink-0">
                      {["📄", "🪪", "✅", "🏠"][i % 4]}
                    </div>
                    <div className="flex-1">
                      <h2 className="text-lg font-bold text-gray-900">{doc}</h2>
                      <p className="mt-1 text-gray-600">A clear copy or photo.</p>
                      <details className="mt-4 rounded-lg bg-blue-50 overflow-hidden cursor-pointer">
                        <summary className="font-semibold text-blue-700 p-3 hover:bg-blue-100 transition">
                          ℹ️ Why do I need this?
                        </summary>
                        <p className="p-3 text-gray-700">
                          {lang === "hi"
                            ? "यह स्थानीय कार्यालय को आपके अनुरोध की जांच करने में मदद करता है।"
                            : "This helps the local office check your request correctly."}
                        </p>
                      </details>
                    </div>
                  </div>
                </article>
              )
            )}
          </div>

          {/* Pro Tip */}
          <div className="bg-gradient-to-r from-blue-50 to-sky-50 rounded-2xl border border-blue-200 p-6 mb-8">
            <h3 className="font-bold text-blue-700 mb-2">💡 Pro tip</h3>
            <p className="text-gray-700">
              {lang === "hi"
                ? "सभी दस्तावेज़ एक साथ तैयार रखें ताकि आप बिना किसी रुकावट के आवेदन जमा कर सकें।"
                : "Have all documents ready before starting so you can submit without interruption."}
            </p>
          </div>

          {/* Continue Button */}
          <Link
            href={`/apply/${type.slug}/form`}
            className="block bg-sky-500 text-white rounded-lg text-center text-lg font-bold py-4 hover:bg-sky-600 transition"
          >
            {lang === "hi" ? "आगे बढ़ें" : "Continue →"}
          </Link>
        </section>
      </div>
    </main>
  );
}

export default function ApplyPage({ params }) {
  return (
    <ProtectedRoute>
      <ApplyContent params={params} />
    </ProtectedRoute>
  );
}
