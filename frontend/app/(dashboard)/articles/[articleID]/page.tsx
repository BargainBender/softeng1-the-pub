"use client";

import {
  Heart,
  Bookmark,
  Lasso,
  Ear,
  Dot,
  ArrowUp,
  ArrowBigUp,
  ArrowBigDown,
} from "lucide-react";
import ArticleHeading from "../components/article-heading";
import ArticleCreator from "../components/article-creator";
import { Separator } from "@/components/ui/separator";
import ArticleMetadata from "../components/article-metadata";

// TODO: Status if not draft, show publicly and show UserData

export default function ArticlePage() {
  return (
    <>
      <div className="prose mx-auto max-w-2xl mt-16">
        <div className="max-w-prose">
          <ArticleHeading
            title={"data.article.title"}
            tags={"data.article.tags"}
            subtitle={"data.article.subtitle"}
          />

          <ArticleCreator
            username="Jace Gonzlaes"
            date="2021-05-22T00:00:00.000Z"
            avatar="hit"
          />
        </div>

        <Separator className="my-3" />
        <ArticleMetadata upvotes={12} downvotes={12} bookmarked={true} />
        <Separator className="my-3" />
      </div>
    </>
  );
}
