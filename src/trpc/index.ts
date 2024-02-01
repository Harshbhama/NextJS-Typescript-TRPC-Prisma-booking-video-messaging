import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { privateProcedure, publicProcedure, router } from "./trpc";
import { TRPCError } from "@trpc/server";
import { db } from "@/db";
import { z } from "zod";
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
    const {userId, user} = ctx;

    return await db.user.findMany({
      where : {
        NOT: {
          id: userId
        }
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

  getUserFriends: privateProcedure.query(async ({ctx}) => {
    const {userId, user} = ctx;
    // return await db.$queryRaw`Select "user".id, email, "firstName", "lastName", json_agg(friends_id) as friends_id from "user"
    // Inner Join friends
    // on "user".id = friends.user_id
    // Group By "user".id
    // Having "user".id=${userId}`
    return await db.user.findMany({
      where: {
        id: userId
      },
      include: {
        Friends: true
      }
    })
  }),
  sendFriendRequest: privateProcedure.input(z.object({friendsId: z.string()})).mutation(async ({ctx, input}) => {
    const {userId, user} = ctx;
    let checkForExisting: [] = await db.$queryRaw`Select public.user.id, friend_requests.friends_request_id from public.user 
    left join friend_requests
    on public.user.id = friend_requests."userId"
    where public.user.id = ${userId} and friends_request_id = ${input.friendsId}`
    if(!!checkForExisting?.length){
      // throw new TRPCError({code: "NOT_FOUND"})
      return {status: 'Request already sent' as const}
    }
    try{ 
      let createRequest = await db.friend_requests.create({
        data: {
         userId: userId,
         friendsRequestId: input.friendsId
        }
      })
      return {status: 'Request sent successfully' as const, msg: createRequest}
    } catch(err){
      throw new TRPCError({code: "INTERNAL_SERVER_ERROR"})
    }
   
  })


  // More procedures here
});
export type AppRouter = typeof appRouter;