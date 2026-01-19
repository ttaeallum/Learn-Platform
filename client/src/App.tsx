import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Pricing from "@/pages/pricing";
import Tracks from "@/pages/tracks";
import Courses from "@/pages/courses";
import CourseDetails from "@/pages/course-details";
import LessonPlayer from "@/pages/lesson-player";
import Auth from "@/pages/auth";
import Dashboard from "@/pages/dashboard";
import Blog from "@/pages/blog";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/pricing" component={Pricing} />
      <Route path="/tracks" component={Tracks} />
      <Route path="/courses" component={Courses} />
      <Route path="/course/:id" component={CourseDetails} />
      <Route path="/lesson/:id" component={LessonPlayer} />
      <Route path="/auth" component={Auth} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/blog" component={Blog} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
