"use client";

import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/ui/icons";
import Link from "next/link";

interface UserSignInForm extends React.HTMLAttributes<HTMLDivElement> {
}

export interface UserData {
    email: string;
    password: string;
}

export function UserSignInForm({ className }: { className: string }): JSX.Element {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [userData, setUserData] = useState<{ email: string; password: string }>({
        email: '',
        password: '',
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = event.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (userData.email.trim() === '' || userData.password.trim() === '') {
            setError('Please enter both email and password');
            return;
        }

        // Email validation logic
        else if (!emailRegex.test(userData.email)) {
            setError('Please enter a valid email address');
            return;
        }

        console.log('Email:', userData.email);
        console.log('Password:', userData.password);

        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 3000);
    };

    return (
        <form className="mt-2 grid w-full gap-4" onSubmit={handleFormSubmit}>
            <div className="flex flex-col space-y-1.5 items-start">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    name="email"
                    placeholder="name@example.com"
                    type="email"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    disabled={isLoading}
                    value={userData.email}
                    onChange={handleInputChange}
                />

                <Label htmlFor="password">Password</Label>
                <Input
                    id="password"
                    name="password"
                    placeholder="Password"
                    type="password"
                    autoCapitalize="none"
                    autoCorrect="off"
                    value={userData.password}
                    disabled={isLoading}
                    onChange={handleInputChange}
                />
            </div>

            {error && <p className="text-red-500">{error}</p>}

            <div className="flex flex-col space-y-1.5">
                <Button
                    variant={"pub"}
                    className="pub"
                    disabled={isLoading}
                    type="submit"
                >
                    {isLoading && (
                        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Sign In
                </Button>
                
            </div>

            <div className="flex flex-col items-center">
                <p className="mt-6 text-sm text-gray-500">
                    Don't have an account?
                    <Link href="/sign-up" className="font-semibold leading-6 text-pub hover:text-pub/80"> Sign Up</Link>
                </p>
                <Link href="/forgot-password" className="mt-2 text-sm text-gray-500 font-semibold leading-6 text-pub hover:text-pub/80">Forgot your password?</Link>
            </div>
        </form>
    );
}

export default UserSignInForm;
