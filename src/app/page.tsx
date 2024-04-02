
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/server";
import Counter from "@/components/counter";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <div className="flex flex-col gap-2 md:gap-4 cursor-pointer">
      <LoginLink>Sign in</LoginLink>
      <RegisterLink>Register</RegisterLink>
    </div>
      
      {/* <Counter /> */}
    </main>
  )
}
