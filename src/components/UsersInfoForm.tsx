"use client"
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import FileUpload from "./FileUpload";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { trpc } from "@/app/_trpc/client";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/dist/types";
import Image from "next/image";
export function UsersInfoForm({userid}: KindeUser | any) {
  const [file, setFile] = useState<any>("");
  const {data: userData, isLoading} = trpc.getUserWithId.useQuery()
  const [firstName, setFirstName] = useState<string|undefined>("")
  const [familyName, setFamilyName] = useState<string|undefined>("")
  const utils = trpc.useContext()

  useEffect(() => {
    setFirstName(userData?.firstName)
    setFamilyName(userData?.lastName)
  },[userData])
  const {mutate} = useMutation({ // Using React Query approach
    mutationFn: async () => {
      const response = await fetch('/api/upload-auth', {
        method: 'POST',
        body:  file,
        headers: {
          "Content-Type": "multipart/form-data",
          inputData: JSON.stringify(file?.name),
          userid: userid,
          textProps: JSON.stringify({
            firstName: firstName,
            familyName: familyName
          })
        },
      })
      if(!response.ok){
        throw new Error("Failed to send messsage")
      }
      return response.body
    },
    onError: (error, variables, context) => {
      // An error happened!
      console.log(error)
    },
    onSuccess: (data, variables, context) => {
      // Boom baby!
      utils.getUserWithId.invalidate()
    },
  })

  const onSubmit = async () => {
    if(!file){
      alert("PLease upload file")
    }
    await mutate();
  }

  

  return (
    <Card color="transparent" shadow={false} className=" flex-wrap items-center  pt-10">
      <Typography color="gray" className="mt-1 font-normal">
        Edit your profile details
      </Typography>
      <form className="mt-8 mb-2 w-[500px] px-10 ">
        <div className="mb-1 flex flex-col gap-6 ">
          <Typography variant="h6" color="blue-gray" className="-mb-3 whitespace-nowrap">
            First Name
          </Typography>
          <Input
            size="lg"
            placeholder="firstname"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            crossOrigin={'input'}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <Typography variant="h6" color="blue-gray" className="-mb-3 whitespace-nowrap">
            Family Name
          </Typography>
          <Input
            size="lg"
            placeholder="familyname"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            crossOrigin={'input'}
            value={familyName}
            onChange={(e) => setFamilyName(e.target.value)}

          />
          <div className="flex items-center gap-[15px]">
           {userData?.profilePic && <Image src={userData?.profilePic!} 
            width={40}
            height={40}
            className="rounded-[20px] h-[40px]"
            alt="Picture of the author"
            />}
            <FileUpload fileProps={{name: "Upload Snap !", className: "w-2/4 bg-[#6495ed] rounded-[28px] w-[145px]"}} setFile={setFile}/>
            {file && <p>{file?.name}</p>}
          </div>
          <Button onClick={onSubmit} className="w-1/2 m-auto ">Submit</Button>
        </div>
      
       
      </form>
    </Card>
  );
}
