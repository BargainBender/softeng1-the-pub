"use client";

import EditorJS from '@editorjs/editorjs';

import { useRouter } from "next/navigation";
import React, { use } from "react";
import Link from "next/link";
import { Bookmark, Dot, Ear, ExternalLink, Heart, Lasso, ArrowBigDown, ArrowBigUp } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function DraftPage() {

    const editor = new EditorJS({

         /** 
   * Id of Element that should contain the Editor 
   */ 
  holder: 'editorjs', 
  
  /** 
   * Available Tools list. 
   * Pass Tool's class or Settings object for each Tool you want to use 
   */ 
    });



  // Get the userID and artlcleID from the URL
  // const { userID, articleID } = useRouter();

  // Fetch the user and article data from the API placeholder to JSON
  // const article = await fetch(`/api/articles/${articleID}`).then((response) => response.json());
  // Render the article data

  // useArticle({article.id}, {user.id});

  const article = {
    title: "Hello World",
    content: "Lorem ipsum, dolor sit amet consectetur adi",
    category: "Programming",
    description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit..",
  };

  const user = {
    avatar: "",
  };

  async function handeOnClick() {}

  return (
    <div className="prose mx-auto max-w-2xl mt-16">

      <div className="max-w-prose">
        <h4 className="scroll-m-20 text-xl font-medium tracking-tight text-muted-foreground">
          {article.category}
        </h4>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl my-3">
          {article.title}
        </h1>
        <h3 className="scroll-m-20 text-2xl font-medium tracking-tight text-muted-foreground">
          {article.description}
        </h3>
      </div>
      <div className="flex items-start max-w-prose mt-8 gap-6 flex-wrap">
        <div className="flex-none">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div className="grid grid-rows-2 grid-cols-1">
          <div className="col-auto">
            <small className="text-sm font-medium leading-none md:hover:border-b-2 border-pub">
              <Link href={"/"}>Jace Gonzales</Link>
            </small>
            <small className="text-lg font-medium leading-none mx-2 text-muted-foreground">
              ·
            </small>
            <small className="text-sm font-medium leading none text-pub hover:text-pub-darker">
              <button>Follow</button>
            </small>
          </div>
          <div className="col-auto">
            <small className="text-sm font-medium leading-none text-muted-foreground">
              12 min read
            </small>
            <small className="text-sm font-medium leading-none mx-2 text-muted-foreground">
              ·
            </small>
            <small className="text-sm font-medium leading-none text-muted-foreground">
              3 days ago
            </small>
          </div>
        </div>
      </div>

      <Separator className="max-w-prose mt-6" />
      <div className="flex items-start max-w-prose mt-3 gap-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center"><ArrowBigUp className="w-6 h-6 text-pub" />
          <small className="text-sm font-light leading-none text-muted-foreground">
            127 {
              // Article Upvotes
            }
          </small></div>
          <div className="flex items-center">
          <ArrowBigDown className="w-6 h-6 text-pub" />
          <small className="text-sm font-light leading-none text-muted-foreground">15</small>
          </div>
          <div className="flex items-center gap-2">

          <Lasso className="w-6 h-6 text-pub" />
      <small className="text-sm font-light leading-none text-muted-foreground">
        127
      </small>
          </div>
        </div>
        <div className="flex items-center ml-auto gap-3">
          <Bookmark className="w-6 h-6 text-pub" />
          <Ear className="w-6 h-6 text-pub" />
          <ExternalLink className="w-6 h-6 text-pub" />
        </div>
      </div>
      <Separator className="max-w-prose mt-3" />

     

      {/* Display Article Content */}
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut modi error
        voluptas perspiciatis? Dolore tempora doloribus, iure sequi ipsam, ipsa
        ipsum amet ab optio exercitationem distinctio consectetur. Quod, culpa
        possimus!
      </p>
    </div>
  );
}
