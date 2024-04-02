"use client"
import { trpc } from "@/app/_trpc/client";
import { Button } from "@material-tailwind/react";
import { SortableTable } from "./UsersTable";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/dist/types";
const InnerDashboard = ({user}: KindeUser | any) => {

  return (
    <div className="">
      {/* <h2 className=" text-xl font-medium">All Users</h2> */}
      <SortableTable user={user}/>
    </div>
  );
}
export default InnerDashboard;