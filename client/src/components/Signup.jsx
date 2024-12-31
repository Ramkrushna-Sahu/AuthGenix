import axios from 'axios';
import api from '../api/api'
import React, { useContext, useState } from 'react'
import { HiEye, HiEyeOff } from 'react-icons/hi';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from '../context/Auth/userContext';
import LogInWithGoogle from './LogInWithGoogle';
const Signup = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const {updateUser} = useContext(AuthContext)
    const [loading, setLoading] = useState(false)
    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }
    const togglePassword = () => {
        setShowPassword(!showPassword)
    }
    const toggleConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword)
    }
    const validation = () => {
        if (user.username.length < 3) {
            toast.error("Username must have at least 3 characters.")
            return false
        }
        if (!user.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            toast.error("Enter a valid email.")
            return false
        }
        if (!user.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/) || user.password.length < 8) {
            toast.error("Password must be at least 8 characters long & contain at least 1 uppercase letter, 1 lowercase letter, 1 number & 1 special character.")
            return false
        }
        if (user.confirmPassword != user.password) {
            toast.info("Make sure that you reenter password in confirm password box")
            return false
        }
        return true
    }

    const handleSignUp = async (e) => {
        e.preventDefault()
        const isValid = validation()
        if (!isValid) return
        try {
            setLoading(true)
            const resp = await toast.promise(
                api.get('/'),
                {
                    pending: "connecting to server",
                    success: `server connected`,
                    error: "server doesn't connected"
                }
            )
            const response = await toast.promise(
                api.post('/register', { username: user.username, email: user.email, password: user.password }, {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true
                }
                ),
                {
                    pending: "Creating Your Account!",
                    success: `User Created Successfully with Username {user.username}`,
                    error: "Unable to create Account, Try Again Later!"
                }
            )
            console.log(response.data)
            if (response.data.success) {
                toast.success("Check your Email to verify the account!")
                const data = {
                    username: response.username,
                    email: response.email
                }
                updateUser(data)
            }
            else { 
                toast.error(response.data.error) 
            }
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error.response.data.message)
        } finally {
            setLoading(false);
        }

    }
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
                <p className="text-sm mt-4 text-purple-400">An account allows users to enjoy all the services without any ads for free! So lets create one</p>
                <form className='flex flex-col gap-4 mt-4' onSubmit={handleSignUp}>
                    <div className="relative  mt-1">
                        <input
                            type="text"
                            id="username"
                            name="username"
                            className="block px-2.5 pb-2.5 pt-2.5 w-full text-sm bg-transparent rounded-lg border-2 border-gray-400 appearance-none text-white hover:border-zinc-200 hover:shadow-sm hover:shadow-slate-200 group  focus:outline-none focus:ring-0 focus:border-purple-600 peer focus:hover:shadow-purple-500 "
                            placeholder="Username"
                            value={user.username}
                            onChange={handleChange}
                            // minLength={3}
                            required
                        />
                        <label
                            htmlFor="username"
                            className="absolute text-sm bg-gray-800 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0]  px-2 peer-focus:px-2 peer-focus:text-purple-600 peer-focus:dark:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 text-white "
                        >
                            Username
                        </label>
                    </div>
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
                            className="icon_button absolute right-4 top-2 cursor-pointer text-white"
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
                    <div className="relative  mt-1">
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            id="confirmPassword"
                            name="confirmPassword"
                            className="block px-2.5 pb-2.5 pt-2.5 w-full text-sm bg-transparent rounded-lg border-2 border-gray-400 appearance-none text-white hover:border-zinc-200 hover:shadow-sm hover:shadow-slate-200 group  focus:outline-none focus:ring-0 focus:border-purple-600 peer focus:hover:shadow-purple-500 "
                            placeholder="Confirm Password"
                            value={user.confirmPassword}
                            onChange={handleChange}
                            // minLength={8}
                            required
                        />
                        <div
                            id='icon_c_password'
                            className="icon_button absolute right-4 top-2 cursor-pointer text-white"
                            onClick={toggleConfirmPassword}
                        >
                            {
                                showConfirmPassword ? <HiEye className="h-8 font-extralight" /> : <HiEyeOff className="h-8 font-extralight" />
                            }
                        </div>
                        <label
                            htmlFor="c_passowrd"
                            className="absolute text-sm bg-gray-800 text-white duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0]  px-2 peer-focus:px-2 peer-focus:text-purple-600 peer-focus:dark:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                        >
                            Confirm Password
                        </label>

                    </div>
                    <button className='text-white bg-purple-600 hover:bg-purple-900 rounded-lg w-32 m-auto py-2 font-semibold hover:scale-105 duration-300' >Sign UP</button>
                </form>

                <LogInWithGoogle/>
            </div>
        </div>
    )
}

export default Signup
