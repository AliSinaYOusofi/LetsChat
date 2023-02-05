export default function MainSingup() {
    
    return (
        <section className=" mt-10">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            
                <div className="w-full rounded-lg   md:mt-0 sm:max-w-md xl:p-0 bg-[#d1d3ce]">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                            Create an account
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
        
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-800">Your email</label>
                                <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" className="bg-gray-50 border-none outline-none  text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5 " placeholder="name@company.com" required />
                            </div>
                            
                            <div>
                                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-800">Userame</label>
                                <input onChange={(e) => setUsername(e.target.value)} type="text" name="username" id="username" placeholder="username e g jhon" className="bg-gray-50 border-none outline-none border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " required />
                            </div>
                            
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-800">Password</label>
                                <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border-none outline-none border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required />
                            </div>
                            
                            <div>
                                <label htmlFor="confirm" className="block mb-2 text-sm font-medium text-gray-800">Confirm password</label>
                                <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" name="confirm" id="confirm" placeholder="••••••••" className="bg-gray-50 border-none outline-none border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required />
                            </div>
                            
                            <div className="flex items-center mr-4 gap-x-10">
                                <p className="text-gray-800">Set account visibilty: </p>
                                <div>
                                    <input ref={publicRef}  onClick={() => selectOnlyOneCheckbox("public")}id="public"  type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" name="check"/>
                                    <label  htmlFor="public" className="ml-2 text-sm font-medium text-gray-900">Public</label>
                                </div>
                                
                                <div>

                                    <input ref={privateRef} onClick={() => selectOnlyOneCheckbox("private")} id="private"  type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" name="check"/>
                                    <label htmlFor="private" className="ml-2 text-sm font-medium text-gray-900">Private</label>
                                
                                </div>
                            </div>
                            
                            <div className="flex items-start">
                                
                                <div className="flex items-center h-5 text-gray-800">
                                    <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 " required />
                                </div>
                                <div className="ml-3 text-sm text-gray-800">
                                    <label htmlFor="terms" className="font-light text-gray-800">I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                                </div>
                            </div>
                            
                            <button  type="submit" className="w-full text-white bg-[#29B6F6] font-medium rounded-lg text-sm px-5 py-2.5 text-center">Create an account</button>
                            <p className="text-sm font-light t">
                                Already have an account? <Link href="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}