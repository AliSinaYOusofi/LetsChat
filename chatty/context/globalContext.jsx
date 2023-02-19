"use client";

import { useContext, createContext, useState } from "react";

export const chatContext = createContext({});

export const Chatty = ({children}) => {

    const [showToast, setShowToast] = useState(false);

    return (
        <chatContext.Provider value={{showToast, setShowToast}}>
            {children}
        </chatContext.Provider>
    );
}

export const useChatProvider = () => useContext(chatContext);