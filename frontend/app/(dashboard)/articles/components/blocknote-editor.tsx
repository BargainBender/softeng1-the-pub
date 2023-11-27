"use client"; // this registers <Editor> as a Client Component
import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { BlockNoteView, useBlockNote, Theme, lightDefaultTheme } from "@blocknote/react";
import "@blocknote/core/style.css";

interface EditorProps {
  onChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
};

export const Editor = ({
  onChange,
  initialContent,
  editable
}: EditorProps) => {

  const editor: BlockNoteEditor = useBlockNote({
    editable,
    initialContent: initialContent ? JSON.parse(initialContent) as PartialBlock[] : undefined,
    onEditorContentChange: (editor) => {
      onChange(JSON.stringify(editor.topLevelBlocks, null, 2));
    },
  })

  return (
    <div><BlockNoteView 
    editor={editor}
    theme={lightDefaultTheme}/></div>
  )
}