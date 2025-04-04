"use client";
import { SidebarTrigger } from "../ui/sidebar";

export default function Header() {

  return (
    <header className="w-full bg-gray-100 p-4 flex justify-between items-center">
      <SidebarTrigger></SidebarTrigger>
      <h1 className="text-lg font-semibold">Chonky Web</h1>
    </header>
  );
}
