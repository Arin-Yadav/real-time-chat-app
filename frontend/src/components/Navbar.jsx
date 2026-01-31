import React from "react";

const Navbar = () => {
  return (
    <div className="bg-green-600 text-white p-4 flex items-center justify-between h-16 sticky top-0 w-full z-50 shadow-md">
      <h1 className="sm:text-lg md:text-xl font-semibold flex items-center gap-2">
        💬 Chat App
      </h1>
      <p className="text-xs sm:text-sm">Logged in as</p>
    </div>
  );
};

export default Navbar;
