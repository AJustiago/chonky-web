"use client";

import {
  LayoutDashboardIcon,
  TicketPercentIcon,
  BoxesIcon,
  UsersIcon,
} from "lucide-react";

import { SidebarDesktop } from "./sidebar-desktop";
import { SidebarItems } from "../../../types";

const sidebarItems: SidebarItems = {
  links: [
    {
        label: "Dashboard",
        href: "/admin",
        icon: LayoutDashboardIcon
    },
    { 
        label: "Product",
        href: "",
        icon: BoxesIcon,
        submenus: [
          {
            href: "/admin/product/stock/detail",
            label: "Add Product",
          },
          {
            href: "/admin/product/stock",
            label: "Product List",
          },
          {
            href: "/admin/product/order",
            label: "Product Order",
          },
        ]
    },
    {
        label: "Raffle",
        href: "",
        icon: TicketPercentIcon,
        submenus: [
          {
            href: "/admin/raffle/list",
            label: "Raffle List",
          },
          {
            href: "/admin/raffle/order",
            label: "Raffle Order",
          },
        ]
    },
    {
        label: "Admin Settings",
        href: "/admin/settings",
        icon: UsersIcon
    },
  ],
};

export default function Sidebar() {
    return <SidebarDesktop sidebarItems={sidebarItems} />;

}
