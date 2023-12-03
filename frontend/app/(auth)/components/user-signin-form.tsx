"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/ui/icons";
import Link from "next/link";

interface UserSignInForm extends React.HTMLAttributes<HTMLDivElement> {
}

interface UserSignInFormProps {
    className: string;
}

export interface UserData {
    username: string;
    password: string;
}

export function UserSignInForm({ className }: { className: string }): JSX.Element {
    const router = useRouter(); 
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [userData, setUserData] = useState<{ username: string; password: string }>({
        username: '',
        password: '',
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = event.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();

        if (userData.username.trim() === '' || userData.password.trim() === '') {
            setError('Please enter both username and password');
            return;
        }

        setIsLoading(true);

        // Send a POST request to the Django API for sign-in
        try {
            const response = await fetch('http://localhost:8000/auth/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                const data = await response.json();
                const token = data.token;

                // Store the token in localStorage
                localStorage.setItem('authToken', token);

                // Redirect or perform other actions as needed
                console.log('Sign-in successful');
                console.log('Token:', token);
            } else {
                setError('Invalid credentials');
                console.log(response.status);
            }
        } catch (error) {
            console.error('An error occurred while signing in:', error);
            setError('An error occurred while signing in');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form className="mt-2 grid w-full gap-4" onSubmit={handleFormSubmit}>
            <div className="flex flex-col space-y-1.5 items-start">
                <Label>Username</Label>
                <Input
                    id="username"
                    name="username"
                    placeholder="username"
                    type="username"
                    autoCapitalize="none"
                    autoComplete="username"
                    autoCorrect="off"
                    disabled={isLoading}
                    value={userData.username}
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
                    Don{"'"}t have an account?
                    <Link href="/sign-up" className="font-semibold leading-6 text-pub hover:text-pub/80"> Sign Up</Link>
                </p>
                <Link href="/forgot-password" className="mt-2 text-sm text-gray-500 font-semibold leading-6 text-pub hover:text-pub/80">Forgot your password?</Link>
            </div>
        </form>
    );
}

export default UserSignInForm;
