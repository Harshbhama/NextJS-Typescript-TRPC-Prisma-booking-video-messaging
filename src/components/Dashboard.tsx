"use client";
import { trpc } from "@/app/_trpc/client";
import InnerDashboard from "./InnerDashboard";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/dist/types";
const Dashboard = ({user}: KindeUser | any) => {
  
  return(
    <div className="flex flex-row justify-between">
      <div className="container h-[90vh] mt-10 overflow-auto pb-5">
        <InnerDashboard user={user}/>
      </div>
    </div>
  )
}
export default Dashboard;