"use client"
import { trpc } from "@/app/_trpc/client"
import { UsersInfoForm } from "@/components/UsersInfoForm"
interface UserProps {
  params: {
    userid: string
  }
}
const Page = ({params}: UserProps) => {
  const {data, isLoading} = trpc.getUserWithId.useQuery()
  console.log(data);
  
  return(
      
      <div className="container " >
      <UsersInfoForm />
    </div>
  )
}
export default Page;