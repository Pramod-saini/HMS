import { useEffect, useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Menu, Users, Plus, Search, Settings2, Clock, UtensilsCrossed, Image, XCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { RestaurantOrder } from "./RestaurantOrder";
import { TableBooking } from "./TableBooking";
import { TableDetailsPopup, OrderDetailsPopup } from "./RestaurantPopups";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { text } from "stream/consumers";
import { Textarea } from "../ui/textarea";
import { table } from "console";
import { set } from "date-fns";

interface Table {
  id: string;
  capacity: number;
  status: "available" | "occupied" | "reserved" | "cleaning";
  reservation?: string | null;
  x: number;
  y: number;
  tableNo?: number;
  hotel?: string;

}

interface Order {
  id: string;
  table: string;
  items: string[];
  amount: number;
  status: "Ordered" | "Preparing" | "Ready" | "Served";
  time: string;
}

  export const RestaurantManagement = () => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const [activeTab, setActiveTab] = useState("tables");
    const accessToken = localStorage.getItem('accessToken'); // get token from localStorage
    const [getMenuCategories, setGetMenuCategories] = useState([]);

  const [tables, setTables] = useState<Table[]>([
    // {
    //   id: "T01",
    //   capacity: 2,
    //   status: "Available",
    //   reservation: null,
    //   x: 10,
    //   y: 10,
    // },
    // {
    //   id: "T02",
    //   capacity: 4,
    //   status: "Occupied",
    //   reservation: "Smith Party",
    //   x: 150,
    //   y: 10,
    // },
    // {
    //   id: "T03",
    //   capacity: 6,
    //   status: "Reserved",
    //   reservation: "Johnson Dinner",
    //   x: 290,
    //   y: 10,
    // },
    // {
    //   id: "T04",
    //   capacity: 2,
    //   status: "Available",
    //   reservation: null,
    //   x: 430,
    //   y: 10,
    // },
    // {
    //   id: "T05",
    //   capacity: 8,
    //   status: "Occupied",
    //   reservation: "Wilson Group",
    //   x: 10,
    //   y: 100,
    // },
    // {
    //   id: "T06",
    //   capacity: 4,
    //   status: "Cleaning",
    //   reservation: null,
    //   x: 150,
    //   y: 100,
    // },
    // {
    //   id: "T07",
    //   capacity: 6,
    //   status: "Available",
    //   reservation: null,
    //   x: 290,
    //   y: 100,
    // },
    // {
    //   id: "T08",
    //   capacity: 4,
    //   status: "Reserved",
    //   reservation: "Davis Meeting",
    //   x: 430,
    //   y: 100,
    // },
    // {
    //   id: "T09",
    //   capacity: 10,
    //   status: "Available",
    //   reservation: null,
    //   x: 10,
    //   y: 190,
    // },
    // {
    //   id: "T10",
    //   capacity: 2,
    //   status: "Occupied",
    //   reservation: "Brown Couple",
    //   x: 150,
    //   y: 190,
    // },
    // {
    //   id: "VIP01",
    //   capacity: 8,
    //   status: "Reserved",
    //   reservation: "Corporate Event",
    //   x: 290,
    //   y: 190,
    // },
    // {
    //   id: "VIP02",
    //   capacity: 12,
    //   status: "Available",
    //   reservation: null,
    //   x: 430,
    //   y: 190,
    // },
  ]);

  const orders: Order[] = [
    {
      id: "ORD001",
      table: "T02",
      items: ["Pasta Carbonara", "Caesar Salad", "Wine"],
      amount: 45.5,
      status: "Preparing",
      time: "12:30 PM",
    },
    {
      id: "ORD002",
      table: "T05",
      items: ["Grilled Salmon", "Soup"],
      amount: 38.75,
      status: "Served",
      time: "12:45 PM",
    },
    {
      id: "ORD003",
      table: "Room Service",
      items: ["Club Sandwich", "Coffee", "Dessert"],
      amount: 32.25,
      status: "Ready",
      time: "1:00 PM",
    },
    {
      id: "ORD004",
      table: "T03",
      items: ["Steak Dinner", "Red Wine"],
      amount: 75.0,
      status: "Ordered",
      time: "1:15 PM",
    },
    {
      id: "ORD005",
      table: "VIP01",
      items: ["Tasting Menu", "Wine Pairing"],
      amount: 180.0,
      status: "Preparing",
      time: "1:30 PM",
    },
    {
      id: "ORD006",
      table: "T10",
      items: ["Pizza Margherita", "Salad"],
      amount: 28.5,
      status: "Ready",
      time: "1:45 PM",
    },
    {
      id: "ORD007",
      table: "T08",
      items: ["Seafood Platter", "Champagne"],
      amount: 95.0,
      status: "Ordered",
      time: "2:00 PM",
    },
  ];

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
  

  const [newMenu, setNewMenu] = useState({
    id: "",
    name: "",
    price: "",
    category: "",
    is_available: "true",
    hotel: "Ocean View Resort", // optional pre-filled
    description: "", // optional pre-filled
    image: null, // optional pre-filled
    file: null, // optional pre-filled
  });

  const tableStats = {
    available: tables.filter((t) => t.status === "available").length,
    occupied: tables.filter((t) => t.status === "occupied").length,
    reserved: tables.filter((t) => t.status === "reserved").length,
    cleaning: tables.filter((t) => t.status === "cleaning").length,
  };

  const [showAddMenu, setShowAddMenu] = useState(false);
  const [showAddTable, setShowAddTable] = useState(false);
  const [newTable, setNewTable] = useState<Table>({
    id: "",
    capacity: 2,
    status: "available",
    reservation: null,
    x: 0,
    y: 0,
    tableNo: undefined,
    hotel: "ocean-view-resort"
  });
  const [isVip, setIsVip] = useState(false);

  const addTable = async (e) => {
    e.preventDefault();
    setShowAddTable(!showAddTable);

    const updatedTable = {
      ...newTable,
      number: newTable?.tableNo,
      status: newTable.status.toLowerCase(),
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BACKEND_URL}/api/tables/`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json", // ✅ yeh zaroori hai
          Authorization: `Bearer ${accessToken}`, // ✅ token agar protected API hai
        },
        body: JSON.stringify(updatedTable), // ✅ stringify zaroori hai
      });

      const data = await response.json();

      if (response.ok) {
        alert("Table added successfully!");
        newTable.id = "";
        newTable.capacity = undefined;
        newTable.reservation = null;
        newTable.tableNo = undefined;

        // ✅ success logic yahan likho
      } else {
        throw new Error(`Failed to add table: ${await response.text()}`);
      }
    } catch (error) {
      console.error("Error adding table:", error);
    }
  }

  const getMenuItemsCategories = async () => {
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
        setGetMenuCategories(data);
      } else {
        throw new Error(`Failed to get menu items: ${await response.text()}`);
      }
    } catch (error) {
      console.error("Error getting menu items:", error);
    }
  };

  const addMenu = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", newMenu.name);
      formData.append("price", newMenu.price);
      formData.append("category", newMenu.category || "");
      formData.append("is_available", newMenu.is_available);
      formData.append("hotel", newMenu.hotel);
      formData.append("description", newMenu.description);

      if (newMenu.file) {
        formData.append("image", newMenu.file); // 👈 File object, not image URL
      }


      console.log("🧾 FormData content:");
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_BACKEND_URL}/api/menu-items/`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`, // ✅ sirf token header me rakhna hai
            // ❌ "Content-Type" mat set karo — browser khud multipart boundary set karega
          },
          body: formData,
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Menu item added successfully!");
        setShowAddMenu(false);
        setNewMenu({
          id: "",
          name: "",
          price: "",
          category: "",
          is_available: "true",
          hotel: "Ocean View Resort",
          description: "",
          image: null,
          file: null,
        });
      } else {
        throw new Error(
          `Failed to add menu item: ${data.message || JSON.stringify(data)}`
        );
      }
    } catch (error) {
      console.error("Error adding menu item:", error);
    }
  };



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

  useEffect(() => {
    // Pehli baar function call
    getTable();
    getMenuItemsCategories();
    getHotelMenu();


    // Set interval to call every 6 seconds
    const intervalId = setInterval(() => {
      getTable();
      getMenuItemsCategories();
      getHotelMenu();

    }, 30000); // 6000 ms = 6 seconds

    // Cleanup function to clear interval jab component unmount ho
    return () => clearInterval(intervalId);
  }, []);


  //showaddmenu






  // Add Table Handler
  // const handleAddTable = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   const index = tables.length;
  //   const x = (index % 6) * 140 + 10;
  //   const y = Math.floor(index / 6) * 90 + 10;

  //   // Agar VIP hai to id me VIP prefix lagaye
  //   const tableId = isVip
  //     ? `VIP${String(
  //         tables.filter((t) => t.id.startsWith("VIP")).length + 1
  //       ).padStart(2, "0")}`
  //     : newTable.id;

  //   setTables((prev) => [
  //     ...prev,
  //     {
  //       ...newTable,
  //       id: tableId,
  //       capacity: Number(newTable.capacity),
  //       x,
  //       y,
  //     },
  //   ]);
  //   console.log(tables);
  //   setShowAddTable(false);
  //   setNewTable({
  //     id: "",
  //     capacity: 2,
  //     status: "Available",
  //     reservation: null,
  //     x: 0,
  //     y: 0,
  //   });
  //   setIsVip(false);
  // };

  const [reserveTable, setReserveTable] = useState<Table | null>(null);
  const [reserveName, setReserveName] = useState("");
  const [reserveNumber, setReserveNumber] = useState("");

  const [item1, setItem1] = useState("");
  const [qty1, setQty1] = useState("");
  const [item2, setItem2] = useState("");
  const [qty2, setQty2] = useState("");
  const [item3, setItem3] = useState("");
  const [qty3, setQty3] = useState("");
  const [reserveComments, setReserveComments] = useState("");
  const [hotelMenus, setHotelMenus] = useState([]);
  const [dashboardSummary, setDashboardSummary] = useState(null)


  const getHotelMenu = async () => {
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
        setHotelMenus(data);
        // const menuNames = data.map((item) => item.name);
        // setHotelMenus(menuNames);
        // console.log("Menu items fetched:", menuNames);
      } else {
        throw new Error(`Failed to get menu items: ${await response.text()}`);
      }
    } catch (error) {
      console.error("Error getting menu items:", error);
    }
  };
  const [orderData, setOrderData] = useState<{ [key: string]: number }>({});

  // Reserve handler
  const handleReserve = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reserveTable) return;
    setTables((prev) =>
      prev.map((t) =>
        t.id === reserveTable.id
          ? { ...t, status: "reserved", reservation: reserveName }
          : t
      )
    );
    setReserveTable(null);
    setReserveName("");
  };

  // console.log(dashboardSummary)
  const handleDashboard = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BACKEND_URL}/api/dashboard/dashboard-summary/`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`, // include token
        },
      })

      const data = await response.json();

      if (response.ok) {
        setDashboardSummary(data)
      } else {
        throw new Error(`Failed to get dashboard summary: ${await response.text()}`);
      }

    }
    catch (error) {
      alert("Something went wrong");
      console.log(error);
    }
  }

  useEffect(() => {
    handleDashboard();
  }, []);

  const [orderBoxes, setOrderBoxes] = useState([
    { item: "", qty: 0 },
    { item: "", qty: 0 },
    { item: "", qty: 0 },
    { item: "", qty: 0 },
    { item: "", qty: 0 },
  ]);
  const menuPrices: { [key: string]: number } = {
    "Paneer Tikka": 180,
    "Dal Makhani": 150,
    "Butter Naan": 40,
    "Chole Bhature": 120,
  };

  // Calculate subtotal, SGST, CGST, and grand total
  const subtotal = orderBoxes.reduce((sum, box) => {
    if (!box.item) {
      return sum;
    }
    const matchedMenu = hotelMenus.find((menu) => menu.name === box.item);
    const price = matchedMenu?.price ? Number(matchedMenu.price) : 0;
    const quantity = box.qty || 0;
    return sum + price * quantity;
  }, 0);
  const sgst = subtotal * 0.025;
  const cgst = subtotal * 0.025;
  const grandTotal = subtotal + sgst + cgst;




  return (
    <div className="space-y-6 px-2 sm:px-4 md:px-8 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Restaurant Management
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base">
            Advanced restaurant operations & analytics
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <Button
            className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 w-full sm:w-auto"
            onClick={() => setShowAddTable(true)}
          >
            <Settings2 className="w-4 h-4 mr-2" />
            Add New Table
          </Button>
          <Button
            className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 w-full sm:w-auto"
            onClick={() => setActiveTab("booking")}
          >
            <Plus className="w-4 h-4 mr-2" />
            New Reservation
          </Button>
          <Button
            className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 w-full sm:w-auto"
            onClick={() => setShowAddMenu(true)}
          >
            <UtensilsCrossed className="w-4 h-4 mr-2" />
            Add Menu Item
          </Button>


        </div>
      </div>

      {/* Add Table Dialog */}
      <Dialog open={showAddTable} onOpenChange={setShowAddTable}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Table</DialogTitle>
          </DialogHeader>
          <form onSubmit={addTable} className="space-y-4">
            <div>
              <Label htmlFor="id">Table ID</Label>
              <Input
                id="id"
                value={newTable.id}
                onChange={(e) =>
                  setNewTable((t) => ({ ...t, id: e.target.value }))
                }
                required={!isVip}
                disabled={isVip}
                placeholder={isVip ? "VIP id auto" : "e.g. T11"}
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                id="vip"
                type="checkbox"
                checked={isVip}
                onChange={(e) => setIsVip(e.target.checked)}
              />
              <Label htmlFor="vip" className="cursor-pointer">
                VIP Table <span className="text-amber-500">★</span>
              </Label>
            </div>
            <div>
              <Label htmlFor="tableNo">Table No.</Label>
              <Input
                id="tableNo"
                type="number"
                value={newTable.tableNo}
                onChange={(e) =>
                  setNewTable((t) => ({
                    ...t,
                    tableNo: Number(e.target.value),
                  }))
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="capacity">Capacity</Label>
              <Input
                id="capacity"
                type="number"
                value={newTable.capacity}
                onChange={(e) =>
                  setNewTable((t) => ({
                    ...t,
                    capacity: Number(e.target.value),
                  }))
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <select
                id="status"
                className="w-full border rounded px-2 py-1"
                value={newTable.status}
                onChange={(e) =>
                  setNewTable((t) => ({
                    ...t,
                    status: e.target.value as Table["status"],
                  }))
                }
              >
                <option value="available">Available</option>
                <option value="occupied">Occupied</option>
                <option value="reserved">Reserved</option>
                <option value="cleaning">Cleaning</option>
              </select>
            </div>
            {/* <div>
              <Label htmlFor="hotel">Hotel</Label>
              <Input
                id="hotel"
                type="text"
                value={newTable.hotel}
                onChange={(e) =>
                  setNewTable((t) => ({
                    ...t,
                    hotel: String(e.target.value),
                  }))
                }
                required
                readOnly
              />
            </div> */}
            <DialogFooter>
              <Button type="submit">Add Table</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/*show add menu dialog*/}
      <Dialog open={showAddMenu} onOpenChange={setShowAddMenu}>
        <DialogContent className="max-w-full sm:max-w-lg overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add Menu Item</DialogTitle>
          </DialogHeader>

          <form onSubmit={addMenu} className="space-y-4">
            {/* 1. ID */}
            <div>
              <Label htmlFor="id">Item ID</Label>
              <Input
                id="id"
                value={newMenu.id}
                onChange={(e) => setNewMenu(m => ({ ...m, id: e.target.value }))}
                required
                placeholder="e.g. M101"
              />
            </div>

            {/* 2. Name */}
            <div>
              <Label htmlFor="name">Item Name</Label>
              <Input
                id="name"
                value={newMenu.name}
                onChange={(e) => setNewMenu(m => ({ ...m, name: e.target.value }))}
                required
                placeholder="e.g. Paneer Butter Masala"
              />
            </div>

            {/* 3. Price */}
            <div>
              <Label htmlFor="price">Price (₹)</Label>
              <Input
                id="price"
                type="number"
                value={newMenu.price}
                onChange={(e) => setNewMenu(m => ({ ...m, price: e.target.value }))}
                required
              />
            </div>

            {/* 4 & 5. Category and Availability */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category">Category</Label>
                <select
                  id="category"
                  className="w-full border rounded px-2 py-2"
                  value={newMenu.category}
                  onChange={(e) => setNewMenu(m => ({ ...m, category: e.target.value }))}
                  required
                >
                  <option value="" disabled>
                    Select an Option
                  </option>
                  {getMenuCategories.map((cat) => (
                    <option key={cat.slug} value={cat.slug}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <Label htmlFor="avail-toggle">Availability</Label>

                <div className="flex items-center space-x-3">
                  {/* NO */}
                  <span
                    className={`text-sm font-medium transition-colors duration-300 ${newMenu.is_available === 'true' ? 'text-gray-400' : 'text-red-600'
                      }`}
                  >
                    NO
                  </span>

                  {/* Toggle */}
                  <label className="relative inline-flex items-center cursor-pointer select-none">
                    <input
                      type="checkbox"
                      id="avail-toggle"
                      className="sr-only peer"
                      checked={newMenu.is_available === 'true'}
                      onChange={(e) =>
                        setNewMenu((m) => ({
                          ...m,
                          is_available: e.target.checked ? 'true' : 'false',
                        }))
                      }
                    />
                    <div
                      className={`w-11 h-6 bg-gray-300 rounded-full peer 
                    peer-checked:bg-blue-600 
                    transition-colors duration-300 ease-in-out
                    after:content-[''] after:absolute after:top-[2px] after:start-[2px] 
                    after:bg-white after:border after:border-gray-300 after:rounded-full 
                    after:h-5 after:w-5 
                    after:transition-transform after:duration-300 after:ease-in-out
                    peer-checked:after:translate-x-full 
                    peer-checked:after:border-white
                    shadow-inner`}
                    />
                  </label>

                  {/* YES */}
                  <span
                    className={`text-sm font-medium transition-colors duration-300 ${newMenu.is_available === 'true' ? 'text-green-600' : 'text-gray-400'
                      }`}
                  >
                    YES
                  </span>
                </div>
              </div>
            </div>

            {/* Image Upload */}

            <div className="space-y-2">
              <Label>Item Image</Label>

              {/* Responsive layout */}
              <div className="flex flex-wrap items-start gap-3">
                <Input
                  ref={fileInputRef} // 👈 added ref
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const imageUrl = URL.createObjectURL(file);
                      setNewMenu((m) => ({
                        ...m,
                        image: imageUrl, // preview ke liye URL
                        file: file,      // upload ke liye actual file
                      }));
                    }
                  }}

                />

                {/* Narrower button on mobile */}
                <label
                  htmlFor="image-upload"
                  className="flex-shrink-0 flex items-center justify-center border rounded-lg h-10 px-2 sm:px-4 cursor-pointer text-sm font-medium hover:bg-gray-50 w-28 sm:w-auto"
                >
                  <Image className="mr-2 h-4 w-4" />
                  Choose
                </label>

                {/* Image Preview */}
                {newMenu.image && (
                  <div className="relative flex-1 min-w-[150px] sm:min-w-[180px] sm:max-w-[50%]">
                    {/* 👆 Reduced max width from 70% → 50% on desktop */}

                    <div className="w-full h-[130px] sm:h-[120px] rounded-lg overflow-hidden border">
                      <img
                        src={newMenu.image}
                        alt="Item Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <button
                      type="button"
                      className="absolute -top-2 -right-2 h-6 w-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold border-2 border-white shadow-md z-10"
                      onClick={() => {
                        setNewMenu((m) => ({ ...m, image: null, file: null }));
                        if (fileInputRef.current) fileInputRef.current.value = ""; // 👈 proper reset
                      }}
                    >
                      <XCircle />
                    </button>
                  </div>
                )}
              </div>
            </div>


            {/* Description */}
            <div>
              <Label htmlFor="description">Description</Label>
              <textarea
                id="description"
                className="w-full border rounded px-2 py-1 min-h-[80px]"
                value={newMenu.description}
                onChange={(e) => setNewMenu(m => ({ ...m, description: e.target.value }))}
                placeholder="A short description of the menu item..."
              />
            </div>

            <DialogFooter>
              <Button type="submit">Add Item</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>


      {/* Reserve Table Dialog */}
      <Dialog
        open={!!reserveTable}
        onOpenChange={(open) => {
          if (!open) setReserveTable(null);
        }}
      >
        <DialogContent className="sm:max-w-md p-3">
          <DialogHeader>
            <DialogTitle>
              Make Reservation {reserveTable?.id && `for Id-${reserveTable.id.length}`}
            </DialogTitle>
          </DialogHeader>
          {/* Table Add form */}
          <form onSubmit={handleReserve} className="space-y-2 text-sm">
            <div>
              <Label htmlFor="reserveName">Guest Name</Label>
              <Input
                id="reserveName"
                value={reserveName}
                onChange={(e) => setReserveName(e.target.value)}
                required
                className="h-8 text-sm"
              />
            </div>
            <div>
              <Label htmlFor="reserveNumber">Phone Number</Label>
              <Input
                id="reserveNumber"
                value={reserveNumber}
                onChange={(e) => setReserveNumber(e.target.value)}
                required
                className="h-8 text-sm"
              />
            </div>

            {/* Order Items Section */}
            <Label className="text-base font-semibold">Order Items</Label>
            {[0, 1, 2, 3, 4].map((idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 mb-2"
              >
                {/* Dropdown for item */}
                <select
                  className="flex-1 border rounded px-1 py-1 text-xs"
                  value={orderBoxes[idx]?.item || ""}
                  onChange={(e) => {
                    const val = e.target.value;
                    setOrderBoxes((prev) => {
                      const copy = [...prev];
                      copy[idx] = {
                        ...copy[idx],
                        item: val,
                        qty: val && (!copy[idx].qty || copy[idx].qty === 0) ? 1 : copy[idx].qty // default 1 if selecting new item
                      };
                      return copy;
                    });
                  }}
                >
                  <option value="">Select Item</option>
                  {hotelMenus.map((item) => (
                    <option key={item} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </select>
                {/* Price Box */}
                <div className="w-20 text-center border rounded bg-gray-50 px-1 py-1 font-semibold text-gray-700 text-xs">
                  {(() => {
                    const selectedItem = hotelMenus.find(
                      (menu) => menu.name === orderBoxes[idx]?.item
                    );
                    if (!selectedItem) {
                      return "--";
                    }

                    const unitPrice = Number(selectedItem.price) || 0;
                    const quantity = orderBoxes[idx]?.qty || 0;
                    const totalPrice = unitPrice * quantity;

                    return quantity > 0
                      ? `₹${totalPrice.toFixed(2)}`
                      : `₹${unitPrice.toFixed(2)}`;
                  })()}
                </div>
                {/* + - counter */}
                <div className="flex items-center gap-1">
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      setOrderBoxes((prev) => {
                        const copy = [...prev];
                        copy[idx] = {
                          ...copy[idx],
                          qty: Math.max((copy[idx]?.qty || 1) - 1, 1),
                        };
                        return copy;
                      })
                    }
                    className="h-6 w-6 p-0"
                  >
                    -
                  </Button>
                  <span className="w-5 text-center">{orderBoxes[idx]?.qty || 0}</span>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      setOrderBoxes((prev) => {
                        const copy = [...prev];
                        copy[idx] = {
                          ...copy[idx],
                          qty: (copy[idx]?.qty || 1) + 1,
                        };
                        return copy;
                      })
                    }
                    className="h-6 w-6 p-0"
                  >
                    +
                  </Button>
                </div>
              </div>
            ))}

            {/* Remarks */}
            <Label htmlFor="reservecomments">Remarks</Label>
            <Textarea
              id="reservecomments"
              value={reserveComments}
              onChange={(e) => setReserveComments(e.target.value)}
              placeholder="Any special requests or notes"
              className="text-xs h-16"
            />

            {/* Total Quantity & Amount (single line) */}
            <div className="flex justify-between items-center font-semibold text-xs mt-1">
              <span>
                Total Quantity:{" "}
                {orderBoxes.reduce((sum, box) => sum + (box.qty || 0), 0)}
              </span>
              <span>
                Subtotal: ₹{subtotal}
              </span>
            </div>
            <div className="flex justify-between items-center font-semibold text-xs">
              <span>SGST (2.5%)</span>
              <span>₹{sgst.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center font-semibold text-xs">
              <span>CGST (2.5%)</span>
              <span>₹{cgst.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center font-semibold text-xs text-primary mt-1 border-t pt-1">
              <span>Grand Total (with GST)</span>
              <span>₹{grandTotal.toFixed(2)}</span>
            </div>

            <DialogFooter>
              <Button type="submit" className="h-8 text-xs px-3">Submit</Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setReserveTable(null)}
                className="h-8 text-xs px-3"
              >
                Cancel
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Enhanced Stats Dashboard */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {/* Card 1: Available Tables */}
        <Card className="cursor-pointer hover:shadow-lg transition-all hover:scale-105 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="p-2 bg-green-100 rounded-full">
                <Users className="w-5 h-5 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-green-700">
                {dashboardSummary?.available_tables}
              </p>
            </div>
            <div className="flex items-center justify-between text-sm">
              <p className="font-medium text-green-600">Available Tables</p>
              <p className="text-green-500">Ready to seat</p>
            </div>
          </CardContent>
        </Card>

        {/* Card 2: Active Orders */}
        <Card className="cursor-pointer hover:shadow-lg transition-all hover:scale-105 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="p-2 bg-primary/10 rounded-full">
                <Menu className="w-5 h-5 text-primary" />
              </div>
              <p className="text-2xl font-bold text-primary">
                {dashboardSummary?.active_orders}
              </p>
            </div>
            <div className="flex items-center justify-between text-sm">
              <p className="font-medium text-primary">Active Orders</p>
              <p className="text-primary/70">In kitchen queue</p>
            </div>
          </CardContent>
        </Card>

        {/* Card 3: Revenue */}
        <Card className="cursor-pointer hover:shadow-lg transition-all hover:scale-105 bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-200">
          <CardContent className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="p-2 bg-amber-100 rounded-full">
                <Users className="w-5 h-5 text-amber-600" />
              </div>
              <p className="text-2xl font-bold text-amber-700">${dashboardSummary?.todays_revenue}</p>
            </div>
            <div className="flex items-center justify-between text-sm">
              <p className="font-medium text-amber-600">Today's Revenue</p>
              <p className="text-amber-500">+12% from yesterday</p>
            </div>
          </CardContent>
        </Card>

        {/* Card 4: Avg Wait Time */}
        <Card className="cursor-pointer hover:shadow-lg transition-all hover:scale-105 bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
          <CardContent className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="p-2 bg-orange-100 rounded-full">
                <Clock className="w-5 h-5 text-orange-600" />
              </div>
              <p className="text-2xl font-bold text-orange-700">{dashboardSummary?.avg_wait_time}</p>
            </div>
            <div className="flex items-center justify-between text-sm">
              <p className="font-medium text-orange-600">Avg Wait Time</p>
              <p className="text-orange-500">Excellent service</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <Card className="bg-gradient-to-r from-primary to-accent text-primary-foreground">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-primary-foreground/80">Occupied Tables</p>
                <p className="text-2xl font-bold">{tableStats.occupied}</p>
              </div>
              <Users className="w-5 h-5 text-primary-foreground/80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-amber-400 to-orange-400 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80">Reserved Tables</p>
                <p className="text-2xl font-bold">{tableStats.reserved}</p>
              </div>
              <Clock className="w-5 h-5 text-white/80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-slate-400 to-slate-500 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80">Cleaning</p>
                <p className="text-2xl font-bold">{tableStats.cleaning}</p>
              </div>
              <Settings2 className="w-5 h-5 text-white/80" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Navigation Tabs */}
      <div className="flex flex-wrap space-x-0 space-y-2 sm:space-x-1 sm:space-y-0 bg-secondary/50 p-1.5 rounded-xl w-full sm:w-fit backdrop-blur-sm border">
        <Button
          variant={activeTab === "tables" ? "default" : "ghost"}
          className={
            activeTab === "tables"
              ? "bg-primary text-primary-foreground shadow-md"
              : "hover:bg-primary/10"
          }
          onClick={() => setActiveTab("tables")}
        >
          <Users className="w-4 h-4 mr-2" />
          Tables
        </Button>
        <Button
          variant={activeTab === "orders" ? "default" : "ghost"}
          className={
            activeTab === "orders"
              ? "bg-primary text-primary-foreground shadow-md"
              : "hover:bg-primary/10"
          }
          onClick={() => setActiveTab("orders")}
        >
          <Menu className="w-4 h-4 mr-2" />
          Orders
        </Button>
        <Button
          variant={activeTab === "pos" ? "default" : "ghost"}
          className={
            activeTab === "pos"
              ? "bg-primary text-primary-foreground shadow-md"
              : "hover:bg-primary/10"
          }
          onClick={() => setActiveTab("pos")}
        >
          <Settings2 className="w-4 h-4 mr-2" />
          POS System
        </Button>
        <Button
          variant={activeTab === "booking" ? "default" : "ghost"}
          className={
            activeTab === "booking"
              ? "bg-primary text-primary-foreground shadow-md"
              : "hover:bg-primary/10"
          }
          onClick={() => setActiveTab("booking")}
        >
          <Plus className="w-4 h-4 mr-2" />
          Reservations
        </Button>
      </div>

      {/* Content */}
      {activeTab === "tables" && (
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <CardTitle className="text-lg sm:text-xl">Restaurant Floor Plan</CardTitle>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
                <Button variant="outline" size="sm" className="w-full sm:w-auto">
                  <Settings2 className="w-4 h-4 mr-1" />
                  Edit Layout
                </Button>
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input placeholder="Search tables..." className="pl-9 w-full" />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Enhanced Visual Floor Plan */}
            <div className="relative bg-gradient-to-br from-secondary/20 to-primary/5 rounded-xl p-2 sm:p-6 h-72 sm:h-80 mb-6 overflow-hidden border">
              

              <div className="w-fit grid grid-cols-2 sm:grid-cols-4 gap-x-2 gap-y-4 mt-[-10px] justify-start ">
                {tables.map((table, i) => (
                  <div
                    key={table.id}
                    className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl border-2 flex flex-col items-center justify-center cursor-pointer transition-all hover:scale-110 hover:shadow-lg ${getStatusColor(
                      table.status
                    )}`}
                    onClick={() => setReserveTable(table)}
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


              {/* Enhanced Legend */}
              <div className="absolute bottom-4 right-4 bg-card p-4 rounded-lg border shadow-sm ">
                <p className="text-xs font-medium mb-2">Status Legend</p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-200 rounded border border-green-300"></div>
                    <span>Available</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-primary/20 rounded border border-primary/30"></div>
                    <span>Occupied</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-amber-100 rounded border border-amber-200"></div>
                    <span>Reserved</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-muted rounded border"></div>
                    <span>Cleaning</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Table Grid View */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {tables.map((table, i) => (
                <TableDetailsPopup
                  table={table}
                  trigger={
                    <div className="p-4 sm:p-6 border rounded-xl hover:shadow-lg transition-all cursor-pointer bg-gradient-to-br from-card to-card/50 hover:scale-105">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <h3 className="font-bold text-xl text-primary">
                            T0{i + 1}
                          </h3>
                          {table.id.includes("VIP") && (
                            <Badge className="bg-amber-100 text-amber-800 border-amber-200">
                              VIP
                            </Badge>
                          )}
                        </div>
                        <Badge
                          className={`${getStatusColor(
                            table.status
                          )} border font-medium`}
                        >
                          {table.status}
                        </Badge>
                      </div>
                      <div className="space-y-3">
                        <p className="text-sm text-muted-foreground">
                          Capacity:{" "}
                          <span className="font-semibold text-foreground">
                            {table.capacity} guests
                          </span>
                        </p>
                        {table.reservation && (
                          <p className="text-sm text-muted-foreground">
                            Reserved for:{" "}
                            <span className="font-semibold text-foreground">
                              {table.reservation}
                            </span>
                          </p>
                        )}
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          <span>Last updated: 2 min ago</span>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            setReserveTable(table);
                          }}
                        >
                          {table.status === "available"
                            ? "Quick Reserve"
                            : "View Details"}
                        </Button>
                        {table.status === "available" && (
                          <Button
                            size="sm"
                            className="flex-1 bg-primary hover:bg-primary/90"
                            onClick={(e) => e.stopPropagation()}
                          >
                            Take Order
                          </Button>
                        )}
                      </div>
                    </div>
                  }
                />
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === "orders" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-base sm:text-lg">
              <span>Active Orders</span>
              <Badge variant="outline">{orders.length} orders</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {orders.map((order) => (
                <OrderDetailsPopup
                  key={order.id}
                  order={order}
                  trigger={
                    <div className="p-3 sm:p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-4">
                            <div>
                              <h3 className="font-semibold">{order.id}</h3>
                              <p className="text-sm text-gray-600">
                                {order.table} • {order.time}
                              </p>
                            </div>
                            <div className="flex-1">
                              <p className="text-sm text-gray-600">
                                Items: {order.items.join(", ")}
                              </p>
                              <p className="text-sm font-medium text-green-600">
                                ${order.amount.toFixed(2)}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Badge className={getStatusColor(order.status)}>
                            {order.status}
                          </Badge>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={(e) => e.stopPropagation()}
                          >
                            Update Status
                          </Button>
                          <Button
                            size="sm"
                            onClick={(e) => e.stopPropagation()}
                          >
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  }
                />
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === "pos" && <RestaurantOrder />}
      {activeTab === "booking" && <TableBooking />}
    </div>
  );
};
