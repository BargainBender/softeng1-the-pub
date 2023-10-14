
import { useRouter } from "next/navigation";
import React from "react";
import Link from "next/link";
import { Bookmark, Dot, Ear, ExternalLink, Heart, Lasso } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default async function UserArticlePage() {
  // Get the userID and artlcleID from the URL
  // const { userID, articleID } = useRouter();

  // Fetch the user and article data from the API placeholder to JSON
  // const article = await fetch(`/api/articles/${articleID}`).then((response) => response.json());
  // Render the article data


  async function handeOnClick() {

  }


  return (
    <div className="prose mx-auto max-w-2xl mt-16">
      <div className="max-w-prose">
        <h4 className="scroll-m-20 text-xl font-medium tracking-tight text-muted-foreground">
          {/*article.category(main) */}Programming
        </h4>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl my-3">
          {"Hello World"} {/*article.title */}
        </h1>
        <h3 className="scroll-m-20 text-2xl font-medium tracking-tight text-muted-foreground">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit..
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
          <small className="text-lg font-medium leading-none mx-5 text-muted-foreground">
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
          <small className="text-sm font-medium leading-none mx-5 text-muted-foreground">
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
      <Heart className="w-6 h-6 text-pub" />
     <small className="text-sm font-light leading-none text-muted-foreground">
            127
          </small>
      <Lasso className="w-6 h-6 text-pub" />
      <small className="text-sm font-light leading-none text-muted-foreground">
            127
          </small>
      <Bookmark className="w-6 h-6 text-pub" />
      <Ear className="w-6 h-6 text-pub" />
      <ExternalLink className="w-6 h-6 text-pub" />
      </div>
      <Separator className="max-w-prose mt-3" />

      <p>{/* article.content */}</p>
    </div>
  );
}
