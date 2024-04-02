'use client'
import {
	Button
} from "@material-tailwind/react";
import CreateIternary from "@/app/agent-dashboard/create-iternary/[userid]/page";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import Image from "next/image";
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
  const IternariesData = ({iter}: any) => {
    return (
      <div className="max-w-[350px] rounded-md w-1/3 relative cursor-pointer">
        <Image src={iter?.images[0]} width={1000} height={1000} alt="alt" className="absolute rounded-md" />
        <div className=" p-6 relative">
          {iter?.title && <h2 className=" text-3xl font-bold text-white pb-5">{iter?.title}</h2>}
          {iter?.description && <p className=" text-lg font-medium text-white pl-2">{iter?.description}</p>}
        </div>
      </div>
    )
  }

  return(
    <div className="flex flex-row justify-between">
      <div className="container h-[90vh] mt-10 overflow-auto pb-5">
        <div className="flex flex-row gap-10 items-center">
          <p className="text-[35px]">Current Iternaries</p>
          <Link href = {`/agent-dashboard/create-iternary/${user.id}`}><Button>Create new Iternaries</Button></Link>
        </div>
        <div className="flex pt-10 gap-[50px]">
          {iternaryData?.map((iter: any, index: number) => {
              return (
                <IternariesData iter={iter} key={index}/>
              )
          })}
        </div>
        
      </div>
    </div>
  )
}
export default AgentDashboard;