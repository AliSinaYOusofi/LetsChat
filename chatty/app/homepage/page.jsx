import MainLogin from "@/components/MainPage/MainLogin";
import Navbar from "@/components/Navbar/Navbar";
import Rooms from "@/components/Rooms/Rooms";
import Sidebar from "@/components/Sidebar/Sidebar";

export default function page() {
  return (
   <>
   <Navbar />
   <div className="w-full h-full">
      <Rooms />
   </div>
   </>
  )
}
