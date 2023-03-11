"use client";

import { emailValidator } from "@/validators/emailValidator";
import { passwordValidator } from "@/validators/passwordValidator";
import axios from "axios";
import Link from "next/link";
import { useRef, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function MainLogin () {

    const [password, setPassword] = useState(null);
    const [email, setEmail] = useState(null);
    const [hide, setHide] = useState(null);
    const passwordRef = useRef(null);

    const showPassword = () => {
        
        setHide(prev => !prev);
        
        if (passwordRef.current) {
            if (passwordRef.current.type === "password")
                passwordRef.current.type = "text";
            else
                passwordRef.current.type = "password";
        }
    }

    const handleLogin = async () => {
        if (! emailValidator(email)) return toast.error("invalid email provided.");
        else if (! passwordValidator(password))  return toast.error("please provide a password.");

        // sending to backend
        try {
            const response = await axios.post("http://localhost:5000/user/login", {email, password});
            console.log(response.data.message);
        } catch (error) {
            console.log("Error While checking user creds: %s", error);
            console.log("Error in Login Comp")
        }
    }

    return (
        <>
        <div className="flex items-center min-h-screen bg-gray-50 shadow-sm shadow-black">
            <div className="flex-1 h-full max-w-4xl mx-auto bg-white rounded-lg shadow-xl">
                <div className="flex flex-col md:flex-row rounded-md">
                    <div className="h-full w-full md:h-auto md:w-1/2 bg-indigo-500 flex items-center justify-center flex-col">
                        <h1 className="text-white font-bold text-4xl font-sans">LetsChat</h1>
                        <p className="text-white mt-1">The most popular Chat Web Application</p>
                        <button type="submit" className="block w-28 bg-white text-indigo-800 mt-4 py-2 rounded-2xl font-bold mb-2">Read More</button>
                    </div>
                    <div className="flex items-center justify-center p-6 sm:p-12 md:w-1/2 gap-y-10">
                        <div className="w-full gap-y-10">
                            <div className="flex justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-12 h-12 bg-indigo-600 text-white rounded-full p-2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" />
                                </svg>
                            </div>
                            <h1 className="mb-4 text-2xl font-bold text-center text-gray-700">
                                Login to Your Account
                            </h1>
                            <div>
                                <input type="email"
                                    className="w-full px-4 py-2 text-sm border-none outline-none bg-gray-100"
                                    placeholder="Email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    required={true}
                                />
                            </div>
                            <div className="mt-4 flex relative items-center">
                                <input
                                    className="w-full px-4 py-2 border-none outline-none bg-gray-100"
                                    placeholder="Password" 
                                    type="password"
                                    ref={passwordRef}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required={true}
                                />
                                <div className="flex items-center hover:cursor-pointer" onClick={showPassword}>
                                    {
                                        hide
                                        ?

                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 absolute right-2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                        </svg>
                                        :
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 absolute right-2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>

                                }
                                </div>
                            </div>
                            <p class="mt-4">
                                <Link className="text-sm text-blue-600 hover:underline" href="./forgot-password.html">
                                    Forgot your password?
                                </Link>
                            </p>
                            <p>
                                <Link className="text-sm text-blue-600 hover:underline" href={"/signup"}>
                                    Create Account
                                </Link>
                            </p>
                            <button
                                className="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-lg active:bg-blue-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
                                href="#"
                                onClick={handleLogin}
                                >
                                Log in
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <ToastContainer />
        </>
    )
}