
import React, { useState } from "react";
import AppHeader from "./AppHeader";
import AppSidebar from "./AppSidebar";
import PageBackground from "./PageBackground";

interface AppLayoutProps {
  children: React.ReactNode;
  backgroundVariant?: "default" | "subtle" | "gradient";
  contentClassName?: string;
  headerTitle?: string;
}

export const AppLayout = ({ 
  children, 
  backgroundVariant = "default",
  contentClassName,
  headerTitle
}: AppLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col overflow-hidden">
      <AppHeader toggleSidebar={toggleSidebar} title={headerTitle} />
      
      <div className="flex flex-1 overflow-hidden pt-[72px] relative">
        <AppSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        
        <main className={`flex-1 overflow-auto relative ${contentClassName || ""}`}>
          <PageBackground variant={backgroundVariant} />
          
          <div className="relative z-10 mx-auto max-w-6xl px-4 py-6 animate-fade-in">
            {children}
          </div>
          
          {/* Bottom gradient overlay */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent pointer-events-none z-5"></div>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
