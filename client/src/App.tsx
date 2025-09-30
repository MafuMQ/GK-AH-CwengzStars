import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/HomePage";
import AboutUsPage from "@/pages/AboutUsPage";
import LoginPage from "@/pages/LoginPage";
import SignupPage from "@/pages/SignupPage";
import QuizzPage from "@/pages/QuizzPage";
import Dashboard from "@/pages/DashboardPage";
import RequireAuth from "@/components/RequireAuth";
import GamesPage from "@/pages/GamesPage";
import ParentsPage from "@/pages/ParentsPage";
import { Component } from "lucide-react";

function Router() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path="/quizz" component={QuizzPage}/>
          <Route path="/login" component={LoginPage} />
          <Route path="/signup" component={SignupPage} />
          <Route path="/aboutus" component={AboutUsPage}/>
          <Route path="/dashboard" component={() => (
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          )}/>
          <Route path="/games" component={GamesPage}/>
          <Route path="/parents" component={ParentsPage}/>

          <Route component={NotFound} />
        </Switch>
      </main>
    </div>
  );
}

function App() {
  return (
    <TooltipProvider>
        <Toaster />
        <Router />
    </TooltipProvider>
  );
}

export default App;
