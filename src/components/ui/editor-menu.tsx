import { type Editor } from "@tiptap/react";
import React from "react";
import {
  Bold,
  Heading1,
  Italic,
  List,
  ListOrdered,
  Strikethrough,
} from "lucide-react";
import { Button } from "../ui/button";
interface Props {
  editor: Editor | null;
}
const EditorMenu = ({ editor }: Props) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center gap-2 rounded-sm border p-2">
      <Button
        size="sm"
        variant="ghost"
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "is-active" : ""}
      >
        <Bold className="size-4" />
      </Button>
      <Button
        size="sm"
        variant="ghost"
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "is-active" : ""}
      >
        <Italic className="size-4" />
      </Button>
      <Button
        size="sm"
        variant="ghost"
        type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={editor.isActive("strike") ? "is-active" : ""}
      >
        <Strikethrough className="size-4" />
      </Button>
      <Button
        size="sm"
        variant="ghost"
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bulletList") ? "is-active" : ""}
      >
        <List />
      </Button>
      <Button
        size="sm"
        variant="ghost"
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive("orderedList") ? "is-active" : ""}
      >
        <ListOrdered />
      </Button>
      <Button
        size="sm"
        variant="ghost"
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive("heading", { level: 1 }) ? "is-active" : ""}
      >
        <Heading1 />
      </Button>
    </div>
  );
};

export default EditorMenu;
