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

        <div className="flex h-[calc(100vh-4rem)] md:h-[calc(100vh-5rem)]">
          {/* Sidebar */}
          <Sidebar
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />

          {/* Main content */}
          <main className="flex-1 p-4 overflow-y-auto bg-gray-100">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
