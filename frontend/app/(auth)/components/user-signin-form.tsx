"use client";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface LoadingState {
    isLoading: boolean;
}

const UserSignInForm: React.FC = () => {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    return (
        <div className="mt-2 grid w-full gap-4">
            <div className="flex flex-col space-y-1.5 items-start">
                <Label htmlFor="email">Email</Label>
                <Input id="email" placeholder="Email"></Input>
                <Label htmlFor="password">Password</Label>
                <Input id="password" placeholder="Password" type="password"></Input>
            </div>

            <div className="flex flex-col space-y-1.5">
                <Button variant={"pub"} className="pub">Log In</Button>
            </div>

            <div className="flex flex-col items-center">
                <p className="mt-6 text-sm text-gray-500">
                    Don't have an account? 
                    <a href="#" className="font-semibold leading-6"> Sign up</a>
                </p>
                <a href="#" className="mt-2 text-sm text-gray-500 font-semibold leading-6">Forgot your password?</a>
            </div>

        </div>        
    );
};

export default UserSignInForm;