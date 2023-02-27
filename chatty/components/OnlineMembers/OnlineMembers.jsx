"use client";
import React, { useEffect, useState } from 'react'

export default function OnlineMembers() {

    const [onlineMembers, setOnlineMembers] = useState([{}]);
    useEffect( () => {
        // get online members
    }, [])

    return (
        <div className="rounded-sm bo ring-1 ring-gray-100  w-[17rem] p-2 gap-y-4 flex flex-col mt-2">
            <h1 className="font-bold"> Online Members {onlineMembers.length}</h1>
            <div className="rounded-md flex justify-between items-center transition-all duration-300 hover:bg-gray-100 p-2 cursor-pointer">
            <p> Ali Sina </p> 
            <p className="rounded-full px-2 text-center bg-blue-400">1</p>
            </div>
            <div className="rounded-md flex justify-between transition-all duration-300 hover:bg-gray-100 p-2 cursor-pointer">
            <span> Ali Sina </span> 
            <span className="rounded-full px-2 text-center bg-blue-400">1</span>
            </div>
            <div className="rounded-md flex justify-between transition-all duration-300 hover:bg-gray-100 p-2 cursor-pointer">
            <span> Ali Sina </span> 
            <span className="rounded-full px-2 text-center bg-blue-400">1</span>
            </div>
            <div className="rounded-md flex justify-between transition-all duration-300 hover:bg-gray-100 p-2 cursor-pointer">
            <span> Elon Musk </span> 
            <span className="rounded-full px-2 text-center bg-blue-400">1</span>
            </div>
            <div className="rounded-md flex justify-between transition-all duration-300 hover:bg-gray-100 p-2 cursor-pointer">
            <span> SpaceX </span> 
            <span className="rounded-full px-2 text-center bg-blue-400">1</span>
            </div>
        </div>
    )
}
