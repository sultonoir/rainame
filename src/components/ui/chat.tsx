"use client";

import { useSocket } from "@/provider/socket-provider";
import { useState, useEffect } from "react";
import { Input } from "./input";
import { Button } from "./button";

const Chat = () => {
  const { socket, isConnected } = useSocket();
  const [message, setMessage] = useState<string>("");
  const [chatLog, setChatLog] = useState<string[]>([]);

  const sendMessage = () => {
    if (socket && isConnected && message.trim()) {
      socket.emit("chat message", message); // Emit pesan ke server
      setMessage("");
    }
  };

  // useEffect to add socket event listener and clean it up on unmount
  useEffect(() => {
    if (socket && isConnected) {
      const messageHandler = (msg: string) => {
        setChatLog((prev) => [...prev, msg]);
      };

      socket.on("chat message", messageHandler);

      // Cleanup listener on component unmount
      return () => {
        socket.off("chat message", messageHandler);
      };
    }
  }, [socket, isConnected]); // Only run effect when socket or connection status changes

  return (
    <div>
      <h1>Simple Chat</h1>
      <div>
        <ul className="flex flex-row flex-wrap gap-2">
          {chatLog.map((msg, index) => (
            <li key={index} className="rounded-lg border px-2 py-1">
              {msg}
            </li>
          ))}
        </ul>
      </div>
      <Input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <Button onClick={sendMessage} disabled={!isConnected || !message.trim()}>
        Send
      </Button>
    </div>
  );
};

export default Chat;
