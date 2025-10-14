import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { 
  Plane, 
  Building, 
  MapPin, 
  Calendar as CalendarIcon, 
  Users, 
  Search,
  ArrowLeftRight,
  Sparkles,
  Shield,
  Clock,
  Star,
  TrendingUp,
  Award,
  Globe,
  Zap,
  CheckCircle,
  Phone,
  Mail,
  Car,
  Train,
  Bus,
  Sailboat
} from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import SearchBox from './SearchBox';

interface HeroSectionProps {
  onSearch?: (searchData: any) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onSearch }) => {
  const [activeTab, setActiveTab] = useState('hotels');
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [checkInDate, setCheckInDate] = useState<Date>();
  const [checkOutDate, setCheckOutDate] = useState<Date>();
  const [guests, setGuests] = useState('2 Adults');
  const [rooms, setRooms] = useState('1 Room');
  const [tripType, setTripType] = useState('one-way');

  const handleSearch = () => {
    const searchData = {
      type: activeTab,
      from: fromLocation,
      to: toLocation,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      guests,
      rooms,
      tripType
    };
    
    onSearch?.(searchData);
  };

  const swapLocations = () => {
    const temp = fromLocation;
    setFromLocation(toLocation);
    setToLocation(temp);
  };

  const quickServices = [
    { icon: Building, label: "Hotels", active: true },
    { icon: Plane, label: "Flights" },
    { icon: Car, label: "Cabs" },
    { icon: Train, label: "Trains" },
    { icon: Bus, label: "Bus" },
    { icon: Sailboat, label: "Cruise" }
  ];

  const trustIndicators = [
    { icon: Shield, label: "100% Safe & Secure", color: "text-green-400" },
    { icon: Award, label: "Best Price Guarantee", color: "text-yellow-400" },
    { icon: Clock, label: "24x7 Support", color: "text-blue-400" },
    { icon: Globe, label: "50+ Countries", color: "text-purple-400" }
  ];

  const stats = [
    { number: "20M+", label: "Happy Customers" },
    { number: "1.2M+", label: "Hotels Worldwide" },
    { number: "4.5", label: "Average Rating", icon: Star },
    { number: "24/7", label: "Customer Support" }
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-primary/20 via-accent/10 to-primary/30">
      {/* Hero Background */}
      {/* Background Video */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback to gradient background if video fails
            e.currentTarget.style.display = 'none';
            e.currentTarget.parentElement!.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
          }}
        >
          <source src="https://videos.pexels.com/video-files/2169880/2169880-uhd_2560_1440_30fps.mp4" type="video/mp4" />
          <source src="https://videos.pexels.com/video-files/857195/857195-hd_1920_1080_30fps.mp4" type="video/mp4" />
          <source src="https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_30fps.mp4" type="video/mp4" />
          {/* Fallback background */}
        </video>
        {/* Overlay gradient for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-transparent to-green-900/40"></div>
        {/* Additional overlay for contrast */}
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-accent/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-3/4 right-1/4 w-60 h-60 bg-primary/20 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-3/4 w-32 h-32 bg-accent/30 rounded-full blur-2xl animate-float-slow"></div>
        <div className="absolute top-1/6 right-1/3 w-20 h-20 bg-primary/40 rounded-full blur-xl animate-float"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-20 min-h-screen">
        {/* Top Services Bar */}
       {/* <div className="bg-primary-foreground/95 backdrop-blur-sm border-b border-border/20">
  <div className="max-w-7xl mx-auto px-2 sm:px-4 py-3">
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      
     
      <div className="flex space-x-3 overflow-x-auto md:overflow-visible no-scrollbar flex-nowrap">
        {quickServices.map((service, index) => (
          <button
            key={index}
            className={cn(
              "flex items-center space-x-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium flex-shrink-0",
              service.active 
                ? "bg-primary text-primary-foreground shadow-md" 
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            )}
          >
            <service.icon className="h-4 w-4" />
            <span>{service.label}</span>
          </button>
        ))}
      </div>

      
      <div className="flex flex-col sm:flex-row items-center justify-center md:justify-end gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
        <div className="flex items-center space-x-1">
          <Phone className="h-4 w-4" />
          <span>+1-800-123-4567</span>
        </div>
        <div className="flex items-center space-x-1">
          <Mail className="h-4 w-4" />
          <span>Support</span>
        </div>
      </div>
    </div>
  </div>
</div> */}


        {/* Hero Content */}
        <div className="px-4 pt-24 pb-8">
          <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Discover Your Perfect
            <span className="block bg-orange-500 bg-clip-text text-transparent">
              Stay & Dine
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
            Where luxury hotels meet exceptional dining experiences. 
            <span className="block mt-2 text-lg text-white/80">
              Create unforgettable memories with world-class hospitality.
            </span>
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-white/70">
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
              Premium Hotels
            </span>
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
              Fine Dining
            </span>
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
              Exclusive Experiences
            </span>
          </div>
        </div>
            <SearchBox/>
           
            {/* Trust Indicators */}
            <div className="max-w-4xl mx-auto mt-12">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {trustIndicators.map((indicator, index) => (
                  <div key={index} className="flex items-center justify-center space-x-2 text-primary-foreground/80">
                    <indicator.icon className={cn("h-5 w-5", indicator.color)} />
                    <span className="text-sm font-medium">{indicator.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        {/* <div className="bg-card/95 backdrop-blur-sm border-t border-border/20 py-8">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-sm font-medium text-muted-foreground">
                  ✓ Price Match Guarantee ✓ Secure Booking ✓ 24/7 Customer Support
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                By proceeding, I agree to MakeMyTrip's Terms & Conditions and Privacy Policy
              </p>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};