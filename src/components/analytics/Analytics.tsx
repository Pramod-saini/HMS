
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Users, Menu, Settings, TrendingUp, ArrowUp, ArrowDown, Eye, DollarSign, Clock, Star } from "lucide-react";

export const Analytics = () => {
  const kpiData = [
    {
      title: "Monthly Revenue",
      value: "$125,430",
      change: "+15.2%",
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-gradient-to-br from-green-50 to-emerald-50",
      borderColor: "border-green-200/50",
      trend: "up"
    },
    {
      title: "Average Occupancy",
      value: "78%",
      change: "+3.5%",
      icon: Calendar,
      color: "text-blue-600",
      bgColor: "bg-gradient-to-br from-blue-50 to-cyan-50",
      borderColor: "border-blue-200/50",
      trend: "up"
    },
    {
      title: "Restaurant Revenue",
      value: "$45,670",
      change: "+8.7%",
      icon: Menu,
      color: "text-purple-600",
      bgColor: "bg-gradient-to-br from-purple-50 to-pink-50",
      borderColor: "border-purple-200/50",
      trend: "up"
    },
    {
      title: "Customer Satisfaction",
      value: "4.8/5",
      change: "+0.2",
      icon: Star,
      color: "text-orange-600",
      bgColor: "bg-gradient-to-br from-orange-50 to-amber-50",
      borderColor: "border-orange-200/50",
      trend: "up"
    },
  ];

  const monthlyData = [
    { month: "Jan", hotel: 45000, restaurant: 25000, customers: 320 },
    { month: "Feb", hotel: 52000, restaurant: 28000, customers: 385 },
    { month: "Mar", hotel: 48000, restaurant: 30000, customers: 410 },
    { month: "Apr", hotel: 58000, restaurant: 32000, customers: 445 },
    { month: "May", hotel: 62000, restaurant: 34000, customers: 478 },
    { month: "Jun", hotel: 68000, restaurant: 38000, customers: 502 },
  ];

  const topRooms = [
    { room: "Deluxe Suite", bookings: 45, revenue: "$13,500", occupancy: "92%" },
    { room: "Premium Room", bookings: 38, revenue: "$8,360", occupancy: "87%" },
    { room: "Standard Room", bookings: 52, revenue: "$6,240", occupancy: "78%" },
    { room: "Executive Suite", bookings: 28, revenue: "$8,400", occupancy: "95%" },
    { room: "Junior Suite", bookings: 34, revenue: "$7,820", occupancy: "89%" },
  ];

  const topDishes = [
    { dish: "Grilled Salmon", orders: 127, revenue: "$3,556", rating: 4.8 },
    { dish: "Pasta Carbonara", orders: 98, revenue: "$2,156", rating: 4.6 },
    { dish: "Caesar Salad", orders: 156, revenue: "$1,872", rating: 4.7 },
    { dish: "Steak Dinner", orders: 67, revenue: "$3,685", rating: 4.9 },
    { dish: "Seafood Platter", orders: 89, revenue: "$4,225", rating: 4.5 },
  ];

  const customerInsights = [
    { metric: "New Customers", value: "127", change: "+23%", period: "This Month" },
    { metric: "Returning Customers", value: "68%", change: "+5%", period: "Retention Rate" },
    { metric: "Average Stay", value: "3.2 days", change: "+0.4", period: "Per Booking" },
    { metric: "Customer Lifetime Value", value: "$2,340", change: "+12%", period: "Average" },
  ];

  const recentActivity = [
    { type: "Booking", description: "Premium Suite booked for 3 nights", time: "2 mins ago", value: "$720" },
    { type: "Review", description: "5-star review for restaurant service", time: "15 mins ago", value: "★★★★★" },
    { type: "Payment", description: "Payment received for Deluxe Room", time: "23 mins ago", value: "$450" },
    { type: "Checkout", description: "Guest checked out from Executive Suite", time: "45 mins ago", value: "$680" },
  ];

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <div className="text-center md:text-left">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Analytics & Reports</h2>
        <p className="text-gray-600 mt-2">Track performance and business insights</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {kpiData.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <Card key={index} className={`hover:shadow-lg transition-all duration-300 border-2 ${kpi.borderColor} ${kpi.bgColor}`}>
              <CardContent className="p-4 md:p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-xs md:text-sm text-gray-600 font-medium">{kpi.title}</p>
                    <p className="text-xl md:text-2xl font-bold text-gray-900">{kpi.value}</p>
                    <div className="flex items-center space-x-1">
                      {kpi.trend === 'up' ? (
                        <ArrowUp className="w-3 h-3 text-green-600" />
                      ) : (
                        <ArrowDown className="w-3 h-3 text-red-600" />
                      )}
                      <Badge variant="secondary" className={`text-xs ${kpi.trend === 'up' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {kpi.change}
                      </Badge>
                    </div>
                  </div>
                  <div className={`p-3 rounded-xl ${kpi.bgColor} border ${kpi.borderColor}`}>
                    <Icon className={`w-5 h-5 md:w-6 md:h-6 ${kpi.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5" />
              <span>Monthly Revenue Comparison</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monthlyData.map((data, index) => (
                <div key={index} className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                  <div className="w-12 text-sm font-medium text-gray-600">{data.month}</div>
                  <div className="flex-1 flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-6 relative overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full"
                        style={{ width: `${(data.hotel / 70000) * 100}%` }}
                      />
                      <div
                        className="bg-gradient-to-r from-purple-500 to-purple-600 h-full rounded-full absolute top-0"
                        style={{ 
                          width: `${(data.restaurant / 70000) * 100}%`,
                          left: `${(data.hotel / 70000) * 100}%`
                        }}
                      />
                    </div>
                    <div className="text-sm font-medium text-gray-900 w-20">
                      ${(data.hotel + data.restaurant).toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex flex-wrap items-center justify-center space-x-4 md:space-x-6 pt-4 border-t">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded"></div>
                  <span className="text-sm text-gray-600">Hotel Revenue</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-gradient-to-r from-purple-500 to-purple-600 rounded"></div>
                  <span className="text-sm text-gray-600">Restaurant Revenue</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Customer Insights */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span>Customer Insights</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {customerInsights.map((insight, index) => (
                <div key={index} className="p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg border">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{insight.metric}</p>
                      <p className="text-xs text-gray-600 mt-1">{insight.period}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg text-blue-600">{insight.value}</p>
                      <Badge variant="secondary" className="text-xs bg-green-100 text-green-800 mt-1">
                        {insight.change}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Performers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                <span>Top Performing Rooms</span>
              </CardTitle>
              <Button variant="outline" size="sm">View All</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topRooms.map((room, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg border hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
                      index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : index === 2 ? 'bg-orange-500' : 'bg-blue-500'
                    }`}>
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{room.room}</p>
                      <p className="text-sm text-gray-600">{room.bookings} bookings • {room.occupancy} occupied</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-green-600">{room.revenue}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <Menu className="w-5 h-5 text-purple-600" />
                <span>Top Menu Items</span>
              </CardTitle>
              <Button variant="outline" size="sm">View Menu</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topDishes.map((dish, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-purple-50 rounded-lg border hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
                      index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : index === 2 ? 'bg-orange-500' : 'bg-purple-500'
                    }`}>
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{dish.dish}</p>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <span>{dish.orders} orders</span>
                        <span>•</span>
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span>{dish.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-green-600">{dish.revenue}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="w-5 h-5" />
            <span>Recent Activity</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-green-50 rounded-lg border">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    activity.type === 'Booking' ? 'bg-blue-500' :
                    activity.type === 'Review' ? 'bg-yellow-500' :
                    activity.type === 'Payment' ? 'bg-green-500' : 'bg-purple-500'
                  }`} />
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{activity.description}</p>
                    <p className="text-xs text-gray-600">{activity.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">{activity.value}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
