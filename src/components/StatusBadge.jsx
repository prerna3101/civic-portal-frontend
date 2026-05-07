const statusStyles = {
  PENDING: 'bg-amber-100 text-amber-700',
  IN_PROGRESS: 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300',
  RESOLVED: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
}

function StatusBadge({ status = 'PENDING' }) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        statusStyles[status] || 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-200'
      }`}
    >
      {status.replace('_', ' ')}
    </span>
  )
}

export default StatusBadge
