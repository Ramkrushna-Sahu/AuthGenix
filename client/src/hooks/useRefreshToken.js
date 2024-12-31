import React, { useContext } from 'react'
import AuthContext from '../context/Auth/userContext'
import api from '../api/api'

export default function useRefreshToken() {
    const {userData, updateUser, auth, updateAuth} = useContext(AuthContext)
    const refresh= async()=>{
        const resp = await api.get('/refresh',{
            withCredentials: true
        })
        updateAuth({
            ...auth,
            accessToken: resp.data.accessToken,
            username: resp.data.username,
            email: resp.data.email,
            roles: resp.data.roles
        })
        updateUser({
            ...userData,
            username: resp.data.username,
            email: resp.data.email
        })
        return resp.data.refreshToken
    }
    return refresh
}

