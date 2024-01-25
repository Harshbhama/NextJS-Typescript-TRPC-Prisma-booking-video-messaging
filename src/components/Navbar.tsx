import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { LoginLink, RegisterLink, getKindeServerSession, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/server";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/dist/types";
import { ArrowRight, User, CreditCard, Settings} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu"

const UserMethod = async ({user}: KindeUser|any) => {
 
  return(
    <div>
      <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <User className="cursor-pointer"/>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel className="capitalize flex items-center gap-1 text-[10px]">{user?.given_name} {user?.family_name} | <span className="lowercase ">{user?.email}</span></DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
       
          <DropdownMenuItem className="cursor-pointer">
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
    
        </DropdownMenuGroup>

      </DropdownMenuContent>
    </DropdownMenu>
    </div>
  )
}


const Navbar = async ({}) => {
  const {getUser} = getKindeServerSession();
  const user = await getUser();
  return (
      <nav className="sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
        <div className="container px-32">
          <div className="flex h-14 items-center justify-between border-b border-zinc-200">
            <Link href="/" className="flex z-400 font-semibold">
              <span>Booking Software</span>
            </Link>
            {/* todo: add mobile navbar */}

            <div className="hidden items-center space-x-4 sm:flex">
              <>
                {/* <User className=" cursor-pointer"/> */}
                {/* @ts-expect-error Async Server Component */}
                <UserMethod user={user}/>
               {!user &&  <LoginLink
                  className={buttonVariants({
                    variant: "ghost",
                    size: "sm",
                  })}
                >
                  {" "}
                  Sign in
                </LoginLink>}
                {user && <LogoutLink  className={buttonVariants({
                    variant: "ghost",
                    size: "sm",
                  })}>
                  {" "}
                  Sign out
                </LogoutLink>}
                {!user && <RegisterLink
                  className={buttonVariants({
                    size: "sm",
                  })}
                >
                  {" "}
                  Get Started <ArrowRight className="ml-1.5" />
                </RegisterLink>}
              </>
            </div>
          </div>
        </div>
      </nav>

  );
};
export default Navbar;
