"use client";

import Sidebar from "./sidebar";
import Header from "./header";
import { useState } from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <div className="h-screen bg-background flex">
      {/* Sidebar - Only renders if open */}
      {isSidebarOpen && <Sidebar />}

      <div className={`flex-1 ${isSidebarOpen ? "sm:ml-[270px]" : "sm:ml-0"}`}>
        <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        <main className="mx-5 mt-16 sm:mt-3">{children}</main>
      </div>
    </div>
  );
}
