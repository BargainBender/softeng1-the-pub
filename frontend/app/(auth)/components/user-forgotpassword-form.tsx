"use client";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ReCAPTCHA from "react-google-recaptcha";
import { Icons } from "@/components/ui/icons";
import Link from "next/link";

interface UserForgotPasswordForm extends React.HTMLAttributes<HTMLDivElement> {
}

export interface UserData {
    email: string;
}

/**
 * Renders a form for users to reset their password.
 * @param {string} className - The class name for the form component.
 * @returns {JSX.Element} - The rendered form component.
 */
export function UserForgotPasswordForm({ className }: { className: string }): JSX.Element {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [emailError, setEmailError] = useState<string>('');
    const [captchaError, setCaptchaError] = useState<string>('');
    const [isCaptchaValid, setIsCaptchaValid] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');

    /**
     * Handles the change event of the email input field.
     * @param {React.ChangeEvent<HTMLInputElement>} event - The change event.
     */
    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const enteredEmail = event.target.value;
        setEmail(enteredEmail);
    };

    /**
     * Handles the change event of the ReCAPTCHA component.
     * @param {string | null} response - The ReCAPTCHA response.
     */
    const handleCaptchaChange = (response: string | null): void => {
        if (response) {
            setIsCaptchaValid(true);
        } else {
            setIsCaptchaValid(false);
        }
    };

    /**
     * Handles the error event of the ReCAPTCHA component.
     */
    const handleCaptchaError = (): void => {
        setCaptchaError('Error occurred during ReCAPTCHA validation');
    };

    /**
     * Handles the form submission event.
     * @param {React.FormEvent<HTMLFormElement>} event - The form submission event.
     */
    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (email.trim() === '') {
            setEmailError('Please enter the email address');
            return;
        }

        // Email validation logic
        else if (!emailRegex.test(email)) {
            setEmailError('Please enter a valid email address');
            return;
        }

        else if (!isCaptchaValid) {
            setCaptchaError('Please complete the ReCAPTCHA validation');
            return;
        }

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
                    value={email}
                    onChange={handleEmailChange}
                />
            </div>

            {emailError && <p className="text-red-500">{emailError}</p>}
            {captchaError && <p className="text-red-500">{captchaError}</p>}

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
                    Submit
                </Button>
            </div>

            <ReCAPTCHA
                sitekey="6LdOFH4oAAAAAEiiMQSGMuQ9FoF_unxgPqar0quU"
                className="mx-auto mt-2"
                onChange={handleCaptchaChange}
                onErrored={handleCaptchaError}
            />

            <div className="flex flex-col items-center">
                <p className="text-sm text-gray-500">
                    Return to
                    <Link href="/sign-in" className="font-semibold leading-6 text-pub hover:text-pub/80"> Sign In?</Link>
                </p>
            </div>
        </form>
    );
}

export default UserForgotPasswordForm;