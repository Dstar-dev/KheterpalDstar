import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Blog from "@/pages/blog";
import BlogPost from "@/pages/blog-post";
import Cursor from "@/components/Cursor";
import { ThemeToggle } from './components/ThemeToggle'; // Added import

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:id" component={BlogPost} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeToggle /> {/* Added ThemeToggle component */}
      <Cursor />
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;