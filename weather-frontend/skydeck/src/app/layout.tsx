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
        {/* Sidebar - Ensure it's properly positioned */}
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        <div className="flex flex-col flex-1">
          {/* Header */}
          <Header onSidebarToggle={() => setIsSidebarOpen(!isSidebarOpen)} />

          {/* Main Content */}
          <main className="mt-[72px] ml-0 md:ml-[132px] md:p-4 flex-1 overflow-x-hidden bg-gray-100">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
