import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import Scan from "@/pages/Scan";
import Processing from "@/pages/Processing";
import Results from "@/pages/Results";
import About from "@/pages/About";
import Database from "@/pages/Database";
import { ScanProvider } from "@/context/ScanContext";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home}/>
      <Route path="/scan" component={Scan}/>
      <Route path="/processing" component={Processing}/>
      <Route path="/results" component={Results}/>
      <Route path="/database" component={Database}/>
      <Route path="/about" component={About}/>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ScanProvider>
          <Layout>
            <Router />
          </Layout>
          <Toaster />
        </ScanProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
