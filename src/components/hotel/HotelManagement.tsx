  import { useEffect, useState } from "react";
  import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
  import { Button } from "@/components/ui/button";
  import { Plus, Search } from "lucide-react";
  import { Input } from "@/components/ui/input";
  import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
  import { RoomBooking } from "./RoomBooking";
  import { RoomStats } from "./RoomStats";
  import { RoomGrid } from "./RoomGrid";
  import { BookingsList } from "./BookingsList";
  import { getStatusColor, filterRooms } from "./utils";
  import AddnewRoom from "./AddnewRoom";
  import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
  import { Label } from "@/components/ui/label";
  import { json } from "stream/consumers";
  import { set } from "date-fns";

  export const HotelManagement = () => {
    const [activeTab, setActiveTab] = useState("rooms");

    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");

    // const [rooms, setRooms] = useState([
    //   { id: "R101", type: "Standard", status: "Available", price: 120, guest: null, floor: 1 },
    //   { id: "R102", type: "Deluxe", status: "Occupied", price: 180, guest: "John Smith", floor: 1 },
    //   { id: "R103", type: "Suite", status: "Maintenance", price: 300, guest: null, floor: 1 },
    //   { id: "R201", type: "Standard", status: "Available", price: 120, guest: null, floor: 2 },
    //   { id: "R202", type: "Premium", status: "Occupied", price: 220, guest: "Sarah Johnson", floor: 2 },
    //   { id: "R203", type: "Deluxe", status: "Reserved", price: 180, guest: "Mike Wilson", floor: 2 },
    // ]);
    const [rooms, setRooms] = useState([]);

    const [bookings, setBookings] = useState([]);

    const [showAddRoom, setShowAddRoom] = useState(false);
    const [showEditRoom, setShowEditRoom] = useState(false);
    const[Roomcategories,setRoomcategories]=useState([]);
    const [editingSlug, setEditingSlug] = useState("");
    const [newRoom, setNewRoom] = useState({
      id: "",
      type: "",
      status: "available",
      room_category: "",
      price: "",
      guest: "",
      floor: "",
      hotel: "taj-mahal-hotel",
    });
    // const [editRoom, setEditRoom] = useState({
    //   id: "",
    //   type: "",
    //   status: "available",
    //   room_category: "",
    //   price: "",
    //   guest: "",
    //   floor: "",
    //   hotel: "taj-mahal-hotel",
    // });
    const[dashboardData,setDashboardData]=useState({});

    const accessToken = localStorage.getItem("accessToken");


    const filteredRooms = filterRooms(rooms, searchTerm, filterStatus);

    const filter = async(v,slug) =>{
      let status = {status: v.toLowerCase()};
      console.log("Filtering rooms with status:", v,slug);
      setFilterStatus(v);
      setRooms(prev => prev.map(room =>
        room.slug === slug ? { ...room, status: v } : room
      ));
      try{
      const response = await fetch(`${import.meta.env.VITE_API_BACKEND_URL}/api/rooms/${slug}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`, // include token
        },
        body: JSON.stringify(status),

      });
      const data = await response.json();
      console.log(data);
    }
    catch(error){
      console.error("Error in filtering rooms:", error);
      return;
    }

    }

    const handleDashboardClick = async() => {
      const response = await fetch(`${import.meta.env.VITE_API_BACKEND_URL}/api/rooms/dashboard-summary/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`, // include token
        } 
      });
      const data = await response.json();
      console.log(data);
      setDashboardData(data);
      // Handle response or errors as needed
      // You can also update state with the fetched data if needed
      return response;
      // return response;
    }

    const handleGetRoomcategories = async () => {
      const accessToken = localStorage.getItem("accessToken");
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BACKEND_URL}/api/room-categories/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`, // include token
          },
        }); 
        const data = await response.json();
        if (!response.ok) {
          console.error("Error fetching room categories:", response.status);
          return;
        }
        setRoomcategories(data);
      } catch (error) {
        console.error("Error in fetching room categories:", error);
      }
    };

    const handleGetRooms = async () => {
      const accessToken = localStorage.getItem("accessToken");
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BACKEND_URL}/api/rooms/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`, // include token
          },
        });
        const data = await response.json();
        console.log("Fetched rooms:", data);
        if (!response.ok) {
          console.error("Error fetching rooms:", response.status);
          return;
        }
        setRooms(data);
      } catch (error) {
        console.error("Error in fetching rooms:", error);
      }
    };


    const handleRoomStatusChange = (roomId: string, newStatus: string) => {
      setRooms(prev => prev.map(room =>
        room.id === roomId ? { ...room, status: newStatus } : room
      ));
    };

    const handleCreateBooking = async (bookingData: any) => {
      setBookings(prev => [...prev, bookingData]);

      const response = await fetch(`${import.meta.env.VITE_API_BACKEND_URL}/api/bookings/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`, // include token
        },
      });
      setActiveTab("bookings");
    };

    const handleGetBookings = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BACKEND_URL}/api/bookings/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`, // include token
          },
        });
        const data = await response.json();
        setBookings(data);
        if (!response.ok) {
          console.error("Error fetching bookings:", response.status);
          return;
        }
      } catch (error) {
        console.error("Error in fetching bookings:", error);
      }
    };


    useEffect(() => {
      // Pehli baar function call
      handleGetBookings();
      handleGetRooms();
      handleGetRoomcategories();
      handleDashboardClick();


      // Set interval to call every 6 seconds
      const intervalId = setInterval(() => {
        handleGetBookings();
        handleGetRooms();
        handleGetRoomcategories();
      
        handleDashboardClick();

      }, 30000);

      // Cleanup function to clear interval jab component unmount ho
      return () => clearInterval(intervalId);
    }, []);


    const handleCheckIn = (bookingId: string) => {
      setBookings(prev => prev.map(booking =>
        booking.id === bookingId ? { ...booking, status: "Active" } : booking
      ));
      console.log(`Checking in booking ${bookingId}`);
    };

    const handleCheckOut = (bookingId: string) => {
      setBookings(prev => prev.map(booking =>
        booking.id === bookingId ? { ...booking, status: "Completed" } : booking
      ));
      console.log(`Checking out booking ${bookingId}`);
    };

    // Add room
    const handleAddRoom = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        // Prepare the new room data
        const roomData = {
          ...newRoom,
          price: Number(newRoom.price) || 0,
          floor: Number(newRoom.floor) || 0,
          guest: newRoom.guest || null,
          hotel: newRoom.hotel || " ",
        };

        console.log("Adding room with data:", roomData);

        // Send POST request
        const response = await fetch(`${import.meta.env.VITE_API_BACKEND_URL}/api/rooms/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`, // include token
          },
          body: JSON.stringify(roomData),
        });

        // Parse response
        const data = await response.json();

        if (!response.ok) {
          console.error("Error posting room:", response.status);
          // alert(data.detail || "Failed to add room");
          return;
        }
        else {
          alert("Room added successfully");
        }

        // If successful, update local state
        setRooms((prev) => [...prev, data]);
        setShowAddRoom(false);

        // Reset form
        setNewRoom({
          id: "",
          type: "",
          status: "available",
          room_category: "",
          price: "",
          guest: "",
          floor: "",
          hotel: "",
        });
        // console.log(response)
      } catch (error) {
        console.error("Error in adding room:", error);
        alert("Something went wrong while adding room");
      }
    };
  // ✅ Edit room
  const handleEditRoom = async (e) => {
    e.preventDefault();
    try {
      const roomData = {
        ...newRoom,
        price: Number(newRoom.price) || 0,
        floor: Number(newRoom.floor) || 0,
        guest: newRoom.guest || null,
      };

      const response = await fetch(`${import.meta.env.VITE_API_BACKEND_URL}/api/rooms/${editingSlug}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(roomData),
      });

      const data = await response.json();
      if (!response.ok) {
        console.error("Error updating room:", data);
        return;
      }

      alert("Room updated successfully");

      // ✅ Update local state
      setRooms((prev) =>
        prev.map((room) => (room.slug === editingSlug ? { ...room, ...data } : room))
      );

      setShowEditRoom(false);
      resetForm();
    } catch (error) {
      console.error("Error updating room:", error);
    }
  };

      const resetForm = () => {
    setNewRoom({
      id: "",
      type: "",
      status: "available",
      room_category: "",
      price: "",
      guest: "",
      floor: "",
      hotel: "taj-mahal-hotel",
    });
  };

    const deleteRoom = async (slug: string) => {
    try {
      // Send GET request
      const response = await fetch(
        `${import.meta.env.VITE_API_BACKEND_URL}/api/rooms/${slug}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`, // include token
          },
        }
      );

      
      if (!response.ok) {
        const data = await response.json();
        console.error("Error deleting room: ", data);
       return;
      } 
      // console.log('Room deleted Successfully')
      setRooms((prev) => prev.filter((room) => room.id !== slug));    
    console.log("Room deleted successfully"); 
    } catch (error) {
      console.error("Error delete room:", error);
    }
  };

  // ✅ Handle Edit click (pre-fills form)
  const handleEdit = (room) => {
    setNewRoom({
      id: room.room_number || room.id,
      type: room.room_category,
      status: room.status,
      room_category: room.room_category,
      price: room.price_per_night,
      guest: room.guest || "",
      floor: room.floor,
      hotel: room.hotel,
    });
    setEditingSlug(room.slug);
    setShowEditRoom(true);
  };

    return (
      <div className="space-y-6 px-2 sm:px-4 md:px-8 max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Hotel Management</h2>
            <p className="text-gray-600 text-sm sm:text-base">Manage rooms, bookings, and occupancy</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 ml-0 md:ml-auto">
            <Button
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 w-full sm:w-auto"
              onClick={() => setShowAddRoom(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add NewRoom
            </Button>
            <Button
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 w-full sm:w-auto"
              onClick={() => setActiveTab("booking")}
            >
              <Plus className="w-4 h-4 mr-2" />
              New Booking
            </Button>
          </div>
        </div>

        {/* Add Room Dialog */}
        <Dialog open={showAddRoom} onOpenChange={setShowAddRoom}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Room</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddRoom} className="space-y-4">
              <div>
                <Label htmlFor="id">Room ID</Label>
                <Input
                  id="id"
                  value={newRoom.id}
                  onChange={e => setNewRoom(r => ({ ...r, id: e.target.value }))}
                  required
                />
              </div>
              <div>
                <Label htmlFor="type">Type</Label>
                <Input
                  id="type"
                  value={newRoom.type}
                  onChange={e => setNewRoom(r => ({ ...r, type: e.target.value }))}
                  required
                />
              </div>
              <div>
                <Label htmlFor="room_category">Category</Label>
                <select
                  id="room_category"
                  value={newRoom.room_category}
                  onChange={e => setNewRoom(r => ({ ...r, room_category: e.target.value }))}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">-- Select Category --</option>
                  {Roomcategories.map((category:any) => (
                    <option key={category.id} value={category.name}>{category.name}</option>
                  ))}
              
                </select>
              </div>

              <div>
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  type="number"
                  value={newRoom.price}
                  onChange={e => setNewRoom(r => ({ ...r, price: e.target.value }))}
                  required
                />
              </div>
              <div>
                <Label htmlFor="floor">Floor</Label>
                <Input
                  id="floor"
                  type="number"
                  value={newRoom.floor}
                  onChange={e => setNewRoom(r => ({ ...r, floor: e.target.value }))}
                  required
                />
              </div>
              <div>
                <Label htmlFor="floor">Hotel</Label>
                <Input
                  id="hotel"
                  type="text"
                  value={newRoom.hotel}
                  onChange={e => setNewRoom(r => ({ ...r, hotel: e.target.value }))}
                  required
                  readOnly
                />
              </div>
              <DialogFooter>
                <Button type="submit">Add Room</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

      {/* edit Room Dialog */}

      <Dialog open={showEditRoom} onOpenChange={setShowEditRoom}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Room</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEditRoom} className="space-y-4">
            <div>
              <Label htmlFor="id">Room ID</Label>
              <Input
                id="id"
                value={newRoom.id}
                onChange={e => setNewRoom(r => ({ ...r, id: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="type">Type</Label>
              <Input
                id="type"
                value={newRoom.type}
                onChange={e => setNewRoom(r => ({ ...r, type: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="room_category">Category</Label>
              <select
                id="room_category"
                value={newRoom.room_category}
                onChange={e => setNewRoom(r => ({ ...r, room_category: e.target.value }))}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">-- Select Category --</option>
                {Roomcategories.map((category:any) => (
                  <option key={category.id} value={category.name}>{category.name}</option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                type="number"
                value={newRoom.price}
                onChange={e => setNewRoom(r => ({ ...r, price: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="floor">Floor</Label>
              <Input
                id="floor"
                type="number"
                value={newRoom.floor}
                onChange={e => setNewRoom(r => ({ ...r, floor: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="hotel">Hotel</Label>
              <Input
                id="hotel"
                type="text"
                value={newRoom.hotel}
                onChange={e => setNewRoom(r => ({ ...r, hotel: e.target.value }))}
                required
                readOnly
              />
            </div>
            <DialogFooter>
              <Button type="submit">Update Room</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

        {/* Quick Stats */}
        <div className="mb-2">
          <RoomStats rooms={rooms} onFilterChange={setFilterStatus} dashboardData={dashboardData} />
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 bg-gray-100 p-1 rounded-lg w-full sm:w-fit">
          <Button
            variant={activeTab === "rooms" ? "default" : "ghost"}
            className={activeTab === "rooms" ? "bg-gray-300 shadow-sm" : ""}
            onClick={() => setActiveTab("rooms")}
          >
            Room Status
          </Button>
          <Button
            variant={activeTab === "bookings" ? "default" : "ghost"}
            className={activeTab === "bookings" ? "bg-gray-300 shadow-sm" : ""}
            onClick={() => setActiveTab("bookings")}
          >
            Bookings
          </Button>
          <Button
            variant={activeTab === "booking" ? "default" : "ghost"}
            className={activeTab === "booking" ? "bg-gray-300 shadow-sm" : ""}
            onClick={() => setActiveTab("booking")}
          >
            New Booking
          </Button>
        </div>

        {/* Content */}
        {activeTab === "rooms" && (
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <CardTitle className="text-lg sm:text-xl">Room Status Overview</CardTitle>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-2">
                  <Select  value={filterStatus} onValueChange={(value) => {
                    setFilterStatus(value)
                  }}>
                    <SelectTrigger className="w-full sm:w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Rooms</SelectItem>
                      <SelectItem value="available">Available</SelectItem>
                      <SelectItem value="occupied">Occupied</SelectItem>
                      <SelectItem value="reserved">Reserved</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search rooms..."
                      className="pl-9 w-full"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <RoomGrid
               rooms={filteredRooms}
              filter={filter}
              onStatusChange={handleRoomStatusChange}
              getStatusColor={getStatusColor}
              onDelete={deleteRoom}
              onEdit={handleEdit}
              />
            </CardContent>
          </Card>
        )}

        {activeTab === "bookings" && (
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <CardTitle className="text-lg sm:text-xl">Recent Bookings</CardTitle>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-2">
                  <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input placeholder="Search bookings..." className="pl-9 w-full" />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <BookingsList
                bookings={bookings}
                onCheckIn={handleCheckIn}
                onCheckOut={handleCheckOut}
                getStatusColor={getStatusColor}

              />
            </CardContent>
          </Card>
        )}

        {activeTab === "booking" && <RoomBooking />}
      </div>
    );
  };
