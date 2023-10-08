"use client";

import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/ui/icons";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";

interface PasswordConfirmFormProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export function PasswordConfirmForm({
  className,
  ...props
}: PasswordConfirmFormProps) {
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
            <Label htmlFor="username" className="sr-only">
              Username
            </Label>
            <Input
              id="username"
              placeholder="Username"
              type="text"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
            ></Input>
            <Label htmlFor="firstname" className="sr-only padding-1">
              Password
            </Label>
            <Input
              id="password"
              placeholder="Password"
              type="password"
              autoCapitalize="none"
              autoComplete="firstname"
              autoCorrect="off"
              disabled={isLoading}
            ></Input>
            <Label htmlFor="lastname" className="sr-only padding-1">
              Confirm Password
            </Label>
            <Input
              id="confirm-password"
              placeholder="Confirm Password"
              type="password"
              autoCapitalize="none"
              autoComplete="lastname"
              autoCorrect="off"
              disabled={isLoading}
            ></Input>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="terms" />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Accept terms and conditions
            </label>
          </div>
          <div className="flex items-start space-x-2">
            <p className="text-sm text-muted-foreground">
          You agree to our {<Link 
        href={"/terms-of-service"}
        className="underline underline-offset-3">Terms and Conditions</Link>} and {<Link href={"/privacy-policy"} className="underline underline-offset-4">Privacy Policy</Link>}.
        </p>
          </div>

          <div className="flex flex-col space-y-1.5">
            <Button variant={"pub"} className="pub" disabled={isLoading}>
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Register
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}

export default PasswordConfirmForm;
