"use client";

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
import Link from "next/link";

import { Icons } from "@/components/ui/icons";
import { Button } from "../button";

export default function NavigationMenuBar() {
  return (
    <>
      <NavigationMenu className="grid gap-3 p-6 ">
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/">The Pub</Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/">
              <Button
                variant={"pub"}
                className="pub"
                onClick={() => {
                  console.log("clicked");
                }}
              >
                Write
              </Button>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>User</NavigationMenuTrigger>
            <NavigationMenuContent className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <div className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md">
                <div className="row-span-3">
                  <NavigationMenuLink>
                    <Link
                      href="/"
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    >
                      Edit Profile
                      <Icons.logo className="h-6 w-6" />
                      <div className="mb-2 mt-4 text-lg font-medium">
                        shadcn/ui
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        Beautifully designed components built with Radix UI and
                        Tailwind CSS.
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </div>
              </div>
              <div>
                <span>Edit Profile</span>
                <span>Edit Profile</span>
                <span>Edit Profile</span></div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
}
