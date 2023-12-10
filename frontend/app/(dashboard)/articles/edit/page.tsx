// Create Form for Article
"use client";

import { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";
import { useForm } from "react-hook-form";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

import roboto from "@/app/fonts/roboto";

import { Block, BlockNoteEditor, PartialBlock } from "@blocknote/core";
import {
  BlockNoteView,
  lightDefaultTheme,
  useBlockNote,
} from "@blocknote/react";
import "@blocknote/core/style.css";
import { useRouter } from "next/navigation";

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

// const allTags = [
//   "Academics",
//   "Travel",
//   "Entertainment",
//   "Sports",
//   "Technology",
// ];

export default function EditArticle({
  searchParams,
  initialContent,
  editable,
}: {
  searchParams: {
    viewurl: string;
  };
  initialContent?: string; // Declare initialContent prop
  editable?: boolean; // Declare editable prop
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

  console.log("Article Data:", searchParams.viewurl, articleData?.title);

  // Creates a new editor instance.
  const editor: BlockNoteEditor = useBlockNote({
    editable,
    initialContent: articleData?.content
      ? (JSON.parse(articleData?.content) as PartialBlock[])
      : undefined,
  });

  const clearForm = () => {
    form.reset(); // Reset form values
    editor.removeBlocks(editor.topLevelBlocks); // Clear editor content
    // setChosenTags([]);
  };

  async function onSubmit() {
    console.log()
  }

  return (
    <>
      <div className="prose mx-auto max-w-2xl mt-16">
        <div className="max-w-prose">
            <div className="space-y-3">
              <Input
                defaultValue={articleData?.title}
                className={
                  "scroll-m-20 text-4xl font-semibold tracking-tight h-30 " +
                  roboto.className
                }
              />
            </div>

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
