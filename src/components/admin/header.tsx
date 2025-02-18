"use client";

import { Button } from "@/components/ui/button";
import { Menu, PanelRightClose, X } from "lucide-react";

export default function Header({ sidebarOpen, toggleSidebar }: { sidebarOpen: boolean; toggleSidebar: () => void }) {
  return (
    <header className="bg-card p-4 flex justify-between items-center shadow">
    <Button
        variant="outline"
        size="icon"
        className="sm:hidden"
        onClick={toggleSidebar}
    >
        {sidebarOpen ? <X /> : <PanelRightClose />}
    </Button>
      <h1 className="text-xl font-bold text-primary">Chonky Web</h1>
      <div className="flex items-center gap-4">
        <p className="text-lg font-semibold">Username</p>
      </div>
    </header>
  );
}
