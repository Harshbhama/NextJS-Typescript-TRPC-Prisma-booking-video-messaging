"use client"
import { trpc } from "@/app/_trpc/client";
import { Button } from "@material-tailwind/react";
import { SortableTable } from "./UsersTable";
const InnerDashboard = () => {

  return (
    <div className="">
      {/* <h2 className=" text-xl font-medium">All Users</h2> */}
      <SortableTable />
    </div>
  );
}
export default InnerDashboard;