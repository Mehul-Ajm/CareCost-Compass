
"use client";
import React, { useState } from "react";

export default function AIChatPage() {
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Hello! How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;
    const userMessage = { sender: "user", text: input };
    setMessages((msgs) => [...msgs, userMessage]);
    setInput("");
    setLoading(true);
    // Placeholder for AI response
    const aiResponse = await fakeAIResponse(input);
    setMessages((msgs) => [...msgs, { sender: "ai", text: aiResponse }]);
    setLoading(false);
  }

  // Simulate an AI response (replace with real API call)
  async function fakeAIResponse(userInput: string) {
    return new Promise<string>((resolve) => {
      setTimeout(() => {
        resolve("AI says: " + userInput.split("").reverse().join(""));
      }, 1000);
    });
  }

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">AI Chat</h1>
      <div className="border rounded p-4 h-64 overflow-y-auto bg-white mb-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={msg.sender === "user" ? "text-right" : "text-left"}>
            <span className={msg.sender === "user" ? "text-blue-600" : "text-green-600"}>
              <b>{msg.sender === "user" ? "You" : "AI"}:</b> {msg.text}
            </span>
          </div>
        ))}
        {loading && <div className="text-green-600">AI is typing...</div>}
      </div>
      <form onSubmit={sendMessage} className="flex gap-2">
        <input
          className="flex-1 border rounded px-2 py-1"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          disabled={loading}
        />
        <button
          className="bg-blue-500 text-white px-4 py-1 rounded disabled:opacity-50"
          type="submit"
          disabled={loading || !input.trim()}
        >
          Send
        </button>
      </form>
    </div>
  );
}
