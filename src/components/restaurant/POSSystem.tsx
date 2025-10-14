import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  Search, 
  CreditCard, 
  DollarSign, 
  Clock,
  User,
  Table,
  Receipt,
  Calculator,
  Percent,
  Gift,
  Trash2,
  Check,
  X,
  Printer,
  ChefHat,
  Coffee,
  Utensils,
  Wine,
  Sandwich,
  Cookie
} from "lucide-react";
import { toast } from "sonner";

interface MenuItem {
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
  available: boolean;
}

interface OrderItem extends MenuItem {
  quantity: number;
  notes?: string;
}

interface Order {
  id: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  paymentMethod: string;
  tableNumber?: string;
  customerName?: string;
  timestamp: Date;
  status: 'pending' | 'preparing' | 'ready' | 'completed';
}

const POSSystem = () => {
  const [cart, setCart] = useState<OrderItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [discount, setDiscount] = useState(0);
  const [tableNumber, setTableNumber] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  const categories = [
    { id: "all", name: "All Items", icon: Utensils },
    { id: "appetizers", name: "Appetizers", icon: Cookie },
    { id: "mains", name: "Main Course", icon: ChefHat },
    { id: "desserts", name: "Desserts", icon: Cookie },
    { id: "beverages", name: "Beverages", icon: Coffee },
    { id: "wine", name: "Wine & Spirits", icon: Wine }
  ];

  const menuItems: MenuItem[] = [
    // Appetizers
    { id: 1, name: "Truffle Arancini", price: 18, category: "appetizers", description: "Crispy risotto balls with truffle oil", image: "🍚", available: true },
    { id: 2, name: "Tuna Tartare", price: 24, category: "appetizers", description: "Fresh yellowfin tuna with avocado", image: "🍣", available: true },
    { id: 3, name: "Burrata Caprese", price: 16, category: "appetizers", description: "Fresh burrata with tomatoes and basil", image: "🧀", available: true },
    
    // Main Course
    { id: 4, name: "Wagyu Ribeye", price: 85, category: "mains", description: "A5 Wagyu with seasonal vegetables", image: "🥩", available: true },
    { id: 5, name: "Pan-Seared Halibut", price: 38, category: "mains", description: "Fresh halibut with lemon butter sauce", image: "🐟", available: true },
    { id: 6, name: "Duck Confit", price: 42, category: "mains", description: "Slow-cooked duck leg with cherry sauce", image: "🦆", available: true },
    { id: 7, name: "Lobster Ravioli", price: 34, category: "mains", description: "House-made pasta with lobster filling", image: "🦞", available: false },
    
    // Desserts
    { id: 8, name: "Chocolate Soufflé", price: 14, category: "desserts", description: "Dark chocolate soufflé with vanilla ice cream", image: "🍫", available: true },
    { id: 9, name: "Tiramisu", price: 12, category: "desserts", description: "Classic Italian dessert", image: "🍰", available: true },
    
    // Beverages
    { id: 10, name: "Espresso", price: 4, category: "beverages", description: "Italian espresso", image: "☕", available: true },
    { id: 11, name: "Fresh Orange Juice", price: 6, category: "beverages", description: "Freshly squeezed orange juice", image: "🍊", available: true },
    
    // Wine & Spirits
    { id: 12, name: "Chateau Margaux 2015", price: 450, category: "wine", description: "Premium Bordeaux wine", image: "🍷", available: true },
    { id: 13, name: "Craft Beer Selection", price: 8, category: "wine", description: "Local craft beer", image: "🍺", available: true }
  ];

  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "all" || item.category === activeCategory;
    return matchesSearch && matchesCategory && item.available;
  });

  const addToCart = (item: MenuItem) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      setCart(cart.map(cartItem =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
    toast.success(`${item.name} added to cart`);
  };

  const removeFromCart = (itemId: number) => {
    const existingItem = cart.find(cartItem => cartItem.id === itemId);
    if (existingItem && existingItem.quantity > 1) {
      setCart(cart.map(cartItem =>
        cartItem.id === itemId
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      ));
    } else {
      setCart(cart.filter(cartItem => cartItem.id !== itemId));
    }
  };

  const clearCart = () => {
    setCart([]);
    setDiscount(0);
    setTableNumber("");
    setCustomerName("");
  };

  const calculateTotals = () => {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discountAmount = (subtotal * discount) / 100;
    const tax = (subtotal - discountAmount) * 0.1; // 10% tax
    const total = subtotal - discountAmount + tax;
    
    return { subtotal, discountAmount, tax, total };
  };

  const processPayment = (paymentMethod: string) => {
    const { subtotal, discountAmount, tax, total } = calculateTotals();
    
    const newOrder: Order = {
      id: `ORD-${Date.now()}`,
      items: [...cart],
      subtotal,
      tax,
      discount: discountAmount,
      total,
      paymentMethod,
      tableNumber: tableNumber || undefined,
      customerName: customerName || undefined,
      timestamp: new Date(),
      status: 'preparing'
    };

    setOrders([...orders, newOrder]);
    setCurrentOrder(newOrder);
    clearCart();
    setIsPaymentOpen(false);
    
    toast.success(`Payment processed! Order ${newOrder.id} created.`);
  };

  const { subtotal, discountAmount, tax, total } = calculateTotals();

  return (
    <div className="flex h-screen bg-background">
      {/* Left Panel - Menu Items */}
      <div className="flex-1 flex flex-col border-r">
        {/* Search and Categories */}
        <div className="p-4 border-b">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search menu items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Button
                  key={category.id}
                  variant={activeCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveCategory(category.id)}
                  className="text-sm"
                >
                  <Icon className="h-4 w-4 mr-1" />
                  {category.name}
                </Button>
              );
            })}
          </div>
        </div>

        {/* Menu Items Grid */}
        <div className="flex-1 overflow-auto p-4">
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredItems.map((item) => (
              <Card key={item.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="text-4xl mb-2 text-center">{item.image}</div>
                  <h3 className="font-semibold text-sm mb-1 line-clamp-1">{item.name}</h3>
                  <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-primary">${item.price}</span>
                    <Button size="sm" onClick={() => addToCart(item)}>
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel - Cart and Checkout */}
      <div className="w-80 flex flex-col bg-muted/10">
        {/* Cart Header */}
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold flex items-center">
              <ShoppingCart className="h-5 w-5 mr-2" />
              Current Order
            </h2>
            <Badge variant="secondary">{cart.length} items</Badge>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-sm text-muted-foreground">Table</label>
              <Input
                placeholder="Table #"
                value={tableNumber}
                onChange={(e) => setTableNumber(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Customer</label>
              <Input
                placeholder="Name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-auto p-4">
          {cart.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              <ShoppingCart className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No items in cart</p>
            </div>
          ) : (
            <div className="space-y-3">
              {cart.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-sm">{item.name}</h4>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">${item.price}</span>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="text-sm font-medium">{item.quantity}</span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => addToCart(item)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Order Summary and Payment */}
        {cart.length > 0 && (
          <div className="p-4 border-t">
            {/* Discount */}
            <div className="mb-4">
              <label className="text-sm text-muted-foreground">Discount %</label>
              <Input
                type="number"
                placeholder="0"
                value={discount}
                onChange={(e) => setDiscount(Number(e.target.value))}
                className="mt-1"
                min="0"
                max="100"
              />
            </div>

            {/* Totals */}
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>Discount:</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span>Tax (10%):</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-2">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Payment Buttons */}
            <div className="space-y-2">
              <Dialog open={isPaymentOpen} onOpenChange={setIsPaymentOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full" size="lg">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Process Payment
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Select Payment Method</DialogTitle>
                    <DialogDescription>
                      Choose how the customer wants to pay
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid grid-cols-2 gap-4">
                    <Button onClick={() => processPayment('cash')} className="h-20 flex-col">
                      <DollarSign className="h-6 w-6 mb-2" />
                      Cash
                    </Button>
                    <Button onClick={() => processPayment('card')} className="h-20 flex-col">
                      <CreditCard className="h-6 w-6 mb-2" />
                      Card
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
              
              <Button variant="outline" onClick={clearCart} className="w-full">
                <Trash2 className="h-4 w-4 mr-2" />
                Clear Cart
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default POSSystem;