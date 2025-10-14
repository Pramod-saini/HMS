import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  MapPin,
  Star,
  Users,
  Utensils,
  Bed,
  Waves,
  Wifi,
  Car,
  Phone,
  Mail,
  Award,
  ChevronRight,
  Heart,
  Share2,
  Filter,
  Calendar,
  Clock,
  TrendingUp,
  ChefHat,
  Coffee,
  Sparkles,
  ArrowRight,
  PlayCircle,
  Brain,
  Zap,
  X,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FeatureCard } from "@/components/ui/feature-card";
import { HeroStats } from "@/components/ui/hero-stats";
// import { TestimonialCarousel } from "@/components/ui/testimonial-carousel";

// import { CTASection } from "@/components/ui/cta-section";
import { HeroSection } from "@/components/ui/hero-section";
import { TrendingDestinations } from "@/components/ui/trending-destinations";
import { FeaturesGrid } from "@/components/ui/features-grid";
import { NewsletterSection } from "@/components/ui/newsletter-section";
import { AppShowcase } from "@/components/ui/app-showcase";
import Browse_exp from "@/components/ui/browse_exp";

import { FloatingActions } from "@/components/ui/floating-actions";
import { AiChatbot } from "@/components/ui/ai-chatbot";
// import PerformanceLoader from "@/components/ui/performance-loader";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceFilter, setPriceFilter] = useState("all");

  const categories = [
    { id: "all", name: "All Categories", icon: Sparkles },
    { id: "luxury", name: "Luxury", icon: Award },
    { id: "budget", name: "Budget Friendly", icon: Users },
    { id: "family", name: "Family", icon: Heart },
    { id: "business", name: "Business", icon: Coffee },
    { id: "romantic", name: "Romantic", icon: Star },
  ];

  const cuisineTypes = [
    { id: "all", name: "All Cuisines", icon: ChefHat },
    { id: "italian", name: "Italian", icon: Utensils },
    { id: "asian", name: "Asian", icon: Utensils },
    { id: "american", name: "American", icon: Utensils },
    { id: "mediterranean", name: "Mediterranean", icon: Utensils },
    { id: "fusion", name: "Fusion", icon: Utensils },
  ];

  const restaurants = [
    {
      id: 1,
      name: "La Bella Vista",
      image:
        "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400&h=300&fit=crop",
      rating: 4.9,
      reviews: 312,
      location: "Downtown, Sky Tower",
      cuisine: "Italian Fine Dining",
      priceRange: "$$$",
      category: "luxury",
      cuisineType: "italian",
      description:
        "Authentic Italian cuisine with breathtaking city views from the 45th floor.",
      specialties: ["Truffle Pasta", "Osso Buco", "Tiramisu"],
      openHours: "5:00 PM - 11:00 PM",
      featured: true,
    },
    {
      id: 2,
      name: "Ocean Breeze Grill",
      image:
        "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&h=300&fit=crop",
      rating: 4.7,
      reviews: 189,
      location: "Waterfront District",
      cuisine: "Seafood & Steakhouse",
      priceRange: "$$",
      category: "family",
      cuisineType: "american",
      description:
        "Fresh seafood and premium steaks with ocean views and outdoor seating.",
      specialties: ["Lobster Thermidor", "Wagyu Steak", "Seafood Platter"],
      openHours: "12:00 PM - 10:00 PM",
      featured: false,
    },
    {
      id: 3,
      name: "The Garden Terrace",
      image:
        "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop",
      rating: 4.6,
      reviews: 267,
      location: "Historic Quarter",
      cuisine: "Modern European",
      priceRange: "$$",
      category: "romantic",
      cuisineType: "mediterranean",
      description:
        "Farm-to-table dining in a beautiful garden setting with seasonal menus.",
      specialties: ["Herb-Crusted Lamb", "Seasonal Vegetables", "Wine Pairing"],
      openHours: "6:00 PM - 10:00 PM",
      featured: true,
    },
    {
      id: 4,
      name: "Sakura Sushi House",
      image:
        "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop",
      rating: 4.8,
      reviews: 145,
      location: "Arts District",
      cuisine: "Japanese",
      priceRange: "$$$",
      category: "luxury",
      cuisineType: "asian",
      description:
        "Authentic Japanese sushi and traditional dishes in an elegant atmosphere.",
      specialties: ["Omakase", "Chirashi Bowl", "Miso Soup"],
      openHours: "5:30 PM - 10:30 PM",
      featured: false,
    },
    {
      id: 5,
      name: "Rustic Tavern",
      image:
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop",
      rating: 4.5,
      reviews: 203,
      location: "Old Town",
      cuisine: "American Comfort",
      priceRange: "$$",
      category: "budget",
      cuisineType: "american",
      description:
        "Classic American comfort food with craft beers and a cozy atmosphere.",
      specialties: ["BBQ Ribs", "Mac & Cheese", "Craft Beer"],
      openHours: "11:00 AM - 11:00 PM",
      featured: false,
    },
    {
      id: 6,
      name: "Spice Route",
      image:
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
      rating: 4.4,
      reviews: 178,
      location: "Cultural Quarter",
      cuisine: "Indian",
      priceRange: "$$",
      category: "family",
      cuisineType: "asian",
      description:
        "Authentic Indian flavors with traditional recipes and aromatic spices.",
      specialties: ["Butter Chicken", "Biryani", "Naan Bread"],
      openHours: "12:00 PM - 9:30 PM",
      featured: true,
    },
  ];

  const hotels = [
    {
      id: 1,
      name: "Grand Palace Hotel",
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop",
      rating: 4.8,
      reviews: 245,
      location: "Downtown, City Center",
      price: "$299/night",
      originalPrice: "$399/night",
      starRating: 5,
      category: "luxury",
      description:
        "Luxury 5-star hotel with world-class amenities and exceptional service.",
      amenities: ["Spa", "Pool", "Gym", "Business Center"],
      featured: true,
    },
    {
      id: 2,
      name: "Oceanview Resort",
      image:
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop",
      rating: 4.7,
      reviews: 189,
      location: "Beachfront",
      price: "$199/night",
      originalPrice: "$249/night",
      starRating: 4,
      category: "family",
      description:
        "Beachfront resort with stunning ocean views and relaxing spa facilities.",
      amenities: ["Beach Access", "Kids Club", "Restaurant", "Spa"],
      featured: false,
    },
    {
      id: 3,
      name: "Mountain Lodge",
      image:
        "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=300&fit=crop",
      rating: 4.6,
      reviews: 167,
      location: "Mountain District",
      price: "$149/night",
      originalPrice: "$189/night",
      starRating: 4,
      category: "budget",
      description:
        "Cozy mountain retreat with hiking trails and scenic mountain views.",
      amenities: ["Hiking Trails", "Fireplace", "Mountain Views", "Parking"],
      featured: true,
    },
    {
      id: 4,
      name: "Urban Boutique Hotel",
      image:
        "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=300&fit=crop",
      rating: 4.5,
      reviews: 134,
      location: "Arts District",
      price: "$179/night",
      originalPrice: "$219/night",
      starRating: 4,
      category: "business",
      description:
        "Modern boutique hotel in the heart of the arts district with unique design.",
      amenities: ["Business Center", "Rooftop Bar", "Concierge", "Wifi"],
      featured: false,
    },
    {
      id: 5,
      name: "Riverside Inn",
      image:
        "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=400&h=300&fit=crop",
      rating: 4.3,
      reviews: 198,
      location: "Riverside",
      price: "$129/night",
      originalPrice: "$159/night",
      starRating: 3,
      category: "romantic",
      description:
        "Charming riverside inn with peaceful atmosphere and scenic river views.",
      amenities: ["River Views", "Garden", "Restaurant", "Parking"],
      featured: false,
    },
    {
      id: 6,
      name: "Sky Tower Suites",
      image:
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=300&fit=crop",
      rating: 4.9,
      reviews: 287,
      location: "Financial District",
      price: "$349/night",
      originalPrice: "$449/night",
      starRating: 5,
      category: "luxury",
      description:
        "Luxury suites with panoramic city views and premium business amenities.",
      amenities: [
        "City Views",
        "Business Center",
        "Concierge",
        "Valet Parking",
      ],
      featured: true,
    },
  ];

  const filteredItems = () => {
    let items = [];

    if (activeTab === "all" || activeTab === "restaurants") {
      items = [
        ...items,
        ...restaurants.map((r) => ({ ...r, type: "restaurant" })),
      ];
    }

    if (activeTab === "all" || activeTab === "hotels") {
      items = [...items, ...hotels.map((h) => ({ ...h, type: "hotel" }))];
    }

    // Filter by category
    if (selectedCategory !== "all") {
      items = items.filter((item) => item.category === selectedCategory);
    }

    // Filter by cuisine type for restaurants
    if (activeTab === "restaurants" && selectedCategory !== "all") {
      items = items.filter((item) => item.cuisineType === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      items = items.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (item.cuisine &&
            item.cuisine.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by price range
    if (priceFilter !== "all") {
      items = items.filter((item) => {
        if (item.type === "restaurant") {
          return item.priceRange === priceFilter;
        } else {
          const price = parseInt(item.price.replace(/[$\/night]/g, ""));
          if (priceFilter === "$") return price < 150;
          if (priceFilter === "$$") return price >= 150 && price < 250;
          if (priceFilter === "$$$") return price >= 250;
        }
        return true;
      });
    }

    return items;
  };

  const featuredItems = filteredItems().filter((item) => item.featured);

  const handleSearch = (searchData: any) => {
    console.log("Search data:", searchData);
    // Handle search functionality here
  };

  const testimonials = [
    {
      name: "Sarah Johnson",
      text: "Amazing platform! Found the perfect restaurant for our anniversary dinner. The booking process was seamless and the recommendations were spot on.",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face",
      title: "Food Enthusiast",
    },
    {
      name: "Michael Chen",
      text: "Great selection of hotels with detailed information. Saved money and found exactly what I was looking for. The filter options are very helpful!",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face",
      title: "Business Traveler",
    },
    {
      name: "Emily Davis",
      text: "The detailed information and photos helped me make the right choice. Customer service was excellent and the user experience is outstanding.",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face",
      title: "Vacation Planner",
    },
  ];

  const stats = [
    { number: "15,000+", label: "Happy Customers", icon: Users },
    { number: "800+", label: "Partner Hotels", icon: Bed },
    { number: "1,500+", label: "Restaurants Listed", icon: Utensils },
    { number: "4.9/5", label: "Average Rating", icon: Star },
  ];
  const [menuOpen, setMenuOpen] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="min-h-screen bg-background relative">
      {/* <PerformanceLoader isLoading={isLoading} /> */}
      {/* Header */}
      <header className="bg-gradient-to-b from-purple-600 to-purple-400 text-primary-foreground shadow-md sticky top-0 z-30">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between">
            {/* Logo + Title */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-foreground/20 rounded-full flex items-center justify-center">
                <Brain className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">
                  Hotel Management
                </h1>
                <p className="text-xs text-white flex items-center gap-1">
                  <Zap className="h-3 w-3" />
                  AI-Powered Discovery
                </p>
              </div>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                className="text-primary-foreground hover:bg-primary-foreground/20"
                asChild
              >
                <Link to="/login">Login</Link>
              </Button>
              <Button
                variant="secondary"
                size="sm"
                className="bg-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/30 border border-primary-foreground/30"
                asChild
              >
                <Link to="/register">Get Started</Link>
              </Button>
            </div>

            {/* Mobile Toggle */}
            <button
              className="md:hidden text-primary-foreground"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {menuOpen && (
            <div className="flex flex-col mt-3 space-y-1 md:hidden">
              <Button
                variant="ghost"
                size="sm"
                className="w-full text-left text-primary-foreground hover:bg-primary-foreground/20"
                asChild
              >
                <Link to="/login">Login</Link>
              </Button>
              <Button
                variant="secondary"
                size="sm"
                className="w-full bg-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/30 border border-primary-foreground/30"
                asChild
              >
                <Link to="/register">Get Started</Link>
              </Button>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <HeroSection onSearch={handleSearch} />

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <HeroStats />
        </div>
      </section>

      {/* Trending Destinations */}
      <TrendingDestinations />
      <Browse_exp />

      {/* Features Grid */}
      <FeaturesGrid />

      {/* Featured Section */}
      {featuredItems.length > 0 && (
        <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
                <Award className="h-4 w-4 mr-2" />
                Featured Collection
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Handpicked for You
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Discover our curated selection of exceptional dining and
                accommodation experiences
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredItems.slice(0, 6).map((item) => (
                <FeatureCard key={`${item.type}-${item.id}`} item={item} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16">
        <div className="mb-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-4xl font-bold mb-2">
                {activeTab === "all" && "Discover Amazing Places"}
                {activeTab === "hotels" && "Premium Hotels"}
                {activeTab === "restaurants" && "Exceptional Restaurants"}
              </h2>
              <p className="text-muted-foreground text-lg">
                {filteredItems().length} places found
              </p>
            </div>

            <div className="flex gap-3">
              <select
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                className="px-4 py-2 border rounded-lg bg-background"
              >
                <option value="all">All Prices</option>
                <option value="$">Budget ($)</option>
                <option value="$$">Mid-range ($$)</option>
                <option value="$$$">Luxury ($$$)</option>
              </select>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems().map((item) => (
            <FeatureCard key={`${item.type}-${item.id}`} item={item} />
          ))}
        </div>
      </main>


      {/* App Showcase with AI Features */}
      <section className="py-20 px-8 bg-gradient-to-br from-primary/5 to-accent/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-background/50 to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 animate-fade-up">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              <Sparkles className="h-4 w-4 mr-2 animate-pulse" />
              AI-Enhanced Experience
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Experience the Future of Travel Planning
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our AI chatbot provides instant recommendations, smart search
              capabilities, and personalized suggestions to make your journey
              unforgettable
            </p>
          </div>
        </div>
         <AppShowcase />
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-muted/20 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              <Users className="h-4 w-4 mr-2" />
              Customer Stories
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              What Our Customers Say
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Join thousands of satisfied customers who have found their perfect
              dining and accommodation experiences through our platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="border-2 hover:border-primary/20 transition-colors"
              >
                <CardContent className="p-8">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <blockquote className="text-lg text-muted-foreground mb-6 leading-relaxed">
                    "{testimonial.text}"
                  </blockquote>
                  <div className="flex items-center gap-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-semibold text-lg">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {testimonial.title}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <NewsletterSection />

      {/* Footer */}
      <footer className="bg-card border-t py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <Sparkles className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="font-bold text-2xl">Hotel Management System</h3>
              </div>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Your trusted partner for finding the best hotels and restaurants
                worldwide. Creating unforgettable experiences since 2020.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-primary" />
                  <span className="text-sm">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-primary" />
                  <span className="text-sm">support@hospitalityhub.com</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-6 text-lg">For Travelers</h4>
              <ul className="space-y-3 text-muted-foreground">
                <li>
                  <Link to="#" className="hover:text-primary transition-colors">
                    Search Hotels
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-primary transition-colors">
                    Find Restaurants
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-primary transition-colors">
                    Travel Guides
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-primary transition-colors">
                    Special Offers
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-primary transition-colors">
                    Mobile App
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-6 text-lg">For Partners</h4>
              <ul className="space-y-3 text-muted-foreground">
                <li>
                  <Link to="#" className="hover:text-primary transition-colors">
                    List Your Hotel
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-primary transition-colors">
                    List Your Restaurant
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-primary transition-colors">
                    Partner Portal
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-primary transition-colors">
                    Marketing Tools
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-primary transition-colors">
                    Analytics
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-6 text-lg">Support</h4>
              <ul className="space-y-3 text-muted-foreground">
                <li>
                  <Link to="#" className="hover:text-primary transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-primary transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-primary transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-primary transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-primary transition-colors">
                    Accessibility
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t pt-8 text-center text-muted-foreground">
            <p>
              &copy; 2025 Hotel Management System. All rights reserved. Made
              with <span className="font-semibold text-orange-500 underline hover:text-blue-600">ATS GLOBAL TECH</span> .
            </p>
          </div>
        </div>
      </footer>

      {/* AI Components */}
      <AiChatbot />
      <FloatingActions />
    </div>
  );
};

export default Home;
