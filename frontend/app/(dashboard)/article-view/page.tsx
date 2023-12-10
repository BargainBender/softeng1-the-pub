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
  tags: string[]; 
  vote_status: string; 
}

export default function ArticlePage({
  searchParams,
}: {
  searchParams: {
    viewurl: string;
  };
}) {
  const [articleData, setArticleData] = useState<Article | null>(null);
  const [bookmarked, setBookmarked] = useState<boolean>(true);
  const [voteStatus, setVoteStatus] = useState<string>('unvoted');
  const [upvotes, setUpvotes] = useState<number>(0);
  const [downvotes, setDownvotes] = useState<number>(0);
  const [tags, setTags] = useState<string[]>([]);


  useEffect(() => {
    // Fetch article data
    fetch("http://localhost:8000" + searchParams.viewurl)
      .then((response) => response.json())
      .then((data: Article) => {
        setArticleData(data);
        setVoteStatus(data.vote_status);
        setUpvotes(data.upvotes);
        setDownvotes(data.downvotes);
        setTags(data.tags);
      })
      .catch((error) => console.error("Error fetching articles:", error));
  }, [searchParams.viewurl]);

  const handleVote = async (isUpvote: boolean) => {
    try {
      const token = localStorage.getItem("authToken");
  
      if (articleData) {
        const voteEndpoint = `http://localhost:8000${searchParams.viewurl}vote/`;
  
        const response = await fetch(voteEndpoint, {
          method: isUpvote ? "PUT" : "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            is_upvote: isUpvote,
          }),
        });
  
        if (response.ok) {
          // Update local state after voting
          if (isUpvote) {
            setVoteStatus((prevStatus) => (prevStatus === 'upvoted' ? 'unvoted' : 'upvoted'));
            setUpvotes((prevUpvotes) => (voteStatus === 'upvoted' ? prevUpvotes - 1 : prevUpvotes + 1));
          } else {
            setVoteStatus((prevStatus) => (prevStatus === 'downvoted' ? 'unvoted' : 'downvoted'));
            setDownvotes((prevDownvotes) => (voteStatus === 'downvoted' ? prevDownvotes + 1 : prevDownvotes + 1));
          }
        } else {
          // Handle error scenarios
        }
      }
    } catch (error) {
      console.error(`Error ${isUpvote ? "upvoting" : "downvoting"} article:`, error);
    }
  };  

  const handleToggleBookmark = () => {
    setBookmarked((prevBookmarked) => !prevBookmarked);
  };

  return (
    <>
    <div className="prose mx-auto max-w-2xl mt-16">
      <div className="max-w-prose">
        {articleData && (
          <div key={articleData.id}>
            <ArticleHeading title={articleData.title} tags={tags} />
            <ArticleCreator
              username={articleData.author.username}
              date={articleData.date_created}
              avatar={articleData.author.profile_picture}
            />
            <Separator className="my-3" />
            <ArticleMetadata
              upvotes={upvotes}
              downvotes={downvotes}
              bookmarked={bookmarked}
              onUpvote={() => handleVote(true)}
              onDownvote={() => handleVote(false)}
              onToggleBookmark={handleToggleBookmark}
            />
            <Separator className="my-3" />
            <div className="max-w-prose">
              <Editor initialContent={articleData.content} editable={false} />
            </div>
          </div>
        )}
      </div>
    </div>
  </>
  );
}
