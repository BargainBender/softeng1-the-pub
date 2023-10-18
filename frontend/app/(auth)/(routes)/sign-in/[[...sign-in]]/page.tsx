import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import UserSignInForm from "@/app/(auth)/components/user-signin-form";
import { default as thePubGradient } from "*.svg";

export default function SignIn() {
  return (
    <div className="flex">
      <div className="w-3/5 p-10 hidden lg:flex flex-col bg-white dark:bg-gray-800">
        <div className="flex items-center justify-center h-full">
          <div className="relative flex items-center text-lg font-medium">
            <Image
              src="/assets/thePub.svg"
              alt="The Pub"
              width={600}
              height={600}
            />
            {/* FIXME change the svg file */}

            <h3 className="absolute text-9xl w-min text-gray-800 bottom-24 right-8 font-tanNimbus leading-[1.1]">
              The Pub
            </h3>
          </div>
        </div>
        <div className="mt-auto">
          <blockquote className="space-y-2">
            <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 text-gray-800">
              Come for the Stories, Stay for the Community!
            </h2>
          </blockquote>
        </div>
      </div>

      {/* Card Column */}
      <div className="py-10  flex-auto">
        <div className="container mx-auto flex-col space-y-2 text-center my-28">
          <Card>
            <CardHeader>
              <CardTitle className="mt-6">Welcome Back!</CardTitle>
            </CardHeader>
            <CardContent>
              <UserSignInForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
