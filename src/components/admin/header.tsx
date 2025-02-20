"use client";

import { PanelRightOpen, PanelRightClose } from "lucide-react";
import { useMediaQuery } from "usehooks-ts";

export default function Header({ toggleSidebar, isSidebarOpen }: { toggleSidebar: () => void; isSidebarOpen: boolean }) {
  const isDesktop = useMediaQuery("(min-width: 640px)", {
    initializeWithValue: false,
  });

  if (!isDesktop) return null;

  return (
    <header className="w-full bg-card p-4 flex justify-between items-center border">
      <button onClick={toggleSidebar} className="p-2 rounded">
        {isSidebarOpen ? <PanelRightOpen className="w-6 h-6" /> : <PanelRightClose className="w-6 h-6" />}
      </button>
      <h1 className="text-lg font-semibold">Chonky Web</h1>
    </header>
  );
}
