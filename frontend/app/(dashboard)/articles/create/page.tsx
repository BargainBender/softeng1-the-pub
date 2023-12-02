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
  tags: z.array(z.string()).optional(),
});

type CreateFormValues = z.infer<typeof createFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<CreateFormValues> = {
  title: "",
  tags: [""],
};

const allTags = [
  "Academics",
  "Travel",
  "Entertainment",
  "Sports",
  "Technology",
];

interface CreateArticlePageProps {}

const CreateArticlePage: React.FC<CreateArticlePageProps> = () => {
  // Stores the editor's contents as an array of Block objects.
  const [blocks, setBlocks] = useState<Block[] | null>(null);

  const [chosenTags, setChosenTags] = useState<string[]>([]);
  const toggleTag = (tag: string) => {
    setChosenTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag]
    );
  };

  // Creates a new editor instance.
  const editor: BlockNoteEditor = useBlockNote({
    // Listens for when the editor's contents change.
    onEditorContentChange: (editor) =>
      // Converts the editor's contents to an array of Block objects.
      JSON.stringify(editor.topLevelBlocks, null, 2),
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
    editor.removeBlocks(editor.topLevelBlocks); // Clear editor content
    setChosenTags([]);
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
            </form>
          </Form>

          <div className="flex items-center flex-col justify-center space-y-2 my-2">
            <div className="flex-1">
              <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                Choose Tags
              </h3>
            </div>
            <div className="flex-1 space-x-2">
              {allTags.map((tag) => (
                <Button
                  key={tag}
                  variant={
                    chosenTags.includes(tag.toLowerCase()) ? "pub" : "outline"
                  }
                  className="text-sm"
                  onClick={() => toggleTag(tag.toLowerCase())}
                >
                  {tag}
                </Button>
              ))}
            </div>
          </div>
        </div>
        <Separator className="max-w-prose my-6" />
        <div className="max-w-prose mt-3 gap-6">
          <BlockNoteView editor={editor} theme={lightDefaultTheme} />
        </div>
        <Separator className="max-w-prose my-6" />

        <div className="flex items-end justify-end space-x-2">
          <Button
            variant={"destructive"}
            onClick={() => {
              clearForm();
            }}
          >
            Clear
          </Button>
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
