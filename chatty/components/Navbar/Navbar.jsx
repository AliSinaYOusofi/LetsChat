import React from 'react'

export default function Navbar() {
  return (

    <nav className="bg-gray-200 border-gray-200 px-2 sm:px-4 py-2.5 rounded ">
        <div className="container flex flex-wrap items-center justify-between mx-auto">
        <a href="https://flowbite.com/" className="flex items-center">
            <img src="https://flowbite.com/docs/images/logo.svg" className="h-6 mr-3 sm:h-9" alt="Flowbite Logo" />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
        </a>
            <div className="flex items-center md:order-2">
                <button type="button" className="flex mr-3 text-sm bg-gray-300 rounded-full md:mr-0 ring-1">
                    <img className="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-3.jpg" alt="photo" />
                </button>
            </div>
        </div>
    </nav>
  )
}
