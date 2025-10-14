
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Minus, Clock, CheckCircle } from "lucide-react";

interface MenuItem {
  id: number;
  name: string;
  price: number;
  category: string;
  image?: string;
  description: string;
}

interface OrderItem extends MenuItem {
  quantity: number;
}

export const RestaurantOrder = () => {
  const [selectedTable, setSelectedTable] = useState("T01");
  const [currentOrder, setCurrentOrder] = useState<OrderItem[]>([]);
  const [orderType, setOrderType] = useState<"dine-in" | "takeaway" | "room-service">("dine-in");

  const menuItems: MenuItem[] = [
    {
      id: 1,
      name: "Grilled Salmon",
      price: 28.00,
      category: "Main Course",
      description: "Fresh Atlantic salmon with herbs"
    },
    {
      id: 2,
      name: "Pasta Carbonara",
      price: 22.00,
      category: "Main Course",
      description: "Classic Italian pasta with cream sauce"
    },
    {
      id: 3,
      name: "Caesar Salad",
      price: 12.00,
      category: "Appetizer",
      description: "Crispy romaine with parmesan"
    },
    {
      id: 4,
      name: "Chocolate Cake",
      price: 8.00,
      category: "Dessert",
      description: "Rich chocolate layer cake"
    },
    {
      id: 5,
      name: "House Wine",
      price: 15.00,
      category: "Beverages",
      description: "Red or white wine selection"
    },
    {
      id: 6,
      name: "Club Sandwich",
      price: 16.00,
      category: "Light Meals",
      description: "Triple-layer sandwich with fries"
    },
  ];

  const addToOrder = (item: MenuItem) => {
    setCurrentOrder(prev => {
      const existing = prev.find(orderItem => orderItem.id === item.id);
      if (existing) {
        return prev.map(orderItem =>
          orderItem.id === item.id
            ? { ...orderItem, quantity: orderItem.quantity + 1 }
            : orderItem
        );
      } else {
        return [...prev, { ...item, quantity: 1 }];
      }
    });
  };

  const removeFromOrder = (itemId: number) => {
    setCurrentOrder(prev => {
      const existing = prev.find(orderItem => orderItem.id === itemId);
      if (existing && existing.quantity > 1) {
        return prev.map(orderItem =>
          orderItem.id === itemId
            ? { ...orderItem, quantity: orderItem.quantity - 1 }
            : orderItem
        );
      } else {
        return prev.filter(orderItem => orderItem.id !== itemId);
      }
    });
  };

  const getTotalAmount = () => {
    return currentOrder.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const submitOrder = () => {
    if (currentOrder.length === 0) return;
    
    const orderData = {
      table: selectedTable,
      type: orderType,
      items: currentOrder,
      total: getTotalAmount(),
      timestamp: new Date().toISOString()
    };
    
    console.log('Order submitted:', orderData);
    alert(`Order submitted for ${selectedTable}! Total: $${getTotalAmount().toFixed(2)}`);
    setCurrentOrder([]);
  };

  const categories = [...new Set(menuItems.map(item => item.category))];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Menu Items */}
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Menu Items</CardTitle>
            <div className="flex space-x-2">
              <Button
                variant={orderType === "dine-in" ? "default" : "outline"}
                size="sm"
                onClick={() => setOrderType("dine-in")}
              >
                Dine In
              </Button>
              <Button
                variant={orderType === "takeaway" ? "default" : "outline"}
                size="sm"
                onClick={() => setOrderType("takeaway")}
              >
                Takeaway
              </Button>
              <Button
                variant={orderType === "room-service" ? "default" : "outline"}
                size="sm"
                onClick={() => setOrderType("room-service")}
              >
                Room Service
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {categories.map(category => (
              <div key={category} className="mb-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-800">{category}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {menuItems
                    .filter(item => item.category === category)
                    .map(item => (
                      <div key={item.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{item.name}</h4>
                            <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                            <p className="text-lg font-bold text-green-600">${item.price.toFixed(2)}</p>
                          </div>
                          <Button
                            size="sm"
                            onClick={() => addToOrder(item)}
                            className="ml-2"
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Current Order */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Current Order</span>
              <Badge variant="outline">{selectedTable}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {currentOrder.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No items in order</p>
            ) : (
              <div className="space-y-3">
                {currentOrder.map(item => (
                  <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-sm text-gray-600">${item.price.toFixed(2)} each</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => removeFromOrder(item.id)}
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => addToOrder(item)}
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}
                
                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Total:</span>
                    <span>${getTotalAmount().toFixed(2)}</span>
                  </div>
                </div>
                
                <Button
                  className="w-full mt-4"
                  onClick={submitOrder}
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Submit Order
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Kitchen Display Preview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="w-5 h-5" />
              <span>Kitchen Queue</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="p-2 bg-yellow-50 border border-yellow-200 rounded text-sm">
                <strong>ORD-001</strong> - T05 - Preparing (5 min)
              </div>
              <div className="p-2 bg-orange-50 border border-orange-200 rounded text-sm">
                <strong>ORD-002</strong> - Room 201 - Cooking (12 min)
              </div>
              <div className="p-2 bg-green-50 border border-green-200 rounded text-sm">
                <strong>ORD-003</strong> - T12 - Ready (0 min)
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
