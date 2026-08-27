"use client";
import Link from "next/link";

export function EmptyState({ icon, title, description, action, actionText, actionHref }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="text-6xl mb-4">{icon}</div>
      <h2 className="text-2xl font-bold text-slate-900 mb-2 text-center">{title}</h2>
      <p className="text-base text-slate-600 text-center max-w-md mb-6">{description}</p>
      {actionHref && (
        <Link
          href={actionHref}
          className="bg-service-600 hover:bg-service-700 text-white font-bold py-3 px-6 rounded-xl transition-all var(--transition-normal) active:scale-95"
        >
          {actionText || "Take Action"}
        </Link>
      )}
      {action && (
        <button
          onClick={action}
          className="bg-service-600 hover:bg-service-700 text-white font-bold py-3 px-6 rounded-xl transition-all var(--transition-normal) active:scale-95"
        >
          {actionText || "Take Action"}
        </button>
      )}
    </div>
  );
}

export function NoResults({ searchTerm }) {
  return (
    <EmptyState
      icon="🔍"
      title="No results found"
      description={searchTerm ? `We couldn't find anything matching "${searchTerm}". Try a different search.` : "No items to display."}
    />
  );
}

export function NoApplications() {
  return (
    <EmptyState
      icon="📋"
      title="No applications yet"
      description="You haven't submitted any applications. Start by selecting what you need help with."
      actionHref="/apply/new"
      actionText="Start Application"
    />
  );
}

export function ErrorState({ title, description, actionText, action }) {
  return (
    <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
      <h3 className="font-bold text-red-900 text-lg mb-1">⚠️ {title}</h3>
      <p className="text-red-700 mb-4">{description}</p>
      {action && (
        <button
          onClick={action}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors var(--transition-normal)"
        >
          {actionText || "Try Again"}
        </button>
      )}
    </div>
  );
}
