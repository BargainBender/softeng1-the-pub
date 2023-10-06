"use client";

import React, { useState } from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/ui/icons";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface UserSignUpFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserSignUpForm({ className, ...props }: UserSignUpFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }
  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="grid w-full gap-4">
          <div className="grid gap-4">
            <Label htmlFor="email" className="sr-only">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
            ></Input>
            <Label htmlFor="firstname" className="sr-only padding-1">
              First Name
            </Label>
            <Input
              id="firstname"
              placeholder="First Name"
              type="text"
              autoCapitalize="none"
              autoComplete="firstname"
              autoCorrect="off"
              disabled={isLoading}
            ></Input>
            <Label htmlFor="lastname" className="sr-only padding-1">
              Last Name
            </Label>
            <Input
              id="lastname"
              placeholder="Last Name"
              type="text"
              autoCapitalize="none"
              autoComplete="lastname"
              autoCorrect="off"
              disabled={isLoading}
            ></Input>
          </div>
          <div className="flex flex-col space-y-1.5">
            <Button variant={"pub"} className="pub" disabled={isLoading}>
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Continue
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}

export default UserSignUpForm;
