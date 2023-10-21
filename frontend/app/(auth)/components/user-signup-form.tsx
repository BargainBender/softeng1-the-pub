"use client";

import React, { useState } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/ui/icons";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { emailRegex } from "@/lib/utils";
import { strongPasswordRegex } from "@/lib/utils";
import {
  lowerCaseRegex,
  upperCaseRegex, 
  numberRegex,
  specialCharacterRegex,
} from "@/lib/utils";

interface UserSignUpFormProps extends React.HTMLAttributes<HTMLDivElement> {}


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

  // These checkers could be merged into one, however, upon testing it seems that the state is not updated in time.
  const [isEmailLabelHidden, setIsEmailLabelHidden] =
    React.useState<boolean>(true);
  const [isEmailLabelHiddenFormat, setIsEmailLabelHiddenFormat] =
    React.useState<boolean>(true);
  const [isPasswordLabelHidden, setIsPasswordLabelHidden] =
    React.useState<boolean>(true);
  const [isPasswordLabelHiddenFormat, setIsPasswordLabelHiddenFormat] =
    React.useState<boolean>(true);
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
    // Check if the email address is valid.

    if (!userData.email || userData.email === "") {
      // Show an error message that the email address is required.
      setIsEmailLabelHiddenFormat(true);
      setIsEmailLabelHidden(false);
    } else if (!emailRegex.test(userData.email)) {
      setIsEmailLabelHidden(true);
      setIsEmailLabelHiddenFormat(false);
      // Show an error message that the email address is invalid.
    } else {
      setIsEmailLabelHidden(true);
      setIsEmailLabelHiddenFormat(true);
      setState((prevState) => ({
        ...prevState,
        step: prevState.step + 1,
      }));
    }
  };

  const handleConfirm = () => {
    // Check if the password is valid.
    if (userData.password !== "" && userData.password !== userData.confirmPassword){
      throw new Error("Passwords do not match.");
    } else {
      setState((prevState) => ({
        ...prevState,
        step: prevState.step + 1,
      }));
      // onSubmit;
    }
    
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
                  <div className="grid w-full max-w-sm place-items-start gap-1.5">
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
                    <Label
                      htmlFor="email"
                      className={`ml-3 text-muted-foreground text-xs font-medium leading-none text-red-600 ${
                        isEmailLabelHidden ? "hidden" : ""
                      }`}
                    >
                      This field is required.
                    </Label>
                    <Label
                      htmlFor="email"
                      className={`ml-3 text-muted-foreground text-xs font-medium leading-none text-red-600 ${
                        isEmailLabelHiddenFormat ? "hidden" : ""
                      }`}
                    >
                      Invalid email format.
                    </Label>
                  </div>
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
                        firstName: event.target.value,
                      });
                    }}
                  />
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
                        lastName: event.target.value,
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
                <div className="grid w-full max-w-sm place-items-start gap-1.5">
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
                  />
                   <Label className="ml-3 text-xs text-muted-foreground">
                  {userData.username === "" ? "Username is required." : ""}
                  </Label>
                  {/* TODO: Add username is taken */}

                  </div>
                  <div className="grid w-full max-w-sm place-items-start gap-1.5">
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
                    />
                    
                    <Label className="ml-3 text-xs text-muted-foreground">
                      The password must be:
                    </Label>
                    <Label className={`ml-9 text-xs text-muted-foreground ${!lowerCaseRegex.test(userData.password) ? "text-red-600" : ""}`}>
              
                      One lowercase letter
                    </Label>
                    <Label className={`ml-9 text-xs text-muted-foreground ${!upperCaseRegex.test(userData.password) ? "text-red-600" : ""}`}>
                
                      One uppercase letter
                    </Label>
                    <Label className={`ml-9 text-xs text-muted-foreground ${!numberRegex.test(userData.password) ? "text-red-600" : ""}`}>
                      One number
                    </Label>
                    <Label className={`ml-9 text-xs text-muted-foreground ${!specialCharacterRegex.test(userData.password) ? "text-red-600" : ""}`}>
                      One special character
                    </Label>
                    <Label className={`ml-9 text-xs text-muted-foreground ${userData.password.length >= 8 ? "" : "text-red-600"}`}>
                      Be at least 8 characters long
                    </Label>
                  </div>
                  <div className="grid w-full max-w-sm place-items-start gap-1.5">
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
                  />
                  <Label className="ml-3 text-xs text-muted-foreground">
                  {userData.password === "" ? "Password required." : ""}
                  </Label>
                  <Label className={`ml-3 text-xs text-muted-foreground ${userData.password === "" ? "hidden" : ""}`}> {userData.password !== "" &&
    (userData.password !== userData.confirmPassword
      ? <span className="text-red-600">Passwords do not match</span>
      : "Passwords match")}</Label>
                  </div>
                </div>
                <div className="flex items-start space-x-2 my-3">
                  <p className="text-sm text-muted-foreground">
                    By signing up, you agree to our{" "}
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
                    disabled={isLoading || userData.password === "" || userData.password !== userData.confirmPassword || userData.username === "" && !strongPasswordRegex.test(userData.password)}
                    onClick={(event) => {
                      setIsLoading(true);
                      setTimeout(() => {
                        setIsLoading(false);
                        handleConfirm();
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
          redirect("/sign-up");
          alert("Successfully Registered!");
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
                <Button variant={"ghost"} className="pub" disabled={true}>
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />{" "}
                  Redirecting...
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

  return <>{renderStep()}</>;
}

export default UserSignUpForm;
