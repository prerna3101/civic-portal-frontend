export const decodeJwt = (token) => {
  try {
    const base64Payload = token.split('.')[1]
    if (!base64Payload) return null
    const normalized = base64Payload.replace(/-/g, '+').replace(/_/g, '/')
    const decoded = atob(normalized)
    return JSON.parse(decoded)
  } catch (error) {
    return null
  }
}
