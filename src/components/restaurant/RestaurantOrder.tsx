
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Minus, Clock, CheckCircle } from "lucide-react";
import { set } from "date-fns";
import { get } from "http";

export interface MenuCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
}



interface MenuItem {
  id: number;
  name: string;
  price: number;
  category: string;
  image?: string;
  description: string;
  isavailable: boolean;
}

interface OrderItem extends MenuItem {
  quantity: number;
}

export const RestaurantOrder = () => {
  const [menuCategories, setMenuCategories] = useState<MenuCategory[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [tables, setTables] = useState<any[]>([]);
  const [selectedTable, setSelectedTable] = useState("");
  const accessToken = localStorage.getItem('accessToken');
  const [currentOrder, setCurrentOrder] = useState<OrderItem[]>([]);
  const [orderType, setOrderType] = useState<"dine-in" | "takeaway" | "room-service">("dine-in");


  useEffect(() => {
    const getMenuCategories = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BACKEND_URL}/api/menu-categories/`, {
          method: 'GET',
          headers: {
            "Content-Type": "application/json", // ✅ yeh zaroori hai
            Authorization: `Bearer ${accessToken}`, // ✅ token agar protected API hai
          },
        });
        const data = await response.json();
        if (response.ok) {
          setMenuCategories(data);
          console.log("Menu categories fetched:", data);
        } else {
          throw new Error(`Failed to get menu items: ${await response.text()}`);
        }
      } catch (error) {
        console.error("Error getting menu items:", error);
      }
    };
    getMenuCategories();

    const getMenuItems = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BACKEND_URL}/api/menu-items/`, {
          method: 'GET',
          headers: {
            "Content-Type": "application/json", // ✅ yeh zaroori hai
            Authorization: `Bearer ${accessToken}`, // ✅ token agar protected API hai
          },
        });
        const data = await response.json();
        if (response.ok) {
          setMenuItems(data);
          console.log("Menu categories fetched:", data);
        } else {
          throw new Error(`Failed to get menu items: ${await response.text()}`);
        }
      } catch (error) {
        console.error("Error getting menu items:", error);
      }
    };
    getMenuItems();

    const getTable = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BACKEND_URL}/api/tables/`, {
          method: 'GET',
          headers: {
            "Content-Type": "application/json", // ✅ yeh zaroori hai
            Authorization: `Bearer ${accessToken}`, // ✅ token agar protected API hai
          },
        });
        const data = await response.json();
        console.log("Tables fetched:", data);
        if (response.ok) {
          setTables(data);
          // setTables((prev) => [...prev, ...data])
        } else {
          throw new Error(`Failed to get tables: ${await response.text()}`);
        }
      } catch (error) {
        console.error("Error getting tables:", error);
      }
    };
    getTable();

  }, [])



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
  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-50 text-green-700 border-green-200 hover:bg-green-100";
      case "occupied":
        return "bg-primary/10 text-primary border-primary/20 hover:bg-primary/20";
      case "reserved":
        return "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100";
      case "cleaning":
        return "bg-muted text-muted-foreground border-border hover:bg-muted/80";
      case "preparing":
        return "bg-orange-50 text-orange-700 border-orange-200";
      case "served":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "ready":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "ordered":
        return "bg-purple-50 text-purple-700 border-purple-200";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  return (
    <>
     <div className="relative bg-gradient-to-br from-secondary/20 to-primary/5 rounded-xl p-2 sm:p-6 mb-6 overflow-hidden border max-w-sm shadow-md h-auto">

    {/* Table Layout Container - Bottom Padding added (pb-28) and top padding (pt-2) */}
    <div className="w-full grid grid-cols-4 gap-x-2 gap-y-4 pt-2 pb-28 justify-start ">
      {tables
        // Nayi filter condition: Sirf 'Available' status wale tables ko select karega.
        .filter(table => table.status === 'available')
        .map((table, i) => (
          <div
            key={table.id}
            className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl border-2 flex flex-col items-center justify-center cursor-pointer transition-all hover:scale-110 hover:shadow-lg ${getStatusColor(
              table.status
            )}`}
            onClick={() => setSelectedTable(table.table_code)}
          >
            <span className="text-xs font-bold">{i + 1}</span>
            <span className="text-xs">{table.capacity}p</span>
            {table.id.includes("VIP") && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 rounded-full flex items-center justify-center">
                <span className="text-xs text-white">★</span>
              </div>
            )}
          </div>
        ))}
    </div>


</div>


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
              {menuCategories.map(category => (
                <div key={category.id} className="mb-6">
                  <h3 className="text-lg font-semibold mb-3 text-gray-800">{category.name}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {menuItems
                      .filter(item => item.category === category.slug)
                      .map(item => (
                        <div key={item.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex items-start">
                            {/* Image width/height ko w-28 h-24 kiya gaya hai */}
                            {item.image && (
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-28 h-24 object-cover rounded-md mr-4 flex-shrink-0"
                              />
                            )}

                            <div className="flex-1">
                              <div className="flex justify-between items-start mb-2">
                                <div className="flex-1">
                                  <h4 className="font-medium text-gray-900">{item.name}</h4>
                                  <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                                  <p className="text-lg font-bold text-green-600">₹{item.price}</p>
                                </div>

                                {/* Tooltip Wrapper */}
                                <div
                                  className="ml-2 flex-shrink-0"
                                  title={!selectedTable ? "Select a table" : ""}
                                >
                                  <Button
                                    size="sm"
                                    onClick={() => addToOrder(item)}
                                    disabled={selectedTable === ""}
                                  >
                                    <Plus className="w-4 h-4" />
                                  </Button>
                                </div>
                              </div>
                            </div>
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
                <Badge variant="outline">{selectedTable || "Select a Table"}</Badge>
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
                        <p className="text-sm text-gray-600">${item.price} each</p>
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
                      <span>₹ {getTotalAmount().toFixed(2)}</span>
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
    </>
  );
};
