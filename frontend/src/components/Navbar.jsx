import React from "react";

const Navbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  return (
    <div className="bg-green-600 text-white p-4 flex items-center justify-between h-16 sticky top-0 w-full z-50 shadow-md">
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="sm:hidden p-2 bg-green-800 text-white rounded-lg shadow-md">
        {isSidebarOpen ? "Close" : "Menu"}
      </button>
      <h1 className="sm:text-lg md:text-xl font-semibold flex items-center gap-2">
        💬 Chat App
      </h1>
    </div>
  );
};

export default Navbar;
