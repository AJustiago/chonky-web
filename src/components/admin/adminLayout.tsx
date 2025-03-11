"use client";

import Sidebar from "./sidebar";
import Header from "./header";
import { useState } from "react";
import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="h-screen bg-background flex">
        {isSidebarOpen && <Sidebar />}

        <div className={`flex-1 ${isSidebarOpen ? "sm:ml-[270px]" : "sm:ml-0"}`}>
          <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
          <main className="mx-5 mt-16 sm:mt-3">{children}</main>
        </div>
        <Toaster />
      </div>
    </QueryClientProvider>
  );
}
