"use client";
import { trpc } from "@/app/_trpc/client";

const Dashboard = () => {
  const {data, isLoading} = trpc.getUserFriends.useQuery();
  console.log("data",data)
  return(
    <div className="flex flex-row justify-between">
      <div className="container">
        
      </div>
      <div className="hidden lg:block min-w-[200px] xl:min-w-[300px] bg-purple-50 h-[calc(100vh-56px)] text-center">
        <p>My Friends</p>
      </div>
    </div>
  )
}
export default Dashboard;