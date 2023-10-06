"use client";

import React, { useState } from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/ui/icons";

interface LoadingState {
  isLoading: boolean;
}

const UserSignUpForm: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  return (
    <>
      <div className="grid w-full gap-4">
        <div className="flex flex-col space-y-1.5 items-start">
            <Label htmlFor="email">Email</Label>
            <Input id="email" placeholder="Email"></Input>
            <Label htmlFor="firstname">First Name</Label>
            <Input id="firstname" placeholder="First Name"></Input>
            <Label htmlFor="lastname">Last Name</Label>
            <Input id="lastname" placeholder="Last Name"></Input>
        </div>
        <div className="flex flex-col space-y-1.5">
                <Button variant={"pub"} className="pub">Continue</Button>
        </div>
      </div>
    </>
  );
};

export default UserSignUpForm;
