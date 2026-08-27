"use client";

import { useEffect, useState } from "react";
import { useStateContext } from "../../components/providers";
import { StateGuard } from "../../components/state-guard";
import { ProtectedRoute } from "../../components/protected-route";
import { AIAssistant } from "../../components/ai-assistant";

const STATUS_COLORS = {
  new: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200", icon: "📝" },
  submitted: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200", icon: "✓" },
  under_review: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200", icon: "🔍" },
  approved: { bg: "bg-green-50", text: "text-green-700", border: "border-green-200", icon: "✓✓" },
  needs_correction: { bg: "bg-red-50", text: "text-red-700", border: "border-red-200", icon: "⚠" },
};

function StatusContent() {
  const { state } = useStateContext();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, [state]);

  const fetchApplications = async () => {
    try {
      const res = await fetch(`/api/applications?state=${state}`);
      const data = await res.json();
      setApplications(data.applications || []);
    } catch (err) {
      console.error("Failed to fetch applications:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <StateGuard>
      <main className="pb-24 pt-6 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Applications</h1>
            <p className="text-gray-500">Track and manage your ration card applications</p>
          </div>

          {/* Loading */}
          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-gray-200 h-24 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : applications.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
              <div className="text-5xl mb-3">📋</div>
              <p className="text-gray-600 font-medium mb-1">No applications yet</p>
              <p className="text-gray-400 text-sm mb-4">Start a new application to track its status</p>
              <a
                href="/apply/new_card"
                className="inline-flex items-center gap-2 px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition font-semibold text-sm"
              >
                <span>➕</span> Start Application
              </a>
            </div>
          ) : (
            <div className="space-y-4">
              {applications.map((app) => {
                const statusConfig = STATUS_COLORS[app.status] || STATUS_COLORS.new;
                return (
                  <div
                    key={app.id}
                    className="bg-white border border-gray-200 rounded-xl p-5 hover:border-sky-500 hover:shadow-md transition"
                  >
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div>
                        <h3 className="font-bold text-gray-900 capitalize">
                          {app.applicationType?.replace(/_/g, " ")} Application
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          Reference: <span className="font-mono text-gray-700">{app.id.slice(0, 8)}</span>
                        </p>
                      </div>
                      <div className={`px-3 py-1 rounded-lg text-sm font-semibold ${statusConfig.bg} ${statusConfig.text}`}>
                        {statusConfig.icon} {app.status.replace(/_/g, " ")}
                      </div>
                    </div>

                    {/* Progress bar */}
                    <div className="mb-4">
                      <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-sky-400 to-blue-600 transition-all duration-300"
                          style={{
                            width: {
                              new: "20%",
                              submitted: "40%",
                              under_review: "60%",
                              approved: "100%",
                              needs_correction: "30%",
                            }[app.status] || "20%",
                          }}
                        />
                      </div>
                    </div>

                    {/* Details */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                      <div>
                        <p className="text-gray-500 text-xs mb-1">Submitted</p>
                        <p className="font-semibold text-gray-900">
                          {new Date(app.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs mb-1">Last Updated</p>
                        <p className="font-semibold text-gray-900">
                          {new Date(app.updatedAt).toLocaleDateString()}
                        </p>
                      </div>
                      {app.status === "needs_correction" && (
                        <div className="col-span-2">
                          <p className="text-gray-500 text-xs mb-1">Issue</p>
                          <p className="font-semibold text-red-600">Missing supporting documents</p>
                        </div>
                      )}
                    </div>

                    {/* CTA */}
                    <div className="mt-4 pt-4 border-t border-gray-100 flex gap-2">
                      <button className="flex-1 py-2 px-3 bg-sky-50 hover:bg-sky-100 text-sky-600 font-semibold rounded-lg transition text-sm">
                        View Details
                      </button>
                      {app.status === "needs_correction" && (
                        <button className="flex-1 py-2 px-3 bg-red-50 hover:bg-red-100 text-red-600 font-semibold rounded-lg transition text-sm">
                          Resubmit
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <AIAssistant />
      </main>
    </StateGuard>
  );
}

export default function StatusPage() {
  return (
    <ProtectedRoute>
      <StatusContent />
    </ProtectedRoute>
  );
}
