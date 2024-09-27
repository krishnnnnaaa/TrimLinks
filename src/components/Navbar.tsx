"use client";

import { useSession, signOut } from "next-auth/react";
import React from "react";
import { User } from "next-auth";
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LayoutDashboardIcon, LogOutIcon, Moon, Settings, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";

const Navbar = () => {
  const {setTheme} = useTheme()
  const { data: session } = useSession();
  const user: User = session?.user as User;
  // console.log(user);

  return (
    <div className="dark:bg-black/25 bg-white dark:text-white text-black">
      <div>
        <ul className="flex justify-between items-center p-3 pr-4">
          <li>TrimLinks</li>
          <li>
            {!session ? (
              <Link href={'/signin'}>
              <Button>Sign in</Button>
              </Link>
            ) : (
              <div className="flex items-center space-x-4">
                <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger className="outline-none cursor-pointer">
              <Avatar>
                <AvatarImage
                  className="w-10 h-10 outline-none  bg-white p-[5px] rounded-lg"
                  src="https://img.icons8.com/?size=42&id=fJ7hcfUGpKG7&format=png"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="dark:bg-black mr-4 mt-2">
                  <Link href={'/dashboard'}>
                  <DropdownMenuItem className="cursor-pointer"><LayoutDashboardIcon className="mr-2" size={15}/> Dashboard</DropdownMenuItem>
                  </Link>
                  <Link href={'/settings'}>
                  <DropdownMenuItem className="cursor-pointer"><Settings className="mr-2" size={15}/> Settings</DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem className="cursor-pointer" onClick={()=> signOut()}><LogOutIcon className="mr-2" size={15}/>  Sign out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
