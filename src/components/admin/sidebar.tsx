"use client";

import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { BoxesIcon, BoxIcon, LayoutDashboardIcon, LogOutIcon, ShoppingCartIcon, TicketPercentIcon, UsersIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "../ui/card";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Sidebar({ sidebarOpen, toggleSidebar }: { sidebarOpen: boolean; toggleSidebar: () => void }) {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem("jwt");
        router.push("/admin/login");
    };

    return (
        <>
            {/* Mobile Sidebar using Sheet */}
            <Sheet open={sidebarOpen} onOpenChange={toggleSidebar}>
                <SheetContent side="left" className="w-64 bg-card p-4 space-y-4">
                    <SidebarContent handleLogout={handleLogout} />
                </SheetContent>
            </Sheet>

            {/* Desktop Sidebar (Always Visible) */}
            <aside className={cn("hidden sm:block bg-card w-64 p-4 space-y-4 h-screen shadow")}>
                <SidebarContent handleLogout={handleLogout} />
            </aside>
        </>
    );
}

function SidebarContent({ handleLogout }: { handleLogout: () => void }) {
    return (
        <>
            <h2 className="text-xl font-bold text-primary">Chonky Cat</h2>

            <Card>
                <Link href="/admin">
                    <Button variant="ghost" className="w-full justify-start flex items-center">
                        <LayoutDashboardIcon className="mr-2" />
                        Dashboard
                    </Button>
                </Link>        
            </Card>

            <Card>
                <Link href="/admin/FOFS/order">
                    <Button variant="ghost" className="w-full justify-start">
                        <ShoppingCartIcon className="mr-2" />
                        FOFS Order
                    </Button>
                </Link>
                <Link href="/admin/raffle/order">
                    <Button variant="ghost" className="w-full justify-start">
                        <TicketPercentIcon className="mr-2" />
                        Raffle Order
                    </Button>
                </Link>    
            </Card>

            <Card>
                <Link href="/admin/FOFS/stock">
                    <Button variant="ghost" className="w-full justify-start">
                        <BoxIcon className="mr-2" />
                        FOFS Stock
                    </Button>
                </Link>
                <Link href="/admin/raffle/list">
                    <Button variant="ghost" className="w-full justify-start">
                        <BoxesIcon className="mr-2" />
                        Raffle List
                    </Button>
                </Link>    
            </Card>

            <Card>
                <Link href="/admin/settings">
                    <Button variant="ghost" className="w-full justify-start">
                        <UsersIcon className="mr-2" />
                        Admin Setting
                    </Button>
                </Link>
                <Button variant="ghost" className="w-full justify-start text-red-500" onClick={handleLogout}>
                    <LogOutIcon className="mr-2" />
                    Logout
                </Button>
            </Card>
        </>
    );
}
