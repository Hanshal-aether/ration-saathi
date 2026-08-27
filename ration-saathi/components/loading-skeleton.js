export function CardSkeleton() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 animate-pulse">
      <div className="flex gap-4">
        <div className="h-12 w-12 rounded-lg bg-slate-200" />
        <div className="flex-1">
          <div className="mb-2 h-5 w-2/3 rounded bg-slate-200" />
          <div className="h-4 w-full rounded bg-slate-200" />
        </div>
      </div>
    </div>
  );
}

export function ShopsSkeleton() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      <div className="mb-4 h-5 w-40 rounded bg-slate-200 animate-pulse" />
      <div className="mb-8 h-8 w-80 rounded bg-slate-200 animate-pulse" />
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    </main>
  );
}

export function StatusSkeleton() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      <div className="mb-8 h-8 w-40 rounded bg-slate-200 animate-pulse" />
      <div className="rounded-2xl border border-slate-200 bg-white p-5 animate-pulse">
        <div className="h-12 w-full rounded bg-slate-200 mb-4" />
        <div className="h-10 w-full rounded bg-slate-200" />
      </div>
    </main>
  );
}

export function FormSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-8 w-64 rounded bg-slate-200" />
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-12 w-full rounded-lg bg-slate-200" />
        ))}
      </div>
      <div className="h-12 w-full rounded-lg bg-slate-200" />
    </div>
  );
}
