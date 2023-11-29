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
import { CreateForm } from "./components/create-form";

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
  const Editor = dynamic(() => import("../components/blocknote-editor"), {
    ssr: false,
  });

  return (
    <>
      <div className="prose mx-auto max-w-2xl mt-16">
        <div className="max-w-prose">
          <CreateForm/>
          <div className="space-y-6 space-x-5">
           
          </div>
        </div>
        <Separator className="max-w-prose my-6" />
        <div className="max-w-prose mt-3 gap-6">
          <Editor />
        </div>

        <Button
          onClick={() => {
          }}
        >
          Submit
        </Button>
      </div>
    </>
  );
}
