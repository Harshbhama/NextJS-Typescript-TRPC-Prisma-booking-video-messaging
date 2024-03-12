import AgentDashboard from "@/components/AgentDashboard";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const Page = async () => {
  const { getUser } = getKindeServerSession();  
  const user: any = await getUser();

  return(
   <AgentDashboard user={user}/>
  )
}
export default Page;