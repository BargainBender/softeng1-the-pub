

import { Metadata } from "next";

import Image from "next/image";
import Link from "next/link";


import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import  UserSignUpForm  from "@/app/(auth)/components/user-signup-form";


export const metadata: Metadata = {
    title: "Authentication",
    description: "Authentication forms built using the components.",
}

export default function AuthenticationPage() {
    return (
        <>
            {/* <div className="container relative hidden h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
                <Link
                    href="/sign-up"
                    className={cn(
                        buttonVariants({ variant: "ghost" }),
                        "absolute right-4 top-4 md:right-8 md:top-8"
                    )}
                >
                    Login
                </Link>
            </div> */}
            <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex flex-1">
                <div className="absolute inset-0 bg-zinc-900">
                    <div className="relative z-20 flex items-center text-lg font-medium">
                        <Image 
                        src={"/public/images/thepublogo.png"}
                        alt="The Pub Logo"
                        />
                        The Pub Logo
                    </div>
                </div>
                <div className="relative z-20 mt-auto">
                    <blockquote className="space-y-2">
                        <p className="text-lg">
                            &ldquo;The Pub hosts your intricate stories and insights on a plethora of topics.&rdquo;
                        </p>
                        <footer className="text-sm">The Pub</footer>
                    </blockquote>
                </div>
            </div>
            <div className="lg:p-8 flex-1">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <div className="flex flex-col space-y-2 text-center">
                        <Card>
                            <CardHeader>
                                <CardTitle>Create your Account</CardTitle>
                                <CardDescription>In just a few steps!</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <UserSignUpForm />
                            </CardContent>
                        </Card>
                        
                    </div>
                </div>
            </div>
        </>
    )
}