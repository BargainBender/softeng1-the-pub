// Create Form for Article
"use client";

import { useState, useEffect } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { CheckCircle } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

import roboto from "@/app/fonts/roboto";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Block, BlockNoteEditor } from "@blocknote/core";
import {
  BlockNoteView,
  lightDefaultTheme,
  useBlockNote,
} from "@blocknote/react";
import "@blocknote/core/style.css";
import { useRouter } from "next/navigation";
const createFormSchema = z.object({
  title: z
    .string()
    .min(1, {
      message: "Minimum of a character",
    })
    .max(100, {
      message: "Maximum of 100 characters",
    }),
});

type CreateFormValues = z.infer<typeof createFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<CreateFormValues> = {
  title: "",
};

// const allTags = [
//   "Academics",
//   "Travel",
//   "Entertainment",
//   "Sports",
//   "Technology",
// ];

interface CreateArticlePageProps {}

const CreateArticlePage: React.FC<CreateArticlePageProps> = () => {
  const [isSubmitting, setSubmitting] = useState(false);
  // const [chosenTags, setChosenTags] = useState<string[]>([]);
  // const toggleTag = (tag: string) => {
  //   setChosenTags((prevTags) =>
  //     prevTags.includes(tag)
  //       ? prevTags.filter((t) => t !== tag)
  //       : [...prevTags, tag]
  //   );
  // };

  const router = useRouter();

  // Creates a new editor instance.
  const editor: BlockNoteEditor = useBlockNote({
    // Listens for when the editor's contents change.
    onEditorContentChange: (editor) =>
      // Converts the editor's contents to an array of Block objects.
      console.log(JSON.stringify(editor.topLevelBlocks, null, 2)),
  });

  const form = useForm<CreateFormValues>({
    resolver: zodResolver(createFormSchema),
    defaultValues,
  });

  async function onSubmit() {
    try {
      setSubmitting(true);
      const token = localStorage.getItem("authToken");
      if (!token) {
        router.push("/sign-in");
        return;
      }

      // Fetch the current user's username
      const response = await fetch("http://localhost:8000/settings/account/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        // Handle the case where fetching the username fails
        toast({
          title: "Error",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-red-500">
                {"Internal Server Error: 500"}
              </code>
            </pre>
          ),
        });
      }

      const userData = await response.json();
      const username = userData.username;

      const data = form.getValues();
      const content = JSON.stringify(editor.topLevelBlocks, null, 2);
      const createFormData = {
        ...data,
        content,
      };
      console.log(createFormData);

      // Replace the {{username}} in the URL with the current user's username
      const apiUrl = `http://localhost:8000/api/${username}/articles/`;

      // Make the POST request with the updated URL and authentication token
      const articleResponse = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(createFormData),
      });

      if (articleResponse.ok) {
        toast({
          title: "Success!",
          description: (
            <div className="flex items-center space-x-2">
              <CheckCircle className="mx-2 bg-pub" />{" "}
              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                Article successfuly created
              </h4>
            </div>
          ),
        });
        setTimeout(() => {
          router.push("/article-list");
        }, 5000);

        // Handle success, e.g., redirect or update UI
      } else {
        toast({
          title: "Error",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-red-500">
                {`Error creating article: ${articleResponse.status}`}
              </code>
            </pre>
          ),
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-red-500">
              {`Error creating article: ${error}`}
            </code>
          </pre>
        ),
      });
      console.error("An error occurred while creating the article:", error);
      // Handle the general error case
    } finally {
      setSubmitting(false);
    }
  }

  const clearForm = () => {
    form.reset(); // Reset form values
    editor.removeBlocks(editor.topLevelBlocks); // Clear editor content
    // setChosenTags([]);
  };

  // buggy code, need improvement
  // const isBlocksEmpty = !editor.topLevelBlocks || editor.topLevelBlocks.every(
  //   block => block.type !== 'paragraph' || !block.content || block.content.every(
  //     contentItem => contentItem.type !== 'text' || contentItem.text.trim() === ''
  //   )
  // );

  const [isBlocksEmpty, setIsBlocksEmpty] = useState(true);

  useEffect(() => {
    const analyzeEditorContent = () => {
      const currentContent = editor.topLevelBlocks;

      const hasNonEmptyParagraphs = !currentContent || currentContent.some(
        block => block.type === 'paragraph' && block.content && block.content.some(
          contentItem => contentItem.type === 'text' && contentItem.text.trim() !== ''
        )
      );

      setIsBlocksEmpty(!hasNonEmptyParagraphs);
    };

    const intervalId = setInterval(() => {
      analyzeEditorContent();
    }, 1000);

    return () => clearInterval(intervalId);
  }, [editor]);

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
                        className={
                          "scroll-m-20 text-4xl font-semibold tracking-tight h-30 " +
                          roboto.className
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>

          {/* <div className="flex items-center flex-col justify-center space-y-2 my-2">
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
          </div> */}
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
            disabled={!form.getValues().title || isBlocksEmpty}
          >
            Submit
          </Button>
        </div>
      </div>
    </>
  );
};

export default CreateArticlePage;
