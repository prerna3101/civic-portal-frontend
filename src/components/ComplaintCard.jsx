import StatusBadge from './StatusBadge.jsx'

function ComplaintCard({ complaint, actions }) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-slate-700 dark:bg-slate-800">
      <div className="mb-3 flex items-center justify-between gap-2">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
          {complaint.title || 'Complaint'}
        </h3>
        <StatusBadge status={complaint.status} />
      </div>
      <p className="mb-3 text-sm text-slate-600 dark:text-slate-300">
        {complaint.description || 'No description available.'}
      </p>
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-300">
        <span>By: {complaint.username || complaint.userName || 'Unknown'}</span>
        {actions}
      </div>
    </article>
  )
}

export default ComplaintCard
