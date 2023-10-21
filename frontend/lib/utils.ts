import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const strongPasswordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()-+])(?=.{8,})$/;
{
  /*
    One lowercase letter
    One uppercase letter
    One number
    One special character
    Be at least 8 characters long
 */
}

export const lowerCaseRegex = /^(?=.*[a-z])/;
export const upperCaseRegex = /^(?=.*[A-Z])/;
export const numberRegex = /^(?=.*[0-9])/;
export const specialCharacterRegex = /^(?=.*[!@#$%^&*()-+])/;
