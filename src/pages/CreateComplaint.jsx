import { useState } from 'react'
import { CheckCircle2, ImagePlus } from 'lucide-react'
import toast from 'react-hot-toast'
import { createComplaint } from '../services/complaintService'

function CreateComplaint() {

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
  })

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {

    e.preventDefault()

    try {

      setLoading(true)

      await createComplaint(formData)

      toast.success('Complaint submitted successfully')
      setSuccess(true)

      setFormData({
        title: '',
        description: '',
        category: '',
      })

    } catch (error) {

      console.error(error)

      toast.error(
        error.response?.data?.message ||
        'Failed to submit complaint'
      )

    } finally {

      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <section className="rounded-3xl bg-hero p-7 text-white shadow-glass">
        <h1 className="text-2xl font-semibold">Create Complaint</h1>
        <p className="mt-2 text-sm text-emerald-50/90">Describe the issue clearly for faster resolution.</p>
      </section>

      <form onSubmit={handleSubmit} className="panel space-y-4 p-6">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Complaint Title</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Enter complaint title" className="input-ui" required />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Category</label>
          <select name="category" value={formData.category} onChange={handleChange} className="input-ui" required>
            <option value="">Select Category</option>
            <option value="Road">Road</option>
            <option value="Water">Water</option>
            <option value="Electricity">Electricity</option>
            <option value="Garbage">Garbage</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} rows="5" placeholder="Describe your issue..." className="input-ui resize-none" required />
        </div>
        <button type="submit" disabled={loading} className="btn-primary w-full sm:w-auto">
          {loading ? 'Submitting...' : 'Submit Complaint'}
        </button>
        {success && <div className="flex items-center gap-2 rounded-xl bg-emerald-50 px-3 py-2 text-sm text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300"><CheckCircle2 size={16} />Complaint submitted successfully.</div>}
      </form>
    </div>
  )
}

export default CreateComplaint