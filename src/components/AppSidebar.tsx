import * as React from "react"
import { Link, useLocation } from "react-router-dom"
import {
  LayoutDashboard,
  Swords,
  Database,
  Settings,
  MoreHorizontal,
  ChevronUp,
  User2,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ThemeSwitcher } from "./ThemeSwitcher"
import { useTheme } from "@/context/ThemeContext"

const navItems = [
  {
    title: "Unit Database",
    url: "/shatterpoint-starpath/",
    icon: Database,
  },
  {
    title: "List Builder",
    url: "/shatterpoint-starpath/list",
    icon: LayoutDashboard,
  },
  {
    title: "Game Manager",
    url: "/shatterpoint-starpath/game",
    icon: Swords,
  },
]

export function AppSidebar() {
  const location = useLocation()
  const { accent } = useTheme()

  const logoFilter = {
    emerald: 'sepia(1) saturate(5) hue-rotate(90deg)',
    amber: 'sepia(1) saturate(5) hue-rotate(40deg)',
    red: 'sepia(1) saturate(5) hue-rotate(-10deg)',
  }[accent];

  return (
    <Sidebar collapsible="icon" className="border-r border-zinc-900 bg-black">
      <SidebarHeader className="border-b border-zinc-900 p-4">
        <div className="flex items-center gap-3">
          <img
            src={`${import.meta.env.BASE_URL}starpath.svg`}
            alt="Starpath Logo"
            className="w-8 h-8 brightness-150 grayscale contrast-200"
            style={{ filter: logoFilter }}
          />
          <div className="flex flex-col group-data-[collapsible=icon]:hidden">
            <h1 className="text-sm font-black uppercase tracking-[0.2em] text-zinc-100 flex items-center">
              STAR<span className="text-emerald-500">PATH</span>
            </h1>
            <span className="text-[7px] text-zinc-500 font-mono tracking-widest uppercase truncate">
              Tactical Interface // V2.0.26
            </span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px] font-mono text-zinc-600 uppercase group-data-[collapsible=icon]:hidden">
            Main Interface
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === item.url}
                    tooltip={item.title}
                    className="hover:bg-emerald-500/10 hover:text-emerald-500 transition-colors"
                  >
                    <Link to={item.url}>
                      <item.icon className="w-4 h-4" />
                      <span className="font-mono text-[10px] uppercase tracking-wider">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-zinc-900 p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <User2 className="w-4 h-4" />
                  <div className="flex flex-col items-start text-left group-data-[collapsible=icon]:hidden">
                    <span className="text-[10px] font-bold uppercase text-zinc-300">Imperial Operator</span>
                    <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-tighter">Rank: Delta-9</span>
                  </div>
                  <ChevronUp className="ml-auto w-4 h-4 group-data-[collapsible=icon]:hidden text-zinc-600" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                align="start"
                className="w-[240px] bg-zinc-950 border-zinc-900 p-0 overflow-hidden"
              >
                <div className="p-2 bg-zinc-900/50 border-b border-zinc-800">
                  <span className="text-[9px] font-mono text-zinc-400 uppercase flex items-center gap-1.5">
                    <Settings className="w-3 h-3" />
                    Terminal Parameters
                  </span>
                </div>
                <ThemeSwitcher />
                <div className="p-2 border-t border-zinc-900">
                  <DropdownMenuItem className="text-[10px] font-mono uppercase text-zinc-400 focus:bg-emerald-500/10 focus:text-emerald-500 cursor-pointer">
                    Registry Reset
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-[10px] font-mono uppercase text-zinc-400 focus:bg-emerald-500/10 focus:text-emerald-500 cursor-pointer">
                    Secure Logout
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
        <div className="mt-2 flex justify-center group-data-[collapsible=icon]:hidden">
          <SidebarTrigger className="w-full text-[8px] font-mono uppercase text-zinc-600 hover:text-emerald-500 py-1 transition-colors" />
        </div>
        <div className="hidden group-data-[collapsible=icon]:flex justify-center py-2">
          <SidebarTrigger className="text-zinc-600 hover:text-emerald-500" />
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
