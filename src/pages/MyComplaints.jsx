import { useEffect, useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import ComplaintCard from '../components/ComplaintCard.jsx'
import EmptyState from '../components/EmptyState.jsx'
import SkeletonCard from '../components/SkeletonCard.jsx'
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

  if (loading) {
    return (
      <section className="grid gap-4 md:grid-cols-2">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </section>
    )
  }

  return (
    <section className="space-y-4">
      <div className="panel p-4">
        <div className="grid gap-3 md:grid-cols-2">
          <div className="relative">
            <Search size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by title or description"
              className="input-ui pl-9"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="input-ui"
          >
            <option value="ALL">All Statuses</option>
            <option value="PENDING">Pending</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="RESOLVED">Resolved</option>
          </select>
        </div>
      </div>

      {filteredComplaints.length === 0 ? (
        <EmptyState title="No complaints found" description="Try changing filters or create a new complaint." />
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
