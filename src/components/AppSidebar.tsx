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
  PanelLeft,
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
  useSidebar,
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
  const { toggleSidebar } = useSidebar()

  const logoFilter = {
    emerald: 'sepia(1) saturate(5) hue-rotate(90deg)',
    amber: 'sepia(1) saturate(5) hue-rotate(40deg)',
    red: 'sepia(1) saturate(5) hue-rotate(-10deg)',
  }[accent];

  return (
    <Sidebar collapsible="icon" className="border-r border-zinc-900 bg-black">
      <SidebarHeader className="border-b border-zinc-900 p-2 group-data-[collapsible=expanded]:p-4 transition-all relative overflow-hidden group/header">
        <div className="flex items-center gap-3 group-data-[collapsible=icon]:justify-center relative z-10">
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
        {/* Technical Decorator Line */}
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
        <div className="absolute top-1 right-2 group-data-[collapsible=icon]:hidden">
          <span className="text-[6px] font-aurebesh text-zinc-800 uppercase tracking-tighter">imperial_property</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <div className="px-2 py-1 group-data-[collapsible=icon]:hidden flex justify-between items-center">
            <SidebarGroupLabel className="text-[10px] font-mono text-zinc-600 uppercase">
              Main Interface
            </SidebarGroupLabel>
            <span className="text-[7px] font-aurebesh text-zinc-800 uppercase">sector_01</span>
          </div>
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
      <SidebarFooter className="border-t border-zinc-900 p-2 relative">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-500/10 to-transparent" />
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="px-2 py-1 group-data-[collapsible=icon]:hidden flex justify-between items-center">
              <span className="text-[8px] font-mono text-zinc-700 uppercase">System Parameters</span>
              <span className="text-[7px] font-aurebesh text-zinc-800 uppercase">ctrl_log</span>
            </div>
            <SidebarMenuButton
              onClick={() => toggleSidebar()}
              tooltip="Toggle Sidebar"
              className="hover:bg-emerald-500/10 hover:text-emerald-500 transition-colors group-data-[collapsible=icon]:justify-center mt-1"
            >
              <PanelLeft className="w-4 h-4" />
              <span className="font-mono text-[10px] uppercase tracking-wider group-data-[collapsible=icon]:hidden">
                Minimize Interface
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground group-data-[collapsible=icon]:justify-center border border-transparent hover:border-emerald-500/20 transition-all"
                >
                  <User2 className="w-4 h-4" />
                  <div className="flex flex-col items-start text-left group-data-[collapsible=icon]:hidden">
                    <span className="text-[10px] font-bold uppercase text-zinc-300">Imperial Operator</span>
                    <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-tighter flex items-center gap-2">
                      Rank: Delta-9
                      <span className="text-[6px] font-aurebesh opacity-50">rank_id</span>
                    </span>
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
      </SidebarFooter>
    </Sidebar>
  )
}
