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
  "Hello",
];

export default function ArticlePage() {

  const [articleData, setArticleData] = useState<any>(null);
  const [upvotes, setUpvotes] = useState(12);
  const [downvotes, setDownvotes] = useState(12);
  const [bookmarked, setBookmarked] = useState(true);
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const [hasDownvoted, setHasDownvoted] = useState(false);


  useEffect(() => {
    // Fetch article data from the API
    const fetchArticleData = async () => {
      try {
        const response = await fetch(''); // Replace with your API endpoint
        if (response.ok) {
          const data = await response.json();
          setArticleData(data[0]); // Assuming the response is an array and you want the first item
        } else {
          console.error('Error fetching article data:', response.status);
        }
      } catch (error) {
        console.error('An error occurred while fetching article data:', error);
      }
    };

    fetchArticleData();
  }, []); // The empty dependency array ensures that this effect runs only once on mount

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
