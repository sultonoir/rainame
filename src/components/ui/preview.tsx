"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

interface Props {
  values?: string;
}

const Preview = ({ values }: Props) => {
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
    editable: false,
    editorProps: {
      attributes: {
        class: "h-fit lg:text-sm",
      },
    },
    content: values,
  });

  return (
    <div className="flex flex-col justify-stretch gap-2">
      <EditorContent editor={editor} />
    </div>
  );
};

export default Preview;
