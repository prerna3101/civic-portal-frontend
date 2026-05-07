import { useEffect, useMemo, useState } from 'react'
import { CheckCircle2, CircleDashed, Search } from 'lucide-react'
import toast from 'react-hot-toast'
import ComplaintCard from '../components/ComplaintCard.jsx'
import EmptyState from '../components/EmptyState.jsx'
import Modal from '../components/Modal.jsx'
import SkeletonCard from '../components/SkeletonCard.jsx'
import {
  getAllComplaints,
  updateComplaintStatus,
} from '../services/complaintService.js'

function AdminDashboard() {
  const [complaints, setComplaints] = useState([])
  const [loading, setLoading] = useState(true)

  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('ALL')

  const [confirmState, setConfirmState] = useState({
    open: false,
    id: null,
    status: '',
  })

  // FETCH ALL COMPLAINTS
  const fetchComplaints = async () => {
    try {
      setLoading(true)

      const data = await getAllComplaints()

      console.log('ALL COMPLAINTS => ', data)

      setComplaints(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error(error)

      toast.error(
        error.response?.data?.message ||
          error.response?.data ||
          'Failed to fetch complaints',
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchComplaints()
  }, [])

  // FILTER
  const filteredComplaints = useMemo(() => {
    return complaints.filter((complaint) => {
      const text =
        `${complaint.title || ''} 
         ${complaint.description || ''} 
         ${complaint.username || ''}`.toLowerCase()

      const matchesSearch = text.includes(search.toLowerCase())

      const matchesStatus =
        statusFilter === 'ALL' ||
        complaint.status === statusFilter

      return matchesSearch && matchesStatus
    })
  }, [complaints, search, statusFilter])

  // OPEN CONFIRM MODAL
  const askStatusChange = (id, status) => {
    setConfirmState({
      open: true,
      id,
      status,
    })
  }

  // UPDATE STATUS
  const confirmStatusChange = async () => {
    try {
      await updateComplaintStatus(
        confirmState.id,
        confirmState.status,
      )

      toast.success('Complaint status updated')

      setConfirmState({
        open: false,
        id: null,
        status: '',
      })

      fetchComplaints()
    } catch (error) {
      console.error(error)

      toast.error(
        error.response?.data?.message ||
          error.response?.data ||
          'Failed to update complaint',
      )
    }
  }

  // LOADER
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
    <section className="space-y-5">
      <div className="rounded-3xl bg-hero p-7 text-white shadow-glass">
        <h2 className="text-2xl font-semibold">Government Complaint Operations</h2>
        <p className="mt-2 text-sm text-emerald-50/90">Review, prioritize, and update civic grievances in one place.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="panel p-5"><p className="text-sm text-slate-500 dark:text-slate-300">Total Complaints</p><h2 className="mt-2 text-3xl font-bold">{complaints.length}</h2></div>
        <div className="panel p-5"><p className="text-sm text-slate-500 dark:text-slate-300">Pending</p><div className="mt-2 flex items-center gap-2 text-3xl font-bold text-amber-500"><CircleDashed size={20} />{complaints.filter((item) => item.status === 'PENDING').length}</div></div>
        <div className="panel p-5"><p className="text-sm text-slate-500 dark:text-slate-300">Resolved</p><div className="mt-2 flex items-center gap-2 text-3xl font-bold text-emerald-500"><CheckCircle2 size={20} />{complaints.filter((item) => item.status === 'RESOLVED').length}</div></div>
      </div>

      <div className="panel p-4">
        <div className="grid gap-3 md:grid-cols-2">
          <div className="relative">
            <Search size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search complaints..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-ui pl-9"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="input-ui"
          >
            <option value="ALL">All Status</option>
            <option value="PENDING">Pending</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="RESOLVED">Resolved</option>
          </select>
        </div>
      </div>

      {filteredComplaints.length === 0 ? (
        <EmptyState title="No complaints found" description="No complaints match the current search and filter." />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {filteredComplaints.map((complaint) => (
            <ComplaintCard
              key={complaint.id}
              complaint={complaint}

              actions={
                <div className="flex flex-wrap gap-2">

                  {[
                    'PENDING',
                    'IN_PROGRESS',
                    'RESOLVED',
                  ].map((status) => (

                    <button
                      key={status}
                      type="button"
                      onClick={() =>
                        askStatusChange(
                          complaint.id,
                          status,
                        )
                      }
                      className="btn-secondary px-3 py-1.5 text-xs"
                    >
                      {status}
                    </button>

                  ))}
                </div>
              }
            />

          ))}
        </div>
      )}

      <Modal
        open={confirmState.open}
        title="Confirm status update"
        description={`Change complaint status to ${confirmState.status}?`}
        confirmText="Update"
        onClose={() => setConfirmState({ open: false, id: null, status: '' })}
        onConfirm={confirmStatusChange}
      />
    </section>
  )
}

export default AdminDashboard