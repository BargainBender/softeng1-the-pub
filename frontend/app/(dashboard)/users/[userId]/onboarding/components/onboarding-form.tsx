"use client";

import { useEffect } from "react";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const bioSchema = z.object({
  profile: z.string().optional(),
  bio: z.string().max(160).optional(),
});

interface OnboardingFormProps {
  onFormChange: (formData: z.infer<typeof bioSchema>) => void; // Callback function
}

export function OnboardingForm({onFormChange} : OnboardingFormProps) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof bioSchema>>({
    resolver: zodResolver(bioSchema),
    defaultValues: {
      profile: "",
      bio: "",

    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof bioSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    onFormChange(values);
    toast({
      title: "Success",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values)}</code>
        </pre>
      ),
    });
    console.log(values);
  }

  useEffect(() => {
    onFormChange(form.getValues());
  }, [form, onFormChange]);

  return (
    <Card className=" max-h-[650px] max-w-[650px] my-8">
      <CardHeader>
        <CardTitle className="flex items-start justify-center">
          <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            Let People Recognize You!
          </h2>
        </CardTitle>
        <CardDescription className="flex items-start justify-center">
          {" "}
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            Add a Profile Picture
          </h4>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="profile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <div className="flex flex-col items-center justify-center">
                      <Avatar className=" h-36 w-36">
                        <AvatarImage
                          src="https://github.com/shadcn.png"
                          alt="@shadcn"
                        />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                    </div>
                  </FormLabel>
                  <FormControl>
                    <div className="flex items-center justify-center">
                      <Button variant={"pub"} className="w-36">
                        Upload
                      </Button>
                    </div>
                  </FormControl>
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
                    <Textarea
                      className="resize-none"
                      placeholder="Describe yourself"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This will show in your profile.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
