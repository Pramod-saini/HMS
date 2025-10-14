import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Package, Plus, AlertTriangle, TrendingDown, RotateCcw,
  Search, Filter, Truck, ShoppingCart, BarChart3
} from "lucide-react";

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  currentStock: number;
  minStock: number;
  maxStock: number;
  unit: string;
  costPerUnit: number;
  supplier: string;
  lastRestocked: string;
  status: "good" | "low" | "critical" | "overstock";
}

interface Supplier {
  id: string;
  name: string;
  contact: string;
  email: string;
  items: number;
  rating: number;
}

export const InventoryManagement = () => {
  const [activeTab, setActiveTab] = useState("items");
  const [searchTerm, setSearchTerm] = useState("");

  const [inventory] = useState<InventoryItem[]>([
    {
      id: "1",
      name: "Toilet Paper",
      category: "Housekeeping",
      currentStock: 45,
      minStock: 50,
      maxStock: 200,
      unit: "rolls",
      costPerUnit: 2.5,
      supplier: "CleanCorp Supplies",
      lastRestocked: "2024-01-20",
      status: "low"
    },
    {
      id: "2", 
      name: "Fresh Salmon",
      category: "Kitchen",
      currentStock: 25,
      minStock: 10,
      maxStock: 50,
      unit: "kg",
      costPerUnit: 18.5,
      supplier: "Ocean Fresh Foods",
      lastRestocked: "2024-01-27",
      status: "good"
    },
    {
      id: "3",
      name: "Bed Sheets (Queen)",
      category: "Housekeeping", 
      currentStock: 8,
      minStock: 15,
      maxStock: 100,
      unit: "sets",
      costPerUnit: 35.0,
      supplier: "Luxury Linens Ltd",
      lastRestocked: "2024-01-15",
      status: "critical"
    },
    {
      id: "4",
      name: "Coffee Beans",
      category: "Restaurant",
      currentStock: 150,
      minStock: 30,
      maxStock: 100,
      unit: "kg",
      costPerUnit: 12.0,
      supplier: "Premium Coffee Co",
      lastRestocked: "2024-01-25",
      status: "overstock"
    },
    {
      id: "5",
      name: "Cleaning Chemicals",
      category: "Maintenance",
      currentStock: 35,
      minStock: 20,
      maxStock: 80,
      unit: "bottles",
      costPerUnit: 8.5,
      supplier: "CleanCorp Supplies",
      lastRestocked: "2024-01-22",
      status: "good"
    }
  ]);

  const [suppliers] = useState<Supplier[]>([
    { id: "1", name: "CleanCorp Supplies", contact: "+1-555-0101", email: "orders@cleancorp.com", items: 2, rating: 4.5 },
    { id: "2", name: "Ocean Fresh Foods", contact: "+1-555-0102", email: "supply@oceanfresh.com", items: 1, rating: 4.8 },
    { id: "3", name: "Luxury Linens Ltd", contact: "+1-555-0103", email: "sales@luxurylinens.com", items: 1, rating: 4.2 },
    { id: "4", name: "Premium Coffee Co", contact: "+1-555-0104", email: "orders@premiumcoffee.com", items: 1, rating: 4.7 }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "good": return "bg-green-100 text-green-800";
      case "low": return "bg-yellow-100 text-yellow-800";
      case "critical": return "bg-red-100 text-red-800";
      case "overstock": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStockPercentage = (item: InventoryItem) => {
    return (item.currentStock / item.maxStock) * 100;
  };

  const filteredInventory = inventory.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const lowStockItems = inventory.filter(item => item.status === "critical" || item.status === "low");
  const totalValue = inventory.reduce((acc, item) => acc + (item.currentStock * item.costPerUnit), 0);

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">Total Items</p>
                <p className="text-3xl font-bold">{inventory.length}</p>
              </div>
              <Package className="w-10 h-10 text-blue-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100">Low Stock</p>
                <p className="text-3xl font-bold">{lowStockItems.length}</p>
              </div>
              <AlertTriangle className="w-10 h-10 text-red-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">Total Value</p>
                <p className="text-3xl font-bold">${totalValue.toLocaleString()}</p>
              </div>
              <BarChart3 className="w-10 h-10 text-green-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100">Suppliers</p>
                <p className="text-3xl font-bold">{suppliers.length}</p>
              </div>
              <Truck className="w-10 h-10 text-purple-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Low Stock Alert */}
      {lowStockItems.length > 0 && (
        <Alert className="border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            <strong>{lowStockItems.length} items</strong> are running low on stock and need reordering.
          </AlertDescription>
        </Alert>
      )}

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="items">Inventory Items</TabsTrigger>
          <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
          <TabsTrigger value="orders">Purchase Orders</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="items" className="space-y-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
            </div>
            <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Item
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredInventory.map((item) => (
              <Card key={item.id} className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-600">{item.category}</p>
                    </div>
                    <Badge className={getStatusColor(item.status)}>
                      {item.status}
                    </Badge>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Stock Level</span>
                        <span>{item.currentStock} {item.unit}</span>
                      </div>
                      <Progress value={getStockPercentage(item)} className="h-2" />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>Min: {item.minStock}</span>
                        <span>Max: {item.maxStock}</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Cost per unit</p>
                        <p className="font-semibold">${item.costPerUnit}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Total value</p>
                        <p className="font-semibold">${(item.currentStock * item.costPerUnit).toFixed(2)}</p>
                      </div>
                    </div>
                    
                    <div className="pt-2 border-t">
                      <p className="text-xs text-gray-600">Supplier: {item.supplier}</p>
                      <p className="text-xs text-gray-600">Last restocked: {new Date(item.lastRestocked).toLocaleDateString()}</p>
                    </div>
                    
                    {(item.status === "low" || item.status === "critical") && (
                      <Button size="sm" className="w-full bg-red-500 hover:bg-red-600">
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Reorder Now
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="suppliers" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Suppliers</h2>
              <p className="text-gray-600">Manage your supply chain partners</p>
            </div>
            <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Supplier
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {suppliers.map((supplier) => (
              <Card key={supplier.id} className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900">{supplier.name}</h3>
                      <p className="text-sm text-gray-600">{supplier.contact}</p>
                      <p className="text-sm text-gray-600">{supplier.email}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-3 h-3 rounded-full ${
                              i < supplier.rating ? 'bg-yellow-400' : 'bg-gray-200'
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-xs text-gray-600 mt-1">{supplier.rating}/5</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Items supplied</span>
                      <span className="font-semibold">{supplier.items}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex space-x-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      View Items
                    </Button>
                    <Button size="sm" className="flex-1">
                      Create Order
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="orders" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <ShoppingCart className="w-5 h-5 mr-2" />
                Purchase Orders
              </CardTitle>
              <CardDescription>Track and manage purchase orders</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Active Orders</h3>
                <p className="text-gray-600 mb-6">Create your first purchase order to get started</p>
                <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Purchase Order
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="w-5 h-5 mr-2" />
                Inventory Reports
              </CardTitle>
              <CardDescription>Analyze inventory trends and performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">Category Breakdown</h3>
                  {["Housekeeping", "Kitchen", "Restaurant", "Maintenance"].map((category) => {
                    const categoryItems = inventory.filter(item => item.category === category);
                    const categoryValue = categoryItems.reduce((acc, item) => acc + (item.currentStock * item.costPerUnit), 0);
                    const percentage = (categoryValue / totalValue) * 100;
                    
                    return (
                      <div key={category} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{category}</span>
                          <span>{categoryItems.length} items - ${categoryValue.toFixed(2)}</span>
                        </div>
                        <Progress value={percentage} className="h-2" />
                      </div>
                    );
                  })}
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-semibold">Stock Status</h3>
                  {["good", "low", "critical", "overstock"].map((status) => {
                    const statusItems = inventory.filter(item => item.status === status);
                    const percentage = (statusItems.length / inventory.length) * 100;
                    
                    return (
                      <div key={status} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="capitalize">{status}</span>
                          <span>{statusItems.length} items ({percentage.toFixed(1)}%)</span>
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