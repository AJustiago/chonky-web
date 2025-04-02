"use client";

import React from "react";
import { SidebarItems } from "../../../types";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
} from "../ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import Link from "next/link";

interface SidebarDesktopProps {
  sidebarItems: SidebarItems;
}

export function SidebarDesktop({ sidebarItems }: SidebarDesktopProps) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    router.push("/admin/login");
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 p-4">
          <img src="/placeholder.svg" alt="Chonky Cat Logo" className="w-8 h-8" />
          <span className="text-lg font-semibold">Chonky Cat</span>
        </div>
      </SidebarHeader>

      <SidebarContent className="mx-4">
        <SidebarMenu>
          {sidebarItems.links.map((item) => (
            <SidebarMenuItem key={item.label}>
              {item.submenus && item.submenus.length > 0 ? (
                <Collapsible defaultOpen className="group/collapsible">
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton>
                        {item.icon && React.createElement(item.icon)} {item.label}
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.submenus.map((subItem) => (
                        <SidebarMenuSubButton asChild key={subItem.label}>
                          <Link href={subItem.href}  key={subItem.label}>
                            {subItem.label}
                          </Link>
                        </SidebarMenuSubButton>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </Collapsible>
              ) : (
                <SidebarMenuButton>
                  <Link href={item.href} className="flex items-center gap-2" key={item.label}>
                    {item.icon && React.createElement(item.icon, { size: 16 })} {item.label}
                  </Link>
                </SidebarMenuButton>
              )}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      
      <SidebarFooter>
        <div className="p-4">
          <Button variant="outline" className="w-full justify-start" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
