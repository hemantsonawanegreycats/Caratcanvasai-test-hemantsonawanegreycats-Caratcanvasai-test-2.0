// src/components/LeftSideBar.jsx
import React from "react";
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import logo from "../assets/caratcanvas logo.png";

// Menu items
const items = [
  { title: "Home", url: "#", icon: Home },
  { title: "Inbox", url: "#", icon: Inbox },
  { title: "Calendar", url: "#", icon: Calendar },
  { title: "Search", url: "#", icon: Search },
  { title: "Settings", url: "#", icon: Settings },
];

export function LeftSideBar() {
  return (
    <Sidebar className={"bg-transparent"}>
      <SidebarHeader className="p-4 border-b">
        <img src={logo} alt="Logo" className="w-9/12 mx-auto block" />
      </SidebarHeader>

      <SidebarContent className="p-4 ">
        <SidebarGroup >
          {/* <SidebarGroupLabel className="px-2 text-xs text-gray-500 uppercase">
            Application
          </SidebarGroupLabel> */}
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-100"
                  >
                    <a href={item.url} className="flex items-center gap-3">
                    <item.icon className="w-16 h-16 text-primary-700" />
                      <span className="truncate text-[1.1rem] text-primary-700 font-medium">
                        {item.title}
                      </span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t text-center text-xs text-gray-400">
        © 2025 Your Company
      </SidebarFooter>
    </Sidebar>
  );
}
