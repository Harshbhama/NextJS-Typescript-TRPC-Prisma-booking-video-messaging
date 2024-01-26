"use client"
import { trpc } from "@/app/_trpc/client";
import { Button } from "@material-tailwind/react";
import { SortableTable } from "./UsersTable";
const InnerDashboard = () => {
  const {data: allData, isLoading: allLoading} = trpc.getAllUsers.useQuery();
  console.log("allData",allData)
  return (
    <div className="">
      {/* <h2 className=" text-xl font-medium">All Users</h2> */}
      <SortableTable />
    </div>
  );
}
export default InnerDashboard;