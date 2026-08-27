"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ProtectedRoute } from "../../../../components/protected-route";

function ConfirmationContent({ params }) {
  const [app, setApp] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplication();
  }, [params.applicationId]);

  const fetchApplication = async () => {
    try {
      const res = await fetch(`/api/applications/${params.applicationId}`);
      const data = await res.json();
      if (data) setApp(data);
    } catch (err) {
      console.error("Failed to fetch application:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <main className="pb-24 pt-8 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto h-96 bg-gray-200 rounded-xl animate-pulse" />
      </main>
    );

  if (!app)
    return (
      <main className="pb-24 pt-8 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center py-12">
          <p className="text-4xl mb-4">❌</p>
          <h1 className="text-2xl font-bold text-gray-900">Application not found</h1>
        </div>
      </main>
    );

  const refNumber = `RS-${app.id.slice(-8).toUpperCase()}`;

  return (
    <main className="pb-24 pt-8 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        <div className="rounded-2xl border-2 border-green-200 bg-gradient-to-br from-green-50 to-blue-50 p-8">
          {/* Success Icon */}
          <div className="text-center">
            <div className="text-6xl mb-4 animate-bounce">✓</div>
            <p className="text-sm font-semibold text-green-600 uppercase tracking-wide">
              Success
            </p>
            <h1 className="mt-3 text-3xl font-bold text-gray-900">
              Your request has been submitted
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              We've received your application and started processing it.
            </p>
          </div>

          {/* Reference Number */}
          <div className="mt-8 rounded-xl bg-white border-2 border-gray-200 p-6">
            <div className="text-center">
              <p className="text-sm text-gray-600 font-semibold">Your reference number</p>
              <p className="mt-2 text-3xl font-bold font-mono text-sky-600 tracking-wider">
                {refNumber}
              </p>
              <p className="mt-3 text-xs text-gray-500">Save this number to track your request</p>
            </div>
          </div>

          {/* Next Steps */}
          <div className="mt-8 rounded-xl bg-blue-50 border border-blue-200 p-6">
            <h3 className="font-bold text-blue-900 mb-3">📋 What happens next</h3>
            <ul className="text-blue-800 space-y-2">
              <li>✓ We'll verify your documents within 3–5 working days</li>
              <li>✓ You'll receive updates by phone or SMS</li>
              <li>✓ Your card will be ready within 10 working days</li>
            </ul>
          </div>

          {/* CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link
              href={`/status?ref=${refNumber}`}
              className="flex-1 py-3 px-4 bg-sky-500 text-white font-bold rounded-lg text-center hover:bg-sky-600 transition"
            >
              Track this request →
            </Link>
            <Link
              href="/"
              className="flex-1 py-3 px-4 bg-gray-200 text-gray-700 font-bold rounded-lg text-center hover:bg-gray-300 transition"
            >
              Back to home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function ConfirmationPage({ params }) {
  return (
    <ProtectedRoute>
      <ConfirmationContent params={params} />
    </ProtectedRoute>
  );
}
