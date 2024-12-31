import React, { useContext } from 'react'
import AuthContext from '../context/Auth/userContext'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

export default function RequireAuth({allowedRoles}) {
    const {auth, userData} = useContext(AuthContext)
    const location = useLocation()
    // console.log(auth)
  return (
    <div>
      {
        auth?.roles?.find(role => allowedRoles?.includes(role)) ? <Outlet/> : userData?.username ? <Navigate to='/loginwithgoogle' state={{from: location}} replace/>:<Navigate to="/login" state={{ from: location }} replace />
      }
    </div>
  )
}
