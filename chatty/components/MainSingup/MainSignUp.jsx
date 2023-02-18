"use client";

import Link from 'next/link';
import React, { useRef, useState } from 'react';

import {useRouter} from 'next/navigation';

import axios from 'axios';
import { useChatProvider } from '../../context/globalContext';
import { usernameValidator } from '@/validators/usernameValidator';
import { emailValidator } from '@/validators/emailValidator';
import { passwordValidator } from '@/validators/passwordValidator';
import Toast from '../ToastMessages/Toast';
import {ReactComponent as error} from '../../public/error-svgrepo-com.svg'

export default function MainSignUp() {

    const {token} = useChatProvider();
    const router = useRouter();
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
   
    const [imageClicked, setImageClicked] = useState(false);
    
    let imageFileRef = useRef(null);
    const [imageDetails, setImageDetails] = useState({});
    
    const handleSubmit = async (e) => {
        
        e.preventDefault();

        let isValid = false;

        if (!usernameValidator(username) && username) toast.error("user name can't have spaces", {duration: 2000});
        
        else if (password && confirmPassword) {
            if (! passwordValidator(password) || ! passwordValidator(confirmPassword)) toast.error("invalid password, 1 uppercase, one number and length >= 8");
            else if(password !== confirmPassword) toast.error("passwords don't match", { duration: 2000});
            else isValid = true;
        }
        else if(password && ! confirmPassword)  toast.error("please provide a confirm password.");
        
        else if(!password && confirmPassword)  toast.error("please provide a password.");
        
        else if(! confirmPassword && ! password && !username && ! bio && ! place && ! university && ! jobTitle && ! imageClicked) return toast.error("firt make some changes then click");
        
        else if(! checkImageDetailsBeforSubmit() && imageClicked)  toast.error("image invalid. try different image")
        
        else if(bio.length >= 200 && bio)  toast.error("Bio can't be more than 200 characters.");
        
        else isValid = true;

        if(!isValid) return;

        // uploading our image and getting the secure url to it.
        let profileUrl = isValid && imageClicked && imageDetails ? await saveImageReturnSecureURL() : null;

        // this data will be sent to back-end
        const dataToSend = {
            token,
            username: username || null,
            password: password || null,
            visibility: visibility || null,
            place: place || null,
            bio,
            university: university || null,
            profileUrl,
            jobTitle
        }
        
        try {
            const response = await axios.post("/api/update_profile", {
               dataToSend
            });
            const {message} = await response.data

            if (message === "updated") {
                
                toast.success("you profile has been updated");
                await sleep(1000);
                router.refresh();
            }
            else if(message === "queryError") toast.error("503 internal server error.");
        }catch(error) {
            console.log(error);
        }
    }

    // image uploader function
    const saveImageReturnSecureURL = async () => {
        let secur_url;
        try {
            const imageFile = new FormData();
            imageFile.append("file", imageFileRef.current?.files[0]);
            imageFile.append("upload_preset", "xvmh6gbo");
    
            const response = await axios.post("https://api.cloudinary.com/v1_1/dudhf0avt/image/upload", imageFile);
            secur_url = await response.data.secure_url;
        }catch(error) { console.log(error);}

        return secur_url;
    }

    const checkImageDetailsBeforSubmit = () => {
        
        setImageDetails(imageFileRef.current?.files[0]);
        setImageClicked(true);

        let flag = false;
        let allowedTypes = [ 'jpeg', 'jpg', 'svg', 'gif', 'png'];
        
        if (imageFileRef.current?.files[0] && imageClicked) {

            if (imageFileRef.current?.files[0].type.split("/")[0].toLowerCase() !== "image" && imageClicked) toast.error("please selecte an image only. here")
    
            else if (!allowedTypes.includes(imageFileRef?.current?.files[0]?.type.split("/")[1].toLowerCase()) && imageClicked) toast.error("Allowed image types: png, jepg, jpg, gif, svg");
            
            else if (imageFileRef.current?.files[0].size / 1000000 >= 6 && imageClicked) toast.error("image size can't more than 8 MBs");
            
            else flag = true;
        }
        return flag;
    }
    
    return (
        <>  
            <div className="h-screen md:flex">
                <div
                    className="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr from-blue-800 to-purple-700 i justify-around items-center hidden">
                    <div>
                        <h1 className="text-white font-bold text-4xl font-sans">LetsChat</h1>
                        <p className="text-white mt-1">The most popular Chat Web Application</p>
                        <button type="submit" className="block w-28 bg-white text-indigo-800 mt-4 py-2 rounded-2xl font-bold mb-2">Read More</button>
                    </div>
                    <div className="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
                    <div className="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
                    <div className="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
                    <div className="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
                </div>
                <div className="flex md:w-1/2 justify-center py-10 items-center bg-white">
                    <form className="bg-white">
                        <h1 className="text-gray-800 font-bold text-2xl mb-1">Create An Account</h1>
                        <p> </p>
                        <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
                                fill="currentColor">
                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                    clipRule="evenodd" />
                            </svg>
                            <input className="pl-2 outline-none border-none" type="text" name="" id="" placeholder="Full name" onChange={(e) => setFullName(e.target.value)}/>
                        </div>
                        <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" stroke-width="2"
                                    d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                            </svg>
                            <input className="pl-2 outline-none border-none" type="text" name="" id="" placeholder="Username" onChange={(e) => setUsername(e.target.value)}/>
                        </div>
                        <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                            </svg>
                            <input className="pl-2 outline-none border-none" type="text" name="" id="" placeholder="Email Address" onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
                                fill="currentColor">
                                <path fillRule="evenodd"
                                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                    clipRule="evenodd" />
                            </svg>
                            <input className="pl-2 outline-none border-none" type="text" name="" id="" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                        <div className="flex items-center border-2 py-2 px-3 rounded-2xl mt-3">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 text-gray-400">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                            </svg>
                            <input className=" w-full text-sm text-gray-400  ml-2" id="file_input" type="file" placeholder='Select Profile Image' onChange={(e) => setImageDetails(e.target.value)}/>
                        </div>
                        <Link href={"/"}>
                            <button type="submit" onSubmit={handleSubmit} className="block w-full bg-indigo-400 transition-all duration-300 hover:bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2">Create Account</button>
                            <span className="text-sm ml-2 hover:text-blue-500 cursor-pointer">Forgot Password ?</span>
                        </Link>
                    </form>
                </div>
            </div>
       </>
    )
}