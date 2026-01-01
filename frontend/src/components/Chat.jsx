import React, { useEffect, useMemo, useState } from "react";
import { useRef } from "react";
import { io } from "socket.io-client";

const Chat = () => {
  const socket = useMemo(() => io("http://localhost:3000"), []);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const [username, setUsername] = useState("");
  const [showPrompt, setShowPrompt] = useState(true);
  const [tempName, setTempName] = useState("");

  const messagesEndRef = useRef(null);

  useEffect(() => {
    socket.on("connect", () => {
      console.log(`user connected ${socket.id}`);
    });

    socket.on("received-message", (message) => {
      // console.log(message);
      setMessages((prev) => [...prev, message]);
      // setMessages((messages) => [...messages, message]) another way
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Main chat input submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const newMsg = {
      text: message,
      sender: username,
      timestamp: new Date().toISOString(),
    };
    socket.emit("message", newMsg);
    setMessage("");
  };

  // Join chat: set username and hide prompt
  const handleJoin = () => {
    const cleaned = tempName.trim();
    if (!cleaned) return;
    setUsername(cleaned);
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
        </div>{" "}
      </div>
    );
  }

  return (
    // <div className="h-screen w-full flex flex-col">
    //   {/* Header */}
    //   <div className="bg-green-500 text-white p-4">Chat App</div>

    //   {/* message area  */}
    //   <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
    //     <h2>Messages</h2>
    //     <ul>
    //       {messages.map((msg, index) => (
    //         <li key={index}>{msg}</li>
    //       ))}
    //     </ul>
    //   </div>

    //   <div>
    //     <form
    //       onSubmit={handleSubmit}
    //       className="flex items-center p-3 border-t bg-gray-50">
    //       <input
    //         value={message}
    //         onChange={(e) => {
    //           setMessage(e.target.value);
    //         }}
    //         className="flex-1 border border-gray-400 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
    //         type="text"
    //         placeholder="Enter message"
    //       />
    //       <button
    //         type="submit"
    //         className="ml-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
    //         Send
    //       </button>
    //     </form>
    //   </div>
    // </div>

    // <div className="min-h-screen w-full flex flex-col bg-gray-100">
    //   {/* Header */}
    //   <div className="bg-green-500 text-white p-4 flex items-center justify-between fixed top-0 w-full z-20 shadow-md">
    //     <h1 className="text-2xl font-bold">💬 Chat App</h1>
    //     <p>Logged in as {username}</p>
    //   </div>

    //   {/* Main message div  */}

    //   {/* Left div  */}
    //   <div className="pt-16 flex w-full h-screen">
    //     <div className="min-w-[25%] flex-none bg-red-500">
    //       <h2>All chats</h2>
    //     </div>

    //     {/* Right div  */}
    //     <div className="w-full bg-amber-200 overflow-hidden overflow-y-auto scrollbar-hide">
    //       {/* Messages Area */}
    //       <div className="flex-1 flex flex-col pt-16">
    //         <ul className="flex-1 px-4 py-2 space-y-2">
    //           {messages.map((msg, index) => {
    //             const isMine = msg.sender === username;
    //             return (
    //               <li
    //                 key={index}
    //                 className={`flex ${
    //                   isMine ? "justify-end" : "justify-start"
    //                 } mb-2`}>
    //                 <div
    //                   className={`px-4 py-2 rounded-lg shadow-sm ${
    //                     isMine
    //                       ? "bg-green-500 text-white"
    //                       : "bg-white text-black"
    //                   } max-w-[40%] wrap-break-word`}>
    //                   {/* <div className="text-xs font-semibold mb-1">
    //                 {isMine ? "You" : msg.sender}
    //               </div> */}
    //                   {msg.text}
    //                   <div className="text-[11px] mt-1 text-black-200">
    //                     {new Date(msg.timestamp).toLocaleTimeString([], {
    //                       hour: "2-digit",
    //                       minute: "2-digit",
    //                     })}
    //                   </div>
    //                 </div>
    //               </li>
    //             );
    //           })}
    //           <div ref={messagesEndRef} />
    //         </ul>

    //         {/* Input Area */}
    //         <form
    //           onSubmit={handleSubmit}
    //           className="flex items-center p-3 border-t sticky bottom-0 bg-white w-full z-20">
    //           <input
    //             value={message}
    //             onChange={(e) => setMessage(e.target.value)}
    //             className="flex-1 border border-gray-300 px-3 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-green-400"
    //             type="text"
    //             placeholder="Enter message"
    //           />
    //           <button
    //             type="submit"
    //             className="ml-2 px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition">
    //             Send
    //           </button>
    //         </form>
    //       </div>
    //     </div>
    //   </div>
    // </div>

    <div className="h-screen w-full flex flex-col bg-gray-100">
      {/* Header */}
      <div className="bg-green-600 text-white p-4 flex items-center justify-between fixed top-0 w-full z-20 shadow-md">
        <h1 className="sm:text-lg md:text-xl font-semibold flex items-center gap-2">
          💬 Chat App
        </h1>
        <p className="text-xs sm:text-sm">Logged in as {username}</p>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row w-full h-full mt-16">
        {/* Sidebar */}
        <div className="hidden md:block md:w-1/4 flex-none bg-gray-200 border-r border-gray-200 p-4 overflow-y-auto">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            All Chats
          </h2>
          <ul className="space-y-2">
            <li className="p-2 rounded-lg hover:bg-green-100 cursor-pointer text-gray-800">
              Chat 1
            </li>
            <li className="p-2 rounded-lg hover:bg-green-100 cursor-pointer text-gray-800">
              Chat 2
            </li>
          </ul>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-gray-50 w-full">
          {/* Messages */}
          <ul className="flex-1 px-2 sm:px-4 py-2 space-y-3 overflow-y-auto">
            {messages.map((msg, index) => {
              const isMine = msg.sender === username;
              return (
                <li
                  key={index}
                  className={`flex ${
                    isMine ? "justify-end" : "justify-start"
                  }`}>
                  <div
                    className={`px-3 sm:px-4 py-2 rounded-2xl shadow-sm wrap-break-words max-w-[80%] sm:max-w-[60%] ${
                      isMine
                        ? "bg-green-500 text-white"
                        : "bg-white text-gray-900"
                    }`}>
                    {msg.text}
                    <div className="text-[10px] sm:text-[11px] mt-1 text-righ">
                      {new Date(msg.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                </li>
              );
            })}
            <div ref={messagesEndRef} />
          </ul>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="flex items-center p-2 sm:p-3 border-t bg-white sticky bottom-0 shadow-md">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 border border-gray-300 px-2 sm:px-3 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-green-400"
              type="text"
              placeholder="Type a message..."
            />
            <button
              type="submit"
              className="ml-2 px-3 sm:px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition">
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
