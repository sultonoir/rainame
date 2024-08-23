/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */

"use client";
import React, { useEffect, useState, useRef } from "react";

interface Message {
  id: string;
  message: string;
  time: number;
  test: number;
}

const WebSocketComponent: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState<string>("");
  const [typingStatus, setTypingStatus] = useState<string | null>(null);
  const [ws, setWs] = useState<WebSocket | null>(null);

  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const socket = new WebSocket(`ws://localhost:3001/conversations/ws`);

    socket.onopen = () => {
      console.log("Terhubung ke WebSocket");
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.typing !== undefined) {
        setTypingStatus(data.typing ? `${data.id} sedang mengetik...` : null);
      } else {
        setMessages((prevMessages) => [...prevMessages, data]);
      }
    };

    socket.onerror = (error) => {
      console.error("WebSocket Error:", error);
    };

    socket.onclose = () => {
      console.log("WebSocket ditutup");
    };

    setWs(socket);

    return () => {
      socket.close();
    };
  }, []);

  const sendMessage = () => {
    if (ws && inputMessage.trim() !== "") {
      const message = { message: inputMessage };
      ws.send(JSON.stringify(message));
      setInputMessage("");
    }
  };

  const handleTyping = () => {
    if (ws) {
      ws.send(JSON.stringify({ typing: true }));

      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      typingTimeoutRef.current = setTimeout(() => {
        ws.send(JSON.stringify({ typing: false }));
      }, 1000); // Mengirim "stop typing" setelah 1 detik tidak mengetik
    }
  };

  return (
    <div>
      <h1>WebSocket Chat</h1>
      <div>
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleTyping}
          placeholder="Tulis pesan"
        />
        <button onClick={sendMessage}>Kirim</button>
      </div>
      <div>
        {typingStatus && <p>{typingStatus}</p>}
        <h2>Pesan</h2>
        <ul>
          {messages.map((message, index) => (
            <li key={index}>
              <strong>{message.id}:</strong> {message.message} (Test:{" "}
              {message.test}, Time:{" "}
              {new Date(message.time).toLocaleTimeString()})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WebSocketComponent;
