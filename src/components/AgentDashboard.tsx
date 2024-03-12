'use client'
import {
	Button
} from "@material-tailwind/react";
import CreateIternary from "@/app/agent-dashboard/create-iternary/[userid]/page";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
const AgentDashboard: React.FC<any> = ({user}) => {
  const fetchIternary = async () => {
    let data = await axios('http://localhost:4000/iternary/listIternary', {
      method: 'GET',
      headers: {
        userid: user?.id,
      },
    })
    return data;
  }
  // @ts-ignore
  const { data, status } = useQuery(["iternaries"], fetchIternary);
  let iternaryData;
  if(!data?.data?.error){
    iternaryData = data?.data?.data
  }
  console.log("iternaryData",iternaryData)
  return(
    <div className="flex flex-row justify-between">
      <div className="container h-[90vh] mt-10 overflow-auto pb-5">
        <div className="flex flex-row gap-10 items-center">
          <p className="text-[35px]">Current Iternaries</p>
          
          <Link href = {`/agent-dashboard/create-iternary/${user.id}`}><Button>Create new Iternaries</Button></Link>
          {/* <Button>Create New Iternaries</Button> */}
        </div>
        
      </div>
    </div>
  )
}
export default AgentDashboard;