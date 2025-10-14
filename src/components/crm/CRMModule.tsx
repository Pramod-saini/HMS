
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Users, Search, Plus, Mail, Phone, MapPin, Calendar, 
  TrendingUp, Award, Heart, UserCheck, Star, Clock,
  Filter, Download, Upload, Eye, Edit, Trash2
} from "lucide-react";

export const CRMModule = () => {
  const [activeTab, setActiveTab] = useState("customers");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const customers = [
    {
      id: "CRM001",
      name: "John Smith",
      email: "john@example.com",
      phone: "+1-555-0123",
      location: "New York, USA",
      segment: "VIP",
      totalSpent: "$5,420",
      lastVisit: "2024-01-15",
      joinDate: "2023-05-12",
      bookings: 12,
      loyaltyPoints: 2450,
      preferences: ["Ocean View", "Late Checkout", "Spa Services"],
      status: "Active",
      avatar: "JS"
    },
    // ... more customers
  ];

  const crmStats = [
    { title: "Total Customers", value: "2,847", change: "+12%", icon: Users, color: "blue" },
    { title: "VIP Customers", value: "247", change: "+8%", icon: Award, color: "purple" },
    { title: "Active This Month", value: "1,234", change: "+15%", icon: UserCheck, color: "green" },
    { title: "Customer Satisfaction", value: "4.8/5", change: "+0.2", icon: Star, color: "yellow" },
  ];

  return (
    <div className="space-y-4 md:space-y-6 p-2 md:p-4">
      {/* Header with Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-3 md:space-y-0">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">Customer Relationship Management</h2>
          <p className="text-gray-600 text-sm mt-1">Comprehensive customer data and relationship tracking</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button size="sm" variant="outline" className="text-xs">
            <Download className="w-3 h-3 mr-1" />
            Export
          </Button>
          <Button size="sm" variant="outline" className="text-xs">
            <Upload className="w-3 h-3 mr-1" />
            Import
          </Button>
          <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 text-xs">
            <Plus className="w-3 h-3 mr-1" />
            Add Customer
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {crmStats.map((stat, index) => {
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
            <Input 
              placeholder="Search customers..." 
              className="pl-9 text-sm" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="flex space-x-2">
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-32 text-sm">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="vip">VIP</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Customer Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {customers.map((customer) => (
          <Card key={customer.id} className="hover:shadow-lg transition-all duration-300 border-2 hover:border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium text-sm">{customer.avatar}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-gray-900">{customer.name}</h3>
                    <Badge className={`text-xs ${
                      customer.segment === 'VIP' ? 'bg-purple-100 text-purple-800' : 
                      customer.segment === 'Premium' ? 'bg-blue-100 text-blue-800' : 
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {customer.segment}
                    </Badge>
                  </div>
                </div>
                <div className="flex space-x-1">
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                    <Eye className="w-3 h-3" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                    <Edit className="w-3 h-3" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center space-x-2 text-gray-600">
                  <Mail className="w-3 h-3" />
                  <span className="truncate">{customer.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Phone className="w-3 h-3" />
                  <span>{customer.phone}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <MapPin className="w-3 h-3" />
                  <span className="truncate">{customer.location}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Calendar className="w-3 h-3" />
                  <span>Last visit: {customer.lastVisit}</span>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <p className="text-sm font-bold text-blue-600">{customer.bookings}</p>
                    <p className="text-xs text-gray-600">Bookings</p>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-green-600">{customer.totalSpent}</p>
                    <p className="text-xs text-gray-600">Spent</p>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-purple-600">{customer.loyaltyPoints}</p>
                    <p className="text-xs text-gray-600">Points</p>
                  </div>
                </div>
              </div>

              <div className="mt-3">
                <p className="text-xs text-gray-600 mb-1">Preferences:</p>
                <div className="flex flex-wrap gap-1">
                  {customer.preferences.slice(0, 2).map((pref, index) => (
                    <Badge key={index} variant="secondary" className="text-xs bg-gray-100 text-gray-700">
                      {pref}
                    </Badge>
                  ))}
                  {customer.preferences.length > 2 && (
                    <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-700">
                      +{customer.preferences.length - 2}
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Customer Journey Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-lg">
            <Clock className="w-5 h-5" />
            <span>Recent Customer Activities</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { customer: "John Smith", action: "Checked in to Premium Suite", time: "2 mins ago", type: "checkin" },
              { customer: "Sarah Johnson", action: "Made restaurant reservation", time: "15 mins ago", type: "booking" },
              { customer: "Mike Wilson", action: "Left 5-star review", time: "1 hour ago", type: "review" },
              { customer: "Emma Davis", action: "Updated profile preferences", time: "2 hours ago", type: "update" },
            ].map((activity, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  activity.type === 'checkin' ? 'bg-green-100 text-green-600' :
                  activity.type === 'booking' ? 'bg-blue-100 text-blue-600' :
                  activity.type === 'review' ? 'bg-yellow-100 text-yellow-600' :
                  'bg-purple-100 text-purple-600'
                }`}>
                  {activity.type === 'checkin' ? <UserCheck className="w-4 h-4" /> :
                   activity.type === 'booking' ? <Calendar className="w-4 h-4" /> :
                   activity.type === 'review' ? <Star className="w-4 h-4" /> :
                   <Edit className="w-4 h-4" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.customer}</p>
                  <p className="text-xs text-gray-600">{activity.action}</p>
                </div>
                <div className="text-xs text-gray-500">{activity.time}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
