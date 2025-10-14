
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Star, MessageSquare, TrendingUp, Users, 
  Hotel, UtensilsCrossed, User, Clock
} from "lucide-react";

export const ReviewsModule = () => {
  const reviews = [
    {
      id: 1,
      guest: "Sarah Johnson",
      category: "Hotel",
      rating: 5,
      title: "Excellent Service!",
      comment: "Amazing stay! The room was clean, staff was friendly, and the location is perfect.",
      date: "2024-01-15",
      service: "Room Service",
      staff: "Emily Chen"
    },
    {
      id: 2,
      guest: "Mike Wilson",
      category: "Restaurant",
      rating: 4,
      title: "Great Food",
      comment: "The dinner was delicious, especially the seafood. Chef did an amazing job!",
      date: "2024-01-14",
      service: "Dining",
      staff: "Chef Marco"
    },
    {
      id: 3,
      guest: "John Smith",
      category: "Housekeeping",
      rating: 5,
      title: "Spotless Room",
      comment: "Room was perfectly clean and well-maintained. Housekeeping team is fantastic!",
      date: "2024-01-13",
      service: "Housekeeping",
      staff: "Maria Rodriguez"
    },
    {
      id: 4,
      guest: "Emily Davis",
      category: "Restaurant",
      rating: 3,
      title: "Good Service",
      comment: "Food was good but service was a bit slow. Waiter was polite though.",
      date: "2024-01-12",
      service: "Dining",
      staff: "James Wilson"
    }
  ];

  const stats = [
    { label: "Overall Rating", value: "4.6", icon: Star, color: "text-yellow-600" },
    { label: "Total Reviews", value: "847", icon: MessageSquare, color: "text-blue-600" },
    { label: "This Month", value: "124", icon: TrendingUp, color: "text-green-600" },
    { label: "Response Rate", value: "98%", icon: Users, color: "text-purple-600" }
  ];

  const categoryBreakdown = [
    { category: "Hotel Service", rating: 4.7, reviews: 324, color: "bg-blue-500" },
    { category: "Restaurant", rating: 4.5, reviews: 298, color: "bg-green-500" },
    { category: "Housekeeping", rating: 4.8, reviews: 156, color: "bg-purple-500" },
    { category: "Staff", rating: 4.6, reviews: 189, color: "bg-orange-500" }
  ];

  const getRatingStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star 
        key={index} 
        className={`w-4 h-4 ${index < rating ? "text-yellow-500 fill-current" : "text-gray-300"}`} 
      />
    ));
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "hotel": return <Hotel className="w-4 h-4" />;
      case "restaurant": return <UtensilsCrossed className="w-4 h-4" />;
      case "housekeeping": return <User className="w-4 h-4" />;
      default: return <MessageSquare className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-3 md:p-4">
                <div className="flex items-center space-x-2">
                  <IconComponent className={`w-5 h-5 md:w-6 md:h-6 ${stat.color}`} />
                  <div>
                    <p className="text-xs md:text-sm text-gray-600 font-medium">{stat.label}</p>
                    <p className={`text-lg md:text-xl font-bold ${stat.color}`}>{stat.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Category Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Rating Breakdown</CardTitle>
          <CardDescription>Performance by service category</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {categoryBreakdown.map((item, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-sm md:text-base">{item.category}</h3>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="font-bold">{item.rating}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>{item.reviews} reviews</span>
                  <div className="flex space-x-1">
                    {getRatingStars(Math.round(item.rating))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Reviews */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MessageSquare className="w-5 h-5" />
            <span>Recent Reviews</span>
          </CardTitle>
          <CardDescription>Latest guest feedback and ratings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-start space-x-3">
                  <Avatar className="w-8 h-8 md:w-10 md:h-10">
                    <AvatarFallback className="bg-blue-100 text-blue-600 text-sm">
                      {review.guest.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold text-sm md:text-base">{review.guest}</h3>
                        <Badge variant="outline" className="flex items-center space-x-1">
                          {getCategoryIcon(review.category)}
                          <span>{review.category}</span>
                        </Badge>
                      </div>
                      
                      <div className="flex items-center space-x-2 mt-1 sm:mt-0">
                        <div className="flex space-x-1">
                          {getRatingStars(review.rating)}
                        </div>
                        <div className="flex items-center text-xs text-gray-500">
                          <Clock className="w-3 h-3 mr-1" />
                          {review.date}
                        </div>
                      </div>
                    </div>
                    
                    <h4 className="font-medium text-gray-900 mb-1">{review.title}</h4>
                    <p className="text-sm text-gray-600 mb-3">{review.comment}</p>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs text-gray-500">
                      <div className="flex items-center space-x-4">
                        <span><strong>Service:</strong> {review.service}</span>
                        <span><strong>Staff:</strong> {review.staff}</span>
                      </div>
                      <Button variant="ghost" size="sm" className="mt-2 sm:mt-0 w-full sm:w-auto">
                        Reply
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 text-center">
            <Button variant="outline" className="w-full sm:w-auto">
              Load More Reviews
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
