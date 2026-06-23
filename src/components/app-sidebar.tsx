"use client";

import {
  LayoutDashboard,
  ListTodo,
  Users,
  BarChart3,
  User,
  Settings,
  LogOut,
  Zap,
} from "lucide-react";

import { signOut } from "next-auth/react";

import { ThemeToggle } from "@/components/theme-toggle";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// Sidebar menu data
const menuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },

  {
    title: "Tasks",
    url: "/dashboard/tasks",
    icon: ListTodo,
  },

  {
    title: "Team",
    url: "/dashboard/team",
    icon: Users,
  },

  {
    title: "Analytics",
    url: "/dashboard/analytics",
    icon: BarChart3,
  },

  {
    title: "Profile",
    url: "/dashboard/profile",
    icon: User,
  },

  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  return (
    <Sidebar className="border-r border-white/10">
      {/* Logo */}
      <SidebarHeader>
        <div
          className="
          flex items-center gap-3
          px-3 py-4
        "
        >
          <div
            className="
            flex h-10 w-10
            items-center justify-center
            rounded-xl
            bg-gradient-to-br
            from-blue-500
            to-purple-500
          "
          >
            <Zap className="text-white" />
          </div>

          <div>
            <h1 className="font-bold text-lg">WorkSync</h1>

            <p className="text-xs text-muted-foreground">Workspace</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="gap-2">
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="/dashboard">
                  <LayoutDashboard />
                  <span>Dashboard</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="/dashboard/tasks">
                  <User />
                  <span>Tasks</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="/dashboard/team">
                  <User />
                  <span>Team</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="/dashboard/analytics">
                  <User />
                  <span>Analytics</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="/dashboard/profile">
                  <User />
                  <span>Profile</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="/dashboard/settings">
                  <Settings />
                  <span>Settings</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        <SidebarFooter className="mt-auto">
          <div className="flex w-full items-center justify-between">
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <button
                  type="button"
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <LogOut />
                  <span>Logout</span>
                </button>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <ThemeToggle />
          </div>
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
}
