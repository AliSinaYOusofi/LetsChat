import { useContext, createContext } from "react";

export const chatContext = createContext({});

export const Chatty = ({children}) => {
    return (
        <chatContext.Provider>
            {children}
        </chatContext.Provider>
    );
}

export const useChatProvider = () => useContext(chatContext);