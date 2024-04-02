"use client"
interface UserProps {
    params: {
      userid: string
    }
  }
  import ChatWrapper from "@/components/Chat";
  const Page = ({params}: UserProps) => {
    console.log(params);
    return(
      // <div>Hello</div>
      <ChatWrapper />
    )
  }
  export default Page;