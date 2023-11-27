// Create Form for Article
"use client";

import dynamic from "next/dynamic";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Editor } from "../components/blocknote-editor";


// Form for the Title, subtitle, tags
const createArticleSchema = z.object({
  title: z
    .string()
    .min(1, {
      message: "Minimum of a character",
    })
    .max(100, {
      message: "Maximum of 100 characters",
    }),
  subtitle: z
    .string()
    .min(1, {
      message: "Minimum of a character",
    })
    .max(100, { message: "Maximum of 100 characters" })
    .optional(),
});

type CreateArticleValues = z.infer<typeof createArticleSchema>;

export default function CreateArticlePage() {
  const allTags = [
    "Academics",
    "Travel",
    "Entertainment",
    "Sports",
    "Technology",
  ];

  const [chosenTags, setChosenTags] = useState<string[]>([]);
  const [unchosenTags, setUnchosenTags] = useState<string[]>(allTags);

  const handleChosenTagsChange = (tag: string) => {
    if (chosenTags.includes(tag)) {
      // Remove the tag if it's already chosen
      setChosenTags(chosenTags.filter((chosenTag) => chosenTag !== tag));
      setUnchosenTags([...unchosenTags, tag]);
    } else {
      // Add the tag if it's unchosen
      setChosenTags([...chosenTags, tag]);
      setUnchosenTags(
        unchosenTags.filter((unchosenTag) => unchosenTag !== tag)
      );
    }
  };

  const form = useForm<CreateArticleValues>({
    resolver: zodResolver(createArticleSchema),
  });

  function onSubmit(data: CreateArticleValues) {
    const chosenTagsObject = chosenTags.reduce((acc, tag) => {
      acc[tag.toLowerCase()] = true;
      return acc;
    }, {} as { [key: string]: boolean });

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
    <>
      <div className="prose mx-auto max-w-2xl mt-16">
        <div className="max-w-prose">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormControl>
                      <Input
                        placeholder="Article Title"
                        {...field}
                        className="scroll-m-20 text-4xl font-semibold tracking-tight h-30"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="subtitle"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormControl>
                      <Input
                        placeholder="Article subtitle"
                        {...field}
                        className="scroll-m-20 text-2xl font-medium tracking-tight text-muted-foreground"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </form>
          </Form>

          <div className="space-y-6 space-x-5">
            {allTags.map((tag) => (
              <Button
                key={tag}
                onClick={() => handleChosenTagsChange(tag)}
                variant={chosenTags.includes(tag) ? "pub" : "outline"}
                className="flex-1"
              >
                {tag}
              </Button>
            ))}
          </div>
        </div>
        <Separator className="max-w-prose my-6" />
        <div className="max-w-prose mt-3 gap-6">
          <Editor 
          onChange={() => {
         
          }}
          initialContent={""}
          />
        </div>

        <Button
          onClick={() => {
            onSubmit;
          }}
        >
          Submit
        </Button>
      </div>
    </>
  );
}
