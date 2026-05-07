import { motion } from 'framer-motion'

function Modal({ open, title, description, confirmText = 'Confirm', onClose, onConfirm }) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="panel w-full max-w-md p-6"
        role="dialog"
        aria-modal="true"
      >
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{title}</h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{description}</p>
        <div className="mt-6 flex justify-end gap-2">
          <button type="button" className="btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button type="button" className="btn-primary" onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </motion.div>
    </div>
  )
}

export default Modal
