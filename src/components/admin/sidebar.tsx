"use client";

import {
  LayoutDashboardIcon,
  ShoppingCartIcon,
  TicketPercentIcon,
  BoxesIcon,
  ListIcon,
  UsersIcon,

  Bell,
  Bookmark,
  Home,
  List,
  Mail,
  MoreHorizontal,
  User,
  Users,
} from "lucide-react";

import { SidebarDesktop } from "./sidebar-desktop";
import { SidebarItems } from "../../../types";
import { SidebarButton } from "./sidebar-button";
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
        label: "FOFS Order",
        href: "/admin/FOFS/order",
        icon: ShoppingCartIcon
    },
    {
        label: "Raffle Order",
        href: "/admin/raffle/order",
        icon: TicketPercentIcon
    },
    {
        label: "Item Stock",
        href: "/admin/FOFS/stock",
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
//   extras: (
//     <div className="flex flex-col gap-2">
//       <SidebarButton icon={MoreHorizontal} className="w-full">
//         More
//       </SidebarButton>
//       <SidebarButton
//         className="w-full justify-center text-white"
//         variant="default"
//       >
//         Tweet
//       </SidebarButton>
//     </div>
//   ),
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
