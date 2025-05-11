
import React from "react";
import { Link } from "react-router-dom";
import { Menu, Bell, ChevronDown, Search } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface AppHeaderProps {
  toggleSidebar: () => void;
  title?: string;
}

const AppHeader = ({ toggleSidebar, title = "Dashboard" }: AppHeaderProps) => {
  return (
    <header className="h-[72px] fixed top-0 left-0 right-0 z-40 bg-[#101219]/90 backdrop-blur-md border-b border-white/5 flex items-center px-4">
      <div className="flex items-center gap-4 flex-1">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleSidebar}
          className="text-primary hover:bg-primary/10 hover:text-primary"
        >
          <Menu size={20} />
        </Button>
        
        {/* Logo Area */}
        <div className="flex items-center gap-2">
          <span className="relative">
            <span className="h-8 w-8 bg-gradient-to-r from-primary to-primary/80 rounded-md flex items-center justify-center text-white font-bold text-lg">
              O
            </span>
            <span className="absolute -bottom-1 -right-1 h-2 w-2 bg-green-500 rounded-full border-2 border-[#101219]"></span>
          </span>
          <div className="flex flex-col">
            <h1 className="text-white font-bold text-lg leading-tight tracking-tight">
              ORBIT
            </h1>
            <div className="flex items-center gap-1">
              <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
              <span className="text-[10px] text-white/70 font-mono uppercase tracking-widest">ONLINE</span>
            </div>
          </div>
        </div>
        
        {/* Main Title */}
        <div className="h-8 px-4 border-l border-white/10 ml-2 hidden sm:flex items-center">
          <h2 className="text-lg font-semibold text-white">
            {title}
          </h2>
        </div>
        
        {/* Nav */}
        <nav className="hidden lg:flex items-center gap-4 ml-6">
          {["Dashboard", "Patterns", "Analytics", "League"].map((item, index) => (
            <Link 
              key={item} 
              to={`/${item === "Dashboard" ? "" : item.toLowerCase()}`}
              className="text-white/70 hover:text-primary relative group px-2 py-1"
            >
              <span>{item}</span>
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-primary/50 transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
            </Link>
          ))}
        </nav>
      </div>
      
      {/* Right Section */}
      <div className="flex items-center gap-2">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary/50 h-4 w-4" />
          <Input 
            placeholder="Search..." 
            className="w-[200px] rounded-full bg-white/5 border-white/10 pl-9 text-sm text-white focus:border-primary/50 focus:ring-0 focus:bg-white/10" 
          />
        </div>
        
        <Button variant="ghost" size="icon" className="text-white/70 hover:text-primary hover:bg-primary/10">
          <Bell size={18} />
          <span className="absolute top-2 right-2 h-2 w-2 bg-green-500 rounded-full"></span>
        </Button>
        
        <div className="pl-2 border-l border-white/10 ml-2 hidden sm:block">
          <Button variant="ghost" className="flex items-center gap-2 text-white/90 hover:text-primary hover:bg-primary/10">
            <span className="h-6 w-6 rounded-full bg-primary/30 border border-primary/50 flex items-center justify-center text-white text-xs">
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
