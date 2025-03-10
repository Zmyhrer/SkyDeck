import { useState } from "react";

const Header = ({ onSidebarToggle }: { onSidebarToggle: () => void }) => {
  return (
    <header className="fixed top-0 left-0 w-full bg-gray-800 text-white z-30 shadow-md">
      <div className="flex items-center justify-between p-4">
        {/* Sidebar Toggle Button */}
        <button onClick={onSidebarToggle} className="text-white md:hidden">
          ☰
        </button>

        {/* Title in the center */}
        <h1 className="text-lg font-semibold absolute left-1/2 transform -translate-x-1/2">
          SkyDeck
        </h1>

        {/* Profile on the right */}
        <div className="ml-auto flex items-center space-x-4">
          <img
            src="https://via.placeholder.com/40" // Placeholder for profile image
            alt="Profile"
            className="w-10 h-10 rounded-full"
          />
          <span className="text-white hidden md:block">John Doe</span>{" "}
          {/* Placeholder for username */}
        </div>
      </div>
    </header>
  );
};

export default Header;
