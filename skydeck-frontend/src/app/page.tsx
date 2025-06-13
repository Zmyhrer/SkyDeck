"use client";
import React from "react";


const Home = () => {
  return (
    <div className="h-screen flex flex-col">
        {/* Header */}
        <div className="bg-gray-800 text-white p-4">
          <h1 className="text-xl">My App</h1>
        </div>

        {/* Content Area */}
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <div className="w-64 bg-gray-100 p-4 overflow-y-auto">
            <nav>
              <ul>
                <li>Dashboard</li>
                <li>Settings</li>
              </ul>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-6 overflow-y-auto bg-white">
            Yeah
          </div>
        </div>
      </div>
  );
};

export default Home;
