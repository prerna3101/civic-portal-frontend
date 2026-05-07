import { useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import ComplaintCard from '../components/ComplaintCard.jsx'
import Loader from '../components/Loader.jsx'
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
    return <Loader text="Loading admin dashboard..." />
  }

  return (
    <section className="space-y-5">

      {/* TOP STATS */}
      <div className="grid gap-4 sm:grid-cols-3">

        <div className="rounded-xl bg-white p-5 shadow-sm dark:bg-slate-800">
          <p className="text-sm text-slate-500">
            Total Complaints
          </p>

          <h2 className="mt-2 text-3xl font-bold text-slate-800 dark:text-white">
            {complaints.length}
          </h2>
        </div>

        <div className="rounded-xl bg-white p-5 shadow-sm dark:bg-slate-800">
          <p className="text-sm text-slate-500">
            Pending
          </p>

          <h2 className="mt-2 text-3xl font-bold text-amber-500">
            {
              complaints.filter(
                (item) => item.status === 'PENDING',
              ).length
            }
          </h2>
        </div>

        <div className="rounded-xl bg-white p-5 shadow-sm dark:bg-slate-800">
          <p className="text-sm text-slate-500">
            Resolved
          </p>

          <h2 className="mt-2 text-3xl font-bold text-emerald-500">
            {
              complaints.filter(
                (item) => item.status === 'RESOLVED',
              ).length
            }
          </h2>
        </div>
      </div>

      {/* FILTER SECTION */}
      <div className="rounded-xl bg-white p-4 shadow-sm dark:bg-slate-800">
        <div className="grid gap-3 md:grid-cols-2">

          <input
            type="text"
            placeholder="Search complaints..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
          >
            <option value="ALL">All Status</option>
            <option value="PENDING">Pending</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="RESOLVED">Resolved</option>
          </select>
        </div>
      </div>

      {/* COMPLAINTS */}
      {filteredComplaints.length === 0 ? (

        <div className="rounded-xl bg-white p-10 text-center text-slate-500 shadow-sm dark:bg-slate-800">
          No complaints found.
        </div>

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
                      className="rounded-md border border-slate-300 px-3 py-1 text-xs transition hover:bg-slate-100"
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

      {/* CONFIRM MODAL */}
      {confirmState.open && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

          <div className="w-full max-w-sm rounded-xl bg-white p-5 shadow-lg">

            <h2 className="text-lg font-bold text-slate-800">
              Confirm Update
            </h2>

            <p className="mt-2 text-sm text-slate-600">
              Change complaint status to{' '}
              <span className="font-semibold">
                {confirmState.status}
              </span>
              ?
            </p>

            <div className="mt-5 flex justify-end gap-2">

              <button
                type="button"
                onClick={() =>
                  setConfirmState({
                    open: false,
                    id: null,
                    status: '',
                  })
                }
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={confirmStatusChange}
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white"
              >
                Confirm
              </button>

            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default AdminDashboard