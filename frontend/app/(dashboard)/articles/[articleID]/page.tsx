"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import ArticleHeading from "../components/article-heading";
import ArticleCreator from "../components/article-creator";
import { Separator } from "@/components/ui/separator";
import ArticleMetadata from "../components/article-metadata";
const Editor = dynamic(() => import("../components/editor-view"), {
  ssr: false,
});
// TODO: Status if not draft, show publicly and show UserData
const content = [
  {
    id: "16344aa2-7ac1-40a2-b759-a64e67a2de88",
    type: "paragraph",
    props: {
      textColor: "default",
      backgroundColor: "default",
      textAlignment: "left",
    },
    content: [
      {
        type: "text",
        text: "Ako si Raymond Lorem",
        styles: {},
      },
    ],
    children: [],
  },
  {
    id: "442c28a6-5ee7-4ca1-9357-c93d02df64f7",
    type: "paragraph",
    props: {
      textColor: "default",
      backgroundColor: "default",
      textAlignment: "left",
    },
    content: [
      {
        type: "text",
        text: "A precision and recall score of 1 is generally considered excellent. In binary classification, a perfect precision of 1 indicates that every instance predicted as positive is indeed positive, with no false positives. Similarly, a recall of 1 suggests that every actual positive instance is correctly identified, and there are no false negatives.",
        styles: {},
      },
    ],
    children: [],
  },
  {
    id: "a73c08e4-2a57-43ce-8b1a-2ac38d8b53e1",
    type: "paragraph",
    props: {
      textColor: "default",
      backgroundColor: "default",
      textAlignment: "left",
    },
    content: [
      {
        type: "text",
        text: "Perfect precision and recall are rare in practical scenarios and often come with trade-offs. Achieving both scores of 1 could imply an ideal scenario where the model makes no errors in either predicting positive instances or capturing all actual positives. However, it's crucial to assess these scores in the context of the specific problem domain and the potential trade-offs between precision and recall. In some cases, maximizing one metric may result in a decrease in the other, so the choice depends on the specific goals and requirements of the application.",
        styles: {},
      },
    ],
    children: [],
  },
  {
    id: "8ee28a55-b75d-4a57-b49f-1b3fcd257a1b",
    type: "paragraph",
    props: {
      textColor: "default",
      backgroundColor: "default",
      textAlignment: "left",
    },
    content: [],
    children: [],
  },
];

export default function ArticlePage() {
  const [upvotes, setUpvotes] = useState(12);
  const [downvotes, setDownvotes] = useState(12);
  const [bookmarked, setBookmarked] = useState(true);
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const [hasDownvoted, setHasDownvoted] = useState(false);

  const handleUpvote = () => {
    if (!hasUpvoted && !hasDownvoted) {
      // Update the upvote logic, e.g., increment the upvote count
      setUpvotes((prevUpvotes) => prevUpvotes + 1);
      setHasUpvoted(true);
    } else if (hasUpvoted) {
      // Remove the upvote logic, e.g., decrement the upvote count
      setUpvotes((prevUpvotes) => prevUpvotes - 1);
      setHasUpvoted(false);
    }
    // No action if the user has already downvoted
  };

  const handleDownvote = () => {
    if (!hasUpvoted && !hasDownvoted) {
      // Update the downvote logic, e.g., increment the downvote count
      setDownvotes((prevDownvotes) => prevDownvotes + 1);
      setHasDownvoted(true);
    } else if (hasDownvoted) {
      // Remove the downvote logic, e.g., decrement the downvote count
      setDownvotes((prevDownvotes) => prevDownvotes - 1);
      setHasDownvoted(false);
    }
    // No action if the user has already upvoted
  };

  const handleToggleBookmark = () => {
    // Update the bookmark logic, e.g., toggle the bookmarked state
    setBookmarked((prevBookmarked) => !prevBookmarked);
  };

  return (
    <>
      <div className="prose mx-auto max-w-2xl mt-16">
        <div className="max-w-prose">
          <ArticleHeading
            title={"data.article.title"}
            tags={["Programming", "Sports"]}
          />

          <ArticleCreator
            username="Jace Gonzlaes"
            date="2021-05-22T00:00:00.000Z"
            avatar="hit"
          />
        </div>

        <Separator className="my-3" />
        <ArticleMetadata
          upvotes={upvotes}
          downvotes={downvotes}
          bookmarked={bookmarked}
          onUpvote={handleUpvote}
          onDownvote={handleDownvote}
          onToggleBookmark={handleToggleBookmark}
        />
        <Separator className="my-3" />
        <div className="max-w-prose">
          <Editor initialContent={JSON.stringify(content)} editable={false} />
        </div>
      </div>
    </>
  );
}
