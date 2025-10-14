import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Progress } from "@/components/ui/progress";
import {
  Wrench, Plus, AlertTriangle, CheckCircle, Clock, Calendar as CalendarIcon,
  MapPin, User, Zap, Droplets, Thermometer, Wifi, Camera, Building
} from "lucide-react";

interface MaintenanceTask {
  id: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high" | "urgent";
  status: "pending" | "in-progress" | "completed" | "cancelled";
  assignedTo: string;
  location: string;
  type: string;
  createdDate: string;
  dueDate: string;
  completedDate?: string;
  estimatedHours: number;
  actualHours?: number;
}

interface Room {
  id: string;
  number: string;
  floor: number;
  type: string;
  status: "clean" | "maintenance" | "occupied" | "dirty";
  lastCleaned: string;
  nextMaintenance: string;
  issues: string[];
}

export const MaintenanceModule = () => {
  const [activeTab, setActiveTab] = useState("tasks");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const [tasks] = useState<MaintenanceTask[]>([
    {
      id: "1",
      title: "Fix leaking faucet in Room 205",
      description: "Guest reported water dripping from bathroom faucet",
      priority: "high",
      status: "pending",
      assignedTo: "Mike Johnson",
      location: "Room 205",
      type: "Plumbing",
      createdDate: "2024-01-28",
      dueDate: "2024-01-29",
      estimatedHours: 2
    },
    {
      id: "2", 
      title: "Replace air conditioning filter",
      description: "Monthly AC filter replacement for HVAC system",
      priority: "medium",
      status: "in-progress",
      assignedTo: "Sarah Wilson",
      location: "HVAC Room - 3rd Floor",
      type: "HVAC",
      createdDate: "2024-01-27",
      dueDate: "2024-01-30",
      estimatedHours: 1,
      actualHours: 0.5
    },
    {
      id: "3",
      title: "Elevator maintenance check",
      description: "Weekly elevator safety and operational inspection",
      priority: "high",
      status: "completed",
      assignedTo: "Tom Davis",
      location: "Main Elevator",
      type: "Mechanical",
      createdDate: "2024-01-25",
      dueDate: "2024-01-28",
      completedDate: "2024-01-28",
      estimatedHours: 3,
      actualHours: 2.5
    },
    {
      id: "4",
      title: "WiFi connectivity issues",
      description: "Multiple guests reporting slow internet in lobby area",
      priority: "medium",
      status: "pending",
      assignedTo: "Alex Rodriguez",
      location: "Lobby",
      type: "IT/Network",
      createdDate: "2024-01-28",
      dueDate: "2024-01-30",
      estimatedHours: 4
    }
  ]);

  const [rooms] = useState<Room[]>([
    {
      id: "1",
      number: "101",
      floor: 1,
      type: "Standard",
      status: "clean",
      lastCleaned: "2024-01-28",
      nextMaintenance: "2024-02-15",
      issues: []
    },
    {
      id: "2",
      number: "205", 
      floor: 2,
      type: "Deluxe",
      status: "maintenance",
      lastCleaned: "2024-01-27",
      nextMaintenance: "2024-01-29",
      issues: ["Leaking faucet", "Light bulb replacement"]
    },
    {
      id: "3",
      number: "312",
      floor: 3,
      type: "Suite",
      status: "clean",
      lastCleaned: "2024-01-28",
      nextMaintenance: "2024-02-20",
      issues: []
    }
  ]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent": return "bg-red-100 text-red-800";
      case "high": return "bg-orange-100 text-orange-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800";
      case "in-progress": return "bg-blue-100 text-blue-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "cancelled": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getRoomStatusColor = (status: string) => {
    switch (status) {
      case "clean": return "bg-green-100 text-green-800";
      case "maintenance": return "bg-red-100 text-red-800";
      case "occupied": return "bg-blue-100 text-blue-800";
      case "dirty": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "plumbing": return Droplets;
      case "hvac": return Thermometer;
      case "electrical": return Zap;
      case "it/network": return Wifi;
      case "mechanical": return Wrench;
      default: return Wrench;
    }
  };

  const completedTasks = tasks.filter(t => t.status === "completed").length;
  const pendingTasks = tasks.filter(t => t.status === "pending").length;
  const inProgressTasks = tasks.filter(t => t.status === "in-progress").length;
  const urgentTasks = tasks.filter(t => t.priority === "urgent" || t.priority === "high").length;

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">Total Tasks</p>
                <p className="text-3xl font-bold">{tasks.length}</p>
              </div>
              <Wrench className="w-10 h-10 text-blue-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">Completed</p>
                <p className="text-3xl font-bold">{completedTasks}</p>
              </div>
              <CheckCircle className="w-10 h-10 text-green-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-100">In Progress</p>
                <p className="text-3xl font-bold">{inProgressTasks}</p>
              </div>
              <Clock className="w-10 h-10 text-yellow-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100">Urgent Tasks</p>
                <p className="text-3xl font-bold">{urgentTasks}</p>
              </div>
              <AlertTriangle className="w-10 h-10 text-red-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="tasks">Maintenance Tasks</TabsTrigger>
          <TabsTrigger value="rooms">Room Status</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="tasks" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Maintenance Tasks</h2>
              <p className="text-gray-600">Track and manage maintenance requests</p>
            </div>
            <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
              <Plus className="w-4 h-4 mr-2" />
              New Task
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.map((task) => {
              const TypeIcon = getTypeIcon(task.type);
              return (
                <Card key={task.id} className="hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <TypeIcon className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 line-clamp-2">{task.title}</h3>
                          <p className="text-sm text-gray-600">{task.type}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-2">
                        <Badge className={getPriorityColor(task.priority)}>
                          {task.priority}
                        </Badge>
                        <Badge className={getStatusColor(task.status)}>
                          {task.status}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-gray-600 line-clamp-2">{task.description}</p>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span>{task.location}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <User className="w-4 h-4 text-gray-400" />
                          <span>{task.assignedTo}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CalendarIcon className="w-4 h-4 text-gray-400" />
                          <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                      
                      {task.status === "in-progress" && task.actualHours && (
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span>Progress</span>
                            <span>{task.actualHours}h / {task.estimatedHours}h</span>
                          </div>
                          <Progress value={(task.actualHours / task.estimatedHours) * 100} className="h-2" />
                        </div>
                      )}
                      
                      <div className="flex space-x-2 pt-2">
                        {task.status === "pending" && (
                          <Button size="sm" className="flex-1">Start</Button>
                        )}
                        {task.status === "in-progress" && (
                          <Button size="sm" className="flex-1">Complete</Button>
                        )}
                        <Button size="sm" variant="outline" className="flex-1">View</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="rooms" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Room Status</h2>
              <p className="text-gray-600">Monitor room conditions and maintenance schedules</p>
            </div>
            <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
              <Camera className="w-4 h-4 mr-2" />
              Room Inspection
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.map((room) => (
              <Card key={room.id} className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Building className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Room {room.number}</h3>
                        <p className="text-sm text-gray-600">Floor {room.floor} • {room.type}</p>
                      </div>
                    </div>
                    <Badge className={getRoomStatusColor(room.status)}>
                      {room.status}
                    </Badge>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="text-sm space-y-1">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Last cleaned:</span>
                        <span>{new Date(room.lastCleaned).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Next maintenance:</span>
                        <span>{new Date(room.nextMaintenance).toLocaleDateString()}</span>
                      </div>
                    </div>
                    
                    {room.issues.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-red-600">Active Issues:</p>
                        <div className="space-y-1">
                          {room.issues.map((issue, idx) => (
                            <div key={idx} className="flex items-center space-x-2 text-sm">
                              <AlertTriangle className="w-3 h-3 text-red-500" />
                              <span className="text-gray-700">{issue}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="flex space-x-2 pt-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        Schedule Clean
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        Report Issue
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CalendarIcon className="w-5 h-5 mr-2" />
                Maintenance Schedule
              </CardTitle>
              <CardDescription>Plan and track maintenance activities</CardDescription>
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
                    {selectedDate ? selectedDate.toLocaleDateString() : "Today's"} Schedule
                  </h3>
                  
                  {tasks
                    .filter(task => {
                      const taskDate = new Date(task.dueDate).toDateString();
                      const compareDate = selectedDate ? selectedDate.toDateString() : new Date().toDateString();
                      return taskDate === compareDate;
                    })
                    .map((task) => (
                      <div key={task.id} className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-sm">{task.title}</p>
                            <p className="text-xs text-gray-600">{task.location} • {task.assignedTo}</p>
                          </div>
                          <Badge className={getStatusColor(task.status)}>
                            {task.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  
                  {tasks.filter(task => {
                    const taskDate = new Date(task.dueDate).toDateString();
                    const compareDate = selectedDate ? selectedDate.toDateString() : new Date().toDateString();
                    return taskDate === compareDate;
                  }).length === 0 && (
                    <p className="text-gray-500 text-center py-8">No tasks scheduled for this date</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Maintenance Reports</CardTitle>
              <CardDescription>Analyze maintenance performance and trends</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">Task Status Distribution</h3>
                  {["completed", "in-progress", "pending", "cancelled"].map((status) => {
                    const statusTasks = tasks.filter(task => task.status === status);
                    const percentage = (statusTasks.length / tasks.length) * 100;
                    
                    return (
                      <div key={status} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="capitalize">{status}</span>
                          <span>{statusTasks.length} tasks ({percentage.toFixed(1)}%)</span>
                        </div>
                        <Progress value={percentage} className="h-2" />
                      </div>
                    );
                  })}
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-semibold">Priority Breakdown</h3>
                  {["urgent", "high", "medium", "low"].map((priority) => {
                    const priorityTasks = tasks.filter(task => task.priority === priority);
                    const percentage = (priorityTasks.length / tasks.length) * 100;
                    
                    return (
                      <div key={priority} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="capitalize">{priority}</span>
                          <span>{priorityTasks.length} tasks ({percentage.toFixed(1)}%)</span>
                        </div>
                        <Progress value={percentage} className="h-2" />
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};