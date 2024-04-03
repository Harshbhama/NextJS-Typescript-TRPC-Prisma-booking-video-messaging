import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
interface UserProps {
    params: {
      userid: string
    }
  }
  import ChatWrapper from "@/components/Chat";
  const Page = async ({params}: any) => {
    return(
      <ChatWrapper params={params}/>
    )
  }
  export default Page;