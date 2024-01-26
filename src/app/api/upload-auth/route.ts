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
  const headersList = headers()
  const fileName = headersList.get('inputData')
  return new Promise((resolve, reject) => {
    imagekit.upload({
      file : buffer,
      fileName : fileName,
    }, function(error: any, result: any) {
      if(error) {
        reject(NextResponse.json({ error: error}, { status: 500 }))
      }else{
        resolve(NextResponse.json({ status: 201 }))
      }
    });
  })

  
 
  // return true
}