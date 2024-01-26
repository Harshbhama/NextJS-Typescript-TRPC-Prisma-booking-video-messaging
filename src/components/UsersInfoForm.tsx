import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import FileUpload from "./FileUpload";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
export function UsersInfoForm() {
  const [file, setFile] = useState<any>("");
  const [inputProps, setInput] = useState({
    description: "",
    title: ""
  })

  const {mutate} = useMutation({ // Using React Query approach
    mutationFn: async ({data}: any) => {
      const response = await fetch('/api/upload-auth', {
        method: 'POST',
        body:  file,
        headers: {
          "Content-Type": "multipart/form-data",
          inputData: JSON.stringify(file?.name)
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
      console.log("In success",data)
    },
  })

  const onSubmit = async () => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', file.name);
    if(!file){
      alert("PLease upload file")
    }
    let data = {
      formData: formData ,
      inputProps: inputProps
    }
    await mutate({data});
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
          />
          <div className="flex items-center gap-[15px]">
            <FileUpload fileProps={{name: "Upload Snap !", className: "w-2/4 bg-[#6495ed] rounded-[28px] w-[145px]"}} setFile={setFile}/>
            {file && <p>{file?.name}</p>}
          </div>
          <Button onClick={onSubmit} className="w-1/2 m-auto ">Submit</Button>
        </div>
      
       
      </form>
    </Card>
  );
}
