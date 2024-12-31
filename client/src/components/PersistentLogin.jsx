import React, { useContext, useEffect, useRef, useState } from 'react'
import useRefreshToken from '../hooks/useRefreshToken'
import AuthContext from '../context/Auth/userContext'
import { Outlet } from 'react-router-dom'
export default function PersistantLogin() {
    const [isLoading, setLoading] = useState(true)
    const refresh = useRefreshToken()
    const { auth, persist } = useContext(AuthContext)
    const useIsMount = () => {
        const isMount = useRef(false)
        useEffect(() => {
            const verifyToken = async () => {
                isMount.current = true
                try {
                    await refresh()
                } catch (error) {
                    console.log(error)
                } finally {
                    isMount.current && setLoading(false)
                }
            }
            !auth?.accessToken && (persist === "true")
                ? verifyToken()
                : setLoading(false)

            return ()=>{
                isMount.current = false
            }
        },[])
        return isMount
    }
    useIsMount()
    return (
        <>{!persist === Boolean("true") ? <Outlet /> : isLoading ? <div className="lds-facebook"><div></div><div></div><div></div></div> : <Outlet />}</>
    )
}
