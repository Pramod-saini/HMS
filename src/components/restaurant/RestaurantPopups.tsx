import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { 
  Star, 
  Clock, 
  Users, 
  ChefHat, 
  Utensils, 
  CalendarDays,
  Edit,
  Trash2,
  Plus,
  Eye
} from "lucide-react";
import { format } from "date-fns";

interface Table {
  id: string;
  capacity: number;
  status: "available" | "occupied" | "reserved" | "cleaning";
  reservation?: string;
}

interface Order {
  id: string;
  table: string;
  items: string[];
  amount: number;
  status: "Ordered" | "Preparing" | "Ready" | "Served";
  time: string;
}

interface TableDetailsPopupProps {
  table: Table;
  trigger: React.ReactNode;
}

export const TableDetailsPopup = ({ table, trigger }: TableDetailsPopupProps) => {
  const [isReservationMode, setIsReservationMode] = useState(false);
  const [date, setDate] = useState<Date>();
  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [guests, setGuests] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");

  const handleReservation = () => {
    console.log("Reservation created:", {
      table: table.id,
      date,
      customerName,
      phoneNumber,
      guests,
      specialRequests
    });
    setIsReservationMode(false);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Utensils className="w-5 h-5 text-primary" />
            <span>Table {table.id} Details</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Table Info */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Table Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Status:</span>
                <Badge variant={table.status === "available" ? "default" : "secondary"}>
                  {table.status}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Capacity:</span>
                <span className="font-medium">{table.capacity} guests</span>
              </div>
              {table.reservation && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Reserved for:</span>
                  <span className="font-medium">{table.reservation}</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Reservation Form */}
          {isReservationMode ? (
            <Card>
              <CardHeader>
                <CardTitle>New Reservation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="customerName">Customer Name</Label>
                    <Input
                      id="customerName"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Enter customer name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber">Phone Number</Label>
                    <Input
                      id="phoneNumber"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Date & Time</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start">
                          <CalendarDays className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="guests">Number of Guests</Label>
                    <Select value={guests} onValueChange={setGuests}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select guests" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: table.capacity }, (_, i) => (
                          <SelectItem key={i + 1} value={(i + 1).toString()}>
                            {i + 1} {i === 0 ? "guest" : "guests"}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="specialRequests">Special Requests</Label>
                  <Textarea
                    id="specialRequests"
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    placeholder="Any special requests or dietary requirements..."
                    rows={3}
                  />
                </div>

                <div className="flex space-x-2">
                  <Button onClick={handleReservation} className="flex-1">
                    Confirm Reservation
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setIsReservationMode(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="flex space-x-2">
              {table.status === "available" && (
                <Button 
                  onClick={() => setIsReservationMode(true)}
                  className="flex-1"
                >
                  <Users className="w-4 h-4 mr-2" />
                  Make Reservation
                </Button>
              )}
              <Button variant="outline" className="flex-1">
                <ChefHat className="w-4 h-4 mr-2" />
                Take Order
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

interface OrderDetailsPopupProps {
  order: Order;
  trigger: React.ReactNode;
}

export const OrderDetailsPopup = ({ order, trigger }: OrderDetailsPopupProps) => {
  const [orderStatus, setOrderStatus] = useState<string>(order.status);
  const [estimatedTime, setEstimatedTime] = useState("15");

  const statusOptions = [
    { value: "Ordered", label: "Ordered", color: "bg-blue-100 text-blue-800" },
    { value: "Preparing", label: "Preparing", color: "bg-yellow-100 text-yellow-800" },
    { value: "Ready", label: "Ready", color: "bg-green-100 text-green-800" },
    { value: "Served", label: "Served", color: "bg-gray-100 text-gray-800" },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <ChefHat className="w-5 h-5 text-primary" />
            <span>Order {order.id}</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Order Summary */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Table:</span>
                <span className="font-medium">{order.table}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Time Ordered:</span>
                <span className="font-medium">{order.time}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Amount:</span>
                <span className="font-bold text-lg text-primary">${order.amount.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>

          {/* Order Items */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
                    <span className="font-medium">{item}</span>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">1x</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Status Management */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Order Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Current Status</Label>
                <Select value={orderStatus} onValueChange={setOrderStatus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((status) => (
                      <SelectItem key={status.value} value={status.value}>
                        {status.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {orderStatus === "Preparing" && (
                <div className="space-y-2">
                  <Label htmlFor="estimatedTime">Estimated Time (minutes)</Label>
                  <Input
                    id="estimatedTime"
                    type="number"
                    value={estimatedTime}
                    onChange={(e) => setEstimatedTime(e.target.value)}
                    placeholder="15"
                  />
                </div>
              )}

              <Button className="w-full">
                <Clock className="w-4 h-4 mr-2" />
                Update Status
              </Button>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

interface MenuItemPopupProps {
  trigger: React.ReactNode;
  isEdit?: boolean;
  item?: any;
}

export const MenuItemPopup = ({ trigger, isEdit = false, item }: MenuItemPopupProps) => {
  const [itemName, setItemName] = useState(item?.name || "");
  const [itemPrice, setItemPrice] = useState(item?.price || "");
  const [itemCategory, setItemCategory] = useState(item?.category || "");
  const [itemDescription, setItemDescription] = useState(item?.description || "");

  const categories = [
    "Appetizers",
    "Main Courses", 
    "Desserts",
    "Beverages",
    "Light Meals",
    "Specials"
  ];

  const handleSave = () => {
    console.log("Saving menu item:", {
      name: itemName,
      price: itemPrice,
      category: itemCategory,
      description: itemDescription
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Utensils className="w-5 h-5 text-primary" />
            <span>{isEdit ? "Edit" : "Add"} Menu Item</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="itemName">Item Name</Label>
              <Input
                id="itemName"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                placeholder="Enter item name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="itemPrice">Price ($)</Label>
              <Input
                id="itemPrice"
                type="number"
                value={itemPrice}
                onChange={(e) => setItemPrice(e.target.value)}
                placeholder="0.00"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Category</Label>
            <Select value={itemCategory} onValueChange={setItemCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="itemDescription">Description</Label>
            <Textarea
              id="itemDescription"
              value={itemDescription}
              onChange={(e) => setItemDescription(e.target.value)}
              placeholder="Describe the item..."
              rows={3}
            />
          </div>

          <div className="flex space-x-2">
            <Button onClick={handleSave} className="flex-1">
              {isEdit ? "Update Item" : "Add Item"}
            </Button>
            <Button variant="outline" className="flex-1">
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};