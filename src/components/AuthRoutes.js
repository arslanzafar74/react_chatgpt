import React from 'react'
import { Navigate } from 'react-router-dom'
function AuthRoutes({children }) {
  let isSignedIn = localStorage.getItem('authenticated');
  if (!isSignedIn || isSignedIn === 'false') {
    return <Navigate to="/" replace />
  }
  return children
}
export default AuthRoutes