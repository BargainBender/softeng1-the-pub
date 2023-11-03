"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";

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
import { DialogClose } from "@/components/ui/dialog";
import { Icons } from "@/components/ui/icons";

const FormSchema = z.object({
  bio: z
    .string()
    .max(160, {
      message: "Maximum number of characters reached",
    })
    .optional(),
  name: z
    .string()
    .min(1, {
      message: "Name is required",
    })
    .max(50, {
      message: "Name has reached the maximum characters",
    }),
});

export function EditProfileForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      // Add fetched user data here
      name: "",
      bio: "",
    },
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    
    console.log(JSON.stringify(data, null, 2))

    setIsLoading(true);
    // Refresh the page after a delay of 3 seconds
    setTimeout(function () {
      location.reload();
    }, 3000); // 3000 milliseconds = 3 seconds

  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name*</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription className="flex flex-row items-center">
                Appears on your Profile page, as your byline and in your
                responses.
                <div className="flex-grow"></div>
                <div
                  className={`p-2 text-sm ${
                    field.value.length > 50 ? "text-red-500" : ""
                  }`}
                >
                  {field.value.length}/{50}
                </div>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription className="flex flex-row items-center">
                Appears on your Profile and next to your stories.
                <div className="flex-grow"></div>
                <div
                  className={`p-2 text-sm ${
                    (field.value ?? "").length >  160? "text-red-500" : ""
                  }`}
                >
                  {(field.value ?? "").length}/{160}
                </div>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-row justify-end space-x-4">
          <DialogClose>
            <Button type="reset" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit" variant="pub">
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Save changes
          </Button>
        </div>
      </form>
    </Form>
  );
}
