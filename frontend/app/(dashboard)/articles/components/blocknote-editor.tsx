"use client"; // this registers <Editor> as a Client Component
import { useState } from "react";
import { BlockNoteEditor, PartialBlock, Block } from "@blocknote/core";
import { BlockNoteView, lightDefaultTheme, useBlockNote } from "@blocknote/react";
import "@blocknote/core/style.css";

// Our <Editor> component we can reuse later
export default function Editor() {
  // Stores the editor's contents as an array of Block objects.
  const [blocks, setBlocks] = useState<Block[] | null>(null);
  // Creates a new editor instance.
  const editor: BlockNoteEditor | null = useBlockNote({
    onEditorContentChange: (editor) => 
      // Converts the editor's contents to an array of Block objects.
      setBlocks(editor.topLevelBlocks)
  });

  editor.onEditorContentChange(() => {
    setBlocks(editor.topLevelBlocks)
    console.log("Content was changed:", blocks);
  });
  

  // Renders the editor instance using a React component.
  return <BlockNoteView editor={editor} theme={lightDefaultTheme}/>;
}