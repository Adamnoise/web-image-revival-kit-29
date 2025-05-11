
import React, { useState } from "react";
import AppLayout from "@/components/common/AppLayout";
import StatsCard from "@/components/common/StatsCard";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LineChart, BarChart3, Trophy, Settings, Zap, Network, Download } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  
  const handleAction = (action: string) => {
    toast({
      title: "Action triggered",
      description: `You triggered the ${action} action`,
      variant: "default",
    });
  };
  
  return (
    <AppLayout backgroundVariant="cyber" headerTitle="Command Center">
      {/* Status indicator */}
      <div className="flex items-center gap-2 mb-6">
        <div className="h-2 w-2 bg-[#00F5FF] rounded-full animate-pulse"></div>
        <div className="text-xs text-[#00F5FF]/70 font-mono uppercase tracking-wider">SYSTEM ONLINE</div>
        <div className="h-4 border-r border-[#00F5FF]/20 mx-2"></div>
        <Badge variant="cyber" className="animate-pulse">NEW</Badge>
        <div className="ml-auto text-xs text-white/50 font-mono">
          SESSION ID: <span className="text-[#00F5FF]">25A7F3</span>
        </div>
      </div>
      
      {/* Stats row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatsCard 
          title="Total Matches" 
          value="2,458"
          change={{ value: "+14%", positive: true }}
          icon={BarChart3}
          variant="cyber"
        />
        <StatsCard 
          title="Performance Index" 
          value="76.5"
          change={{ value: "+2.3%", positive: true }}
          icon={LineChart}
          variant="cyber"
        />
        <StatsCard 
          title="Leagues" 
          value="6"
          change={{ value: "0", positive: true }}
          icon={Trophy}
          variant="neon"
        />
        <StatsCard 
          title="Detected Patterns" 
          value="48"
          change={{ value: "+3", positive: true }}
          icon={Network}
          variant="neon"
        />
      </div>
      
      {/* Tabs and main content */}
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="mb-6">
        <div className="flex items-center justify-between">
          <TabsList className="bg-[#070A14] border border-[#00F5FF]/20">
            <TabsTrigger 
              value="overview" 
              className="data-[state=active]:bg-[#00F5FF]/10 data-[state=active]:text-[#00F5FF] data-[state=active]:shadow-none"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="performance" 
              className="data-[state=active]:bg-[#00F5FF]/10 data-[state=active]:text-[#00F5FF] data-[state=active]:shadow-none"
            >
              Performance
            </TabsTrigger>
            <TabsTrigger 
              value="team" 
              className="data-[state=active]:bg-[#00F5FF]/10 data-[state=active]:text-[#00F5FF] data-[state=active]:shadow-none"
            >
              Team
            </TabsTrigger>
            <TabsTrigger 
              value="analytics" 
              className="data-[state=active]:bg-[#00F5FF]/10 data-[state=active]:text-[#00F5FF] data-[state=active]:shadow-none"
            >
              Analytics
            </TabsTrigger>
          </TabsList>
          
          <div className="flex items-center gap-2">
            <Button variant="cyber" size="sm" onClick={() => handleAction("Download Report")}>
              <Download size={14} />
              Export
            </Button>
            <Button variant="ghost" size="icon" className="text-[#00F5FF] hover:bg-[#00F5FF]/10">
              <Settings size={16} />
            </Button>
          </div>
        </div>
        
        <TabsContent value="overview" className="mt-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            <Card variant="cyber" className="lg:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle variant="cyber">Performance Overview</CardTitle>
                <Badge variant="cyber-yellow">Real-time</Badge>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center border border-dashed border-[#00F5FF]/30 rounded-md">
                  <div className="text-center">
                    <p className="text-[#00F5FF]/70">Performance Chart</p>
                    <p className="text-xs text-white/50 mt-1">Interactive chart would be displayed here</p>
                  </div>
                </div>
                
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                  {["Attack", "Defense", "Possession"].map((metric, index) => (
                    <div key={metric} className="p-3 border border-[#00F5FF]/20 rounded-md bg-[#00F5FF]/5">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-white/70">{metric}</span>
                        <span className="text-sm font-mono text-[#00F5FF]">{65 + index * 7}%</span>
                      </div>
                      <div className="mt-2 h-1 bg-[#070A14] rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-[#00F5FF]"
                          initial={{ width: 0 }}
                          animate={{ width: `${65 + index * 7}%` }}
                          transition={{ duration: 0.8, delay: 0.2 * index }}
                        ></motion.div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card variant="cyber">
              <CardHeader>
                <CardTitle variant="cyber">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-0 divide-y divide-[#00F5FF]/10">
                  {["Pattern recognized", "Match analysis complete", "New data imported", "System update"].map((activity, i) => (
                    <div key={activity} className="p-4 hover:bg-[#00F5FF]/5 transition-colors cursor-pointer">
                      <div className="flex gap-3">
                        <div className="h-8 w-8 rounded-md bg-[#070A14] border border-[#00F5FF]/30 flex items-center justify-center text-[#00F5FF]">
                          {i === 0 && <Network size={16} />}
                          {i === 1 && <BarChart3 size={16} />}
                          {i === 2 && <Download size={16} />}
                          {i === 3 && <Settings size={16} />}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">{activity}</p>
                          <p className="text-xs text-white/50 mt-0.5">{i+1}h ago</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
        
        <TabsContent value="performance">
          <div className="h-[300px] flex items-center justify-center border border-dashed border-[#00F5FF]/30 rounded-md">
            <p className="text-white/70">Performance Tab Content</p>
          </div>
        </TabsContent>
        
        <TabsContent value="team">
          <div className="h-[300px] flex items-center justify-center border border-dashed border-[#00F5FF]/30 rounded-md">
            <p className="text-white/70">Team Tab Content</p>
          </div>
        </TabsContent>
        
        <TabsContent value="analytics">
          <div className="h-[300px] flex items-center justify-center border border-dashed border-[#00F5FF]/30 rounded-md">
            <p className="text-white/70">Analytics Tab Content</p>
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Action cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: "Pattern Analysis", icon: Network, color: "#00F5FF" },
          { title: "League Management", icon: Trophy, color: "#B026FF" },
          { title: "Team Performance", icon: BarChart3, color: "#FAFF00" },
          { title: "System Settings", icon: Settings, color: "#00F5FF" }
        ].map((action, index) => (
          <motion.div
            key={action.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card 
              className="cursor-pointer group hover:border-[color]/50 transition-all duration-300"
              style={{ "--color": action.color } as React.CSSProperties}
              onClick={() => handleAction(action.title)}
            >
              <CardContent className="p-6 flex flex-col items-center justify-center text-center min-h-[120px]">
                <div 
                  className="h-12 w-12 rounded-full flex items-center justify-center mb-3 transition-all duration-300 group-hover:scale-110"
                  style={{ 
                    backgroundColor: `${action.color}10`,
                    color: action.color
                  }}
                >
                  <action.icon size={24} />
                </div>
                <h3 className="font-medium text-white group-hover:text-[color]" style={{ "--color": action.color } as React.CSSProperties}>
                  {action.title}
                </h3>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      
      {/* Cyberpunk footer */}
      <div className="mt-8 border-t border-[#00F5FF]/20 pt-4 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-white/50">
        <div className="flex items-center gap-2">
          <div className="h-1 w-1 rounded-full bg-[#00F5FF] animate-pulse"></div>
          <span>SYSTEM v2.04.5</span>
        </div>
        
        <div className="font-mono">
          <span className="text-[#00F5FF]">TACTICAL</span>.<span className="text-[#B026FF]">COMMAND</span>.<span className="text-[#FAFF00]">CENTER</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Zap size={12} className="text-[#FAFF00]" />
          <span className="font-mono">UPTIME: <span className="text-[#00F5FF]">48:12:37</span></span>
        </div>
      </div>
    </AppLayout>
  );
};

export default Index;
