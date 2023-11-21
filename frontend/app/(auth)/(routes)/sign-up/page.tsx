

import Image from "next/image";

import UserSignUpForm from "@/app/(auth)/components/user-signup-form";


export default function SignUpPage() {

  return (
    <>
      <div className="grid grid-cols-[1.05fr_1fr] w-full h-screen">
        <div className="relative hidden h-full flex-col text-black dark:border-r lg:w-3/15 lg:flex flex-1">
          <div className="absolute inset-0 flex items-center justify-end">
            <div className="relative z-40 flex items-center text-lg font-medium">
              <Image
                src="/assets/thePub.svg"
                alt="The Pub Logo"
                width={600}
                height={400}
              />
              <h3 className="absolute text-9xl w-min text-gray-800 bottom-20 right-20 font-tanNimbus leading-[1.1]">
              The Pub
            </h3>
            </div>
          </div>
          <div className="flex items-center justify-end relative z-20 mt-auto mb-32">
            <blockquote className="space-y-1">
              <h1 className="scroll-m-20 pb-2 text-4xl font-semibold tracking-wide transition-colors first:mt-32">
                Come for the Stories, {<br />}Stay for the Community!
              </h1>
            </blockquote>
          </div>
        </div>
        <div className="grid grid-cols-[1.05fr_1fr] w-full h-screen">
          <div className="lg:p-8 my-auto">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
              <div className="flex flex-col space-y-2 text-center">
                <div className="lg:p-8 my-auto">
                  <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <div className="flex flex-col space-y-2 text-center"> 
                         <UserSignUpForm />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
