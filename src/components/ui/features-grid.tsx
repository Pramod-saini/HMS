import React from 'react';
import { Shield, Clock, Heart, Star, Users, Smartphone, Gift, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const features = [
  {
    icon: Shield,
    title: "Verified Properties",
    description: "All hotels and restaurants are personally verified by our team",
    color: "from-blue-500 to-blue-600"
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Round-the-clock customer support for all your travel needs",
    color: "from-green-500 to-green-600"
  },
  {
    icon: Heart,
    title: "Best Price Guarantee",
    description: "We'll match any lower price you find elsewhere",
    color: "from-red-500 to-red-600"
  },
  {
    icon: Star,
    title: "Exclusive Deals",
    description: "Access to member-only rates and special promotions",
    color: "from-yellow-500 to-yellow-600"
  },
  {
    icon: Users,
    title: "Trusted Community",
    description: "Join millions of travelers who trust our platform",
    color: "from-purple-500 to-purple-600"
  },
  {
    icon: Smartphone,
    title: "Mobile App",
    description: "Book on-the-go with our award-winning mobile app",
    color: "from-indigo-500 to-indigo-600"
  },
  {
    icon: Gift,
    title: "Loyalty Rewards",
    description: "Earn points and unlock exclusive benefits with every booking",
    color: "from-pink-500 to-pink-600"
  },
  {
    icon: MapPin,
    title: "Local Insights",
    description: "Get insider tips and recommendations from local experts",
    color: "from-teal-500 to-teal-600"
  }
];

export const FeaturesGrid = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-muted/30 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
            <Star className="h-4 w-4 mr-2" />
            Why Choose Us
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Everything You Need for Perfect Travel
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We've built the most comprehensive platform to make your travel planning effortless and enjoyable
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index} 
                className="group hover:shadow-lg hover:scale-105 transition-all duration-300 border-0 bg-background/80 backdrop-blur-sm animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-bold text-lg mb-3 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};