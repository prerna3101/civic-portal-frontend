import { useState } from 'react'
import toast from 'react-hot-toast'
import { createComplaint } from '../services/complaintService'

function CreateComplaint() {

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
  })

  const [loading, setLoading] = useState(false)

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

    <div className="max-w-2xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6">
        Create Complaint
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white shadow-md rounded-lg p-6"
      >

        {/* TITLE */}
        <div>

          <label className="block mb-2 font-medium">
            Complaint Title
          </label>

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter complaint title"
            className="w-full border p-3 rounded-lg"
            required
          />
        </div>

        {/* CATEGORY */}
        <div>

          <label className="block mb-2 font-medium">
            Category
          </label>

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
          >

            <option value="">
              Select Category
            </option>

            <option value="Road">
              Road
            </option>

            <option value="Water">
              Water
            </option>

            <option value="Electricity">
              Electricity
            </option>

            <option value="Garbage">
              Garbage
            </option>

            <option value="Other">
              Other
            </option>

          </select>

        </div>

        {/* DESCRIPTION */}
        <div>

          <label className="block mb-2 font-medium">
            Description
          </label>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="5"
            placeholder="Describe your issue..."
            className="w-full border p-3 rounded-lg"
            required
          />

        </div>

        {/* BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
        >

          {loading
            ? 'Submitting...'
            : 'Submit Complaint'}

        </button>

      </form>

    </div>
  )
}

export default CreateComplaint