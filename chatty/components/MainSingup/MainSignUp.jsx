"use client";

import Link from 'next/link';
import React, { useRef, useState } from 'react';
// validator funcs

// our router to redirect to /signup with data as query
import {useRouter} from 'next/navigation';

// for toasts notifications
// sleep
import axios from 'axios';
import { useChatProvider } from '../../context/globalContext';

export default function MainSignUp() {

    

    const {token} = useChatProvider();
     // router
    const router = useRouter();
    // for controlled inputs
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    // new filed added to user edit profile
    const [place, setPlace] = useState("");
    const [jobTitle, setJobTitle] = useState("");
    const [bio, setBio] = useState("");
    const [imageClicked, setImageClicked] = useState(false);
    const [university, setUniversity] = useState("");
    // image file
    let imageFileRef = useRef(null);
    // for public or private chceckbox
    const [visibility, setVisibility] = useState(null);
    // for image name update
    const [imageDetails, setImageDetails] = useState({});
    // for routing
    // our refs for our checkboxed
    let publicRef = React.useRef(null);
    let privateRef = React.useRef(null);
    
    const handleSubmit = async (e) => {
        
        toast.loading("updating your credentials"); // show be dismissed when validation is success
        
        e.preventDefault(); // prevent the refresh behaviour
        
        let isValid = false;
        
        // validators are tested and they are working fine
        

        await sleep(2000);
        toast.dismiss();

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

        console.log(isValid, '*************************************************')

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
        
        // todo: upload image to cloudinary and then take the
        // secure url and post set it as state var of image link
        // and finally when that is resolved
        // move to back-end and setup a new schema
        
        // now bundling data to send to back-end
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
        
        // check image type and size before submission
        setImageDetails(imageFileRef.current?.files[0]);
        setImageClicked(true);
        let flag = false;
        let allowedTypes = [ 'jpeg', 'jpg', 'svg', 'gif', 'png'];
        
        // cheching image type and size

        // now another check. which should check that at least one of the
        // fields is changed then we show that the must changed something
        // to be able to submit the form

        if (imageFileRef.current?.files[0] && imageClicked) {

            if (imageFileRef.current?.files[0].type.split("/")[0].toLowerCase() !== "image" && imageClicked) toast.error("please selecte an image only. here")
    
            else if (!allowedTypes.includes(imageFileRef?.current?.files[0]?.type.split("/")[1].toLowerCase()) && imageClicked) toast.error("Allowed image types: png, jepg, jpg, gif, svg");
            
            else if (imageFileRef.current?.files[0].size / 1000000 >= 6 && imageClicked) toast.error("image size can't more than 8 MBs");
            
            else flag = true;
        }
        return flag;
    }
    
    function selectOnlyOneCheckbox(whichOne) {
        let visibiltyIsPublic = true;
        if (publicRef.current && privateRef.current) {
            if(whichOne === "public") {
                privateRef.current.checked = false;
                publicRef.current.checked = true;
            }
            else {
                privateRef.current.checked = !false;
                publicRef.current.checked = !true;
                visibiltyIsPublic = false;
            }
        }
        setVisibility(visibiltyIsPublic);
    }

    return (
        <>
            <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Create Account
            </h1>
                
            <form className="flex md:flex-row flex-col flex-wrap justify-center items-center bg-[#d1d3ce]
            h-full w-[92%] mt-3 rounded-md mx-auto gap-x-14 p-4
            transition-all duration-300 " >
                
                <div className="md:gap-y-10 gap-y-7 flex flex-col w-full md:w-[40%] items-start justify-start
                md:px-0">
                    
                    
                    <div className="w-full">
                        <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 ">Username </label>
                        <input onChange={(e) => setUsername(e.target.value)} type="text" name="username" id="username" placeholder="username e g jhon" className="bg-gray-50 border-none outline-none border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"  />
                    </div>
                    
                    <div className="w-full">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password </label>
                        <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border-none outline-none border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"  />
                    </div>
                    <div className="w-full">
                        <label htmlFor="confirm" className="block mb-2 text-sm font-medium text-gray-900">Confirm password</label>
                        <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" name="confirm" id="confirm" placeholder="••••••••" className="bg-gray-50 border-none outline-none border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "  />
                    </div>
                </div>
                
                <div className="mt-4 md:w-[30%] w-full items-start justify-start">
                    
                    <div className="w-full">
                        <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900">Bio (optional)</label>
                        <textarea id="message" onChange={(e) => setBio(e.target.value)} rows="4" className="border-none outline-none p-2.5 w-full text-sm text-gray-900 rounded-md" placeholder="Write you bio ..." ></textarea>
                    </div>
                    
                </div>
                
                
                <div  className="flex items-center justify-center w-[70%] mx-auto mt-4 group">
                    <label  htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 bg-[#f0f1ed]  rounded-lg cursor-pointer">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400 transition-all duration-300 
                            group-hover:-translate-y-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                            <p className="text-sm text-gray-400">File name: {imageDetails?.name || "NA"} </p>
                            <p className="text-sm text-gray-400">File Size: {imageDetails?.size / 1000000 || "NA"} MB(s)  </p>
                            <p className="text-sm text-gray-400">File Type: {imageDetails?.type?.split("/")[1]  || "NA"} </p>
                            
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF, JPEG are allowed</p>
                        </div>
                        <input onChange={checkImageDetailsBeforSubmit}  ref={imageFileRef} id="dropzone-file" type="file" className="hidden" />
                    </label>
                </div>
                <div className="w-full text-center mt-5 flex items-center justify-center">
                    <button onClick={handleSubmit}  type="button" className="w-fit flex items-center justify-center text-white bg-[#29B6F6] font-medium rounded-lg text-sm px-5 py-2.5 text-center  gap-x-2 group">
                        Create Account
                    <svg className="transition-all duration-150 group-hover:-translate-y-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                    </button> 
                </div>
            </form>
       </>
    )
}