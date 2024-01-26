"use client";
import { trpc } from "@/app/_trpc/client";
import InnerDashboard from "./InnerDashboard";
const Dashboard = () => {
  const {data, isLoading} = trpc.getUserFriends.useQuery();
  const {data: allData, isLoading: allLoading} = trpc.getAllUsers.useQuery();
  console.log("allData",allData)
  return(
    <div className="flex flex-row justify-between">
      <div className="container h-[90vh] mt-10 overflow-auto pb-5">
        <InnerDashboard />
      </div>
    </div>
  )
}
export default Dashboard;