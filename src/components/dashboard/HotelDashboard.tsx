// import { useState } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Calendar, Plus, Search } from "lucide-react";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { getStatusColor } from "../hotel/utils";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
// } from "@/components/ui/dialog";
// import { Label } from "@/components/ui/label";
// import { HotelGrid } from "../hotel/HotelGrid";

// export const HotelDashboard = () => {
//   const [activeTab, setActiveTab] = useState("rooms");
//   const [showAddHotel, setShowAddHotel] = useState(false);
//   const [filterStatus, setFilterStatus] = useState("all");
//   const [searchTerm, setSearchTerm] = useState("");

  
//   const Hotel = [
//     {
//       id: "9bd272d4-482c-4ca1-b830-f3d1882a0c37",
//       name: "ocean-view-resort",
//       slug: "ocean-view-resort",
//       description: " this is desc",
//       address: "Student",
//       city: "lucknow",
//       state: "Uttar Pradesh",
//       country: "India",
//       pincode: 302045,
//       contact_number: "1234567890",
//       email: "ak@gmail.com",
//       logo: null,
//       cover_image: null,
//       created_at: "2025-10-11T06:17:41.439647Z",
//       updated_at: "2025-10-11T06:17:41.439729Z",
//       status: "active",
//     },
//     {
//       id: "b78c8aee-2344-485b-9ba7-ea1f7269168b",
//       name: "Taj-Mahal-Hotel",
//       slug: "taj-mahal-hotel",
//       description: " this is desc",
//       address: "lucknow",
//       city: "lucknow",
//       state: "Uttar Pradesh",
//       country: "India",
//       pincode: 302045,
//       contact_number: "1234567890",
//       email: "ak@gmail.com",
//       logo: null,
//       cover_image: null,
//       created_at: "2025-10-11T06:18:39.268847Z",
//       updated_at: "2025-10-11T06:18:39.268881Z",
//       status: "active",
//     },
//     {
//       id: "a2a7dd13-9881-4f74-8d9a-67caded55df4",
//       name: "Mumbai-Hotel",
//       slug: "mumbai-hotel",
//       description: " this is desc",
//       address: "mumbai",
//       city: "mumbai",
//       state: "mumbai",
//       country: "India",
//       pincode: 302045,
//       contact_number: "1234567890",
//       email: "kamal@gmail.com",
//       logo: null,
//       cover_image: null,
//       created_at: "2025-10-11T06:22:38.406240Z",
//       updated_at: "2025-10-11T06:22:38.406281Z",
//       status: "in-active",
//     },
//   ];

//   const accessToken = localStorage.getItem("accessToken");

//   const handleAddHotel = async (e) => {
//     e.preventDefault();

//     const formData = new FormData(e.target);
//     const data = Object.fromEntries(formData.entries());

//     try {
//       const response = await fetch(
//         `${import.meta.env.VITE_API_BACKEND_URL}/api/hotels`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${accessToken}`,
//           },
//           body: JSON.stringify(data),
//         }
//       );

//       if (!response.ok) throw new Error("Failed to add hotel");
//       const result = await response.json();

//       console.log("Hotel added:", result);
//       setShowAddHotel(false);
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   const filteredHotels = Hotel.filter((hotel) => {
//     const searchTermLower = searchTerm.toLowerCase();
//     const matchesSearch =
//       hotel.name.toLowerCase().includes(searchTermLower) ||
//       hotel.city.toLowerCase().includes(searchTermLower) ||
//       hotel.state.toLowerCase().includes(searchTermLower) ||
//       hotel.country.toLowerCase().includes(searchTermLower);

//     const matchesFilter =
//       filterStatus === "all" || hotel.status.toLowerCase() === filterStatus;

//     return matchesSearch && matchesFilter;
//   });

//   const dashboardData = {
//     total_hotels: Hotel.length,
//     active_hotels: Hotel.filter((htl) => htl.status == "active").length,
//     inactive_hotels: Hotel.filter((htl) => htl.status == "in-active").length,
//   };
//   return (
//     <div className="space-y-6 px-2 sm:px-4 md:px-8 max-w-[1400px] mx-auto">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//         <div>
//           <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
//             Hotel Dashboard
//           </h2>
//           <p className="text-gray-600 text-sm sm:text-base">
//             A quick overview of your hotel's status.
//           </p>
//         </div>
//         <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 ml-0 md:ml-auto">
//           <Button
//             className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 w-full sm:w-auto"
//             onClick={() => setShowAddHotel(true)}
//           >
//             <Plus className="w-4 h-4 mr-2" />
//             Add New Hotel
//           </Button>
//         </div>
//       </div>
//       {/* Add Room Dialog */}
//       {/* <Dialog open={showAddHotel} onOpenChange={setShowAddHotel}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Add New Hotel</DialogTitle>
//           </DialogHeader>
//           <form className="space-y-4">
//             <div>
//               <Label htmlFor="id">Room ID</Label>
//               <Input id="id" required />
//             </div>
//             <div>
//               <Label htmlFor="type">Type</Label>
//               <Input id="type" required />
//             </div>
//             <div>
//               <Label htmlFor="room_category">Category</Label>
//               <select
//                 id="room_category"
//                 required
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value="">-- Select Category --</option>
//                 <option value="Standard">Standard</option>
//                 <option value="Deluxe">Deluxe</option>
//                 <option value="Suite">Suite</option>
//               </select>
//             </div>
//             <div>
//               <Label htmlFor="price">Price</Label>
//               <Input id="price" type="number" required />
//             </div>
//             <div>
//               <Label htmlFor="floor">Floor</Label>
//               <Input id="floor" type="number" required />
//             </div>
//             <DialogFooter>
//               <Button type="submit">Add Hotel</Button>
//             </DialogFooter>
//           </form>
//         </DialogContent>
//       </Dialog> */}

//       <Dialog open={showAddHotel} onOpenChange={setShowAddHotel}>
//         <DialogContent className="max-w-[90vw] sm:max-w-[600px] max-h-[90vh] overflow-y-auto no-scrollbar">
//           <DialogHeader>
//             <DialogTitle>Add New Hotel</DialogTitle>
//           </DialogHeader>
//           <form className="grid gap-4 py-4" onSubmit={handleAddHotel}>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <div>
//                 <Label htmlFor="name">Hotel Name</Label>
//                 <Input id="name" name="name" required />
//               </div>
//               <div>
//               <Label htmlFor="status">Status</Label>
//               <select
//                 id="status"
//                 name="status"
//                 required
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value="">-- Select Status --</option>
//                 <option value="active">Active</option>
//                 <option value="in-active">Inactive</option>
//               </select>
//             </div>
//             </div>

//             <div>
//               <Label htmlFor="description">Description</Label>
//               <textarea
//                 id="description"
//                 name="description"
//                 required
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             <div>
//               <Label htmlFor="address">Address</Label>
//               <Input id="address" name="address" required />
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <div>
//                 <Label htmlFor="city">City</Label>
//                 <Input id="city" name="city" required />
//               </div>
//               <div>
//                 <Label htmlFor="state">State</Label>
//                 <Input id="state" name="state" required />
//               </div>
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <div>
//                 <Label htmlFor="country">Country</Label>
//                 <Input
//                   id="country"
//                   name="country"
//                   required
//                   defaultValue="India"
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="pincode">Pincode</Label>
//                 <Input id="pincode" name="pincode" type="number" required />
//               </div>
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <div>
//                 <Label htmlFor="contact_number">Contact Number</Label>
//                 <Input id="contact_number" name="contact_number" required />
//               </div>
//               <div>
//                 <Label htmlFor="email">Email</Label>
//                 <Input id="email" name="email" type="email" required />
//               </div>
//             </div>

            

//             <DialogFooter>
//               <Button type="submit">Add Hotel</Button>
//             </DialogFooter>
//           </form>
//         </DialogContent>
//       </Dialog>

//       {/* Quick Stats */}
//       <div className="mb-2 gap-3 grid grid-cols-1 md:grid-cols-3  ">
//         <Card>
//           <CardContent className="p-4">
//             <div className="flex items-center space-x-2 gap-4">
//               <div className="p-2 bg-green-100 rounded-lg">
//                 <Calendar className="w-4 h-4 text-green-600" />
//               </div>
//               <div>
//                 <p className="text-sm text-gray-600">Total Hotels</p>

//                 <p className="text-xl font-bold text-green-600">
//                   {dashboardData.total_hotels}{" "}
//                 </p>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardContent className="p-4">
//             <div className="flex items-center space-x-2 gap-4">
//               <div className="p-2 bg-green-100 rounded-lg">
//                 <Calendar className="w-4 h-4 text-green-600" />
//               </div>
//               <div>
//                 <p className="text-sm text-gray-600">Active</p>

//                 <p className="text-xl font-bold text-green-600">
//                   {dashboardData.active_hotels}{" "}
//                 </p>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardContent className="p-4">
//             <div className="flex items-center space-x-2 gap-4">
//               <div className="p-2 bg-yellow-100 rounded-lg">
//                 <Calendar className="w-4 h-4 text-yellow-600" />
//               </div>
//               <div>
//                 <p className="text-sm text-gray-600">In-Active</p>
//                 <p className="text-xl font-bold text-yellow-600">
//                   {dashboardData.inactive_hotels}{" "}
//                 </p>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       <Card>
//         <CardHeader>
//           <div
//             className="flex flex-col md:flex-row md:items-center                                 
//       md:justify-between gap-4"
//           >
//             <CardTitle className="text-lg sm:text-xl">
//               Hotel Status Overview
//             </CardTitle>
//             <div
//               className="flex flex-col sm:flex-row items-stretch                                 
//       sm:items-center gap-2 sm:gap-2"
//             >
//               <Select value={filterStatus} onValueChange={setFilterStatus}>
//                 <SelectTrigger className="w-full sm:w-40">
//                   <SelectValue placeholder="All Hotels" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="all">All Hotels</SelectItem>
//                   <SelectItem value="active">Active</SelectItem>
//                   <SelectItem value="in-active">In-Active</SelectItem>
//                 </SelectContent>
//               </Select>
//               <div className="relative w-full sm:w-64">
//                 <Search className="absolute left-3 top-3 h-4 w-4 text-gray-40 " />
//                 <Input
//                   placeholder="Search Hotels..."
//                   className="pl-9 w-full"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//               </div>
//             </div>
//           </div>
//         </CardHeader>
//         <CardContent>
//           <HotelGrid
//             hotels={filteredHotels}
//             filter={() => {}}
//             onStatusChange={() => {}}
//             getStatusColor={getStatusColor}
//             onDelete={() => {}}
//             onEdit={() => {}}
//           />
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default HotelDashboard;


import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getStatusColor } from "../hotel/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { HotelGrid } from "../hotel/HotelGrid";

export const HotelDashboard = () => {
  const [hotels, setHotels] = useState([]); // API data
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddHotel, setShowAddHotel] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const accessToken = localStorage.getItem("accessToken");

  // ✅ Fetch hotels from API
  const fetchHotels = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BACKEND_URL}/api/hotels`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch hotels");

      const data = await response.json();
      setHotels(data); // ✅ Same structure as your static array
    } catch (err) {
      console.error("Error fetching hotels:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch on mount
  useEffect(() => {
    fetchHotels();
  }, []);

  // ✅ Add new hotel
  const handleAddHotel = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BACKEND_URL}/api/hotels/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) throw new Error("Failed to add hotel");

      await response.json();

      setShowAddHotel(false);
      fetchHotels(); // ✅ Refresh list after adding
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // ✅ Search & filter
  const filteredHotels = hotels.filter((hotel) => {
    const searchTermLower = searchTerm.toLowerCase();
    const matchesSearch =
      hotel.name.toLowerCase().includes(searchTermLower) ||
      hotel.city.toLowerCase().includes(searchTermLower) ||
      hotel.state.toLowerCase().includes(searchTermLower) ||
      hotel.country.toLowerCase().includes(searchTermLower);

    const matchesFilter =
      filterStatus === "all" || hotel.status.toLowerCase() === filterStatus;

    return matchesSearch && matchesFilter;
  });

  const dashboardData = {
    total_hotels: hotels.length,
    active_hotels: hotels.filter((h) => h.status === "available").length,
    inactive_hotels: hotels.filter((h) => h.status === "closed").length,
  };

  return (
    <div className="space-y-6 px-2 sm:px-4 md:px-8 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Hotel Dashboard
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            A quick overview of your hotel's status.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 ml-0 md:ml-auto">
          <Button
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 w-full sm:w-auto"
            onClick={() => setShowAddHotel(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Hotel
          </Button>
        </div>
      </div>

      {/* Add Hotel Dialog */}
      <Dialog open={showAddHotel} onOpenChange={setShowAddHotel}>
        <DialogContent className="max-w-[90vw] sm:max-w-[600px] max-h-[90vh] overflow-y-auto no-scrollbar">
          <DialogHeader>
            <DialogTitle>Add New Hotel</DialogTitle>
          </DialogHeader>
          <form className="grid gap-4 py-4" onSubmit={handleAddHotel}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Hotel Name</Label>
                <Input id="name" name="name" required />
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <select
                  id="status"
                  name="status"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">-- Select Status --</option>
                  <option value="available">Active</option>
                  <option value="closed">Inactive</option>
                </select>
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <textarea
                id="description"
                name="description"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <Label htmlFor="address">Address</Label>
              <Input id="address" name="address" required />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="city">City</Label>
                <Input id="city" name="city" required />
              </div>
              <div>
                <Label htmlFor="state">State</Label>
                <Input id="state" name="state" required />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  name="country"
                  required
                  defaultValue="India"
                />
              </div>
              <div>
                <Label htmlFor="pincode">Pincode</Label>
                <Input id="pincode" name="pincode" type="number" required />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="contact_number">Contact Number</Label>
                <Input id="contact_number" name="contact_number" required />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" required />
              </div>
            </div>

            <DialogFooter>
              <Button type="submit">Add Hotel</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Quick Stats */}
      <div className="mb-2 gap-3 grid grid-cols-1 md:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <Calendar className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Hotels</p>
                <p className="text-xl font-bold text-green-600">
                  {dashboardData.total_hotels}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <Calendar className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Active</p>
                <p className="text-xl font-bold text-green-600">
                  {dashboardData.active_hotels}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Calendar className="w-4 h-4 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">In-Active</p>
                <p className="text-xl font-bold text-yellow-600">
                  {dashboardData.inactive_hotels}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Hotel Grid */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <CardTitle className="text-lg sm:text-xl">
              Hotel Status Overview
            </CardTitle>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-2">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="All Hotels" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Hotels</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="in-active">In-Active</SelectItem>
                </SelectContent>
              </Select>
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-40" />
                <Input
                  placeholder="Search Hotels..."
                  className="pl-9 w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {loading ? (
            <p className="text-center text-gray-500 py-6">Loading hotels...</p>
          ) : error ? (
            <p className="text-center text-red-500 py-6">{error}</p>
          ) : (
            <HotelGrid
              hotels={filteredHotels}
              getStatusColor={getStatusColor}
              onDelete={() => {}}
              onEdit={() => {}}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default HotelDashboard;
