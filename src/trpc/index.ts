import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { privateProcedure, publicProcedure, router } from "./trpc";
import { TRPCError } from "@trpc/server";
import { db } from "@/db";
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
          lastName: user.family_name
        }
      })
    } 
    return {success: true}
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
  })
  // More procedures here
});
export type AppRouter = typeof appRouter;