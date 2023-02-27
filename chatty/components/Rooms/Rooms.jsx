import React from 'react'

export default function Rooms() {
  return (
    <div className="rounded-sm ring-1 ring-gray-100 w-[17rem] p-2 gap-y-4 flex flex-col">
        <h1 className="text-lg font-bold tracking-wider"> Available Rooms </h1>
        <div className="rounded-md flex justify-between items-center transition-all duration-300 hover:bg-gray-100 p-2 cursor-pointer">
          <p> Genral </p> 
          <p className="rounded-full px-2 text-center bg-blue-400">1</p>
        </div>
        <div className="rounded-md flex justify-between transition-all duration-300 hover:bg-gray-100 p-2 cursor-pointer">
          <span> Technology </span> 
          <span className="rounded-full px-2 text-center bg-blue-400">1</span>
        </div>
        <div className="rounded-md flex justify-between transition-all duration-300 hover:bg-gray-100 p-2 cursor-pointer">
          <span> Programming </span> 
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
