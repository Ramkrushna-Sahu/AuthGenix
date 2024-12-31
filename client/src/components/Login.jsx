import React, { useContext, useState, useEffect } from 'react'
import { HiEye, HiEyeOff } from 'react-icons/hi';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/Auth/userContext';
import LogInWithGoogle from './LogInWithGoogle';
const Login = () => {
    const { updateAuth, auth, updateUser, persist, setPersist } = useContext(AuthContext)
    const [showPassword, setShowPassword] = useState(false);
    const [user, setUser] = useState({
        email: "",
        password: ""
    })
    const [loading, setLoading] = useState(false)
    const [localperist, setLocalPersist] = useState(persist == "true" ? true : false);
    const [isChecked] = useState(true);

    const navigate = useNavigate()
    const togglePassword = () => {
        setShowPassword(!showPassword)
    }
    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }
    const togglePersist = () => {
        setLocalPersist((prev) => !prev);
    }
    useEffect(() => {
        setPersist(JSON.stringify(localperist))
    }, [localperist, setPersist])

    const validation = () => {
        if (!user.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            toast.error("Enter a valid email.")
            return false
        }
        if (!user.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/) || user.password.length < 8) {
            toast.error("Enter Valid Password.")
            return false
        }
        return true
    }

    const handleLogIn = async (e) => {
        e.preventDefault()
        const isValid = validation()
        if (!isValid) return

        try {
            setLoading(true)
            const resp = await toast.promise(
                api.post('/auth', { email: user.email, password: user.password }, {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true
                }
                ),
                {
                    pending: "Validating Your Credentials!",
                    success: "Login Successfully!",
                    error: "Invalid credentials"
                }
            )
            // console.log(resp.data.isVerified, resp.data.success)
            if (resp.data.success && resp.data.isVerified) {
                const data = {
                    email: resp.data.email,
                    roles: resp.data.roles,
                    accessToken: resp.data.accessToken,
                    username: resp.data.username
                }
                updateAuth(data)
                updateUser({ email: resp.data.email, username: resp.data.username })
                setPersist(JSON.stringify(isChecked))
                toast.success('Logged In successfully')
            } else if (resp.data.success) {
                toast.error("Plz verify your account first...");
            } else {
                toast.error(resp.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'An error occurred during login');
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        if (auth?.accessToken) {
            console.log(auth)
            navigate('/userprofile')
        }
    }, [auth, navigate]);

    return (
        <div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                transition={Bounce}
            />
            <div className='w-full'>
                <p className="text-sm mt-4 text-purple-400 w-full">An account allows users to enjoy all the services without any ads for free! So lets create one</p>
                <form className='flex flex-col gap-4 mt-4' onSubmit={handleLogIn}>
                    <div className="relative  mt-1">
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="block px-2.5 pb-2.5 pt-2.5 w-full text-sm bg-transparent rounded-lg border-2 border-gray-400 appearance-none text-white hover:border-zinc-200 hover:shadow-sm hover:shadow-slate-200 group  focus:outline-none focus:ring-0 focus:border-purple-600 peer focus:hover:shadow-purple-500 "
                            placeholder="Email"
                            value={user.email}
                            onChange={handleChange}
                            required
                        />
                        <label
                            htmlFor="email"
                            className="absolute text-sm bg-gray-800 text-white duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0]  px-2 peer-focus:px-2 peer-focus:text-purple-600 peer-focus:dark:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                        >
                            Email
                        </label>
                    </div>
                    <div className="relative  mt-1">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            name="password"
                            className="block px-2.5 pb-2.5 pt-2.5 w-full text-sm bg-transparent rounded-lg border-2 border-gray-400 appearance-none text-white hover:border-zinc-200 hover:shadow-sm hover:shadow-slate-200 group  focus:outline-none focus:ring-0 focus:border-purple-600 peer focus:hover:shadow-purple-500 "
                            placeholder="Password"
                            value={user.password}
                            onChange={handleChange}
                            // minLength={8}
                            required
                        />
                        <div
                            id='icon_password'
                            className=" absolute right-4 top-2 cursor-pointer text-white"
                            onClick={togglePassword}
                        >
                            {
                                showPassword ? <HiEye className="h-8 font-extralight" /> : <HiEyeOff className="h-8 font-extralight" />
                            }
                        </div>
                        <label
                            htmlFor="passowrd"
                            className="absolute text-sm bg-gray-800 text-white duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0]  px-2 peer-focus:px-2 peer-focus:text-purple-600 peer-focus:dark:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                        >
                            Password
                        </label>
                    </div>
                    <div className='relative mt-1'>
                        <label htmlFor="showPassword" className="mb-4 text-slate-50">
                            <input
                                type="checkbox"
                                id="persist"
                                name="persist"
                                checked={localperist}
                                onChange={() => togglePersist()}
                                className='mr-1'
                            /> Remember Me</label>
                    </div>
                    <button className='text-white bg-purple-600 hover:bg-purple-900 rounded-lg w-32 m-auto py-2 font-semibold hover:scale-105 duration-300'>{loading ? 'Logging In...' : 'Log In'}</button>
                </form>

                <LogInWithGoogle/>
            </div>
        </div>
    )
}

export default Login
