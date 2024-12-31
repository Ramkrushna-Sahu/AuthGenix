import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import api from '../api/api'

export default function Verify() {
    const [token, setToken] = useState('')
    const navigate = useNavigate()
    useEffect(()=>{
        const token = window.location.search.split("=")[1]
        setToken(token)
    },[])
    const handleVerify = async ()=>{
        try {
            const resp = await toast.promise(api.post('/register/verify',{token}),{
                pending: "Validating Token!",
                success: "Account Verified Successfully!"
            })
            // console.log(resp.data)
            if (resp.data.success) {
                navigate("/login");
            } else {
                toast.error(resp.data.message)
            }
        } catch (error) {
            toast.error(error?.message)
        }
    }
    return (
        <>
            <div className='bg-gray-800 h-screen flex flex-col justify-center items-center'>
                <p className='font-bold m-4 md:text-2xl text-xl text-center text-purple-400'>Click on the button below to verify your account</p>
                <button className='bg-purple-600 px-6 py-2 rounded-lg font-bold text-white hover:bg-purple-800 hover:text-slate-50 hover:scale-105 duration-150' onClick={handleVerify}>Verify Account!</button>
            </div>
        </>
    )
}
