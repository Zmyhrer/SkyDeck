"use client";

import { useState } from "react";
import Header from "@/app/components/header"; // Import Header
import Sidebar from "@/app/components/sidebar"; // Import Sidebar
import "@/app/globals.css"; // Global styles

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="h-screen">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <Header onSidebarToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      <main className="mt-[72px] flex-1 md:ml-[132px] p-4">{children}</main>
    </div>
  );
}
