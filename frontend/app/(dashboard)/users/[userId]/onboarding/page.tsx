"use client";

import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { OnBoardingForm } from "./components/onboarding-form";

interface OnboardingPageState {
  step: number;
}
export default function OnboardingPage() {
  const [state, setState] = useState<OnboardingPageState>({
    step: 0,
  });

  const handleNextStep = () => {
    setState((prevState) => ({
      ...prevState,
      step: prevState.step + 1,
    }));
  };

  const handlePrevStep = () => {
    setState((prevState) => ({
      ...prevState,
      step: Math.max(prevState.step - 1, 0), // Ensure step is not negative
    }));
  };

  const renderButtons = () => {
    switch (state.step) {
      case 0:
        return (
          <>
            <div className="flex flex-row justify-between w-80 mb-5">
              <Button
                variant={"pub"}
                onClick={() => {
                  setState({
                    step: 0,
                  });
                }}
              >
                Button 1
              </Button>
              <Button
                variant={"outline"}
                onClick={() => {
                  setState({
                    step: 1,
                  });
                }}
              >
                Button 2
              </Button>
              <Button
                variant={"outline"}
                onClick={() => {
                  setState({
                    step: 2,
                  });
                }}
              >
                Button 3
              </Button>
            </div>
            <div className="flex items-center justify-center">
              <Button onClick={handleNextStep} variant={"pub"} className="w-52">
                Next
              </Button>
            </div>
          </>
        );
      case 1:
        return (
          <>
            <div className="flex flex-row justify-between w-80 mb-5">
              <Button
                variant={"outline"}
                onClick={() => {
                  setState({
                    step: 0,
                  });
                }}
              >
                Button 1
              </Button>
              <Button
                variant={"pub"}
                onClick={() => {
                  setState({
                    step: 1,
                  });
                }}
              >
                Button 2
              </Button>
              <Button
                variant={"outline"}
                onClick={() => {
                  setState({
                    step: 2,
                  });
                }}
              >
                Button 3
              </Button>
            </div>
            <div className="flex items-center justify-between space-x-4">
              <Button
                onClick={handlePrevStep}
                variant={"secondary"}
                className="flex-shrink-0 w-36"
              >
                Back
              </Button>
              <Button
                onClick={handleNextStep}
                variant={"pub"}
                className="flex-shrink-0 w-36"
              >
                Next
              </Button>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <div className="flex flex-row justify-between w-80 mb-5">
              <Button
                variant={"outline"}
                onClick={() => {
                  setState({
                    step: 0,
                  });
                }}
              >
                Button 1
              </Button>
              <Button
                variant={"outline"}
                onClick={() => {
                  setState({
                    step: 1,
                  });
                }}
              >
                Button 2
              </Button>
              <Button
                variant={"pub"}
                onClick={() => {
                  setState({
                    step: 2,
                  });
                }}
              >
                Button 3
              </Button>
            </div>
            <div className="flex items-center justify-between space-x-4">
              <Button
                onClick={handlePrevStep}
                variant={"secondary"}
                className="flex-shrink-0 w-36"
              >
                Back
              </Button>
              <Button
                onClick={handleNextStep}
                variant={"pub"}
                className="flex-shrink-0 w-36"
              >
                Finish
              </Button>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  const renderSteps = () => {
    switch (state.step) {
      case 0:
        return (
          <>
            <div className="mt-auto flex justify-between items-center w-full px-8">
              <div className="flex-1">
                <Image
                  src={"/assets/Blog-Logo.svg"}
                  width={500}
                  height={500}
                  alt="image"
                  className="mx-auto"
                />
              </div>
              <div className="flex-1 flex flex-col items-center justify-center space-y-4">
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-center">
                  Welcome to the Pub!
                </h1>
                <p className="text-center mt-6 leading-7">
                  We{"'"}re thrilled to have you on board. Your journey begins
                  here, where you can create, share, and discover amazing
                  threads and blogs.
                </p>
              </div>
            </div>
          </>
        );
      case 1:
        return (
          <>
            <div className="mt-auto flex justify-between items-center w-full px-8 space-x-8">
              <div className="flex-1 mr-10">
                <Image
                  src={"/assets/Blog-Logo.svg"}
                  width={500}
                  height={500}
                  alt="image"
                  className="mx-auto"
                />
              </div>
              <div className="flex-1 mx-8">
                <OnBoardingForm />
              </div>
            </div>
          </>
        );
      case 2:
        return <></>;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center h-4/5">
        <div className="flex-1 flex justify-center items-center">
          {renderSteps()}
        </div>
        <div className="mt-auto">{renderButtons()}</div>
      </div>
    </>
  );
}
