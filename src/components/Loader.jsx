function Loader({ text = 'Loading...' }) {
  return (
    <div className="flex min-h-[200px] items-center justify-center gap-3">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-100 border-t-brand-600" />
      <p className="text-sm font-medium text-slate-600 dark:text-slate-200">{text}</p>
    </div>
  )
}

export default Loader
