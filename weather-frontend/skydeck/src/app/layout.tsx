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
      <body className="overflow-hidden h-screen">
        {/* Sidebar - Ensure it's properly positioned */}
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        <div className="flex flex-col flex-1">
          {/* Header */}
          <Header onSidebarToggle={() => setIsSidebarOpen(!isSidebarOpen)} />

          {/* Main Content */}
          <main className="mt-[72px] md:ml-[132px] flex-1 md:p-4">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
