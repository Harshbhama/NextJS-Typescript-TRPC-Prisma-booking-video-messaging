import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";

export function UsersInfoForm() {
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

          <Button className="w-1/2 m-auto">Upload profile pic</Button>
        </div>
      
       
      </form>
    </Card>
  );
}
