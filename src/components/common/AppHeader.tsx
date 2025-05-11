
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
    <header className="h-[72px] fixed top-0 left-0 right-0 z-40 bg-[#070A14]/80 backdrop-blur-xl border-b border-[#00F5FF]/20 flex items-center px-4">
      <div className="flex items-center gap-4 flex-1">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleSidebar}
          className="text-[#00F5FF] hover:bg-[#00F5FF]/10 hover:text-[#00F5FF] hover:shadow-glow-blue-sm"
        >
          <Menu size={20} />
        </Button>
        
        {/* Logo Area */}
        <div className="flex items-center gap-2">
          <span className="relative">
            <span className="h-8 w-8 bg-gradient-to-br from-[#00F5FF] to-[#B026FF] rounded-md flex items-center justify-center text-white font-bold text-lg">
              T
            </span>
            <span className="absolute -bottom-1 -right-1 h-3 w-3 bg-[#FAFF00] rounded-full border-2 border-[#070A14] animate-pulse"></span>
          </span>
          <div className="flex flex-col">
            <h1 className="text-white font-bold text-lg leading-tight tracking-tight">
              <span className="text-[#00F5FF]">TACTIC</span>
              <span className="text-[#B026FF]">PULSE</span>
            </h1>
            <div className="flex items-center gap-1">
              <div className="h-1.5 w-1.5 rounded-full bg-[#00F5FF] animate-pulse"></div>
              <span className="text-[10px] text-[#00F5FF]/70 font-mono uppercase tracking-widest">LIVE</span>
            </div>
          </div>
        </div>
        
        {/* Main Title */}
        <div className="h-8 px-4 border-l border-[#00F5FF]/20 ml-2 hidden sm:flex items-center">
          <h2 className="text-lg font-semibold text-white">
            {title && (
              <span className="glitch-text" data-text={title}>
                {title}
              </span>
            )}
          </h2>
        </div>
        
        {/* Command Center Nav */}
        <nav className="hidden lg:flex items-center gap-4 ml-6">
          {["Dashboard", "Patterns", "Analytics", "League"].map((item, index) => (
            <Link 
              key={item} 
              to={`/${item === "Dashboard" ? "" : item.toLowerCase()}`}
              className="text-white/70 hover:text-[#00F5FF] relative group px-2 py-1"
            >
              <span>{item}</span>
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#00F5FF]/50 transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
            </Link>
          ))}
        </nav>
      </div>
      
      {/* Right Section */}
      <div className="flex items-center gap-2">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#00F5FF]/50 h-4 w-4" />
          <Input 
            placeholder="Search..." 
            className="w-[200px] rounded-full bg-[#00F5FF]/5 border-[#00F5FF]/20 pl-9 text-sm text-white focus:border-[#00F5FF]/50 focus:shadow-glow-blue-sm focus:ring-0 focus:bg-[#00F5FF]/10" 
          />
        </div>
        
        <Button variant="ghost" size="icon" className="text-white/70 hover:text-[#00F5FF] hover:bg-[#00F5FF]/10">
          <Bell size={18} />
          <span className="absolute top-2 right-2 h-2 w-2 bg-[#FAFF00] rounded-full"></span>
        </Button>
        
        <div className="pl-2 border-l border-[#00F5FF]/20 ml-2 hidden sm:block">
          <Button variant="ghost" className="flex items-center gap-2 text-white/90 hover:text-[#00F5FF] hover:bg-[#00F5FF]/10">
            <span className="h-6 w-6 rounded-full bg-[#B026FF]/30 border border-[#B026FF]/50 flex items-center justify-center text-white text-xs">
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
