import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, MapPin, Clock, Users, Heart, Share2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  item: {
    id: number;
    name: string;
    image: string;
    rating: number;
    reviews: number;
    location: string;
    price?: string;
    originalPrice?: string;
    priceRange?: string;
    cuisine?: string;
    category: string;
    description: string;
    featured?: boolean;
    type?: string;
    openHours?: string;
    amenities?: string[];
    specialties?: string[];
  };
  className?: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ item, className }) => {
  const isHotel = item.type === 'hotel';
  const savings = item.originalPrice && item.price 
    ? parseInt(item.originalPrice.replace(/[$\/night]/g, '')) - parseInt(item.price.replace(/[$\/night]/g, ''))
    : 0;

  return (
    <Card className={cn(
      "group relative overflow-hidden bg-white hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2",
      "border-0 rounded-2xl",
      className
    )}>
      {/* Featured Badge */}
      {item.featured && (
        <div className="absolute top-4 left-4 z-20">
          <Badge className="bg-orange-500 text-white px-3 py-1 text-sm font-semibold">
            Featured
          </Badge>
        </div>
      )}

      {/* Save Badge */}
      {savings > 0 && (
        <div className="absolute top-4 right-4 z-20">
          <Badge variant="destructive" className="px-3 py-1 text-sm font-semibold">
            Save ${savings}
          </Badge>
        </div>
      )}

      {/* Image Container */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button size="icon" variant="secondary" className="w-8 h-8 rounded-full bg-white/90 hover:bg-white">
            <Heart className="w-4 h-4" />
          </Button>
          <Button size="icon" variant="secondary" className="w-8 h-8 rounded-full bg-white/90 hover:bg-white">
            <Share2 className="w-4 h-4" />
          </Button>
        </div>

        {/* Bottom Overlay Info */}
        <div className="absolute bottom-4 left-4 text-white">
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center gap-1 bg-black/40 backdrop-blur-sm px-2 py-1 rounded-lg">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">{item.rating}</span>
              <span className="text-sm opacity-80">({item.reviews})</span>
            </div>
          </div>
        </div>
      </div>

      <CardContent className="p-6">
        {/* Header */}
        <div className="mb-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors duration-300">
              {item.name}
            </h3>
            <div className="text-right">
              {item.price && (
                <div>
                  <div className="text-lg font-bold text-gray-900">{item.price}</div>
                  {item.originalPrice && (
                    <div className="text-sm text-gray-500 line-through">{item.originalPrice}</div>
                  )}
                </div>
              )}
              {item.priceRange && (
                <div className="text-lg font-bold text-orange-600">{item.priceRange}</div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{item.location}</span>
            </div>
            {item.openHours && (
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{item.openHours}</span>
              </div>
            )}
          </div>

          {item.cuisine && (
            <Badge variant="outline" className="mb-3 text-orange-600 border-orange-200">
              {item.cuisine}
            </Badge>
          )}
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {item.description}
        </p>

        {/* Amenities/Specialties */}
        {(item.amenities || item.specialties) && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {(item.amenities || item.specialties)?.slice(0, 3).map((feature, index) => (
                <Badge key={index} variant="secondary" className="text-xs px-2 py-1">
                  {feature}
                </Badge>
              ))}
              {(item.amenities || item.specialties)?.length > 3 && (
                <Badge variant="secondary" className="text-xs px-2 py-1">
                  +{(item.amenities || item.specialties).length - 3} more
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* CTA Button */}
        <Button 
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform group-hover:scale-105"
        >
          {isHotel ? 'Book Now' : 'Reserve Table'}
        </Button>
      </CardContent>
    </Card>
  );
};