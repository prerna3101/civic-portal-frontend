function Loader({ text = 'Loading...' }) {
  return (
    <div className="panel flex min-h-[220px] items-center justify-center gap-3">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-emerald-100 border-t-brand-600 dark:border-emerald-900/30 dark:border-t-emerald-300" />
      <p className="text-sm font-medium text-slate-600 dark:text-slate-200">{text}</p>
    </div>
  )
}

export default Loader
