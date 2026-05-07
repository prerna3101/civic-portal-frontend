import { useEffect, useMemo, useState } from 'react'
import ComplaintCard from '../components/ComplaintCard.jsx'
import Loader from '../components/Loader.jsx'
import { getMyComplaints } from '../services/complaintService.js'

function MyComplaints() {
  const [complaints, setComplaints] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('ALL')

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const data = await getMyComplaints()
        setComplaints(Array.isArray(data) ? data : [])
      } finally {
        setLoading(false)
      }
    }
    fetchComplaints()
  }, [])

  const filteredComplaints = useMemo(
    () =>
      complaints.filter((complaint) => {
        const matchesSearch =
          complaint.title?.toLowerCase().includes(search.toLowerCase()) ||
          complaint.description?.toLowerCase().includes(search.toLowerCase())
        const matchesStatus = statusFilter === 'ALL' || complaint.status === statusFilter
        return matchesSearch && matchesStatus
      }),
    [complaints, search, statusFilter],
  )

  if (loading) return <Loader text="Loading complaints..." />

  return (
    <section className="space-y-4">
      <div className="rounded-xl bg-white p-4 shadow-sm dark:bg-slate-800">
        <div className="grid gap-3 md:grid-cols-2">
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by title or description"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none"
          />
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none"
          >
            <option value="ALL">All Statuses</option>
            <option value="PENDING">Pending</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="RESOLVED">Resolved</option>
          </select>
        </div>
      </div>

      {filteredComplaints.length === 0 ? (
        <div className="rounded-xl bg-white p-8 text-center text-sm text-slate-500 shadow-sm dark:bg-slate-800">
          No complaints found.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {filteredComplaints.map((complaint) => (
            <ComplaintCard key={complaint.id} complaint={complaint} />
          ))}
        </div>
      )}
    </section>
  )
}

export default MyComplaints
