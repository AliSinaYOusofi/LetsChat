import Link from "next/link";

export default function MainLogin () {
    return (
        <>
        <div className="flex items-center min-h-screen bg-gray-50 shadow-sm shadow-black">
            <div className="flex-1 h-full max-w-4xl mx-auto bg-white rounded-lg shadow-xl">
                <div className="flex flex-col md:flex-row">
                    <div className="h-32 md:h-auto md:w-1/2">
                        <img className="object-cover w-full h-full" src="https://source.unsplash.com/user/erondu/1600x900"
                            alt="img" />
                    </div>
                    <div className="flex items-center justify-center p-6 sm:p-12 md:w-1/2 gap-y-10">
                        <div className="w-full gap-y-10">
                            <div className="flex justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-12 h-12">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" />
                                </svg>

                            </div>
                            <h1 className="mb-4 text-2xl font-bold text-center text-gray-700">
                                Login to Your Account
                            </h1>
                            <div>
                                <label className="block text-sm mb-2">
                                    Email
                                </label>
                                <input type="email"
                                    className="w-full px-4 py-2 text-sm  rounded-md border border-black"
                                    placeholder="Email" />
                            </div>
                            <div className="">
                                <label className="block mt-4 text-sm mb-2">
                                    Password
                                </label>
                                <input
                                    className="w-full px-4 py-2 text-sm  rounded-md border border-black"
                                    placeholder="Password" type="password" />
                            </div>
                            <p class="mt-4">
                                <Link className="text-sm text-blue-600 hover:underline" href="./forgot-password.html">
                                    Forgot your password?
                                </Link>
                            </p>
                            <p>
                                <Link className="text-sm text-blue-600 hover:underline" href={"/singup"}>
                                    Create Account
                                </Link>
                            </p>
                            <button
                                className="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-lg active:bg-blue-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
                                href="#">
                                Log in
                            </button>
                            <hr className="my-8" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}