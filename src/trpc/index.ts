import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { privateProcedure, publicProcedure, router } from "./trpc";
import { TRPCError } from "@trpc/server";
import { db } from "@/db";
import { z } from "zod";
import { userType } from "@/lib/types";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/dist/types";
export const appRouter = router({
  authCallback: publicProcedure.query(async () => {
    const { getUser } = getKindeServerSession();
    const user: any = await getUser();
    if (!user.id || !user.email) throw new TRPCError({ code: "UNAUTHORIZED" });
    const dbUser = await db.user.findFirst({
      where: {
        id: user.id
      }
    })
    if(!dbUser){
      // create user in db
      await db.user.create({
        data: {
          id: user.id,
          email: user.email,
          firstName: user.given_name,
          lastName: user.family_name,
          profilePic: ""
        }
      })
    } 
    return {success: true}
  }),

  getAllUsers: privateProcedure.query(async({ctx}) => {
    return new Promise(async (resolve, reject) => {
      try{
        const {userId, user} = ctx;
        const data =  await db.$queryRaw`Select * from public.user where email != ${user?.email}`
        resolve(data)
      }catch(err){
        reject(err)
      }
      
    })
    
  }),

  getUserWithId: privateProcedure.query(async({ctx}) => {
    const {userId, user} = ctx;

    return await db.user.findFirst({
      where : {
         id: userId
      }
    })
  }),

  
  sendFriendRequest: privateProcedure.input(z.object({friendsId: z.string()})).mutation(async ({ctx, input}) => {
    const {userId, user} = ctx;

    // Condition 1
    let checkForExisting: [] = await db.$queryRaw`Select public.user.id, friend_requests.friends_request_id from public.user 
    left join friend_requests
    on public.user.id = friend_requests."userId"
    where public.user.id = ${userId} and friends_request_id = ${input.friendsId}`

    // Condition 2
    let checkForExistingOutgoing: [] = await db.$queryRaw`Select public.user.id, friend_requests.friends_request_id from public.user 
    left join friend_requests
    on public.user.id = friend_requests."userId"
    where public.user.id = ${input.friendsId} and friends_request_id = ${userId}`

    if(!!checkForExisting?.length || !!checkForExistingOutgoing?.length){
      // throw new TRPCError({code: "NOT_FOUND"})
      if(checkForExisting?.length){
        return {error: true, status: 'Request came from this user, please accept it.' as const}
      }else{
        return {error: true, status: 'Request already sent to the user' as const}
      }
      
    }
    try{ 
      let createRequest = await db.friend_requests.create({
        data: {
         userId: input.friendsId,
         friendsRequestId: userId
        }
      })
      return {error: false,status: 'Request sent successfully' as const, msg: createRequest}
    } catch(err){
      throw new TRPCError({code: "INTERNAL_SERVER_ERROR"})
    }
  }),
  getFriendRequest: privateProcedure.query(async ({ctx}) => {
    const {userId, user} = ctx;
    return await db.$queryRaw`Select uu1.id, uu2.email AS user_email, fk.friends_request_id, uu1.email AS email, uu1."firstName" AS "firstName",
    uu1."lastName" AS "lastName", uu1."profilePic" AS "profilePic"
    FROM friend_requests fk
    JOIN public.user AS uu1 ON uu1.id = fk.friends_request_id
    JOIN public.user AS uu2 ON uu2.id = fk."userId"
    where uu2.id = ${userId}`
  }),
  acceptRequests: privateProcedure.input(z.object({friendsId: z.string()})).mutation(async ({ctx, input}) => {
    return new Promise(async (resolve, reject) => {
      const {userId, user} = ctx;
      try{
        await db.$queryRaw`Delete from friend_requests fr 
        where fr."userId" = ${userId} 
        and fr.friends_request_id = ${input.friendsId}`

        await db.friends.create({
          data: {
            userId: userId,
            friendsId: input.friendsId
          }
        })

        resolve({error: false, msg: "Friend request accepeted successfully"})
      }catch(err){
        console.log(err)
        reject({error: true, msg: err})
       
      }
     
      })
  }),

  getFriends: privateProcedure.query(async({ctx}) => {
    const {user, userId} = ctx;
    return await db.$queryRaw`Select f.user_id as current_user, f.friends_id as f_id, uu1.*  FROM friends f 
      JOIN public.user AS uu1 ON uu1.id = f.friends_id
      where  f.user_id = ${userId}
      Union
      Select f.friends_id as current_user, f.user_id as f_id, uu2.* as fr_email FROM friends f 
      JOIN public.user AS uu2 ON uu2.id = f.user_id
      where f.friends_id = ${userId}`
  })

  // More procedures here
});
export type AppRouter = typeof appRouter;