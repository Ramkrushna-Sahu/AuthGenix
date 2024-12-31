import React, { useContext } from 'react'
import AuthContext from '../context/Auth/userContext'
import api from '../api/api'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
export default function UserProfile() {
  const { auth, updateAuth, updateUser, setPersist} = useContext(AuthContext)
  const navigate = useNavigate()
  // console.log(userData)
  console.log(auth)
  const handleLogOut= async()=>{
    try {
      const resp = await toast.promise(
        api.post('/logout', {}, { withCredentials: true }),{
          pending: 'Logged out is processing',
          success: 'Logged out successful',
          error: 'Something went wrong! So, plz try again later.'
        }
      )
      // console.log(resp.status)
      if (resp.status.toString() === "204") {
        updateAuth(undefined);
        updateUser(undefined);
        setPersist(false);
      }
      navigate('/signup')
    } catch (error) {
      toast.error(error)
    }
    
  }
  return (
    <div className='bg-gray-700 h-screen w-screen flex flex-col justify-center items-center '>
      <div className='bg-gray-800 py-5 px-5 lg:w-[40%] md:w-[70%] w-[90%] overflow-hidden h-auto'>
        <p className='text-purple-400 text-3xl font-bold mb-4'>User Profile Details:</p>
        <ul className='text-purple-400 md:text-2xl text-xl my-2 font-semibold list-disc pl-5 break-all'>
          <li>Username: {auth.username}</li>
          <li>Email: {auth.email}</li>
        </ul>
        <div className='mt-5'>
          <button className='bg-purple-500 hover:bg-purple-700 px-8 py-2 text-white hover:text-slate-50 font-bold rounded-lg' onClick={handleLogOut}>Log Out</button>
        </div>
      </div>
    </div>
    
  )
}
