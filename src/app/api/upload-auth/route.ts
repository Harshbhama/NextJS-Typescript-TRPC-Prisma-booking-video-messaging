import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { headers } from 'next/headers'

const ImageKit = require('imagekit');
var imagekit = new ImageKit({
  publicKey : "public_FjTn7gJOwJL+EwbbEjyv12vxnc4=",
  privateKey : "private_a+rr3kLMi9Cpa+ml5yX5nrU7TXY=",
  urlEndpoint : "https://ik.imagekit.io/agzhv5q78"
});
export const POST = async (req: NextRequest, res: NextResponse) => {
  // end point fot ImageKit Upload authentication
  const blob = await req.blob();
  const arrayBuffer = await blob.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  console.log(buffer)
  const headersList = headers()
  const fileName = headersList.get('inputData')
  const userId: any = headersList.get('userid')
  const textProps: any = JSON.parse(headersList.get('textProps')!)
 
  return new Promise(async (resolve, reject) => {
    imagekit.upload({
      file : buffer,
      fileName : fileName,
    }, async function(error: any, result: any) {
      if(error) {
        reject(NextResponse.json({ error: error}, { status: 500 }))
      }else{

        try{
          await db.user.update({
            where: {
              id: userId
            },
            data: {
              profilePic: result?.url,
              firstName: textProps?.firstName,
              lastName: textProps?.famiyName
            }
          })
        }
        catch(err){
          reject(NextResponse.json({ error: err}, { status: 500 }))

        } 
        resolve(NextResponse.json({ status: 201 }))
      }
    });
  })

  
 
  // return true
}