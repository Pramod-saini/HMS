
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, 
  Mail, 
  Users, 
  Target, 
  Calendar, 
  DollarSign, 
  Eye, 
  MousePointer,
  Send,
  Gift,
  Star,
  BarChart3
} from "lucide-react";

export const MarketingHub = () => {
  const campaignStats = [
    {
      title: "Active Campaigns",
      value: "8",
      change: "+2 this week",
      icon: Target,
      color: "text-blue-600",
      bgColor: "bg-gradient-to-br from-blue-50 to-cyan-50",
      borderColor: "border-blue-200/50"
    },
    {
      title: "Email Open Rate",
      value: "24.5%",
      change: "+3.2% vs last month",
      icon: Mail,
      color: "text-emerald-600",
      bgColor: "bg-gradient-to-br from-emerald-50 to-green-50",
      borderColor: "border-emerald-200/50"
    },
    {
      title: "Conversion Rate",
      value: "12.8%",
      change: "+1.5% improvement",
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-gradient-to-br from-purple-50 to-pink-50",
      borderColor: "border-purple-200/50"
    },
    {
      title: "Marketing ROI",
      value: "$4.2K",
      change: "+15% this quarter",
      icon: DollarSign,
      color: "text-orange-600",
      bgColor: "bg-gradient-to-br from-orange-50 to-amber-50",
      borderColor: "border-orange-200/50"
    }
  ];

  const activeCampaigns = [
    { id: 1, name: "Summer Getaway Special", type: "Email", status: "Active", reach: "2,450", engagement: "18.5%" },
    { id: 2, name: "Weekend Dining Offers", type: "Social Media", status: "Active", reach: "5,200", engagement: "12.3%" },
    { id: 3, name: "Loyalty Program Launch", type: "SMS", status: "Scheduled", reach: "1,850", engagement: "0%" },
    { id: 4, name: "Holiday Booking Early Bird", type: "Email", status: "Draft", reach: "0", engagement: "0%" }
  ];

  return (
    <div className="space-y-8">
      {/* Marketing Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {campaignStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className={`hover:shadow-xl transition-all duration-500 cursor-pointer border-2 ${stat.borderColor} ${stat.bgColor} group hover:scale-105 relative overflow-hidden`}>
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <CardContent className="p-6 relative z-10">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-gray-500 font-medium">{stat.change}</p>
                  </div>
                  <div className={`p-3 rounded-xl ${stat.bgColor} border-2 ${stat.borderColor} shadow-lg group-hover:shadow-xl transition-shadow`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Marketing Tabs */}
      <Tabs defaultValue="campaigns" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-white shadow-lg rounded-xl p-2">
          <TabsTrigger value="campaigns" className="flex items-center space-x-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white">
            <Target className="w-4 h-4" />
            <span>Campaigns</span>
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center space-x-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white">
            <BarChart3 className="w-4 h-4" />
            <span>Analytics</span>
          </TabsTrigger>
          <TabsTrigger value="promotions" className="flex items-center space-x-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white">
            <Gift className="w-4 h-4" />
            <span>Promotions</span>
          </TabsTrigger>
          <TabsTrigger value="reviews" className="flex items-center space-x-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white">
            <Star className="w-4 h-4" />
            <span>Reviews</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="campaigns" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold text-gray-900">Active Campaigns</h3>
            <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300">
              <Send className="w-4 h-4 mr-2" />
              Create Campaign
            </Button>
          </div>

          <Card className="shadow-xl">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="text-left p-4 font-semibold text-gray-900">Campaign Name</th>
                      <th className="text-left p-4 font-semibold text-gray-900">Type</th>
                      <th className="text-left p-4 font-semibold text-gray-900">Status</th>
                      <th className="text-left p-4 font-semibold text-gray-900">Reach</th>
                      <th className="text-left p-4 font-semibold text-gray-900">Engagement</th>
                      <th className="text-left p-4 font-semibold text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeCampaigns.map((campaign) => (
                      <tr key={campaign.id} className="border-b hover:bg-gray-50 transition-colors">
                        <td className="p-4 font-medium text-gray-900">{campaign.name}</td>
                        <td className="p-4">
                          <Badge variant="outline" className="font-medium">{campaign.type}</Badge>
                        </td>
                        <td className="p-4">
                          <Badge className={
                            campaign.status === 'Active' ? 'bg-emerald-100 text-emerald-800 border-emerald-200' :
                            campaign.status === 'Scheduled' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                            'bg-gray-100 text-gray-800 border-gray-200'
                          }>
                            {campaign.status}
                          </Badge>
                        </td>
                        <td className="p-4 text-gray-600">{campaign.reach}</td>
                        <td className="p-4 text-gray-600">{campaign.engagement}</td>
                        <td className="p-4">
                          <Button size="sm" variant="outline" className="hover:shadow-md transition-shadow">
                            Edit
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-blue-600" />
                <span>Marketing Analytics</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border-2 border-blue-200/50">
                  <div className="flex items-center space-x-3 mb-4">
                    <Eye className="w-6 h-6 text-blue-600" />
                    <h4 className="font-semibold text-gray-900">Total Impressions</h4>
                  </div>
                  <p className="text-3xl font-bold text-blue-700">125,430</p>
                  <p className="text-sm text-blue-600 mt-2">+22% from last month</p>
                </div>
                <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border-2 border-purple-200/50">
                  <div className="flex items-center space-x-3 mb-4">
                    <MousePointer className="w-6 h-6 text-purple-600" />
                    <h4 className="font-semibold text-gray-900">Click-through Rate</h4>
                  </div>
                  <p className="text-3xl font-bold text-purple-700">8.4%</p>
                  <p className="text-sm text-purple-600 mt-2">+1.2% improvement</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="promotions" className="space-y-6">
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Gift className="w-5 h-5 text-green-600" />
                <span>Active Promotions</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Gift className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Active Promotions</h3>
                <p className="text-gray-500 mb-6">Create your first promotion to engage customers</p>
                <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700">
                  Create Promotion
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reviews" className="space-y-6">
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-600" />
                <span>Customer Reviews</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="text-center p-6 bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl border-2 border-yellow-200/50">
                  <div className="text-4xl font-bold text-yellow-700 mb-2">4.8</div>
                  <div className="flex justify-center space-x-1 mb-2">
                    {[1,2,3,4,5].map((star) => (
                      <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm text-yellow-600">Average Rating</p>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border-2 border-green-200/50">
                  <div className="text-4xl font-bold text-green-700 mb-2">248</div>
                  <p className="text-sm text-green-600">Total Reviews</p>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border-2 border-blue-200/50">
                  <div className="text-4xl font-bold text-blue-700 mb-2">95%</div>
                  <p className="text-sm text-blue-600">Positive Reviews</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
