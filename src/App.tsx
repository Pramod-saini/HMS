
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import HotelDetail from "./pages/HotelDetail";
import RestaurantDetail from "./pages/RestaurantDetail";
import MenuManagement from "./pages/MenuManagement";
import Analytics from "./pages/Analytics";
import NotFound from "./pages/NotFound";
import { RoomBooking } from "./components/hotel/RoomBooking";
import { RestaurantManagement } from "./components/restaurant/RestaurantManagement";
import HotelDashboard from "./components/dashboard/HotelDashboard";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/hotel/:id" element={<HotelDetail />} />
          <Route path="/restaurant/:id" element={<RestaurantDetail />} />
          <Route path="/menu-management" element={<MenuManagement />} />
          <Route path="/analytics" element={<Analytics />} />
           <Route path="/booking" element={<RoomBooking />} />
           <Route path="/hotelDashboard" element={<HotelDashboard />} />
          <Route path="/RestaurantManagement" element={<RestaurantManagement/>}/>
          {/* <Route path="/"/> */}
          
          {/* Protected dashboard route */}
          <Route path="/dashboard" element={<Index />} />
          <Route path="/dashboard/:id" element={<Index />} />
          <Route path="/dashboard/hotel/:id" element={<Index />} />
          <Route path="/dashboard/restaurant/:id" element={<Index />} />
          
          {/* Add more routes as needed */}
          {/* Example nested route */}
          {/* <Route path="/dashboard/settings" element={<Settings />} /> */}
          
          {/* Example dynamic route */}
          {/* <Route path="/dashboard/user/:userId" element={<UserProfile />} /> */}
          
          {/* Example admin route */}
          {/* <Route path="/dashboard/admin" element={<AdminPanel />} /> */}
          
          {/* Example fallback route */}
          {/* <Route path="*" element={<NotFound />} /> */}
          
          {/* Redirect root to home page */}
          <Route path="/" element={<Home />} />
          
          
          {/* Catch-all route for 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
