"use client";

import React, { useState } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/ui/icons";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";




interface UserSignUpFormProps extends React.HTMLAttributes<HTMLDivElement> {
}


// TODO: Add validation to the form.
export interface UserData {
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  confirmPassword: string;
}
interface SignUpFormState {
  step: number;
}

export function UserSignUpForm({ className, ...props }: UserSignUpFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [state, setState] = useState<SignUpFormState>({
    step: 0,
  });

  const [userData, setUserData] = useState<UserData>({
    email: "",
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleContinue = () => {
    setState((prevState) => ({
      ...prevState,
      step: prevState.step + 1,
    }));
  };

  async function onSubmit(event: React.SyntheticEvent) {
    alert(JSON.stringify(userData));
    // Submit to Database
    // await fetch("/api/user", {
  }

  const renderStep = () => {
    switch (state.step) {
      case 0:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                Create your Account
              </CardTitle>
              <CardDescription>In just a few steps!</CardDescription>
            </CardHeader>
            <CardContent>
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
                    value={userData.email}
                    onChange={(event) => {
                      setUserData({ ...userData, email: event.target.value });
                    }}
                  />
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
                    value={userData.firstName}
                    onChange={(event) => {
                      setUserData({
                        ...userData,
                        firstName: event.target.value
                      });
                    }}
                  />
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
                    value={userData.lastName}
                    onChange={(event) => {
                      setUserData({
                        ...userData,
                        lastName: event.target.value
                      });
                    }}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Button
                    variant={"pub"}
                    className="pub"
                    disabled={isLoading}
                    onClick={(event) => {
                      setIsLoading(true);
                      setTimeout(() => {
                        setIsLoading(false);
                        handleContinue();
                      }, 3000);
                    }}
                  >
                    {isLoading && (
                      <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Continue
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      case 1:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                Let{"'"}s secure your <br /> account
              </CardTitle>
              <CardDescription></CardDescription>
            </CardHeader>
            <CardContent>
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
                    value={userData.username}
                    disabled={isLoading}
                    onChange={(event) => {
                      setUserData({
                        ...userData,
                        username: event.target.value,
                      });
                    }}
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
                    value={userData.password}
                    disabled={isLoading}
                    onChange={(event) => {
                      setUserData({
                        ...userData,
                        password: event.target.value,
                      });
                    }}
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
                    value={userData.confirmPassword}
                    disabled={isLoading}
                    onChange={(event) => {
                      setUserData({
                        ...userData,
                        confirmPassword: event.target.value,
                      });
                    }}
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
                    You agree to our{" "}
                    {
                      // Check if the user aggrees to the terms and conditions.
                      <Link
                        href={"/terms-of-service"}
                        className="underline underline-offset-3"
                      >
                        Terms and Conditions
                      </Link>
                    }{" "}
                    and{" "}
                    {
                      <Link
                        href={"/privacy-policy"}
                        className="underline underline-offset-4"
                      >
                        Privacy Policy
                      </Link>
                    }
                    .
                  </p>
                </div>

                <div className="flex flex-col space-y-1.5">
                  <Button
                    variant={"pub"}
                    className="pub"
                    disabled={isLoading}
                    onClick={(event) => {
                      setIsLoading(true);
                      setTimeout(() => {
                        setIsLoading(false);
                        handleContinue();
                      }, 3000);
                    }}
                  >
                    {isLoading && (
                      <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Register
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      case 2:

      setTimeout(() => {
        redirect('/sign-up')
        alert('Successfully Registered!');
      }, 5000);

        return (
          <Card>
            <CardHeader>
              <CardTitle className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                Successfully Registered!
              </CardTitle>
              <CardDescription></CardDescription>
            </CardHeader>
            <CardContent>
            <div className="flex flex-col space-y-1.5">
                  <Button
                    variant={"ghost"}
                    className="pub"
                    disabled={true}
                  >
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" /> Redirecting...
                  </Button>
                </div>
            </CardContent>
          </Card>
        );
      default:
        // Render the last step of the form here.
        break;
    }
  };

  return (
    <>
    {renderStep()}
    </>
  );
    
}

export default UserSignUpForm;
