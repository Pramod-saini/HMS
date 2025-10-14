
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Shirt, Clock, CheckCircle, AlertCircle, Truck, 
  Plus, Search, Filter, Calendar, User, Package
} from "lucide-react";

export const LaundryManagement = () => {
  const [activeTab, setActiveTab] = useState("orders");

  const laundryOrders = [
    {
      id: "LAU001",
      customer: "Room 201 - John Smith",
      items: ["2x Shirts", "1x Pants", "3x Towels"],
      status: "In Progress",
      priority: "Normal",
      pickupTime: "10:30 AM",
      deliveryTime: "4:00 PM",
      amount: "$25.50",
      date: "2024-01-15"
    },
    {
      id: "LAU002", 
      customer: "Room 305 - Sarah Johnson",
      items: ["1x Dress", "2x Blouses"],
      status: "Ready",
      priority: "Express",
      pickupTime: "11:00 AM",
      deliveryTime: "2:00 PM",
      amount: "$18.00",
      date: "2024-01-15"
    },
    // ... more orders
  ];

  const laundryStats = [
    { title: "Orders Today", value: "47", change: "+12%", icon: Package, color: "blue" },
    { title: "In Progress", value: "23", change: "+5%", icon: Clock, color: "orange" },
    { title: "Ready for Delivery", value: "18", change: "+8%", icon: CheckCircle, color: "green" },
    { title: "Express Orders", value: "6", change: "+2%", icon: AlertCircle, color: "red" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ready":
        return "bg-green-100 text-green-800 border-green-200";
      case "In Progress":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Picked Up":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "Pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Express":
        return "bg-red-100 text-red-800 border-red-200";
      case "High":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "Normal":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="space-y-4 md:space-y-6 p-2 md:p-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-3 md:space-y-0">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">Laundry Management</h2>
          <p className="text-gray-600 text-sm mt-1">Track and manage laundry services for guests</p>
        </div>
        <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 text-xs">
          <Plus className="w-3 h-3 mr-1" />
          New Order
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {laundryStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-all duration-300">
              <CardContent className="p-3 md:p-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-xs text-gray-600 font-medium">{stat.title}</p>
                    <p className="text-lg md:text-xl font-bold text-gray-900">{stat.value}</p>
                    <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                      {stat.change}
                    </Badge>
                  </div>
                  <div className={`p-2 rounded-lg bg-${stat.color}-100`}>
                    <Icon className={`w-4 h-4 text-${stat.color}-600`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input placeholder="Search orders..." className="pl-9 text-sm" />
          </div>
        </div>
        <div className="flex space-x-2">
          <Select>
            <SelectTrigger className="w-32 text-sm">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="progress">In Progress</SelectItem>
              <SelectItem value="ready">Ready</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Laundry Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {laundryOrders.map((order) => (
          <Card key={order.id} className="hover:shadow-lg transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-sm text-gray-900">{order.id}</h3>
                  <p className="text-xs text-gray-600 flex items-center space-x-1">
                    <User className="w-3 h-3" />
                    <span>{order.customer}</span>
                  </p>
                </div>
                <div className="flex flex-col items-end space-y-1">
                  <Badge className={getStatusColor(order.status) + " text-xs"}>
                    {order.status}
                  </Badge>
                  <Badge className={getPriorityColor(order.priority) + " text-xs"}>
                    {order.priority}
                  </Badge>
                </div>
              </div>

              <div className="space-y-2 mb-3">
                <div className="flex items-center space-x-2 text-xs text-gray-600">
                  <Shirt className="w-3 h-3" />
                  <span>Items: {order.items.join(", ")}</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-gray-600">
                  <Clock className="w-3 h-3" />
                  <span>Pickup: {order.pickupTime} | Delivery: {order.deliveryTime}</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-gray-600">
                  <Calendar className="w-3 h-3" />
                  <span>{order.date}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div className="text-lg font-bold text-green-600">{order.amount}</div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" className="text-xs h-7">
                    Update
                  </Button>
                  <Button size="sm" className="text-xs h-7 bg-gradient-to-r from-blue-500 to-purple-500">
                    <Truck className="w-3 h-3 mr-1" />
                    Deliver
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Service Tracking */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-lg">
            <CheckCircle className="w-5 h-5" />
            <span>Service Progress Tracking</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { stage: "Collection", time: "10:30 AM", status: "completed", description: "Items collected from Room 201" },
              { stage: "Sorting", time: "11:00 AM", status: "completed", description: "Items sorted by fabric type" },
              { stage: "Washing", time: "11:30 AM", status: "active", description: "Currently in washing cycle" },
              { stage: "Drying", time: "1:00 PM", status: "pending", description: "Scheduled for drying" },
              { stage: "Pressing", time: "2:30 PM", status: "pending", description: "Professional pressing service" },
              { stage: "Quality Check", time: "3:30 PM", status: "pending", description: "Final quality inspection" },
              { stage: "Delivery", time: "4:00 PM", status: "pending", description: "Delivery to guest room" },
            ].map((stage, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  stage.status === 'completed' ? 'bg-green-100 text-green-600' :
                  stage.status === 'active' ? 'bg-blue-100 text-blue-600' :
                  'bg-gray-100 text-gray-400'
                }`}>
                  {stage.status === 'completed' ? <CheckCircle className="w-4 h-4" /> :
                   stage.status === 'active' ? <Clock className="w-4 h-4" /> :
                   <div className="w-2 h-2 bg-gray-300 rounded-full" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-sm text-gray-900">{stage.stage}</h4>
                    <span className="text-xs text-gray-500">{stage.time}</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">{stage.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
