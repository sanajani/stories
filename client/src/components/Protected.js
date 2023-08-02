import React from 'react'
import { Navigate } from 'react-router-dom'
function Protected({ profile, children }) {
  if (profile) {
    return <Navigate to="/" replace />
  }
  return children
}
export default Protected