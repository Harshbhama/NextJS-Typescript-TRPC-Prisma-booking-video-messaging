"use client";
import { trpc } from "@/app/_trpc/client";
import InnerDashboard from "./InnerDashboard";
const Dashboard = () => {
  const {data, isLoading} = trpc.getUserFriends.useQuery();
  const {data: allData, isLoading: allLoading} = trpc.getAllUsers.useQuery();
  // console.log("data",data)
  // console.log("allData",allData)
  return(
    <div className="flex flex-row justify-between">
      <div className="container">
        <InnerDashboard />
      </div>
      <div className="hidden lg:block min-w-[200px] xl:min-w-[300px] bg-purple-50 h-[calc(100vh-56px)] text-center">
        <p>My Pen Pals</p>
      </div>
    </div>
  )
}
export default Dashboard;