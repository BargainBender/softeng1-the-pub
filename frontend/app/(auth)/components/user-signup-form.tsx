"use client";

import React, { useState } from "react";
import Link from "next/link";

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

interface UserSignUpFormProps extends React.HTMLAttributes<HTMLDivElement> {}

interface SignUpFormState {
  step: number;
}

export function UserSignUpForm({ className, ...props }: UserSignUpFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [state, setState] = useState<SignUpFormState>({
    step: 0,
  });

  const handleContinue = () => {
    setState((prevState) => ({
      ...prevState,
      step: prevState.step + 1,
    }));
  };

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }

  const renderStep = () => {
    switch (state.step) {
      case 0:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Create your Account</CardTitle>
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
                  />
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
                    You agree to our{" "}
                    {
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
                  <Button variant={"pub"} className="pub" disabled={isLoading}>
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
        return (
          <Card>
            <CardHeader>
              <CardTitle className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                Successfully Registered!
              </CardTitle>
              <CardDescription></CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid w-full gap-4">
                <div className="grid gap-4">
                  <Label htmlFor="email" className="sr-only">
                    Email
                  </Label>
                  <Input
                    id="email"
                    placeholder={"name@example.com"} //UserData.email
                    type="email"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    disabled={true}
                  ></Input>
                  <Label htmlFor="username" className="sr-only padding-1">
                    Username
                  </Label>
                  <Input
                    id="username"
                    placeholder={"Username"} //UserData.username
                    type="text"
                    autoCapitalize="none"
                    autoComplete="username"
                    autoCorrect="off"
                    disabled={true}
                  ></Input>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Button variant={"pub"} className="pub" disabled={false}>
                    Login
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      default:
        // Render the last step of the form here.
        break;
    }
  };

  return <form onSubmit={onSubmit}>{renderStep()}</form>;

  // return (
  //   <>
  //     <form onSubmit={onSubmit}>
  //       <div className="grid w-full gap-4">
  //         <div className="grid gap-4">
  //           <Label htmlFor="email" className="sr-only">
  //             Email
  //           </Label>
  //           <Input
  //             id="email"
  //             placeholder="name@example.com"
  //             type="email"
  //             autoCapitalize="none"
  //             autoComplete="email"
  //             autoCorrect="off"
  //             disabled={isLoading}
  //           ></Input>
  //           <Label htmlFor="firstname" className="sr-only padding-1">
  //             First Name
  //           </Label>
  //           <Input
  //             id="firstname"
  //             placeholder="First Name"
  //             type="text"
  //             autoCapitalize="none"
  //             autoComplete="firstname"
  //             autoCorrect="off"
  //             disabled={isLoading}
  //           ></Input>
  //           <Label htmlFor="lastname" className="sr-only padding-1">
  //             Last Name
  //           </Label>
  //           <Input
  //             id="lastname"
  //             placeholder="Last Name"
  //             type="text"
  //             autoCapitalize="none"
  //             autoComplete="lastname"
  //             autoCorrect="off"
  //             disabled={isLoading}
  //           ></Input>
  //         </div>
  //         <div className="flex flex-col space-y-1.5">
  //           <Button variant={"pub"} className="pub" disabled={isLoading}>
  //             {isLoading && (
  //               <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
  //             )}
  //             Continue
  //           </Button>
  //         </div>
  //       </div>
  //     </form>
  //   </>
  // );
}

export default UserSignUpForm;
