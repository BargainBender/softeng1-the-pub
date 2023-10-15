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

export default function SignIn() {
    return (
        <div className="flex">
            {/* Image Column */}
            <div className="w-3/5 p-10 hidden lg:flex flex-col bg-white dark:bg-gray-800">
                <div className="flex items-center justify-center h-full">
                    <div className="flex items-center text-lg font-medium">
                        <Image
                            src="/thepublogo.png"
                            alt="The Pub Logo"
                            width={200}
                            height={200}
                        />
                    </div>
                </div>
                <div className="mt-auto">
                    <blockquote className="space-y-2">
                        <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                            &ldquo;Come for the Stories, Stay for the Community!&rdquo;
                        </h2>
                    </blockquote>
                </div>
            </div>

            {/* Card Column */}
            <div className="w-4/5 p-10 lg:p-8 flex-1">
                <div className="container mx-auto flex-col space-y-2 text-center">
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
