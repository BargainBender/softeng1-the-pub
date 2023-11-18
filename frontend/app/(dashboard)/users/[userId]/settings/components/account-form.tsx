"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, CheckIcon, ChevronUp } from "lucide-react";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/use-toast";

const strongPasswordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()-+])(?=.{8,})$/;

const accountFormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    }),
  email: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(30, {
      message: "Name must not be longer than 30 characters.",
    }),
  passwordForm: z
    .object({
      currentPassword: z.string(),
      newPassword: z
        .string()
        .refine((value) => strongPasswordRegex.test(value), {
          message:
            "Password must have at least one lowercase letter, one uppercase letter, one number, one special character, and be at least 8 characters long.",
        }),
      confirm: z.string(),
    })
    .refine((data) => data.newPassword === data.confirm, {
      message: "Passwords don't match",
    })
    .optional(),
  private: z
    .boolean({
      required_error: "Decide whether the profile is public or not",
    })
    .default(false),
});

type AccountFormValues = z.infer<typeof accountFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<AccountFormValues> = {
  username: "raymond_postrero",
  email: "raymondpostrero@tip.edu.ph",
  passwordForm: { currentPassword: " ", newPassword: "", confirm: "" },
  private: false,
};

export function AccountForm() {
  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues,
  });

  function onSubmit(data: AccountFormValues) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="raymondpostrero" {...field} />
              </FormControl>
              <FormDescription>
                This is your username. It can be your real name or a pseudonym.
                This will be username for all The Pub interactions
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription>
                This is the name that will be displayed on your profile and in
                emails.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <h3 className="mb-4 text-lg font-medium">Privacy</h3>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="private"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Private</FormLabel>
                    <FormDescription>
                      Do not show personal details in The Pub.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>
        <FormField
          control={form.control}
          name="passwordForm.newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pronouns</FormLabel>
              <Input type="password" {...field} />
              <FormDescription>
                This will be your pronouns for the site.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="passwordForm.confirm"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pronouns</FormLabel>
              <Input type="password" {...field} />
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Update account</Button>
      </form>
    </Form>
  );
}
