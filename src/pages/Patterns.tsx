
import React, { useState, useEffect } from "react";
import AppLayout from "@/components/common/AppLayout";
import PatternBackground from "@/components/patterns/PatternBackground";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Sparkles, Network, Zap, BarChart3, ArrowRight, Download, Plus, Filter } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { LineChart, Line, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import PatternCategoryGrid from "../components/patterns/PatternCategoryGrid";
import { getPatternCategories } from "@/components/patterns/patternCategories";

// Sample data for charts
const patternData = [
  { name: 'Jan', value: 12 },
  { name: 'Feb', value: 19 },
  { name: 'Mar', value: 15 },
  { name: 'Apr', value: 27 },
  { name: 'May', value: 42 },
  { name: 'Jun', value: 37 },
  { name: 'Jul', value: 44 },
];

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
    <AppLayout contentClassName="overflow-x-hidden" headerTitle="Pattern Analysis" backgroundVariant="cyber">
      {/* Enhanced 3D background */}
      <PatternBackground />
      
      {/* Main content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-4 pb-12">
        {/* Status bar */}
        <div className="flex items-center gap-2 mb-6">
          <div className="h-2 w-2 bg-[#B026FF] rounded-full animate-pulse"></div>
          <div className="text-xs text-[#B026FF]/70 font-mono uppercase tracking-wider">PATTERN ENGINE</div>
          <div className="h-4 border-r border-[#B026FF]/20 mx-2"></div>
          <Badge variant="cyber-purple" className="animate-pulse">3 NEW</Badge>
          <div className="ml-auto text-xs text-white/50 font-mono">
            SCAN ID: <span className="text-[#B026FF]">PP72X9C</span>
          </div>
        </div>
        
        {/* Stats & Controls Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <Card variant="cyber" className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle variant="cyber">Pattern Detection Rate</CardTitle>
              <Badge variant="cyber-purple">Live Data</Badge>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={patternData}>
                    <defs>
                      <linearGradient id="patternGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#B026FF" stopOpacity={0.6}/>
                        <stop offset="95%" stopColor="#B026FF" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke="#224" strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" stroke="#666" />
                    <YAxis stroke="#666" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#0A0E1A', 
                        borderColor: '#B026FF40',
                        borderRadius: '4px',
                        boxShadow: '0 0 10px rgba(176, 38, 255, 0.3)'
                      }} 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#B026FF" 
                      fillOpacity={1} 
                      fill="url(#patternGradient)" 
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { label: "Detection Rate", value: "87%", icon: Network, trend: "+3%" },
                  { label: "Avg. Confidence", value: "72%", icon: Sparkles, trend: "+5%" },
                  { label: "Implementation", value: "64%", icon: Zap, trend: "+2%" },
                ].map((stat, i) => (
                  <div key={stat.label} className="flex items-center gap-3 p-3 border border-[#B026FF]/20 rounded-md bg-[#B026FF]/5">
                    <div className="h-10 w-10 rounded-full bg-[#070A14] border border-[#B026FF]/30 flex items-center justify-center text-[#B026FF]">
                      <stat.icon size={16} />
                    </div>
                    <div>
                      <div className="text-xs text-white/70">{stat.label}</div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg font-mono text-[#B026FF]">{stat.value}</span>
                        <span className="text-xs text-[#FAFF00]">{stat.trend}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card variant="tech-border">
            <CardHeader>
              <CardTitle variant="cyber">Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="cyber-purple" className="w-full justify-between">
                Create New Pattern 
                <Plus size={16} />
              </Button>
              <Button variant="cyber-purple" className="w-full justify-between">
                Advanced Analysis
                <Zap size={16} />
              </Button>
              <Button variant="cyber-purple" className="w-full justify-between">
                Export Report
                <Download size={16} />
              </Button>
              <Button variant="outline" className="w-full justify-between border-[#B026FF]/30 text-[#B026FF]/70 hover:bg-[#B026FF]/5">
                Filter Results
                <Filter size={16} />
              </Button>
            </CardContent>
          </Card>
        </div>
        
        {/* Pattern categories tabs */}
        <div className="mb-8">
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex items-center justify-between mb-6">
              <TabsList className="bg-[#070A14] border border-[#B026FF]/20 p-1">
                <TabsTrigger 
                  value="all" 
                  className="data-[state=active]:bg-[#B026FF]/10 data-[state=active]:text-[#B026FF] data-[state=active]:shadow-none"
                >
                  All Patterns
                </TabsTrigger>
                <TabsTrigger 
                  value="offensive" 
                  className="data-[state=active]:bg-[#B026FF]/10 data-[state=active]:text-[#B026FF] data-[state=active]:shadow-none"
                >
                  Offensive
                </TabsTrigger>
                <TabsTrigger 
                  value="defensive" 
                  className="data-[state=active]:bg-[#B026FF]/10 data-[state=active]:text-[#B026FF] data-[state=active]:shadow-none"
                >
                  Defensive
                </TabsTrigger>
                <TabsTrigger 
                  value="possession" 
                  className="data-[state=active]:bg-[#B026FF]/10 data-[state=active]:text-[#B026FF] data-[state=active]:shadow-none"
                >
                  Possession
                </TabsTrigger>
              </TabsList>
              
              <div className="hidden md:flex items-center gap-1 text-xs text-[#B026FF]/70 font-mono">
                <div className="h-1 w-1 rounded-full bg-[#B026FF] animate-pulse"></div>
                ANALYZING PATTERNS
              </div>
            </div>

            <TabsContent value="all">
              <PatternCategoryGrid categories={patternCategories} filter="all" />
            </TabsContent>
            
            <TabsContent value="offensive">
              <PatternCategoryGrid categories={patternCategories} filter="offensive" />
            </TabsContent>
            
            <TabsContent value="defensive">
              <PatternCategoryGrid categories={patternCategories} filter="defensive" />
            </TabsContent>
            
            <TabsContent value="possession">
              <PatternCategoryGrid categories={patternCategories} filter="possession" />
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Additional insights */}
        <Card variant="cyber" className="mb-8">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle variant="cyber">Recent Pattern Discoveries</CardTitle>
            <Button variant="cyber-purple" size="sm">
              View All
              <ArrowRight size={14} />
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#B026FF]/20">
              {[
                { title: "High Press Transition", date: "2 days ago", category: "Defensive" },
                { title: "Central Overload", date: "5 days ago", category: "Offensive" },
                { title: "Wing Rotation", date: "1 week ago", category: "Possession" }
              ].map((discovery, i) => (
                <div key={discovery.title} className="p-4 hover:bg-[#B026FF]/5 transition-colors cursor-pointer">
                  <Badge variant={i === 0 ? "cyber-purple" : "outline"} className="mb-2">
                    {discovery.category}
                  </Badge>
                  <h4 className="font-medium text-white mb-1">{discovery.title}</h4>
                  <p className="text-xs text-white/50">{discovery.date}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      
        {/* Cyberpunk footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 border-t border-[#B026FF]/20 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/50"
        >
          <div className="flex items-center gap-2">
            <div className="h-1 w-1 rounded-full bg-[#B026FF] animate-pulse"></div>
            <span>PATTERN ENGINE v2.04.5</span>
          </div>
          
          <div className="font-mono">
            <span className="text-[#00F5FF]">TACTICAL</span>.<span className="text-[#B026FF]">PATTERN</span>.<span className="text-[#FAFF00]">ANALYZER</span>
          </div>
          
          <div className="font-mono">
            NEXT SCAN: <span className="text-[#B026FF]">12:45:23</span>
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default PatternsPage;
