"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getType } from "../../../../lib/config";
import { AIAssistant } from "../../../../components/ai-assistant";
import { ProtectedRoute } from "../../../../components/protected-route";

const STORAGE_KEY = (type) => `ration-draft-${type}`;

function FormContent({ params }) {
  const type = getType(params.type);
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    reason: "",
    contact: "SMS",
    docs: [],
  });
  const [resume, setResume] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load saved draft
    const saved = localStorage.getItem(STORAGE_KEY(params.type));
    if (saved) {
      try {
        const draft = JSON.parse(saved);
        setData(draft.data);
        setStep(draft.step);
        setResume(true);
      } catch (err) {
        console.error("Failed to load draft:", err);
      }
    }
  }, [params.type]);

  // Auto-save progress
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY(params.type), JSON.stringify({ step, data }));
  }, [step, data, params.type]);

  if (!type) return null;

  const handleSubmit = async () => {
    if (!data.reason) {
      setError("Please select a reason");
      return;
    }

    if (data.docs.length === 0) {
      setError("Please select at least one document");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: params.type,
          formData: data,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.error || "Failed to submit application");
        setLoading(false);
        return;
      }

      // Clear draft on success
      localStorage.removeItem(STORAGE_KEY(params.type));

      // Redirect to confirmation
      router.push(`/apply/confirmation/${result.id}`);
    } catch (err) {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  };

  // Resume prompt
  if (resume) {
    return (
      <main className="pb-24 pt-6 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto rounded-2xl bg-blue-50 border border-blue-200 p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">📋 Resume draft?</h1>
          <p className="text-gray-600 mb-6">We saved your progress. You can pick up where you left off.</p>
          <div className="flex gap-3 flex-col sm:flex-row">
            <button
              onClick={() => setResume(false)}
              className="flex-1 py-2 px-4 bg-sky-500 text-white font-semibold rounded-lg hover:bg-sky-600 transition"
            >
              Resume
            </button>
            <button
              onClick={() => {
                localStorage.removeItem(STORAGE_KEY(params.type));
                setResume(false);
                setStep(1);
              }}
              className="flex-1 py-2 px-4 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition"
            >
              Start Fresh
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <>
      <main className="pb-32 pt-6 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">
          {/* Progress */}
          <div className="mb-8">
            <p className="text-sm font-semibold text-sky-600">Step {step} of 4</p>
            <div className="mt-2 h-2 rounded-full bg-gray-200 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-sky-400 to-blue-600 transition-all ease-out duration-500"
                style={{ width: `${step * 25}%` }}
              />
            </div>
          </div>

          {/* Form Section */}
          <section className="rounded-2xl border border-gray-200 bg-white shadow-sm p-6 sm:p-8">
            {/* Step 1: Contact Method */}
            {step === 1 && (
              <>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">How should we contact you?</h1>
                <p className="text-gray-600 mb-6">Choose your preferred way to receive updates.</p>
                <select
                  value={data.contact}
                  onChange={(e) => setData({ ...data, contact: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 outline-none"
                >
                  <option>SMS</option>
                  <option>Phone Call</option>
                  <option>Email</option>
                </select>
              </>
            )}

            {/* Step 2: Reason */}
            {step === 2 && (
              <>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">What do you need help with?</h1>
                <p className="text-gray-600 mb-6">Select the reason for your request.</p>
                <div className="space-y-3">
                  {["New ration card", "Add family member", "Update address", "Lost card replacement"].map(
                    (option) => (
                      <label
                        key={option}
                        className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 hover:border-sky-500 hover:bg-sky-50 cursor-pointer transition"
                      >
                        <input
                          type="radio"
                          checked={data.reason === option}
                          onChange={() => setData({ ...data, reason: option })}
                          className="w-5 h-5 accent-sky-600"
                        />
                        <span className="flex-1 font-medium text-gray-800">{option}</span>
                      </label>
                    )
                  )}
                </div>
              </>
            )}

            {/* Step 3: Documents */}
            {step === 3 && (
              <>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Documents ready?</h1>
                <p className="text-gray-600 mb-6">Check off each document as you prepare it.</p>
                <div className="space-y-3">
                  {(type.docs || ["Identification", "Address proof", "Photo", "Birth certificate"]).map(
                    (doc) => (
                      <label
                        key={doc}
                        className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 hover:border-sky-500 hover:bg-sky-50 cursor-pointer transition"
                      >
                        <input
                          type="checkbox"
                          checked={data.docs.includes(doc)}
                          onChange={(e) =>
                            setData({
                              ...data,
                              docs: e.target.checked
                                ? [...data.docs, doc]
                                : data.docs.filter((v) => v !== doc),
                            })
                          }
                          className="w-5 h-5 accent-sky-600"
                        />
                        <span className="flex-1 font-medium text-gray-800">{doc}</span>
                      </label>
                    )
                  )}
                </div>
              </>
            )}

            {/* Step 4: Review */}
            {step === 4 && (
              <>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Review your request</h1>
                <p className="text-gray-600 mb-6">Make sure everything looks correct before submitting.</p>
                <div className="space-y-4 bg-gray-50 rounded-xl p-5">
                  <div className="flex justify-between items-start">
                    <span className="text-gray-600 font-medium">Request type:</span>
                    <span className="font-semibold text-right">{type.en}</span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-gray-600 font-medium">Contact method:</span>
                    <span className="font-semibold text-right">{data.contact}</span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-gray-600 font-medium">Reason:</span>
                    <span className="font-semibold text-right">{data.reason || "—"}</span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-gray-600 font-medium">Documents:</span>
                    <span className="font-semibold text-right text-sm">
                      {data.docs.length > 0 ? data.docs.length : "—"}
                    </span>
                  </div>
                </div>
              </>
            )}

            {/* Error */}
            {error && (
              <div className="mt-6 p-4 rounded-xl bg-red-50 border border-red-200">
                <p className="text-red-700 font-semibold">⚠️ {error}</p>
              </div>
            )}

            {/* Navigation */}
            <div className="mt-8 flex gap-3 flex-col sm:flex-row">
              {step > 1 && (
                <button
                  onClick={() => setStep(step - 1)}
                  disabled={loading}
                  className="py-3 px-4 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition disabled:opacity-60"
                >
                  ← Back
                </button>
              )}
              <button
                onClick={() => (step < 4 ? setStep(step + 1) : handleSubmit())}
                disabled={loading}
                className="flex-1 py-3 px-4 bg-sky-500 text-white font-semibold rounded-lg hover:bg-sky-600 transition disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Submitting...
                  </>
                ) : step < 4 ? (
                  <>Continue →</>
                ) : (
                  <>Submit Request</>
                )}
              </button>
            </div>
          </section>
        </div>
      </main>
      <AIAssistant />
    </>
  );
}

export default function FormPage({ params }) {
  return (
    <ProtectedRoute>
      <FormContent params={params} />
    </ProtectedRoute>
  );
}
