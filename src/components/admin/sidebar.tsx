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
        label: "Product",
        href: "",
        icon: BoxesIcon,
        submenus: [
          {
            href: "/admin/product/stock",
            label: "Product List",
          },
          {
            href: "/admin/product/order",
            label: "Prodect Order",
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
  // const isDesktop = useMediaQuery("(min-width: 640px)", {
  //   initializeWithValue: false,
  // });

  // if (isDesktop) {
    return <SidebarDesktop sidebarItems={sidebarItems} />;
  // }

  // return <SidebarMobile sidebarItems={sidebarItems} />;
}
