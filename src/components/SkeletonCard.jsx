function SkeletonCard() {
  return (
    <article className="panel animate-pulse p-5">
      <div className="h-5 w-2/3 rounded bg-slate-200 dark:bg-slate-700" />
      <div className="mt-4 h-3 w-full rounded bg-slate-200 dark:bg-slate-700" />
      <div className="mt-2 h-3 w-5/6 rounded bg-slate-200 dark:bg-slate-700" />
      <div className="mt-6 h-8 w-24 rounded bg-slate-200 dark:bg-slate-700" />
    </article>
  )
}

export default SkeletonCard
