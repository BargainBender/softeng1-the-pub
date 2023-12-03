"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from 'next/navigation';

import {
  LogOut,
  Settings,
  User,
  Bell,
  Heart,
  Bookmark,
  CheckCircle,
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

import { toast } from "../use-toast";
import { Textarea } from "../textarea";

import { Button } from "../button";
import { Avatar, AvatarImage, AvatarFallback } from "../avatar";
import Image from "next/image";
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
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface UserData {
  name: string;
  username: string;
  profile_picture: string;
  is_active: boolean;
  followers: number;
  following: number;
  bio: string;
}

interface NavigationMenuBarProps {
  userData: UserData | null;
}

// Writing Threads
// const threadFormSchema = z.object({
//   thread: z
//     .string()
//     .min(2, { message: "Minimum thread is a character" })
//     .max(280, {
//       message: "Maximum number of characters reached",
//     }),
// });

// type ThreadFormValues = z.infer<typeof threadFormSchema>;

// const defaultValues: Partial<ThreadFormValues> = {
//   thread: "",
// };

export default function NavigationMenuBar({ userData }: NavigationMenuBarProps) {
  const followersCount = userData && Array.isArray(userData.followers) ? userData.followers.length : 0;
  const followingCount = userData && Array.isArray(userData.following) ? userData.following.length : 0;
  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  useEffect(() => {
    setIsLoggedIn(!!userData);
  }, [userData]);

  // const form = useForm<ThreadFormValues>({
  //   resolver: zodResolver(threadFormSchema),
  //   defaultValues,
  // });

  // function onSubmit(data: ThreadFormValues) {
  //   console.log(data);
  //   toast({
  //     title: "Your thread has been posted successfully!",
  //     description: (
  //       <div className="flex items-center space-x-2">
  //         <CheckCircle className="mx-2" /> Your post was sent!
  //       </div>
  //     ),
  //   });
  // }

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:8000/auth/logout/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      }); 
      
      localStorage.removeItem('authToken');
      setIsLoggedIn(false);
      router.push('/sign-in');
      console.log('Logout successful');
      
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <>
      <div className="shadow-xl flex justify-between items-center px-6 my-3 sticky top-0 z-50 bg-white">
        <div className="flex space-x-4 my-2">
          <NavigationMenu className="flex space-x-4">
            <NavigationMenuList className="flex flex-row space-x-4">
              <NavigationMenuItem>
                <Link href={"/article-list"}><Image
                src="/assets/Blog-Logo.svg"
                alt="The Pub Logo"
                width={60}
                height={30}
              /></Link>
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
                      <DialogHeader className="flex items-center justify-center">
                        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                          Share your insights!
                        </h4>
                      </DialogHeader>
                      {/* <DialogDescription>
                        Choose between writing an Article or posting a Thread.
                      </DialogDescription> */}
                      <div className="flex flex-row items-center justify-center space-x-5">
                        <div className="space-x-2">
                          <Link href={`/articles/create`}>
                            <DialogClose><Button variant={"pub"}>Article</Button></DialogClose>
                          </Link>
                        </div>
                        {/* <div className="space-x-2">
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
                              <Form {...form}>
                                <form
                                  onSubmit={form.handleSubmit(onSubmit)}
                                  className="space-y-8"
                                >
                                  <FormField
                                    control={form.control}
                                    name="thread"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormControl>
                                          <Textarea
                                            placeholder="Share your thoughs here."
                                            className="resize"
                                            {...field}
                                          />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                  <AlertDialogFooter>
                                    <AlertDialog>
                                      <AlertDialogTrigger asChild>
                                        <Button variant="destructive">
                                          Cancel{" "}
                                        </Button>
                                      </AlertDialogTrigger>
                                      <AlertDialogContent>
                                        <AlertDialogHeader>
                                          <AlertDialogTitle>
                                            Discard Thread?
                                          </AlertDialogTitle>
                                          <AlertDialogDescription>
                                            This action cannot be undone. Data
                                            in your thread will be lost.
                                          </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                          <AlertDialogCancel className="hover:bg-red-500 hover:text-white">
                                            No
                                          </AlertDialogCancel>
                                          <AlertDialogAction
                                            className="bg-pub-darker hover:bg-green-500 hover:text-white"
                                            onClick={() => {
                                              location.reload();
                                            }}
                                          >
                                            Yes
                                          </AlertDialogAction>
                                        </AlertDialogFooter>
                                      </AlertDialogContent>
                                    </AlertDialog>
                                    <AlertDialogAction
                                      asChild
                                      className="bg-pub hover:bg-green-500"
                                    >
                                      <Button
                                        variant="pub"
                                        type="submit"
                                        disabled={!form.getValues("thread")}
                                      >
                                        Submit
                                      </Button>
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </form>
                              </Form>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div> */}
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
                            src={userData?.profile_picture}
                            className="rounded-full"
                            width={40}
                            height={40}
                          />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>
                          <div className="flex items-center flex-col justify-center">
                            <Avatar>
                              <AvatarImage
                                src={userData?.profile_picture}
                                className="rounded-full"
                                width={40}
                                height={40}
                              />
                              <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                              {/* Name */}
                              {userData?.name}
                            </h4>
                            <p className="text-sm font-normal leading-none">
                              {/* Username */}
                              @{userData?.username}
                            </p>
                          </div>
                          <div className="flex flex-row items-center justify-center mx-auto">
                            <div className="ml-6">
                              <small>{followersCount} followers</small>
                            </div>
                            <div className="flex-grow"></div>
                            <div>
                              <small className="mr-6">{followingCount} following</small>
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
                              handleLogout();
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
