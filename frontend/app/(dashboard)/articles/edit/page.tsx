// Create Form for Article
"use client";

import { useEffect, useState } from "react";
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
import { Block, BlockNoteEditor, PartialBlock } from "@blocknote/core";
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

interface Author {
  id: number;
  username: string;
  name: string;
  profile_picture: string;
  is_active: boolean;
}

interface Article {
  id: number;
  title: string;
  content: string;
  date_created: string;
  last_edited: string;
  upvotes: number;
  downvotes: number;
  author: Author;
  url: string;
}

interface EditorProps {
  initialContent?: string;
  editable?: boolean;
}

// const allTags = [
//   "Academics",
//   "Travel",
//   "Entertainment",
//   "Sports",
//   "Technology",
// ];

export default function EditArticle({
  searchParams,
}: {
  searchParams: {
    viewurl: string;
  };
}) {
  const [articleData, setArticleData] = useState<Article | null>(null);
  const [isSubmitting, setSubmitting] = useState(false);
  const router = useRouter();
  console.log("Article Data:" + searchParams.viewurl);

  useEffect(() => {
    try {
      fetch("http://localhost:8000" + searchParams.viewurl)
        .then((response) => response.json())
        .then((data: Article) => {
          setArticleData(data);
        });
    } catch (error) {
      console.log(error);
    }
  }, [searchParams.viewurl]);

  // This can come from your database or API.
  const defaultValues: Partial<CreateFormValues> = {
    title: articleData?.title,
  };
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

  const clearForm = () => {
    form.reset(); // Reset form values
    editor.removeBlocks(editor.topLevelBlocks); // Clear editor content
    // setChosenTags([]);
  };

  const Editor = ({ initialContent, editable }: EditorProps) => {
    const editor: BlockNoteEditor = useBlockNote({
      editable,
      initialContent: initialContent
        ? (JSON.parse(initialContent) as PartialBlock[])
        : undefined,
    });
  }

  async function onSubmit() {}

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
            disabled={!form.getValues().title}
          >
            Submit
          </Button>
        </div>
      </div>
    </>
  );
}
