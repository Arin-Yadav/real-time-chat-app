import React from "react";

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  return (
    <div
      className={`fixed md:sticky top-16 left-0 h-[calc(100vh-64px)] w-64 bg-gray-200 border-r border-gray-300 p-4 overflow-y-auto transform transition-transform duration-300 ease-in-out z-40
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
      <h2 className="text-lg font-semibold mb-4 text-gray-700">All Chats</h2>
      <ul className="space-y-2">
        <li className="p-2 rounded-lg hover:bg-green-100 cursor-pointer text-gray-800">
          Gamers
        </li>
        <li className="p-2 rounded-lg hover:bg-green-100 cursor-pointer text-gray-800">
          Valorant
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
