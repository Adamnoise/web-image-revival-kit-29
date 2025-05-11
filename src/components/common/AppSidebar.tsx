
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
  X,
  Palette
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
        "w-[240px] fixed top-[72px] bottom-0 bg-[#111420]/90 border-r border-white/5 flex flex-col transition-all duration-300 backdrop-blur-md z-30",
        isOpen ? "left-0" : "-left-[240px]"
      )}
    >
      {/* Close button for mobile */}
      <Button 
        variant="ghost" 
        size="icon" 
        className="lg:hidden absolute top-2 right-2 text-white/50 hover:text-primary" 
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
                    ? "bg-primary/10 text-primary border-l-2 border-primary" 
                    : "text-white/70 hover:bg-primary/5 hover:text-white border-l-2 border-transparent"
                )}
              >
                <item.icon size={18} className={isActive ? "text-primary" : "group-hover:text-primary/70"} />
                <span>{item.label}</span>
                {isActive && (
                  <span className="ml-auto">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                  </span>
                )}
              </Link>
            );
          })}
        </div>
        
        {/* System section */}
        <div className="mt-8 pt-4 border-t border-white/5">
          <h3 className="text-[10px] text-primary/50 font-mono uppercase tracking-widest px-3 mb-3">
            System
          </h3>
          
          <Link 
            to="/brandbook"
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 group",
              location.pathname === "/brandbook" 
                ? "bg-primary/10 text-primary border-l-2 border-primary" 
                : "text-white/70 hover:bg-primary/5 hover:text-white border-l-2 border-transparent"
            )}
          >
            <Palette size={18} className={location.pathname === "/brandbook" ? "text-primary" : "group-hover:text-primary/70"} />
            <span>Design System</span>
          </Link>
          
          <Link 
            to="/settings"
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 group",
              location.pathname === "/settings" 
                ? "bg-primary/10 text-primary border-l-2 border-primary" 
                : "text-white/70 hover:bg-primary/5 hover:text-white border-l-2 border-transparent"
            )}
          >
            <Settings size={18} className={location.pathname === "/settings" ? "text-primary" : "group-hover:text-primary/70"} />
            <span>Settings</span>
          </Link>
        </div>
      </div>
      
      {/* Sidebar footer */}
      <div className="border-t border-white/5 p-4">
        <div className="bg-white/5 rounded-md p-3 border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-white/70">System status</span>
            <span className="text-xs text-green-500">Online</span>
          </div>
          
          <div className="h-1 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full w-[85%] bg-gradient-to-r from-primary to-primary/70 rounded-full"></div>
          </div>
          
          <div className="mt-2 flex items-center justify-between">
            <span className="text-[10px] text-white/50">v2.04.5</span>
            <span className="text-[10px] text-green-500/70 font-mono">CONNECTED</span>
          </div>
        </div>
      </div>
      
      {/* Toggle button */}
      <Button 
        variant="ghost" 
        size="icon"
        className="absolute -right-10 top-6 bg-[#111420]/90 border border-white/10 rounded-r-md rounded-l-none text-primary hover:bg-primary/10 hidden lg:flex"
        onClick={toggleSidebar}
      >
        <ChevronLeft size={18} className={cn("transition-transform", !isOpen && "rotate-180")} />
      </Button>
    </aside>
  );
};

export default AppSidebar;
