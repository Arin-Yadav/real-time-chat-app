import React, { useEffect, useState } from "react";
import { useRef } from "react";
import connectWS from "../Websocket";

const ChatHome = () => {
  const [userName, setUserName] = useState("");
  const [showPrompt, setShowPrompt] = useState(true);
  const [tempName, setTempName] = useState("");
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [typers, setTypers] = useState([]);
  const messagesEndRef = useRef(null);
  const timer = useRef(null);

  const socket = useRef(null);
  useEffect(() => {
    socket.current = connectWS();
    socket.current.on("connect", () => {
      socket.current.on("roomNotice", (userName) => {
        console.log(`${userName} has joined the room`);
      });

      socket.current.on("message", (message) => {
        setMessages((prev) => [...prev, message]);
      });

      socket.current.on("typing", (userName) => {
        setTypers((prev) => {
          const isExist = prev.includes(userName);
          if (!isExist) {
            return [...prev, userName];
          }
          return prev;
        });
      });

      socket.current.on("stopTyping", (userName) => {
        setTypers((prev) => prev.filter((typers) => typers !== userName));
      });
    });
    return () => {
      if (socket.current) {
        socket.current.off("roomNotice");
        socket.current.off("message");
        socket.current.off("typing");
        socket.current.off("stopTyping");
        socket.current.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (message) {
      socket.current.emit("typing", userName);
      clearTimeout(timer.current);
    }

    timer.current = setTimeout(() => {
      socket.current.emit("stopTyping", userName);
    }, 1000);

    return () => {
      clearTimeout(timer.current);
    };
  }, [message, userName]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Main chat input submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const newMsg = {
      text: message,
      sender: userName,
      timestamp: new Date().toISOString(),
    };
    socket.current.emit("message", newMsg);
    setMessage("");
  };

  // Join chat: set username and hide prompt
  const handleJoin = () => {
    const cleaned = tempName.trim();
    if (!cleaned) return;
    socket.current.emit("joinRoom", cleaned);
    setUserName(cleaned);
    setShowPrompt(false);
  };

  // If prompt is active → block chat
  if (showPrompt) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white w-full max-w-sm rounded-xl shadow-lg p-6 text-black">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Enter your name
          </h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleJoin();
            }}>
            <input
              type="text"
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              placeholder="e.g., John"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-lg transition cursor-pointer">
              Join Chat
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] overflow-y-auto max-w-screen bg-gray-100">
      <div className="bg-gray-200 p-4 flex items-center justify-between h-16 sticky top-0 w-full z-50 shadow-md">
        <div className="flex flex-col items-center">
          <h1 className="sm:text-lg md:text-xl font-semibold flex items-center gap-2">
            💬 Chat App
          </h1>
          {typers.length ? <p>{typers.join(", ")} is typing...</p> : ""}
        </div>
        <p className="text-xs sm:text-sm capitalize">Logged in as {userName}</p>
      </div>
      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-gray-50">
        <ul className="flex-1 px-3 sm:px-4 py-3 space-y-3 overflow-y-auto">
          {messages.map((msg, index) => {
            const isMine = msg.sender === userName;
            return (
              <li
                key={index}
                className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
                <div
                  className={`px-4 py-2 rounded-2xl shadow-sm wrap-break-word max-w-[70%] sm:max-w-[60%] ${
                    isMine
                      ? "bg-green-500 text-white"
                      : "bg-white text-gray-900"
                  }`}>
                  <p className="w-full">{msg.text}</p>
                  <div className="text-xs flex gap-3 justify-between mt-1">
                    <span className="font-semibold capitalize">
                      {msg.sender}
                    </span>
                    <span>
                      {new Date(msg.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
              </li>
            );
          })}
          <div ref={messagesEndRef} />
        </ul>
      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center p-3 border-t border-gray-200 bg-white sticky bottom-0 shadow-md">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 border border-gray-300 px-3 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-green-400"
          type="text"
          placeholder="Type a message..."
        />
        <button
          type="submit"
          className="ml-2 px-4 py-2 w-28 bg-green-600 text-white rounded-full hover:bg-green-700 transition">
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatHome;
