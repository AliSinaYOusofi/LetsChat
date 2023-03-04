import axios from 'axios';
import React from 'react'

export async function getData() {
    try {
        const response = await axios.get("http://localhost:3001/messages");
        return await response.data.messages;
    } catch (error) {
        
    }
}
export default async function ChatMain() {

    const messages = await getData();
    return (
        <div className="w-screen h-screen overflow-scroll border-1 bg-black/10 m-4 rounded-md">
            
        </div>
    );
}
