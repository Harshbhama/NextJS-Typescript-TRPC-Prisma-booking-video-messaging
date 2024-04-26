"use client"
import { trpc } from "@/app/_trpc/client"
import { UsersInfoForm } from "@/components/UsersInfoForm"
interface UserProps {
  params: {
    userid: string
  }
}
const Page = ({params}: UserProps) => {
  return(
    <div className="container " >
      <UsersInfoForm userid={params.userid}/>
    </div>
  )
}
export default Page;