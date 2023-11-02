"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

import {
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
  Bell,
  Heart,
  Bookmark,
} from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "../button";
import { Avatar, AvatarImage, AvatarFallback } from "../avatar";

export default function NavigationMenuBar() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  return (
    <>
      <div className="shadow-xl flex justify-between items-center px-6 my-3">
        <div className="flex space-x-4 my-2">
          <NavigationMenu className="flex space-x-4">
            <NavigationMenuList className="flex flex-row space-x-4">
              <NavigationMenuItem>
                <Link href={"/"}>The Pub</Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex space-x-4 py-2">
          <NavigationMenu className="flex space-x-4">
            <NavigationMenuList className="flex flex-row space-x-4">
              <NavigationMenuItem>
                <Button variant={"pub"}>Write</Button>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Button variant={"default"}>Sign In</Button>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Bell color="grey" strokeWidth={"2"} />
              </NavigationMenuItem>
              <NavigationMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                      <Avatar>
                        <AvatarImage
                          src="https://github.com/shadcn.png"
                          alt="@shadcn"
                          className="rounded-full"
                        />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>
                      <div className="flex items-center flex-col justify-center">
                      <Avatar>
                        <AvatarImage
                          src="https://github.com/shadcn.png"
                          alt="@shadcn"
                          className="rounded-full"
                        />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
      Jace L. Gonzales
    </h4>
                        <p className="text-sm font-normal leading-none">@heyitsjace</p>
                       
                      </div>
                      <div className="flex flex-row items-center justify-center mx-auto">
    <div className="ml-6">
      <small>281 followers</small>
    </div>
    <div className="flex-grow"></div>
    <div>
      <small className="mr-6">0 following</small>
    </div>
  </div>
                    </DropdownMenuLabel>
                    <DropdownMenuLabel></DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem>
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Heart className="mr-2 h-4 w-4" />
                        <span>Favorites</span>
                        
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Bookmark className="mr-2 h-4 w-4" />
                        <span>Bookmarks</span>
                 
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                 
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </>
  );
}
