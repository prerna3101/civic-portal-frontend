import { Inbox } from 'lucide-react'

function EmptyState({ title = 'No records found', description = 'Try adjusting filters or create a new complaint.' }) {
  return (
    <div className="panel p-10 text-center">
      <div className="mx-auto mb-3 w-fit rounded-2xl bg-slate-100 p-3 text-slate-500 dark:bg-slate-800 dark:text-slate-300">
        <Inbox size={18} />
      </div>
      <h3 className="text-base font-semibold text-slate-800 dark:text-slate-100">{title}</h3>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-300">{description}</p>
    </div>
  )
}

export default EmptyState
