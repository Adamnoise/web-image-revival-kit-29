
import React, { useState, useEffect } from "react";
import AppLayout from "@/components/common/AppLayout";
import PatternBackground from "@/components/patterns/PatternBackground";
import PatternPageHeader from "@/components/patterns/PatternPageHeader";
import PatternTabs from "@/components/patterns/PatternTabs";
import PatternStats from "@/components/patterns/PatternStats";
import { getPatternCategories } from "@/components/patterns/patternCategories";
import { toast } from "sonner";
import { Sparkles } from "lucide-react";

const PatternsPage = () => {
  const [activeTab, setActiveTab] = useState("all");
  const patternCategories = getPatternCategories();
  
  // Show welcome toast on first render
  useEffect(() => {
    toast.success(
      "Pattern analysis updated", 
      {
        description: "AI has identified 3 new potential patterns",
        icon: <Sparkles className="h-5 w-5 text-[#00F5FF]" />,
        duration: 5000,
      }
    );
  }, []);

  return (
    <AppLayout contentClassName="overflow-x-hidden">
      {/* Enhanced 3D background */}
      <PatternBackground />
      
      {/* Main content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-4 pb-12">
        {/* Enhanced page header */}
        <PatternPageHeader />
        
        {/* Enhanced pattern category tabs */}
        <PatternTabs 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          patternCategories={patternCategories} 
        />
        
        {/* Enhanced pattern stats with interactive charts */}
        <PatternStats />
        
        {/* Cyberpunk footer element */}
        <div className="mt-16 border-t border-[#00F5FF]/20 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/50">
          <div className="flex items-center gap-2">
            <div className="h-1 w-1 rounded-full bg-[#00F5FF] animate-pulse"></div>
            <span>PATTERN ENGINE v2.04.5</span>
          </div>
          
          <div className="font-mono">
            <span className="text-[#00F5FF]">TACTICAL</span>.<span className="text-[#B026FF]">PATTERN</span>.<span className="text-[#FAFF00]">ANALYZER</span>
          </div>
          
          <div className="font-mono">
            NEXT SCAN: <span className="text-[#00F5FF]">12:45:23</span>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default PatternsPage;
