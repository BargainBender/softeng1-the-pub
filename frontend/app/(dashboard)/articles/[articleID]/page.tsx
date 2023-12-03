"use client";

import dynamic from "next/dynamic";
import ArticleHeading from "../components/article-heading";
import ArticleCreator from "../components/article-creator";
import { Separator } from "@/components/ui/separator";
import ArticleMetadata from "../components/article-metadata";
const Editor = dynamic(() => import("../components/editor-view"), { ssr: false });
// TODO: Status if not draft, show publicly and show UserData
const content = 
  [
    {
      "id": "0970b996-0d96-48b5-bd8b-bc1ef4ce0702",
      "type": "heading",
      "props": {
        "textColor": "default",
        "backgroundColor": "default",
        "textAlignment": "left",
        "level": 1
      },
      "content": [
        {
          "type": "text",
          "text": "Raymond Postrero",
          "styles": {}
        }
      ],
      "children": []
    },
    {
      "id": "e0fc5862-b17c-42d0-b47a-26a392d70eda",
      "type": "heading",
      "props": {
        "textColor": "default",
        "backgroundColor": "default",
        "textAlignment": "left",
        "level": 2
      },
      "content": [
        {
          "type": "text",
          "text": "Daddielux grind",
          "styles": {}
        }
      ],
      "children": []
    },
    {
      "id": "95f864ab-f865-462c-8508-a8eae99de6f2",
      "type": "heading",
      "props": {
        "textColor": "default",
        "backgroundColor": "default",
        "textAlignment": "left",
        "level": 3
      },
      "content": [
        {
          "type": "text",
          "text": "Yoyoyoyoyoyoyo",
          "styles": {}
        }
      ],
      "children": []
    },
    {
      "id": "3250c8c6-3cf0-4302-a912-8a5dda8c6359",
      "type": "paragraph",
      "props": {
        "textColor": "default",
        "backgroundColor": "default",
        "textAlignment": "left"
      },
      "content": [],
      "children": []
    }
  ];

export default function ArticlePage() {
  return (
    <>
      <div className="prose mx-auto max-w-2xl mt-16">
        <div className="max-w-prose">
          <ArticleHeading title={"data.article.title"} tags={["Programming", "Sports"]} />

          <ArticleCreator
            username="Jace Gonzlaes"
            date="2021-05-22T00:00:00.000Z"
            avatar="hit"
          />
        </div>

        <Separator className="my-3" />
        <ArticleMetadata upvotes={12} downvotes={12} bookmarked={true} />
        <Separator className="my-3" />
        <div className="max-w-prose">
        <Editor initialContent={JSON.stringify(content)} editable={false}/>
        </div>

        
      </div>
    </>
  );
}
