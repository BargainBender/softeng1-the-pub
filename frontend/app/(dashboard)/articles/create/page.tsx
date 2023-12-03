// Create Form for Article
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { useRouter } from 'next/navigation'
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
      const token = localStorage.getItem("authToken");
      if (!token) {
        router.push("/sign-in")
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
        return;
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
        console.log("Article created successfully");
        // Handle success, e.g., redirect or update UI
      } else {
        console.error("Error creating article:", articleResponse.status);
        // Handle the case where creating the article fails
      }
    } catch (error) {
      console.error("An error occurred while creating the article:", error);
      // Handle the general error case
    }
  }

  const clearForm = () => {
    form.reset(); // Reset form values
    editor.removeBlocks(editor.topLevelBlocks); // Clear editor content
    // setChosenTags([]);
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
                        className={"scroll-m-20 text-4xl font-semibold tracking-tight h-30 " + roboto.className}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>

          <div className="flex items-center flex-col justify-center space-y-2 my-2">
            {/* <div className="flex-1">
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
            </div> */}
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
            disabled={!form.getValues().title}
          >
            Submit
          </Button>
        </div>
      </div>
    </>
  );
};

export default CreateArticlePage;
