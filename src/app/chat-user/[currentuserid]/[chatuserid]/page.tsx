"use client"
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
// import { useMutation } from "@tanstack/react-query";
import { useMutation } from '@tanstack/react-query';
import { createChatTransaction } from '@/lib/chatApi';
interface UserProps {
    params: {
      userid: string
    }
  }
  import ChatWrapper from "@/components/Chat";
import { useEffect, useState } from 'react';
  const Page = ({params}: any) => {
    const [roomDetails, setRoomDetails] = useState<any>({});
    const {mutate: createChat} = useMutation({ // Using React Query approach
      mutationFn: async (params: any) => {
        const response = await createChatTransaction(params);
        return response;
      },
      onError: (error, variables, context) => {
        console.log(error)
      },
      onSuccess: (data: any, variables, context) => {
        setRoomDetails({
          unique_table_transaction: data?.data?.data?.[0]?.unique_table_transaction,
          roomNo: data?.data?.data?.[0]?.room_no
        })
      },
    })
    useEffect(() => {
      createChat(params);
    },[])
    return(
      <>
        {roomDetails?.roomNo && <ChatWrapper params={params} roomNo={roomDetails?.roomNo} tableTransactionId = {roomDetails?.unique_table_transaction}/>}
      </>
      
    )
  }
  export default Page;