import React, { useState } from "react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Toggle button (visible only on mobile) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-16 left-0 z-50 p-2 bg-green-600 text-white shadow-md"
      >
        {isOpen ? "Close" : "Menu"}
      </button>

      {/* Sidebar */}
      <div
        className={`sticky top-0 left-0 h-[calc(100vh-64px)] w-64 bg-gray-200 border-r border-gray-300 p-4 overflow-y-auto transform transition-transform duration-300 ease-in-out z-40
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <h2 className="text-lg font-semibold mb-4 text-gray-700">All Chats</h2>
        <ul className="space-y-2">
          <li className="p-2 rounded-lg hover:bg-green-100 cursor-pointer text-gray-800">
            Chat 1
          </li>
          <li className="p-2 rounded-lg hover:bg-green-100 cursor-pointer text-gray-800">
            Chat 2
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
