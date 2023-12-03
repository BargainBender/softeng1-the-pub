

import Image from "next/image";

import UserSignUpForm from "@/app/(auth)/components/user-signup-form";


export default function SignUpPage() {

  return (
    <>
      <div className="grid grid-cols-[1.05fr_1fr] w-full h-screen">
        <div className="relative hidden h-full flex-col text-black dark:border-r lg:w-3/15 lg:flex flex-1">
          <div className="absolute inset-0 flex items-center justify-end p-4 mb-5">
            <div className="flex items-center text-lg font-medium">
              <Image
                src="/assets/logo-tagline-set.svg"
                alt="The Pub Logo"
                width={600}
                height={400}
              />
            </div>
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
