"use client";

import { useState } from "react";
import Sidebar from "@/components/admin/sidebar";
import Header from "@/components/admin/header";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      {/* <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} /> */}
      <Sidebar />

      {/* Main Content */}
      {/* <div className="flex-1 flex flex-col"> */}
        {/* Header */}
        {/* <Header sidebarOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} /> */}

        {/* Page Content */}
        <main className='mx-5 mt-16 sm:ml-[300px] sm:mt-3'>{children}</main>
        {/* <main className="p-6 flex-1 overflow-y-auto">{children}</main> */}
      {/* </div> */}
    </div>
  );
}
