import API from './api'

// CREATE COMPLAINT
export const createComplaint = async (complaintData) => {

  const response = await API.post(
    '/complaints',
    complaintData
  )

  return response.data
}

// GET MY COMPLAINTS
export const getMyComplaints = async () => {

  const response = await API.get(
    '/complaints/my'
  )

  return response.data
}

// ADMIN - GET ALL COMPLAINTS
export const getAllComplaints = async () => {

  const response = await API.get("/complaints/all");

  return response.data;
};

// ADMIN - UPDATE STATUS
export const updateComplaintStatus = async (id, status) => {

  const response = await API.put(
    `/complaints/${id}?status=${status}`
  )

  return response.data
}