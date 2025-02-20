"use client";

import {
  LayoutDashboardIcon,
  ShoppingCartIcon,
  TicketPercentIcon,
  BoxesIcon,
  ListIcon,
  UsersIcon,
} from "lucide-react";

import { SidebarDesktop } from "./sidebar-desktop";
import { SidebarItems } from "../../../types";
import { useMediaQuery } from "usehooks-ts";
import { SidebarMobile } from "./sidebar-mobile";

const sidebarItems: SidebarItems = {
  links: [
    {
        label: "Dashboard",
        href: "/admin",
        icon: LayoutDashboardIcon
    },
    {
        label: "FCFS Order",
        href: "/admin/FCFS/order",
        icon: ShoppingCartIcon
    },
    {
        label: "Raffle Order",
        href: "/admin/raffle/order",
        icon: TicketPercentIcon
    },
    {
        label: "Item Stock",
        href: "/admin/FCFS/stock",
        icon: BoxesIcon
    },
    {
        label: "Raffle List",
        href: "/admin/raffle/list",
        icon: ListIcon
    },
    {
        label: "Admin Settings",
        href: "/admin/settings",
        icon: UsersIcon
    },
  ],
};

export default function Sidebar() {
  const isDesktop = useMediaQuery("(min-width: 640px)", {
    initializeWithValue: false,
  });

  if (isDesktop) {
    return <SidebarDesktop sidebarItems={sidebarItems} />;
  }

  return <SidebarMobile sidebarItems={sidebarItems} />;
}
