"use client";
import Sidebar from "@/components/admin/sidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {

  return (
    <div className="h-screen bg-background">
      <Sidebar />
      <main className='mx-5 mt-16 sm:ml-[300px] sm:mt-3'>{children}</main>
    </div>
  );
}
