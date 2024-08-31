"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import MenuBar from "./menubar";

interface Props {
  values?: string;
  onChange: (values: string) => void;
}

const Editor = ({ values, onChange }: Props) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
          HTMLAttributes: {
            class: "list-disc pl-[30px]",
          },
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
          HTMLAttributes: {
            class: "list-decimal pl-[30px]",
          },
        },
        heading: {
          levels: [1],
          HTMLAttributes: {
            class: "text-2xl ",
          },
        },
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "min-h-[250px] border border-border px-5 py-2 rounded-sm focus:border-primary/50 focus:outline-none focus:ring focus:ring-primary/30",
      },
    },
    content: values,
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  return (
    <div className="flex flex-col justify-stretch gap-2">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default Editor;
