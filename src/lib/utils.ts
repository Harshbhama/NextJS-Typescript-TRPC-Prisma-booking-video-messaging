import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { rawDataType, tableHead } from "./types";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const onUploadSnap = (ref: any) => {
  ref.current.click()
}
export const makeUsersTableData = (rawData: rawDataType [] | undefined) => {
  let tableHead: tableHead [] = []
  rawData!.forEach((tableData, index) => {
    tableHead.push({
      name: tableData?.firstName + " " + tableData?.lastName,
      email: tableData?.email,
      img: tableData?.profilePic,
      online: true,
      friendsId: tableData?.id
    })
  })
  return tableHead;
}
export const checkForCurrentChatFriend = (data: any, userId: string) => {
  let nData = data.find(x => x?.f_id === userId)
  return nData;
}