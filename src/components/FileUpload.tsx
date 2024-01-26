import React, { useRef } from "react";
import {
	Button
} from "@material-tailwind/react";
import { onUploadSnap } from "@/lib/utils";
interface UsersUpload {
  fileProps: {
    name: String,
    className: string
  }
  setFile: any
}

const FileUpload: React.FC<UsersUpload> = ({fileProps, setFile}) => {
  const ref = useRef(null);
  const handleChange = (event: any) => {
    console.log(event.target.files[0])
    setFile(event.target.files[0])
  }
  return (
    <>
      <Button onClick={() => onUploadSnap(ref)} className={fileProps?.className}> {fileProps?.name}</Button>
      <input ref={ref} type="file" className="hidden" onChange={handleChange} />
    </>
  )
}
export default FileUpload;