import ChatMain from "@/components/Chat/ChatMain";
import Navbar from "@/components/Navbar/Navbar";
import OnlineMembers from "@/components/OnlineMembers/OnlineMembers";
import Rooms from "@/components/Rooms/Rooms";


export default function page() {
  return (
   <>
   <Navbar />
   <div className="w-full h-full flex">
      <div className="flex flex-col ml-4 mt-2">
        <Rooms />
        <OnlineMembers />
      </div>
      <ChatMain />
   </div>
   </>
  )
}
