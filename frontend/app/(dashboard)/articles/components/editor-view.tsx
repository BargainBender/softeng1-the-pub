"use client";

import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { BlockNoteView, useBlockNote, lightDefaultTheme } from "@blocknote/react";
import "@blocknote/core/style.css";

interface EditorProps {
  onChange: (value: string) => void;
  content?: string;
  editable?: boolean;
}

export const Editor = ({ onChange, initialContent, editable }: EditorProps) => {
  const editor: BlockNoteEditor = useBlockNote({
    editable,
    initialContent: initialContent
      ? JSON.parse(initialContent) as PartialBlock[]
      : undefined,
  });


  return <div>
    <BlockNoteView 
    editor={editor}
    theme={lightDefaultTheme}

    />
  </div>;
};
