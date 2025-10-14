
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  CreditCard, DollarSign, FileText, Download, Plus, Search,
  Calendar, Clock, CheckCircle, AlertCircle, XCircle
} from "lucide-react";

export const BillingModule = () => {
  const invoices = [
    { id: "INV-001", guest: "John Smith", amount: 450, status: "paid", date: "2024-01-15", room: "101" },
    { id: "INV-002", guest: "Sarah Johnson", amount: 320, status: "pending", date: "2024-01-14", room: "205" },
    { id: "INV-003", guest: "Mike Wilson", amount: 680, status: "overdue", date: "2024-01-13", room: "301" },
    { id: "INV-004", guest: "Emily Davis", amount: 520, status: "paid", date: "2024-01-12", room: "156" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "overdue": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "paid": return <CheckCircle className="w-4 h-4" />;
      case "pending": return <Clock className="w-4 h-4" />;
      case "overdue": return <XCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-3 md:p-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="w-6 h-6 md:w-8 md:h-8 text-green-600" />
              <div>
                <p className="text-xs md:text-sm text-green-600 font-medium">Total Revenue</p>
                <p className="text-lg md:text-2xl font-bold text-green-800">$12,450</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
          <CardContent className="p-3 md:p-4">
            <div className="flex items-center space-x-2">
              <FileText className="w-6 h-6 md:w-8 md:h-8 text-blue-600" />
              <div>
                <p className="text-xs md:text-sm text-blue-600 font-medium">Invoices</p>
                <p className="text-lg md:text-2xl font-bold text-blue-800">248</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-200">
          <CardContent className="p-3 md:p-4">
            <div className="flex items-center space-x-2">
              <Clock className="w-6 h-6 md:w-8 md:h-8 text-yellow-600" />
              <div>
                <p className="text-xs md:text-sm text-yellow-600 font-medium">Pending</p>
                <p className="text-lg md:text-2xl font-bold text-yellow-800">12</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-rose-50 border-red-200">
          <CardContent className="p-3 md:p-4">
            <div className="flex items-center space-x-2">
              <XCircle className="w-6 h-6 md:w-8 md:h-8 text-red-600" />
              <div>
                <p className="text-xs md:text-sm text-red-600 font-medium">Overdue</p>
                <p className="text-lg md:text-2xl font-bold text-red-800">3</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actions and Search */}
      <div className="flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center">
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <Button className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">
            <Plus className="w-4 h-4 mr-2" />
            New Invoice
          </Button>
          <Button variant="outline" className="w-full sm:w-auto">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input 
            placeholder="Search invoices..." 
            className="pl-10 w-full sm:w-64"
          />
        </div>
      </div>

      {/* Invoices List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CreditCard className="w-5 h-5" />
            <span>Recent Invoices</span>
          </CardTitle>
          <CardDescription>Manage and track all billing activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {invoices.map((invoice) => (
              <div key={invoice.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 md:p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex-1 space-y-1 sm:space-y-0">
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-4">
                    <span className="font-semibold text-sm md:text-base">{invoice.id}</span>
                    <span className="text-gray-600 text-sm">{invoice.guest}</span>
                    <span className="text-gray-500 text-xs">Room {invoice.room}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs md:text-sm text-gray-500">
                    <Calendar className="w-3 h-3" />
                    <span>{invoice.date}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between sm:justify-end space-x-3 mt-2 sm:mt-0">
                  <span className="font-bold text-lg">${invoice.amount}</span>
                  <Badge className={`${getStatusColor(invoice.status)} flex items-center space-x-1`}>
                    {getStatusIcon(invoice.status)}
                    <span className="capitalize">{invoice.status}</span>
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
