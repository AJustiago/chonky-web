"use client";

import { SidebarButton } from "./sidebar-button";
import { SidebarItems } from "../../../types";
import Link from "next/link";
import { Separator } from "../ui/separator";
// import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
// import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { LogOut, MoreHorizontal, Settings } from "lucide-react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarGroup, 
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroupLabel,
  SidebarGroupContent, 
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton
} from "../ui/sidebar";
import { Collapsible } from "../ui/collapsible";

interface SidebarDesktopProps {
  sidebarItems: SidebarItems;
}

export function SidebarDesktop(props: SidebarDesktopProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    router.push("/admin/login");
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 p-4">
          <img 
            src="/placeholder.svg" 
            alt="Chonky Cat Logo" 
            className="w-8 h-8"
          />
          <span className="text-lg font-semibold">Chonky Cat</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <Collapsible defaultOpen className="group/collapsible">
                {props.sidebarItems.links.map((item) => (
                <SidebarMenuItem key={item.label}>
                  {item.submenus ? (
                    <SidebarMenuButton>
                    <div className="flex flex-col">
                      <div className="flex items-center">
                      {item.icon && <item.icon />}
                      <span>{item.label}</span>
                      </div>
                      <SidebarMenuSub>
                      {item.submenus.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.label}>
                        <SidebarMenuSubButton asChild>
                          <a href={subItem.href}>
                          <span>{subItem.label}</span>
                          </a>
                        </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                      </SidebarMenuSub>
                    </div>
                    </SidebarMenuButton>
                    ) : (
                  <SidebarMenuButton asChild>
                    <a href={item.href}>
                    {item.icon && <item.icon />}
                    <span>{item.label}</span>
                    </a>
                  </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
                ))}
              </Collapsible>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="p-4">
          <Button 
            variant="outline" 
            className="w-full justify-start"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}