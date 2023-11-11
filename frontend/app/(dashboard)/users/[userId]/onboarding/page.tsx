"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";

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

  const renderButtons = () => {
    switch (state.step) {
      case 0:
        return (
          <>
          {/* Tabs Here */}
            <Button onClick={handleNextStep} variant={"pub"} className="w-36">Next</Button>
          </>
        );
      case 1:
        return (
          <>
          {/* Tabs Here */}
            <button onClick={handleNextStep}>Next</button>
            <button onClick={() => console.log("Custom action for step 1")}>
              Custom Action
            </button>
          </>
        );
      case 2:
        return (
          <>
          {/* Tabs Here */}
            <button onClick={handleNextStep}>Next</button>
            <button onClick={() => console.log("Custom action for step 2")}>
              Custom Action
            </button>
            <button onClick={() => console.log("Additional action for step 2")}>
              Additional Action
            </button>
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
            <div className="flex-1">
            <Image src={"/assets/thePub.svg"} width={500} height={500} alt="image" className="mx-auto" />
          </div>
          <div className="flex-1 flex flex-col items-center justify-center ml-4">
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-center">
              Welcome to the Pub!
            </h1>
            <p className="text-center mt-6 leading-7">
              We{"'"}re thrilled to have you on board. Your journey begins here,
              where you can create, share, and discover amazing threads and
              blogs.
            </p>
          </div>
            </>
          );
        case 1:
          return (
            <>
              
            </>
          );
        case 2:
          return (
            <>
             
            </>
          );
        default:
          return null;
      }
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center h-4/5">
        <div className="flex-1 flex justify-center items-center">
          {renderSteps()}
        </div>
        {/* Persitent Buttons changes state */}
        <div className="mt-auto">{renderButtons()}</div>
        </div>
    </>
  );
}
