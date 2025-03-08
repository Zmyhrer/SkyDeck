"use client";

import { useState } from "react";
import Header from "@/app/components/header"; // Import Header
import Sidebar from "@/app/components/sidebar"; // Import Sidebar
import "@/app/globals.css"; // Global styles

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <html lang="en">
      <body className="bg-gray-100">
        <div className="flex h-screen">
          {/* Sidebar Component */}
          <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

          <div className="flex-1 flex flex-col">
            {/* Header - fixed to the top */}
            <Header onSidebarToggle={toggleSidebar} />

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-4 mt-[72px] md:ml-[132px]">
              {" "}
              {/* Added margin-top to push content below header */}
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
