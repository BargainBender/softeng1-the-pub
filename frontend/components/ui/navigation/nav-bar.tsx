"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

import { LogOut, Settings, User, Bell, Heart, Bookmark } from "lucide-react";

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

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "../button";
import { Avatar, AvatarImage, AvatarFallback } from "../avatar";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";

const userId = 1;

export default function NavigationMenuBar() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);

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
              {isLoggedIn && (
                <NavigationMenuItem>
                  <Dialog>
                    <DialogTrigger className="text-pub-darker">
                      Write
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[350px] sm:max-h-[450px]">
                      <DialogHeader>
                        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                          Share your insights!{" "}
                        </h4>
                      </DialogHeader>
                      <DialogDescription>
                        Choose between writing an Article or posting a Thread.
                      </DialogDescription>
                      <div className="flex flex-row items-center justify-center space-x-5">
                        <div className="space-x-2">
                          <Link href={`/users/${userId}/create`}>
                            <Button variant={"pub"}>Article</Button>
                          </Link>
                        </div>
                        <div className="space-x-2">
                          <AlertDialog>
                            <AlertDialogTrigger>
                              <Button variant={"pub"}>Thread</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="sm:max-w-[550px] sm:max-h-[450px]">
                              <AlertDialogTitle>
                                Share a Thread!
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                This is a standalone thread that will allow you
                                to share your thoughts!
                              </AlertDialogDescription>


                              

                              <AlertDialogFooter>
                                <AlertDialogCancel className="hover:bg-red-500 hover:text-white">Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => {
                                    // Async function that creates a Thread.
                                    location.reload();
                                  }}
                                className="hover:bg-pub hover:text-white">
                                  Submit
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </NavigationMenuItem>
              )}
              {!isLoggedIn && (
                <NavigationMenuItem>
                  <Link href={"/sign-in"}>
                    <Button variant={"default"}>Sign In</Button>
                  </Link>
                </NavigationMenuItem>
              )}
              {isLoggedIn && (
                <NavigationMenuItem>
                  <Bell color="grey" strokeWidth={"2"} />
                </NavigationMenuItem>
              )}

              {isLoggedIn && (
                <NavigationMenuItem>
                  <Dialog>
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
                            <p className="text-sm font-normal leading-none">
                              @heyitsjace
                            </p>
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
                            <Link href={"/"}>
                              <span>Settings</span>
                            </Link>
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <LogOut className="mr-2 h-4 w-4" />
                          <DialogTrigger className="flex w-full items-start justify-start">
                            Logout
                          </DialogTrigger>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <DialogContent className="sm:max-w-[600px] sm:max-h-[450px]">
                      <DialogHeader>
                        <DialogTitle>Logout</DialogTitle>
                        <DialogDescription>
                          Are you sure you want to logout?
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Link href={"/"}>
                          <Button
                            variant="destructive"
                            onClick={() => {
                              // Async function that logouts User.
                              location.reload();
                            }}
                          >
                            Confirm
                          </Button>
                        </Link>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </NavigationMenuItem>
              )}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </>
  );
}
