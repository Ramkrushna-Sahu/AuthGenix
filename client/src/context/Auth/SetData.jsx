import { useEffect, useState } from "react";
import AuthContext from "./userContext";

const SetData = (props)=>{
    const [userData, setUserData] = useState({
        username: "",
        email: ""
    })
    const [auth, setAuth] = useState({
        email:"",
        roles:[],
        accessToken:"",
        username:""
    })
    const [persist, setPersist] = useState(JSON.parse(localStorage.getItem("persist")) || "false")
    useEffect(()=>{
        localStorage.setItem("persist", JSON.stringify(persist))
    }, [persist])
    const updateUser = (data)=>{
        setUserData(data)
    }
    const updateAuth = (data)=>{
        setAuth(data)
    }
    return(
        <AuthContext.Provider value={{userData, updateUser, auth, updateAuth, persist, setPersist}}>
            {props.children}
        </AuthContext.Provider>
    )
}
export default SetData