import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  Headphones, Phone, Car, MapPin, Coffee, Utensils, ShoppingBag,
  Plane, Calendar, Clock, Star, Plus, MessageCircle, CheckCircle,
  AlertCircle, User, Gift, Camera, Map, Wifi, Dumbbell
} from "lucide-react";

interface Request {
  id: string;
  guestName: string;
  roomNumber: string;
  type: "concierge" | "transport" | "dining" | "shopping" | "tour" | "other";
  priority: "low" | "medium" | "high" | "urgent";
  status: "pending" | "in-progress" | "completed" | "cancelled";
  title: string;
  description: string;
  requestTime: string;
  assignedTo?: string;
  estimatedCompletion?: string;
  cost?: number;
  rating?: number;
}

interface Service {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  duration: string;
  available: boolean;
  rating: number;
  bookings: number;
}

interface Guest {
  id: string;
  name: string;
  roomNumber: string;
  checkIn: string;
  checkOut: string;
  vipStatus: boolean;
  preferences: string[];
  totalSpent: number;
  satisfaction: number;
}

export const GuestServices = () => {
  const [activeTab, setActiveTab] = useState("requests");

  const [requests] = useState<Request[]>([
    {
      id: "1",
      guestName: "John Smith",
      roomNumber: "305",
      type: "concierge",
      priority: "high",
      status: "pending",
      title: "Restaurant Reservation",
      description: "Need dinner reservation for 2 at a fine dining restaurant for tonight at 7 PM",
      requestTime: "2024-01-29T14:30:00Z",
      cost: 0
    },
    {
      id: "2",
      guestName: "Maria Garcia",
      roomNumber: "512",
      type: "transport",
      priority: "medium",
      status: "in-progress",
      title: "Airport Transfer",
      description: "Airport pickup service needed for tomorrow 3 PM flight",
      requestTime: "2024-01-29T10:15:00Z",
      assignedTo: "David Wilson",
      estimatedCompletion: "2024-01-30T15:00:00Z",
      cost: 45
    },
    {
      id: "3",
      guestName: "Robert Johnson",
      roomNumber: "203",
      type: "dining",
      priority: "low",
      status: "completed",
      title: "Room Service Order",
      description: "Late night dinner - steak and wine",
      requestTime: "2024-01-28T21:00:00Z",
      assignedTo: "Kitchen Staff",
      cost: 85,
      rating: 5
    }
  ]);

  const [services] = useState<Service[]>([
    {
      id: "1",
      name: "Airport Transfer",
      category: "Transportation",
      description: "Private car service to/from airport",
      price: 45,
      duration: "45 min",
      available: true,
      rating: 4.8,
      bookings: 156
    },
    {
      id: "2",
      name: "City Tour",
      category: "Tours",
      description: "Guided tour of city landmarks and attractions",
      price: 75,
      duration: "4 hours",
      available: true,
      rating: 4.6,
      bookings: 89
    },
    {
      id: "3",
      name: "Spa Package",
      category: "Wellness",
      description: "Full body massage and relaxation treatment",
      price: 120,
      duration: "90 min",
      available: true,
      rating: 4.9,
      bookings: 234
    },
    {
      id: "4",
      name: "Personal Shopping",
      category: "Shopping",
      description: "Personal shopping assistant for local stores",
      price: 60,
      duration: "3 hours",
      available: false,
      rating: 4.5,
      bookings: 67
    }
  ]);

  const [guests] = useState<Guest[]>([
    {
      id: "1",
      name: "John Smith",
      roomNumber: "305",
      checkIn: "2024-01-27",
      checkOut: "2024-01-31",
      vipStatus: true,
      preferences: ["Fine Dining", "Business Services", "Quiet Rooms"],
      totalSpent: 1250,
      satisfaction: 4.8
    },
    {
      id: "2",
      name: "Maria Garcia",
      roomNumber: "512",
      checkIn: "2024-01-28",
      checkOut: "2024-02-02",
      vipStatus: false,
      preferences: ["Tours", "Photography", "Local Culture"],
      totalSpent: 680,
      satisfaction: 4.5
    },
    {
      id: "3",
      name: "Robert Johnson",
      roomNumber: "203",
      checkIn: "2024-01-26",
      checkOut: "2024-01-30",
      vipStatus: true,
      preferences: ["Room Service", "Spa", "Golf"],
      totalSpent: 2100,
      satisfaction: 4.9
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800";
      case "in-progress": return "bg-blue-100 text-blue-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent": return "bg-red-100 text-red-800";
      case "high": return "bg-orange-100 text-orange-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "concierge": return Headphones;
      case "transport": return Car;
      case "dining": return Utensils;
      case "shopping": return ShoppingBag;
      case "tour": return Map;
      default: return MessageCircle;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "transportation": return Car;
      case "tours": return Map;
      case "wellness": return Dumbbell;
      case "shopping": return ShoppingBag;
      case "dining": return Utensils;
      default: return Star;
    }
  };

  const pendingRequests = requests.filter(r => r.status === "pending").length;
  const inProgressRequests = requests.filter(r => r.status === "in-progress").length;
  const completedRequests = requests.filter(r => r.status === "completed").length;
  const totalRevenue = requests.reduce((acc, req) => acc + (req.cost || 0), 0);

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">Total Requests</p>
                <p className="text-3xl font-bold">{requests.length}</p>
              </div>
              <MessageCircle className="w-10 h-10 text-blue-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-100">Pending</p>
                <p className="text-3xl font-bold">{pendingRequests}</p>
              </div>
              <Clock className="w-10 h-10 text-yellow-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">Completed</p>
                <p className="text-3xl font-bold">{completedRequests}</p>
              </div>
              <CheckCircle className="w-10 h-10 text-green-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100">Revenue</p>
                <p className="text-3xl font-bold">${totalRevenue}</p>
              </div>
              <Star className="w-10 h-10 text-purple-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="requests">Service Requests</TabsTrigger>
          <TabsTrigger value="services">Available Services</TabsTrigger>
          <TabsTrigger value="guests">Guest Profiles</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="requests" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Service Requests</h2>
              <p className="text-gray-600">Manage guest service requests and concierge tasks</p>
            </div>
            <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
              <Plus className="w-4 h-4 mr-2" />
              New Request
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {requests.map((request) => {
              const TypeIcon = getTypeIcon(request.type);
              return (
                <Card key={request.id} className="hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <TypeIcon className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{request.title}</h3>
                          <p className="text-sm text-gray-600 capitalize">{request.type}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-2">
                        <Badge className={getStatusColor(request.status)}>
                          {request.status}
                        </Badge>
                        <Badge className={getPriorityColor(request.priority)}>
                          {request.priority}
                        </Badge>
                      </div>
                      
                      <div className="text-sm space-y-1">
                        <div className="flex items-center space-x-2">
                          <User className="w-4 h-4 text-gray-400" />
                          <span>{request.guestName} - Room {request.roomNumber}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span>{new Date(request.requestTime).toLocaleString()}</span>
                        </div>
                        {request.assignedTo && (
                          <div className="flex items-center space-x-2">
                            <Headphones className="w-4 h-4 text-gray-400" />
                            <span>Assigned to: {request.assignedTo}</span>
                          </div>
                        )}
                      </div>
                      
                      <p className="text-sm text-gray-600 line-clamp-2">{request.description}</p>
                      
                      {request.cost && request.cost > 0 && (
                        <div className="flex justify-between items-center text-sm font-semibold">
                          <span>Cost:</span>
                          <span className="text-green-600">${request.cost}</span>
                        </div>
                      )}
                      
                      {request.rating && (
                        <div className="flex items-center space-x-1">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < request.rating! ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-600">({request.rating}/5)</span>
                        </div>
                      )}
                      
                      <div className="flex space-x-2 pt-2">
                        {request.status === "pending" && (
                          <Button size="sm" className="flex-1">Assign</Button>
                        )}
                        {request.status === "in-progress" && (
                          <Button size="sm" className="flex-1">Complete</Button>
                        )}
                        <Button size="sm" variant="outline" className="flex-1">Details</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="services" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Available Services</h2>
              <p className="text-gray-600">Manage concierge services and offerings</p>
            </div>
            <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Service
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => {
              const CategoryIcon = getCategoryIcon(service.category);
              return (
                <Card key={service.id} className="hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-purple-100 rounded-lg">
                          <CategoryIcon className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{service.name}</h3>
                          <p className="text-sm text-gray-600">{service.category}</p>
                        </div>
                      </div>
                      <Badge className={service.available ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                        {service.available ? "Available" : "Unavailable"}
                      </Badge>
                    </div>
                    
                    <div className="space-y-3">
                      <p className="text-sm text-gray-600">{service.description}</p>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Price</p>
                          <p className="font-semibold text-lg">${service.price}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Duration</p>
                          <p className="font-semibold">{service.duration}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="font-semibold">{service.rating}</span>
                          <span className="text-gray-600">({service.bookings} bookings)</span>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2 pt-2">
                        <Button size="sm" variant="outline" className="flex-1">Edit</Button>
                        <Button size="sm" className="flex-1" disabled={!service.available}>
                          Book Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="guests" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Guest Profiles</h2>
              <p className="text-gray-600">Manage guest preferences and service history</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guests.map((guest) => (
              <Card key={guest.id} className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600">
                        <AvatarFallback className="text-white font-semibold">
                          {guest.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-gray-900">{guest.name}</h3>
                        <p className="text-sm text-gray-600">Room {guest.roomNumber}</p>
                      </div>
                    </div>
                    {guest.vipStatus && (
                      <Badge className="bg-gold-100 text-gold-800">VIP</Badge>
                    )}
                  </div>
                  
                  <div className="space-y-3">
                    <div className="text-sm space-y-1">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Check-in:</span>
                        <span>{new Date(guest.checkIn).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Check-out:</span>
                        <span>{new Date(guest.checkOut).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total spent:</span>
                        <span className="font-semibold">${guest.totalSpent.toLocaleString()}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Satisfaction</span>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-semibold">{guest.satisfaction}</span>
                        </div>
                      </div>
                      <Progress value={guest.satisfaction * 20} className="h-2" />
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-700">Preferences:</p>
                      <div className="flex flex-wrap gap-1">
                        {guest.preferences.map((pref, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {pref}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex space-x-2 pt-2">
                      <Button size="sm" variant="outline" className="flex-1">View History</Button>
                      <Button size="sm" className="flex-1">New Request</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Service Analytics</CardTitle>
              <CardDescription>Track service performance and guest satisfaction</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-4">Request Types</h3>
                    <div className="space-y-2">
                      {["concierge", "transport", "dining", "shopping", "tour", "other"].map((type) => {
                        const typeRequests = requests.filter(req => req.type === type);
                        const percentage = requests.length > 0 ? (typeRequests.length / requests.length) * 100 : 0;
                        
                        return (
                          <div key={type} className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span className="capitalize">{type}</span>
                              <span>{typeRequests.length} requests ({percentage.toFixed(1)}%)</span>
                            </div>
                            <Progress value={percentage} className="h-2" />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-4">Service Revenue</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Total Revenue</span>
                        <span className="font-semibold">${totalRevenue.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Average per Request</span>
                        <span className="font-semibold">
                          ${completedRequests > 0 ? (totalRevenue / completedRequests).toFixed(2) : '0.00'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Completion Rate</span>
                        <span className="font-semibold">
                          {requests.length > 0 ? ((completedRequests / requests.length) * 100).toFixed(1) : '0'}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-4">Status Distribution</h3>
                    <div className="space-y-2">
                      {["pending", "in-progress", "completed", "cancelled"].map((status) => {
                        const statusRequests = requests.filter(req => req.status === status);
                        const percentage = requests.length > 0 ? (statusRequests.length / requests.length) * 100 : 0;
                        
                        return (
                          <div key={status} className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span className="capitalize">{status.replace('-', ' ')}</span>
                              <span>{statusRequests.length} requests ({percentage.toFixed(1)}%)</span>
                            </div>
                            <Progress value={percentage} className="h-2" />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-4">Guest Satisfaction</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Average Rating</span>
                        <span className="font-semibold">
                          {guests.length > 0 ? (guests.reduce((acc, g) => acc + g.satisfaction, 0) / guests.length).toFixed(1) : '0.0'}/5.0
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">VIP Guests</span>
                        <span className="font-semibold">
                          {guests.filter(g => g.vipStatus).length} / {guests.length}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Total Guest Spending</span>
                        <span className="font-semibold">
                          ${guests.reduce((acc, g) => acc + g.totalSpent, 0).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};