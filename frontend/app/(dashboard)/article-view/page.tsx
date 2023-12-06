"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import ArticleHeading from "./components/article-heading";
import ArticleCreator from "./components/article-creator";
import { Separator } from "@/components/ui/separator";
import ArticleMetadata from "./components/article-metadata";

const Editor = dynamic(() => import("./components/editor-view"), {
  ssr: false,
});

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

export default function ArticlePage({
  searchParams,
}: {
  searchParams: {
    viewurl: string;
  };
}) {
  const [articleData, setArticleData] = useState<Article | null>(null);
  // Const store data at time.
  const [hasUpvoted, setHasUpvoted] = useState<boolean>(false);
  const [hasDownVoted, setHasDownVoted] = useState<boolean>(false);
  const [bookmarked, setBookmarked] = useState(true);

  useEffect(() => {
    // Fetch article data
    fetch("http://localhost:8000" + searchParams.viewurl)
      .then((response) => response.json())
      .then((data: Article) => {
        setArticleData(data);
      })
      .catch((error) => console.error("Error fetching articles:", error));
  }, [searchParams.viewurl]);

  const handleVote = async (isUpvote: boolean) => {
    try {
      const token = localStorage.getItem("authToken");

      if (articleData) {
        const voteEndpoint = `http://localhost:8000${searchParams.viewurl}vote/`;

        // Check if the user is removing their vote
        // const isRemovingVote =
        //   (isUpvote && "upvotes" in articleData) ||
        //   (!isUpvote && "downvotes" in articleData);

        console.log(isUpvote);
        // const response = await fetch(voteEndpoint, {
        //   method: isRemovingVote ? "DELETE" : "PUT",
        //   headers: {
        //     "Content-Type": "application/json",
        //     Authorization: `Bearer ${token}`,
        //   },
        //   body: isRemovingVote
        //     ? JSON.stringify({
        //         // Include any necessary parameters for removing the vote
        //       })
        //     : JSON.stringify({
        //         is_upvote: isUpvote,
        //       }),
        // });

        // if (response.ok) {
        //   if (isUpvote) {
        //   } else {
        //   }
        // } else {
        //   // Handle error scenarios
        // }
      }
    } catch (error) {
      console.error(
        `Error ${isUpvote ? "upvoting" : "downvoting"} article:`,
        error
      );
    }
  };

  const handleToggleBookmark = () => {
    setBookmarked((prevBookmarked) => !prevBookmarked);
  };

  return (
    <>
      <div className="prose mx-auto max-w-2xl mt-16">
        <div className="max-w-prose">
          {articleData &&
            (Array.isArray(articleData) ? (
              articleData.map((article: Article) => (
                <div key={article.id}>
                  <ArticleHeading
                    title={article.title}
                    tags={["Programming", "Sports"]}
                  />
                  <ArticleCreator
                    username={article.author.username}
                    date={article.date_created}
                    avatar={article.author.profile_picture}
                  />
                  <Separator className="my-3" />
                  <ArticleMetadata
                    upvotes={article.upvotes}
                    downvotes={article.downvotes}
                    bookmarked={bookmarked}
                    onUpvote={() => handleVote(true)}
                    onDownvote={() => handleVote(false)}
                    onToggleBookmark={handleToggleBookmark}
                  />
                  <Separator className="my-3" />
                  <div className="max-w-prose">
                    <Editor initialContent={article.content} editable={false} />
                  </div>
                </div>
              ))
            ) : (
              <div key={articleData.id}>
                <ArticleHeading
                  title={articleData.title}
                  tags={["Programming", "Sports"]}
                />
                <ArticleCreator
                  username={articleData.author.username}
                  date={articleData.date_created}
                  avatar={articleData.author.profile_picture}
                />
                <Separator className="my-3" />
                <ArticleMetadata
                  upvotes={articleData.upvotes}
                  downvotes={articleData.downvotes}
                  bookmarked={bookmarked}
                  onUpvote={() => handleVote(true)}
                  onDownvote={() => handleVote(false)}
                  onToggleBookmark={handleToggleBookmark}
                />
                <Separator className="my-3" />
                <div className="max-w-prose">
                  <Editor
                    initialContent={articleData.content}
                    editable={false}
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
