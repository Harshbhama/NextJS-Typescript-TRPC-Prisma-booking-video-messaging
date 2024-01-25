"use client"
import { trpc } from "@/app/_trpc/client";

const InnerDashboard = () => {
  const {data: allData, isLoading: allLoading} = trpc.getAllUsers.useQuery();
  console.log("allData",allData)
  return (
    <div>
      <h2 className=" text-xl font-medium">All Users</h2>
      
    </div>
  );
}
export default InnerDashboard;