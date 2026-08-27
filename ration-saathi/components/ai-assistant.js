"use client";
import { useState, useRef, useEffect } from "react";

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! 👋 I'm here to help with questions about ration cards and this app. What can I help you with?",
      sender: "bot",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput("");

    // Add user message to chat
    setMessages((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        text: userMessage,
        sender: "user",
      },
    ]);

    setLoading(true);

    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) {
        const error = await response.json();
        setMessages((prev) => [
          ...prev,
          {
            id: prev.length + 1,
            text: error.error || "Sorry, I couldn't process that. Try again?",
            sender: "bot",
            isError: true,
          },
        ]);
      } else {
        const data = await response.json();
        setMessages((prev) => [
          ...prev,
          {
            id: prev.length + 1,
            text: data.message,
            sender: "bot",
          },
        ]);
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          text: "Sorry, something went wrong. Please try again.",
          sender: "bot",
          isError: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-4 z-40 flex items-center gap-2 bg-service-600 hover:bg-service-700 text-white font-bold py-3 px-4 rounded-full shadow-lg transition-all var(--transition-normal) active:scale-95 hover:shadow-xl"
        aria-label="Open assistant"
      >
        <span className="text-lg">💬</span>
        <span className="hidden sm:inline text-sm">Ask me anything</span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-24 right-4 z-50 w-full max-w-sm sm:max-w-md flex flex-col bg-white rounded-2xl border border-slate-200 shadow-2xl max-h-[70vh] animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* Header */}
      <div className="flex items-center justify-between bg-gradient-to-r from-service-600 to-service-700 text-white p-4 rounded-t-2xl">
        <div className="flex items-center gap-2">
          <span className="text-lg">🤖</span>
          <div>
            <h3 className="font-bold text-sm">Ration Assistant</h3>
            <p className="text-xs opacity-90">Ask in plain language</p>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="text-white hover:opacity-75 transition-opacity text-xl"
          aria-label="Close assistant"
        >
          ✕
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-xs px-4 py-3 rounded-lg text-sm leading-relaxed ${
                msg.sender === "user"
                  ? "bg-service-600 text-white rounded-br-none"
                  : msg.isError
                  ? "bg-red-100 text-red-900 rounded-bl-none"
                  : "bg-white text-slate-800 border border-slate-200 rounded-bl-none"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white text-slate-800 border border-slate-200 rounded-lg rounded-bl-none px-4 py-3">
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSendMessage} className="border-t border-slate-200 p-4 bg-white rounded-b-2xl">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask your question..."
            disabled={loading}
            className="flex-1 input-field text-sm"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="bg-service-600 hover:bg-service-700 disabled:opacity-50 text-white font-bold px-4 py-2 rounded-lg transition-all var(--transition-normal)"
          >
            Send
          </button>
        </div>
        <p className="text-xs text-slate-500 mt-2">
          💡 Ask about ration cards, applications, shops, or PDS guidelines
        </p>
      </form>
    </div>
  );
}
