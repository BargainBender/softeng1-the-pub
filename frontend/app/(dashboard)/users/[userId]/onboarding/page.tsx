import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";

export default function OnboardingPage() {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="flex-1 flex justify-center items-center">
          <div className="flex-1">
            <Image src={""} alt="image" className="mx-auto" />
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
        </div>
        <div className="mt-auto">
          <div>Buttons</div>
        </div>
      </div>
    </>
  );
}
