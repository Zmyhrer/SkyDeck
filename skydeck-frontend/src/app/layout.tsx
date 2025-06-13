"use client";

import { useState } from "react";
import Header from "@/app/components/header";
import Sidebar from "@/app/components/sidebar";
import "@/app/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <html lang="en">
      <body className="min-h-screen overflow-x-hidden">
        {/* Header */}
          <Header onSidebarToggle={() => setIsSidebarOpen(!isSidebarOpen)} />

        <div className="flex flex-row flex-1 h-[100%]">
          
          {/* Sidebar - Ensure it's properly positioned */}
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
          {/* Main Content */}
          <main className=" p-1 md:p-4 flex-1 overflow-x-hidden bg-gray-100">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
