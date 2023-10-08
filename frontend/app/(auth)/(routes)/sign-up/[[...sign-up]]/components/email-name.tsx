import Image from "next/image";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import UserSignUpForm from "@/app/(auth)/components/user-signup-form";

export function EmailName() {
  return (
    <div className="grid grid-cols-[1.05fr_1fr] w-full h-screen">
      <div className="relative hidden h-full flex-col p-10 text-black dark:border-r lg:w-3/15 lg:flex flex-1">
        <div className="absolute inset-0 flex items-center justify-end">
          <div className="relative z-20 flex items-center text-lg font-medium">
            <Image
              src="/thepublogo.png"
              alt="The Pub Logo"
              width={200}
              height={200}
            />
            <blockquote className="space-y-2">
              <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                &ldquo;Come for the Stories,
                <br />
                Stay for the Community!&rdquo;
              </h2>
            </blockquote>
          </div>
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
              &ldquo;Come for the Stories, Stay for the Community!&rdquo;
            </h2>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8 my-auto">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <div className="lg:p-8 my-auto">
              <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                <div className="flex flex-col space-y-2 text-center">
                  <Card>
                    <CardHeader>
                      <CardTitle>Create your Account</CardTitle>
                      <CardDescription>In just a few steps!</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <UserSignUpForm />
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmailName;
