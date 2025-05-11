
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
        "w-[240px] fixed top-[72px] bottom-0 bg-[#111] border-r border-white/10 flex flex-col transition-all duration-300 z-30",
        isOpen ? "left-0" : "-left-[240px]"
      )}
    >
      {/* Close button for mobile */}
      <Button 
        variant="ghost" 
        size="icon" 
        className="lg:hidden absolute top-2 right-2 text-white/50 hover:text-white" 
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
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive
                    ? "bg-white/10 text-white"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                )}
              >
                <item.icon size={18} className={isActive ? "text-white" : "text-white/60"} />
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
      
      {/* Footer */}
      <div className="p-3 border-t border-white/10">
        <Button 
          variant="ghost" 
          className="w-full justify-start gap-2 text-white/70 hover:text-white hover:bg-white/5"
        >
          <Settings size={18} />
          Settings
        </Button>
      </div>
    </aside>
  );
};

export default AppSidebar;
