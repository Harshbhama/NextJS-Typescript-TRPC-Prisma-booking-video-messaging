"use client"
import { trpc } from "@/app/_trpc/client";

export const {mutate: acceptRequestMutation} = trpc.acceptRequests.useMutation({
  onSuccess: (data) => {
    console.log(data)
  },
  onError: (data) => {
    console.log("In Error handler", data);
  }
})