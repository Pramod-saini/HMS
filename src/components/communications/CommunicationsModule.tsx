
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Mail, MessageSquare, Send, Phone, Users, 
  Calendar, Clock, CheckCircle, AlertCircle
} from "lucide-react";

export const CommunicationsModule = () => {
  const communications = [
    {
      id: 1,
      type: "email",
      recipient: "john.smith@email.com",
      subject: "Welcome to HotelMaster Pro",
      status: "sent",
      time: "2 hours ago",
      channel: "Email"
    },
    {
      id: 2,
      type: "whatsapp",
      recipient: "+1 234 567 8900",
      subject: "Booking Confirmation",
      status: "delivered",
      time: "4 hours ago",
      channel: "WhatsApp"
    },
    {
      id: 3,
      type: "sms",
      recipient: "+1 234 567 8901",
      subject: "Check-in Reminder",
      status: "pending",
      time: "6 hours ago",
      channel: "SMS"
    },
    {
      id: 4,
      type: "email",
      recipient: "sarah.johnson@email.com",
      subject: "Thank you for your stay",
      status: "sent",
      time: "1 day ago",
      channel: "Email"
    }
  ];

  const templates = [
    { name: "Welcome Email", type: "email", usage: 45 },
    { name: "Booking Confirmation", type: "whatsapp", usage: 89 },
    { name: "Check-in Reminder", type: "sms", usage: 67 },
    { name: "Feedback Request", type: "email", usage: 23 }
  ];

  const stats = [
    { label: "Messages Sent", value: "1,234", color: "text-blue-600", icon: Send },
    { label: "Email Delivered", value: "98.5%", color: "text-green-600", icon: Mail },
    { label: "WhatsApp Active", value: "456", color: "text-green-600", icon: MessageSquare },
    { label: "SMS Delivered", value: "96.2%", color: "text-purple-600", icon: Phone }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "sent": return "bg-green-100 text-green-800";
      case "delivered": return "bg-blue-100 text-blue-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "failed": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "sent":
      case "delivered": return <CheckCircle className="w-4 h-4" />;
      case "pending": return <Clock className="w-4 h-4" />;
      case "failed": return <AlertCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getChannelIcon = (channel: string) => {
    switch (channel.toLowerCase()) {
      case "email": return <Mail className="w-4 h-4" />;
      case "whatsapp": return <MessageSquare className="w-4 h-4" />;
      case "sms": return <Phone className="w-4 h-4" />;
      default: return <Send className="w-4 h-4" />;
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

      {/* Quick Send */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Send className="w-5 h-5" />
            <span>Quick Send</span>
          </CardTitle>
          <CardDescription>Send messages via Email, WhatsApp, or SMS</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Recipient</label>
              <Input placeholder="Enter email, phone, or select contact..." />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Channel</label>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Mail className="w-4 h-4 mr-1" />
                  Email
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <MessageSquare className="w-4 h-4 mr-1" />
                  WhatsApp
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Phone className="w-4 h-4 mr-1" />
                  SMS
                </Button>
              </div>
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium mb-2 block">Subject</label>
            <Input placeholder="Message subject..." />
          </div>
          
          <div>
            <label className="text-sm font-medium mb-2 block">Message</label>
            <Textarea 
              placeholder="Type your message here..." 
              className="min-h-[100px]"
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <Button className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">
              <Send className="w-4 h-4 mr-2" />
              Send Now
            </Button>
            <Button variant="outline" className="w-full sm:w-auto">
              <Calendar className="w-4 h-4 mr-2" />
              Schedule
            </Button>
            <Button variant="outline" className="w-full sm:w-auto">
              Save Template
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Message Templates */}
      <Card>
        <CardHeader>
          <CardTitle>Message Templates</CardTitle>
          <CardDescription>Pre-configured templates for common communications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {templates.map((template, index) => (
              <div key={index} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-sm md:text-base">{template.name}</h3>
                  <Badge variant="outline" className="flex items-center space-x-1">
                    {getChannelIcon(template.type)}
                    <span className="capitalize">{template.type}</span>
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Used {template.usage} times</span>
                  <Button variant="ghost" size="sm">Use Template</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Communications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MessageSquare className="w-5 h-5" />
            <span>Recent Communications</span>
          </CardTitle>
          <CardDescription>Latest sent messages and their delivery status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {communications.map((comm) => (
              <div key={comm.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-3 flex-1">
                  <div className="p-2 bg-gray-100 rounded-full">
                    {getChannelIcon(comm.channel)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-4">
                      <h3 className="font-semibold text-sm md:text-base truncate">{comm.subject}</h3>
                      <span className="text-sm text-gray-600 truncate">{comm.recipient}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-gray-500 mt-1">
                      <Clock className="w-3 h-3" />
                      <span>{comm.time}</span>
                      <Badge variant="outline" className="text-xs">
                        {comm.channel}
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <Badge className={`${getStatusColor(comm.status)} flex items-center space-x-1`}>
                  {getStatusIcon(comm.status)}
                  <span className="capitalize">{comm.status}</span>
                </Badge>
              </div>
            ))}
          </div>
          
          <div className="mt-4 text-center">
            <Button variant="outline" className="w-full sm:w-auto">
              View All Communications
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
