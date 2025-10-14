import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Calendar as CalendarIcon, Plus, Users, MapPin, Clock, DollarSign,
  Star, Coffee, Utensils, Camera, Music, Presentation, PartyPopper
} from "lucide-react";

interface Event {
  id: string;
  title: string;
  type: "conference" | "wedding" | "banquet" | "meeting" | "party" | "corporate";
  status: "confirmed" | "pending" | "cancelled" | "completed";
  date: string;
  startTime: string;
  endTime: string;
  venue: string;
  attendees: number;
  maxCapacity: number;
  contact: {
    name: string;
    email: string;
    phone: string;
  };
  totalCost: number;
  paid: number;
  services: string[];
  notes: string;
}

interface Venue {
  id: string;
  name: string;
  capacity: number;
  type: string;
  hourlyRate: number;
  features: string[];
  status: "available" | "occupied" | "maintenance";
  image?: string;
}

export const EventManagement = () => {
  const [activeTab, setActiveTab] = useState("events");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const [events] = useState<Event[]>([
    {
      id: "1",
      title: "Annual Tech Conference 2024",
      type: "conference",
      status: "confirmed",
      date: "2024-02-15",
      startTime: "09:00",
      endTime: "17:00",
      venue: "Grand Ballroom",
      attendees: 200,
      maxCapacity: 300,
      contact: {
        name: "Sarah Johnson",
        email: "sarah@techcorp.com",
        phone: "+1-555-0123"
      },
      totalCost: 12500,
      paid: 5000,
      services: ["Audio/Visual", "Catering", "Photography"],
      notes: "Requires stage setup and live streaming"
    },
    {
      id: "2",
      title: "Wilson-Smith Wedding",
      type: "wedding",
      status: "confirmed", 
      date: "2024-02-20",
      startTime: "16:00",
      endTime: "23:00",
      venue: "Garden Pavilion",
      attendees: 120,
      maxCapacity: 150,
      contact: {
        name: "Emily Wilson",
        email: "emily.wilson@email.com",
        phone: "+1-555-0124"
      },
      totalCost: 18000,
      paid: 9000,
      services: ["Catering", "Decoration", "Photography", "Music"],
      notes: "Outdoor ceremony weather backup needed"
    },
    {
      id: "3",
      title: "Corporate Board Meeting",
      type: "meeting",
      status: "pending",
      date: "2024-02-10",
      startTime: "14:00", 
      endTime: "16:00",
      venue: "Executive Conference Room",
      attendees: 15,
      maxCapacity: 20,
      contact: {
        name: "Michael Chen",
        email: "m.chen@globalcorp.com",
        phone: "+1-555-0125"
      },
      totalCost: 800,
      paid: 0,
      services: ["Audio/Visual", "Refreshments"],
      notes: "High security clearance required"
    }
  ]);

  const [venues] = useState<Venue[]>([
    {
      id: "1",
      name: "Grand Ballroom",
      capacity: 300,
      type: "Ballroom",
      hourlyRate: 500,
      features: ["Stage", "Audio System", "Lighting", "Air Conditioning"],
      status: "available"
    },
    {
      id: "2",
      name: "Garden Pavilion", 
      capacity: 150,
      type: "Outdoor",
      hourlyRate: 350,
      features: ["Garden View", "Covered Area", "Outdoor Kitchen", "Parking"],
      status: "occupied"
    },
    {
      id: "3",
      name: "Executive Conference Room",
      capacity: 20,
      type: "Meeting Room",
      hourlyRate: 100,
      features: ["Video Conferencing", "Whiteboard", "Projector", "WiFi"],
      status: "available"
    },
    {
      id: "4",
      name: "Rooftop Terrace",
      capacity: 80,
      type: "Outdoor",
      hourlyRate: 300,
      features: ["City View", "Bar Setup", "Lounge Area", "Weather Protection"],
      status: "available"
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "cancelled": return "bg-red-100 text-red-800";
      case "completed": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getVenueStatusColor = (status: string) => {
    switch (status) {
      case "available": return "bg-green-100 text-green-800";
      case "occupied": return "bg-red-100 text-red-800";
      case "maintenance": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case "conference": return Presentation;
      case "wedding": return PartyPopper;
      case "banquet": return Utensils;
      case "meeting": return Users;
      case "party": return Music;
      case "corporate": return Coffee;
      default: return CalendarIcon;
    }
  };

  const totalRevenue = events.reduce((acc, event) => acc + event.paid, 0);
  const pendingRevenue = events.reduce((acc, event) => acc + (event.totalCost - event.paid), 0);
  const confirmedEvents = events.filter(e => e.status === "confirmed").length;
  const totalAttendees = events.reduce((acc, event) => acc + event.attendees, 0);

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100">Total Events</p>
                <p className="text-3xl font-bold">{events.length}</p>
              </div>
              <CalendarIcon className="w-10 h-10 text-purple-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">Revenue</p>
                <p className="text-3xl font-bold">${totalRevenue.toLocaleString()}</p>
              </div>
              <DollarSign className="w-10 h-10 text-green-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">Confirmed</p>
                <p className="text-3xl font-bold">{confirmedEvents}</p>
              </div>
              <Star className="w-10 h-10 text-blue-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100">Attendees</p>
                <p className="text-3xl font-bold">{totalAttendees}</p>
              </div>
              <Users className="w-10 h-10 text-orange-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="venues">Venues</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="events" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Event Management</h2>
              <p className="text-gray-600">Organize and track all your events</p>
            </div>
            <Button className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700">
              <Plus className="w-4 h-4 mr-2" />
              New Event
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => {
              const TypeIcon = getEventTypeIcon(event.type);
              const paymentProgress = (event.paid / event.totalCost) * 100;
              const occupancyProgress = (event.attendees / event.maxCapacity) * 100;
              
              return (
                <Card key={event.id} className="hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-purple-100 rounded-lg">
                          <TypeIcon className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 line-clamp-2">{event.title}</h3>
                          <p className="text-sm text-gray-600 capitalize">{event.type}</p>
                        </div>
                      </div>
                      <Badge className={getStatusColor(event.status)}>
                        {event.status}
                      </Badge>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="text-sm space-y-1">
                        <div className="flex items-center space-x-2">
                          <CalendarIcon className="w-4 h-4 text-gray-400" />
                          <span>{new Date(event.date).toLocaleDateString()}</span>
                          <span>{event.startTime} - {event.endTime}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span>{event.venue}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4 text-gray-400" />
                          <span>{event.attendees} / {event.maxCapacity} guests</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Capacity</span>
                          <span>{occupancyProgress.toFixed(0)}%</span>
                        </div>
                        <Progress value={occupancyProgress} className="h-2" />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Payment</span>
                          <span>${event.paid.toLocaleString()} / ${event.totalCost.toLocaleString()}</span>
                        </div>
                        <Progress value={paymentProgress} className="h-2" />
                      </div>
                      
                      <div className="pt-2 border-t">
                        <p className="text-xs text-gray-600 mb-2">Contact: {event.contact.name}</p>
                        <div className="flex flex-wrap gap-1">
                          {event.services.slice(0, 2).map((service, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {service}
                            </Badge>
                          ))}
                          {event.services.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{event.services.length - 2} more
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex space-x-2 pt-2">
                        <Button size="sm" variant="outline" className="flex-1">Edit</Button>
                        <Button size="sm" className="flex-1">View Details</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="venues" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Venue Management</h2>
              <p className="text-gray-600">Manage event spaces and facilities</p>
            </div>
            <Button className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Venue
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {venues.map((venue) => (
              <Card key={venue.id} className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-900">{venue.name}</h3>
                      <p className="text-sm text-gray-600">{venue.type}</p>
                    </div>
                    <Badge className={getVenueStatusColor(venue.status)}>
                      {venue.status}
                    </Badge>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Capacity</p>
                        <p className="font-semibold">{venue.capacity} guests</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Hourly rate</p>
                        <p className="font-semibold">${venue.hourlyRate}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Features:</p>
                      <div className="flex flex-wrap gap-1">
                        {venue.features.map((feature, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex space-x-2 pt-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        View Schedule
                      </Button>
                      <Button size="sm" className="flex-1">
                        Book Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="calendar" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CalendarIcon className="w-5 h-5 mr-2" />
                Event Calendar
              </CardTitle>
              <CardDescription>View and manage event schedules</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border"
                  />
                </div>
                <div className="space-y-4">
                  <h3 className="font-semibold">
                    {selectedDate ? selectedDate.toLocaleDateString() : "Today's"} Events
                  </h3>
                  
                  {events
                    .filter(event => {
                      const eventDate = new Date(event.date).toDateString();
                      const compareDate = selectedDate ? selectedDate.toDateString() : new Date().toDateString();
                      return eventDate === compareDate;
                    })
                    .map((event) => {
                      const TypeIcon = getEventTypeIcon(event.type);
                      return (
                        <div key={event.id} className="p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="p-2 bg-purple-100 rounded-lg">
                                <TypeIcon className="w-4 h-4 text-purple-600" />
                              </div>
                              <div>
                                <p className="font-medium text-sm">{event.title}</p>
                                <p className="text-xs text-gray-600">
                                  {event.startTime} - {event.endTime} • {event.venue}
                                </p>
                                <p className="text-xs text-gray-600">{event.attendees} guests</p>
                              </div>
                            </div>
                            <Badge className={getStatusColor(event.status)}>
                              {event.status}
                            </Badge>
                          </div>
                        </div>
                      );
                    })}
                  
                  {events.filter(event => {
                    const eventDate = new Date(event.date).toDateString();
                    const compareDate = selectedDate ? selectedDate.toDateString() : new Date().toDateString();
                    return eventDate === compareDate;
                  }).length === 0 && (
                    <p className="text-gray-500 text-center py-8">No events scheduled for this date</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Event Analytics</CardTitle>
              <CardDescription>Track performance and revenue insights</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-4">Revenue Breakdown</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Total Revenue</span>
                        <span className="font-semibold">${totalRevenue.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Pending Revenue</span>
                        <span className="font-semibold text-yellow-600">${pendingRevenue.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center pt-2 border-t">
                        <span className="text-sm font-semibold">Expected Total</span>
                        <span className="font-bold">${(totalRevenue + pendingRevenue).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-4">Event Types</h3>
                    <div className="space-y-2">
                      {["conference", "wedding", "meeting", "banquet", "party", "corporate"].map((type) => {
                        const typeEvents = events.filter(event => event.type === type);
                        const percentage = events.length > 0 ? (typeEvents.length / events.length) * 100 : 0;
                        
                        return (
                          <div key={type} className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span className="capitalize">{type}</span>
                              <span>{typeEvents.length} events ({percentage.toFixed(1)}%)</span>
                            </div>
                            <Progress value={percentage} className="h-2" />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-4">Venue Utilization</h3>
                    <div className="space-y-2">
                      {venues.map((venue) => {
                        const venueEvents = events.filter(event => event.venue === venue.name);
                        const utilization = venues.length > 0 ? (venueEvents.length / events.length) * 100 : 0;
                        
                        return (
                          <div key={venue.id} className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>{venue.name}</span>
                              <span>{venueEvents.length} events ({utilization.toFixed(1)}%)</span>
                            </div>
                            <Progress value={utilization} className="h-2" />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-4">Status Overview</h3>
                    <div className="space-y-2">
                      {["confirmed", "pending", "cancelled", "completed"].map((status) => {
                        const statusEvents = events.filter(event => event.status === status);
                        const percentage = events.length > 0 ? (statusEvents.length / events.length) * 100 : 0;
                        
                        return (
                          <div key={status} className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span className="capitalize">{status}</span>
                              <span>{statusEvents.length} events ({percentage.toFixed(1)}%)</span>
                            </div>
                            <Progress value={percentage} className="h-2" />
                          </div>
                        );
                      })}
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