
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calculator, TrendingUp, TrendingDown, DollarSign, 
  PieChart, BarChart3, FileSpreadsheet, Download
} from "lucide-react";

export const AccountingModule = () => {
  const financialData = [
    { category: "Room Revenue", amount: 15420, change: 12.5, trend: "up" },
    { category: "Restaurant Revenue", amount: 8340, change: 8.2, trend: "up" },
    { category: "Operating Expenses", amount: -5620, change: -3.1, trend: "down" },
    { category: "Staff Costs", amount: -4200, change: 2.8, trend: "up" },
  ];

  const monthlyReports = [
    { month: "January 2024", revenue: 23760, expenses: 9820, profit: 13940, status: "completed" },
    { month: "December 2023", revenue: 21450, expenses: 8650, profit: 12800, status: "completed" },
    { month: "November 2023", revenue: 19880, expenses: 8200, profit: 11680, status: "completed" },
  ];

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Financial Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5" />
              <span>Financial Overview</span>
            </CardTitle>
            <CardDescription>Current month performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {financialData.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-sm md:text-base">{item.category}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      {item.trend === "up" ? (
                        <TrendingUp className="w-4 h-4 text-green-600" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-600" />
                      )}
                      <span className={`text-sm ${item.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                        {item.change > 0 ? "+" : ""}{item.change}%
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold text-lg ${item.amount > 0 ? "text-green-600" : "text-red-600"}`}>
                      ${Math.abs(item.amount).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-blue-800">
              <Calculator className="w-5 h-5" />
              <span>Quick Stats</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <p className="text-sm text-blue-600">Net Profit (MTD)</p>
              <p className="text-2xl md:text-3xl font-bold text-blue-800">$18,120</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-blue-600">Profit Margin</p>
              <p className="text-xl md:text-2xl font-bold text-blue-800">24.3%</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-blue-600">ROI</p>
              <p className="text-xl md:text-2xl font-bold text-blue-800">15.8%</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button className="bg-green-600 hover:bg-green-700 w-full sm:w-auto">
          <PieChart className="w-4 h-4 mr-2" />
          Generate Report
        </Button>
        <Button variant="outline" className="w-full sm:w-auto">
          <FileSpreadsheet className="w-4 h-4 mr-2" />
          Export to Excel
        </Button>
        <Button variant="outline" className="w-full sm:w-auto">
          <Download className="w-4 h-4 mr-2" />
          Download PDF
        </Button>
      </div>

      {/* Monthly Reports */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <DollarSign className="w-5 h-5" />
            <span>Monthly Reports</span>
          </CardTitle>
          <CardDescription>Historical financial performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {monthlyReports.map((report, index) => (
              <div key={index} className="flex flex-col lg:flex-row lg:items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex-1 mb-3 lg:mb-0">
                  <div className="flex items-center space-x-3">
                    <h3 className="font-semibold text-sm md:text-base">{report.month}</h3>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      {report.status}
                    </Badge>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 lg:gap-6 text-center lg:text-right">
                  <div>
                    <p className="text-xs text-gray-500">Revenue</p>
                    <p className="font-semibold text-green-600">${report.revenue.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Expenses</p>
                    <p className="font-semibold text-red-600">${report.expenses.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Profit</p>
                    <p className="font-bold text-blue-600">${report.profit.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
