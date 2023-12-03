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
const content = ["Hello"];

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
  content_preview: string;
  date_created: string;
  last_edited: string;
  author: Author;
  url: string;
}

export default function ArticlePage({
  searchParams,
}: {
  searchParams: {
    viewurl: string;
  };
}) {
  const [articleData, setArticleData] = useState<any>(null);
  const [upvotes, setUpvotes] = useState(12);
  const [downvotes, setDownvotes] = useState(12);
  const [bookmarked, setBookmarked] = useState(true);
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const [hasDownvoted, setHasDownvoted] = useState(false);

  useEffect(() => {
    fetch('http://localhost:8000' + searchParams.viewurl)
      .then((response) => response.json())
      .then((data: Article[]) => {
        setArticleData(data);
      })
      .catch((error) => console.error('Error fetching articles:', error));
  }, []);

 
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
          {articleData && articleData.map((article: Article) => (
            <div key={article.id}>
              <ArticleHeading
                title={article.title}
                // tags={["Programming", "Sports"]} // You can replace this with the actual tags if available
              />
              <ArticleCreator
                username={article.author.username}
                date={article.date_created}
                avatar={article.author.profile_picture}
              />
              <Separator className="my-3" />
              <ArticleMetadata
                upvotes={upvotes} // You may want to replace these with actual values from the article
                downvotes={downvotes}
                bookmarked={bookmarked}
                onUpvote={handleUpvote}
                onDownvote={handleDownvote}
                onToggleBookmark={handleToggleBookmark}
              />
              <Separator className="my-3" />
              <div className="max-w-prose">
                {/* Use actual content data from the article */}
                <Editor initialContent={article.content_preview} editable={false} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
