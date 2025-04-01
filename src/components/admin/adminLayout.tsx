"use client";

import Sidebar from "./sidebar";
import Header from "./header";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { SidebarProvider } from "../ui/sidebar";

const queryClient = new QueryClient();

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <SidebarProvider>
        <div className="flex w-full mx-auto">
          <Sidebar />
            <div className="flex-1">
              <Header />
            <main className="mx-5 mt-16 sm:mt-3">{children}</main>
            </div>
          <Toaster />
        </div>
      </SidebarProvider>
    </QueryClientProvider>
  );
}
