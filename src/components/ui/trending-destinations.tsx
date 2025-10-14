import React from 'react';
import { MapPin, TrendingUp, Star, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const destinations = [
  {
    id: 1,
    name: "Tokyo, Japan",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop",
    description: "Experience the perfect blend of tradition and modernity",
    hotels: 245,
    restaurants: 1850,
    rating: 4.8,
    trending: true,
    gradient: "from-red-500/20 to-orange-500/20"
  },
  {
    id: 2,
    name: "Paris, France",
    image: "https://plus.unsplash.com/premium_photo-1675745329954-9639d3b74bbf?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "The city of lights and culinary excellence",
    hotels: 189,
    restaurants: 2100,
    rating: 4.9,
    trending: true,
    gradient: "from-blue-500/20 to-purple-500/20"
  },
  {
    id: 3,
    name: "New York, USA",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&h=300&fit=crop",
    description: "The city that never sleeps",
    hotels: 156,
    restaurants: 3200,
    rating: 4.7,
    trending: false,
    gradient: "from-green-500/20 to-teal-500/20"
  },
  {
    id: 4,
    name: "Bali, Indonesia",
    image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=400&h=300&fit=crop",
    description: "Tropical paradise with rich culture",
    hotels: 98,
    restaurants: 450,
    rating: 4.6,
    trending: true,
    gradient: "from-emerald-500/20 to-cyan-500/20"
  },
    {
    id: 5,
    name: "SAG, Japan",
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Tropical paradise with rich culture",
    hotels: 98,
    restaurants: 450,
    rating: 4.6,
    trending: true,
    gradient: "from-emerald-500/20 to-cyan-500/20"
  },
    {
    id: 6,
    name: "Delhi, India",
    image: "https://media.istockphoto.com/id/514102692/photo/udaipur-city-palace-in-rajasthan-state-of-india.jpg?s=1024x1024&w=is&k=20&c=NoZSV07jo-QgncktemantlRmGSYQ0lVf0U26WVvEsUQ=",
    hotels: 245,
    restaurants: 1850,
    rating: 4.8,
    trending: true,
    gradient: "from-red-500/20 to-orange-500/20"
  },
];

export const TrendingDestinations = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
            <TrendingUp className="h-4 w-4 mr-2" />
            Trending Now
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Popular Destinations
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover the world's most sought-after destinations with exceptional hotels and restaurants
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {destinations.map((destination, index) => (
            <Card 
              key={destination.id} 
              className={`group relative overflow-hidden border-0 bg-gradient-to-br ${destination.gradient} hover:scale-[1.02] transition-all duration-300 animate-fade-in`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-0">
                <div className="relative h-80">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {destination.trending && (
                    <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      Trending
                    </Badge>
                  )}

                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm opacity-90">Destination</span>
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-2">{destination.name}</h3>
                    <p className="text-white/90 mb-4">{destination.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex gap-4 text-sm">
                        <span>{destination.hotels} Hotels</span>
                        <span>{destination.restaurants} Restaurants</span>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">{destination.rating}</span>
                      </div>
                    </div>
                  </div>

                  <Button 
                    size="sm" 
                    className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    Explore
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" variant="outline" className="group">
            View All Destinations
            <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};