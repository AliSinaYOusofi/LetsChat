import { useEffect, useRef } from "react";

export default function Toast({message, type, timeout}) {

    let toastRef = useRef(null);

    let color;
    
    if (type === "error")
        color = "bg-red-500";
    else if (type === "information")
        color = "bg-blue-500"
    else if (type === "success")
        color = "bg-green-500";

    useEffect( () => {
        const dismissToast = () => {
            if (toastRef) toastRef.current.style.display = "none";
        }
        setTimeout(dismissToast, timeout);
    }, [])
    
    return (
        <div ref={toastRef} id="toast-simple" className="absolute top-10 right-10 flex items-center w-full max-w-xs p-4 space-x-4 text-gray-600 bg-white divide-x divide-gray-600 rounded-lg shadow-black/30 shadow" role="alert">
            <p className={`${color} px-3 py-2 rounded-md`}> {type}</p>
            <div className="pl-4 text-sm font-normal text-black">{message}</div>
        </div>
    );
}