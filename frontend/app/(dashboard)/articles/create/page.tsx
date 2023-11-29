// Create Form for Article
"use client";

import dynamic from "next/dynamic";

import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CreateForm } from "./components/create-form";
import { Block, BlockNoteEditor,  } from '@blocknote/core';
import { BlockNoteView, lightDefaultTheme, useBlockNote } from "@blocknote/react";
import "@blocknote/core/style.css";


interface CreateArticlePageProps {}

const CreateArticlePage: React.FC<CreateArticlePageProps> = () => {
    // Stores the editor's contents as an array of Block objects.
    const [blocks, setBlocks] = useState<Block[] | null>(null);
  
    // Creates a new editor instance.
    const editor: BlockNoteEditor = useBlockNote({
      // Listens for when the editor's contents change.
      onEditorContentChange: (editor) => 
        // Converts the editor's contents to an array of Block objects.
        setBlocks(editor.topLevelBlocks)
    })
    



  return (
    <>
      <div className="prose mx-auto max-w-2xl mt-16">
        <div className="max-w-prose">
          <CreateForm />
        </div>
        <Separator className="max-w-prose my-6" />
        <div className="max-w-prose mt-3 gap-6">
        <BlockNoteView editor={editor} theme={lightDefaultTheme}/>

        </div>

        <Button
          onClick={() => {
            console.log("This is a submit",blocks);
          }}
        >
          Submit
        </Button>
      </div>
    </>
  );
}

export default CreateArticlePage;