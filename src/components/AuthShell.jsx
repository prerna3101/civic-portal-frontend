import { Building2, ShieldCheck } from 'lucide-react'

function AuthShell({ title, subtitle, children, footer }) {
  return (
    <div className="min-h-screen bg-slate-100 p-4 dark:bg-slate-950 md:p-6">
      <div className="mx-auto grid min-h-[calc(100vh-2rem)] w-full max-w-6xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-glass dark:border-slate-700 dark:bg-slate-900 md:grid-cols-2">
        <aside className="relative hidden bg-hero p-10 text-white md:block">
          <div className="absolute inset-0 bg-glow" />
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm">
              <Building2 size={16} />
              Civic Portal
            </div>
            <h2 className="mt-6 text-3xl font-bold leading-tight">Modern grievance operations for public service teams</h2>
            <p className="mt-3 max-w-md text-sm text-emerald-50/90">
              Secure workflow to track complaints, measure response, and improve citizen outcomes.
            </p>
            <div className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-white/15 px-4 py-3 text-sm">
              <ShieldCheck size={16} />
              JWT secured and role-based access
            </div>
          </div>
        </aside>
        <main className="flex items-center justify-center bg-slate-50 p-6 dark:bg-slate-900 md:p-10">
          <div className="w-full max-w-md rounded-2xl border border-white/30 bg-white/70 p-8 shadow-glass backdrop-blur-xl dark:border-slate-700 dark:bg-slate-900/80">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">{title}</h1>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{subtitle}</p>
            <div className="mt-6">{children}</div>
            {footer}
          </div>
        </main>
      </div>
    </div>
  )
}

export default AuthShell
