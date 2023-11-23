// Create Form for Article
"use client";

import dynamic from "next/dynamic";

import { Separator } from "@/components/ui/separator";

// Dynamic import of the editor
const Editor = dynamic(() => import("../components/blocknote-editor"), {
  ssr: false,
});

// Form for the Title, subtitle, tags

export default function CreateArticlePage() {
  return (
    <>
      <div className="prose mx-auto max-w-2xl mt-16">
        <Editor />
        <Separator className="max-w-prose mt-6" />
        <div className="max-w-prose mt-3 gap-6">
          <Editor />
        </div>
      </div>
    </>
  );
}
