
import React from "react";
import { Link } from "react-router-dom";
import { Menu, Bell, User, ChevronDown, Search } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface AppHeaderProps {
  toggleSidebar: () => void;
  title?: string;
}

const AppHeader = ({ toggleSidebar, title = "Dashboard" }: AppHeaderProps) => {
  return (
    <header className="h-[72px] fixed top-0 left-0 right-0 z-40 bg-black/90 backdrop-blur-md border-b border-white/10 flex items-center px-4">
      <div className="flex items-center gap-4 flex-1">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleSidebar}
          className="text-white/70 hover:bg-white/5 hover:text-white"
        >
          <Menu size={20} />
        </Button>
        
        {/* Logo Area */}
        <div className="flex items-center gap-2">
          <span className="h-8 w-8 bg-white text-black rounded flex items-center justify-center font-bold text-lg">
            T
          </span>
          <h1 className="text-white font-bold text-lg leading-tight tracking-tight">
            TACTICPULSE
          </h1>
        </div>
        
        {/* Main Title */}
        <div className="h-8 px-4 border-l border-white/10 ml-2 hidden sm:flex items-center">
          <h2 className="text-lg font-semibold text-white">
            {title && <span>{title}</span>}
          </h2>
        </div>
        
        {/* Command Center Nav */}
        <nav className="hidden lg:flex items-center gap-4 ml-6">
          {["Dashboard", "Patterns", "Analytics", "League"].map((item, index) => (
            <Link 
              key={item} 
              to={`/${item === "Dashboard" ? "" : item.toLowerCase()}`}
              className="text-white/70 hover:text-white relative group px-2 py-1"
            >
              <span>{item}</span>
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
            </Link>
          ))}
        </nav>
      </div>
      
      {/* Right Section */}
      <div className="flex items-center gap-2">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 h-4 w-4" />
          <Input 
            placeholder="Search..." 
            className="w-[200px] rounded-full bg-white/5 border-white/10 pl-9 text-sm text-white focus:border-white/20 focus:ring-0" 
          />
        </div>
        
        <Button variant="ghost" size="icon" className="text-white/70 hover:text-white hover:bg-white/5">
          <Bell size={18} />
          <span className="absolute top-2 right-2 h-2 w-2 bg-white rounded-full"></span>
        </Button>
        
        <div className="pl-2 border-l border-white/10 ml-2 hidden sm:block">
          <Button variant="ghost" className="flex items-center gap-2 text-white/90 hover:text-white hover:bg-white/5">
            <span className="h-6 w-6 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white text-xs">
              WH
            </span>
            <span className="text-sm">User</span>
            <ChevronDown size={14} />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
