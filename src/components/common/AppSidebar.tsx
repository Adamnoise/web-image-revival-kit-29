
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutGrid, 
  ChevronLeft, 
  LineChart, 
  Trophy, 
  Users, 
  Settings, 
  Zap, 
  Network, 
  X
} from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface AppSidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const AppSidebar = ({ isOpen, toggleSidebar }: AppSidebarProps) => {
  const location = useLocation();
  
  const menuItems = [
    { label: "Dashboard", icon: LayoutGrid, path: "/" },
    { label: "Patterns", icon: Network, path: "/patterns" },
    { label: "Analytics", icon: LineChart, path: "/analytics" },
    { label: "League Management", icon: Trophy, path: "/league-management" },
    { label: "Teams", icon: Users, path: "/teams" },
    { label: "Integrations", icon: Zap, path: "/integrations" },
  ];
  
  return (
    <aside 
      className={cn(
        "w-[240px] fixed top-[72px] bottom-0 bg-[#0A0E1A]/90 border-r border-[#00F5FF]/20 flex flex-col transition-all duration-300 backdrop-blur-xl z-30",
        isOpen ? "left-0" : "-left-[240px]"
      )}
    >
      {/* Close button for mobile */}
      <Button 
        variant="ghost" 
        size="icon" 
        className="lg:hidden absolute top-2 right-2 text-white/50 hover:text-[#00F5FF]" 
        onClick={toggleSidebar}
      >
        <X size={16} />
      </Button>
      
      {/* Sidebar content */}
      <div className="flex-1 overflow-auto py-4 px-2">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const isActive = 
              (item.path === "/" && location.pathname === "/") || 
              (item.path !== "/" && location.pathname.startsWith(item.path));
            
            return (
              <Link 
                key={item.label} 
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 group",
                  isActive 
                    ? "bg-[#00F5FF]/10 text-[#00F5FF] border-l-2 border-[#00F5FF]" 
                    : "text-white/70 hover:bg-[#00F5FF]/5 hover:text-white border-l-2 border-transparent"
                )}
              >
                <item.icon size={18} className={isActive ? "text-[#00F5FF]" : "group-hover:text-[#00F5FF]/70"} />
                <span>{item.label}</span>
                {isActive && (
                  <span className="ml-auto">
                    <div className="h-1.5 w-1.5 rounded-full bg-[#00F5FF] animate-pulse"></div>
                  </span>
                )}
              </Link>
            );
          })}
        </div>
        
        {/* System section */}
        <div className="mt-8 pt-4 border-t border-[#00F5FF]/10">
          <h3 className="text-[10px] text-[#00F5FF]/50 font-mono uppercase tracking-widest px-3 mb-3">
            System
          </h3>
          
          <Link 
            to="/settings"
            className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-white/70 hover:bg-[#00F5FF]/5 hover:text-white transition-all duration-200 group"
          >
            <Settings size={18} className="group-hover:text-[#00F5FF]/70" />
            <span>Settings</span>
          </Link>
        </div>
      </div>
      
      {/* Sidebar footer */}
      <div className="border-t border-[#00F5FF]/10 p-4">
        <div className="bg-[#00F5FF]/5 rounded-md p-3 border border-[#00F5FF]/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-white/70">System status</span>
            <span className="text-xs text-[#00F5FF]">Online</span>
          </div>
          
          <div className="h-1 bg-[#1A1E2E] rounded-full overflow-hidden">
            <div className="h-full w-[85%] bg-gradient-to-r from-[#00F5FF] to-[#B026FF] rounded-full"></div>
          </div>
          
          <div className="mt-2 flex items-center justify-between">
            <span className="text-[10px] text-white/50">v2.04.5</span>
            <span className="text-[10px] text-[#00F5FF]/70 font-mono">CONNECTED</span>
          </div>
        </div>
      </div>
      
      {/* Toggle button */}
      <Button 
        variant="ghost" 
        size="icon"
        className="absolute -right-10 top-6 bg-[#0A0E1A]/90 border border-[#00F5FF]/20 rounded-r-md rounded-l-none text-[#00F5FF] hover:bg-[#00F5FF]/10 hidden lg:flex"
        onClick={toggleSidebar}
      >
        <ChevronLeft size={18} className={cn("transition-transform", !isOpen && "rotate-180")} />
      </Button>
    </aside>
  );
};

export default AppSidebar;
