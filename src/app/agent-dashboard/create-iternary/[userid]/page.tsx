"use client"
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  Textarea,
  
} from "@material-tailwind/react";
import { useState } from "react";
import FileUpload from "@/components/FileUpload";
import { useRouter } from 'next/navigation'
interface InputProps {
    title: string,
    description: string
}
interface UserProps {
  params: {
    userid: string
  }
}
const CreateIternary = ({params}: UserProps) => {
    const [images, setImages] = useState<any>("");
    const [formValues, setFormValues] = useState<InputProps>({
        title: "",
        description: ""
    })
    const router = useRouter()
    const {mutate} = useMutation({ // Using React Query approach
      mutationFn: async () => {
        const formData = new FormData()
        formData.append('file', images);
        formData.append('fileName', images.name);
        const response = await axios('http://localhost:4000/iternary/addIternary', {
          method: 'POST',
          data:  formData,
          headers: {
            "Content-Type": "multipart/form-data",
            images: (images?.name),
            userid: params?.userid,
            textProps: JSON.stringify({
              title: formValues?.title,
              description: formValues?.description
            })
          },
        })
        // if(!response.ok){
        //   throw new Error("Failed to send messsage")
        // }
        return response
      },
      onError: (error, variables, context) => {
        // An error happened!
        console.log(error)
      },
      onSuccess: (data: any, variables, context) => {
        console.log(data)
        if(!data?.error){
          router.push('/agent-dashboard')

        }
        // Boom baby!
        //utils.getUserWithId.invalidate()
      },
    })
    return(
        <Card color="transparent" shadow={false} className=" flex-wrap items-center  pt-10">
        <Typography color="gray" className="mt-1 font-normal">
          Add new iternary details
        </Typography>
        <form className="mt-8 mb-2 w-[500px] px-10  items-center">
          <div className="mb-1 flex flex-col gap-6 ">
            <Typography variant="h6" color="blue-gray" className="-mb-3 whitespace-nowrap">
              Title
            </Typography>
            <Input
              size="lg"
              placeholder="title"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              crossOrigin={'input'}
              value={formValues?.title}
              onChange={(e) => setFormValues({
                ...formValues, title: e.target.value
              })}
              autoFocus
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3 whitespace-nowrap">
              Description
            </Typography>
            <Textarea
              size="lg"
              placeholder="description"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={formValues?.description}
              onChange={(e) => setFormValues({
                ...formValues, description: e.target.value
              })}
            />

            <div className="flex flex-row gap-5">
                <FileUpload fileProps={{name: "Upload iterany images !", className: "bg-[#6495ed] rounded-[28px] "}} setFile={setImages}/>{images && <p>{images?.name}</p>}
            </div>
            {/* <Button onClick={onSubmit} className="w-1/2 m-auto ">Submit</Button> */}
          </div>
          <Button className=" m-auto block mt-5" onClick={() => mutate()}>Submit</Button>
        </form>
      </Card>
    )
}
export default CreateIternary;