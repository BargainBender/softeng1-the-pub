// Create Form for Article
"use client";

import dynamic from "next/dynamic";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { CreateForm } from "./components/create-form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { Block, BlockNoteEditor } from "@blocknote/core";
import {
  BlockNoteView,
  lightDefaultTheme,
  useBlockNote,
} from "@blocknote/react";
import "@blocknote/core/style.css";

const createFormSchema = z.object({
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
  academics: z.boolean().default(false).optional(),
  travel: z.boolean().default(false).optional(),
  entertainment: z.boolean().default(false).optional(),
  technology: z.boolean().default(false).optional(),
  sports: z.boolean().default(false).optional(),
});

type CreateFormValues = z.infer<typeof createFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<CreateFormValues> = {
  title: "",
  subtitle: "",
  academics: false,
  travel: false,
  entertainment: false,
  technology: false,
  sports: false,
};

interface CreateArticlePageProps {}

const CreateArticlePage: React.FC<CreateArticlePageProps> = () => {
  // Stores the editor's contents as an array of Block objects.
  const [blocks, setBlocks] = useState<Block[] | null>(null);

  // Creates a new editor instance.
  const editor: BlockNoteEditor = useBlockNote({
    // Listens for when the editor's contents change.
    onEditorContentChange: (editor) =>
      // Converts the editor's contents to an array of Block objects.
      setBlocks(editor.topLevelBlocks),
  });

  const form = useForm<CreateFormValues>({
    resolver: zodResolver(createFormSchema),
    defaultValues,
  });

  function onSubmit() {
    const data = form.getValues();
    const createFormData = {
      ...data,
      blocks,
    };
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">
            {JSON.stringify(createFormData, null, 2)}
          </code>
        </pre>
      ),
    });
  }

  const clearForm = () => {
    form.reset(); // Reset form values
    setBlocks([]); // Clear editor content
  };

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
                        className="scroll-m-20 text-4xl font-semibold tracking-tight em"
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
              <div className="flex items-center justify-center">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant={"pub"}>Choose Tags</Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <h3 className="mb-4 text-lg font-medium">
                      Tags Suggestions
                    </h3>
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="academics"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">
                                Academic
                              </FormLabel>
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
                      <FormField
                        control={form.control}
                        name="travel"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">
                                Travel
                              </FormLabel>
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
                      <FormField
                        control={form.control}
                        name="entertainment"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">
                                Entertainment
                              </FormLabel>
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
                      <FormField
                        control={form.control}
                        name="technology"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">
                                Technology
                              </FormLabel>
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
                      <FormField
                        control={form.control}
                        name="sports"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">
                                Sports
                              </FormLabel>
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
                  </PopoverContent>
                </Popover>
              </div>
            </form>
          </Form>
        </div>
        <Separator className="max-w-prose my-6" />
        <div className="max-w-prose mt-3 gap-6">
          <BlockNoteView editor={editor} theme={lightDefaultTheme} />
        </div>
        <Separator className="max-w-prose my-6" />

<div className="flex items-end justify-end space-x-2">
  <Button variant={"destructive"} onClick={() => {
clearForm();
  }}>Clear</Button>
        <Button
          onClick={() => {
            onSubmit();
          }}
          variant={"pub"}
        >
          Submit
        </Button>
        </div>
      </div>
    </>
  );
};

export default CreateArticlePage;
