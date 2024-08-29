"use client";
import React, { useState } from "react";
import { Clipboard } from "lucide-react";
import { Button } from "./button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "./card";

type JsonData = Record<string, unknown>;

const JsonDisplay: React.FC<JsonData> = ({ data }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const text = JSON.stringify(data, null, 2);
    void navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <Card className="max-w-sm">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <pre className="overflow-x-auto rounded-lg bg-secondary p-2 font-mono text-sm">
          {JSON.stringify(data, null, 2)}
        </pre>
        <Button
          className="mt-2 rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
          onClick={handleCopy}
        >
          {copied ? (
            <span className="flex items-center">
              <Clipboard className="mr-2" />
              Copied!
            </span>
          ) : (
            <span className="flex items-center">
              <Clipboard className="mr-2" />
              Copy
            </span>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default JsonDisplay;
