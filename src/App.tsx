
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LeagueManagement from "./pages/LeagueManagement";
import PatternsPage from "./pages/Patterns";
import Brandbook from "./pages/Brandbook";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/leagues" element={<Index />} />
          <Route path="/matches" element={<Index />} />
          <Route path="/analytics" element={<Index />} />
          <Route path="/patterns" element={<PatternsPage />} />
          <Route path="/league-analytics" element={<Index />} />
          <Route path="/league-management" element={<LeagueManagement />} />
          <Route path="/integrations" element={<Index />} />
          <Route path="/predictions" element={<Index />} />
          <Route path="/settings" element={<Index />} />
          <Route path="/brandbook" element={<Brandbook />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
