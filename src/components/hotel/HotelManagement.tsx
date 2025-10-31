import { useEffect, useState, useRef } from "react";
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
  const [showNextForm, setShowNextForm] = useState(false);
  const [showEditRoom, setShowEditRoom] = useState(false);
  const [Roomcategories, setRoomcategories] = useState([]);
  const [editingSlug, setEditingSlug] = useState("");
  const [step, setStep] = useState(1); // 1 = first step, 2 = second step
  const [newRoom, setNewRoom] = useState({
    id: "",
    type: "",
    room_code: "",
    status: "available",
    room_category: "",
    bed_type: "",
    room_size: "",
    description: "",
    view: "",
    image: [],
    price: "",
    amenities: "",
    guest: "",
    floor: "",
    hotel: "ocean-view-resort",
    slug: "",
  });
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleRemoveImage = (indexToRemove) => {
    setNewRoom(prev => {
      const updatedImages = prev.image.filter((_, i) => i !== indexToRemove);

      // Agar sari images hat rahi hain, input bhi reset karo
      if (updatedImages.length === 0 && fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      return { ...prev, image: updatedImages };
    });
  };



  useEffect(() => {
    return () => {
      newRoom.image.forEach(file => URL.revokeObjectURL(file));
    };
  }, [newRoom.image, handleRemoveImage]);

  const amenitiesOptions = ["Wi-Fi", "AC", "Parking", "Swimming Pool"];
  const bedType = ["King", "Queen", "Twin"];
  const view = ["Sea View", "City View", "Garden View"];

  // const handleAmenityChange = (amenity) => {
  //   setNewRoom((prev) => {
  //     const isSelected = prev.amenities.includes(amenity);

  //     return {
  //       ...prev,
  //       amenities: isSelected
  //         ? prev.amenities.filter(a => a !== amenity) // uncheck
  //         : [...prev.amenities, amenity], // check
  //     };
  //   });
  // };


  const handleAmenityChange = (amenity) => {
  setNewRoom((prev) => {
    // Convert string -> array for easier manipulation
    const amenityList = prev.amenities
      ? prev.amenities.split(",").map(a => a.trim()).filter(a => a)
      : [];

    const isSelected = amenityList.includes(amenity);

    const updatedList = isSelected
      ? amenityList.filter(a => a !== amenity) // uncheck
      : [...amenityList, amenity]; // check

    // Convert back to comma-separated string
    const updatedString = updatedList.join(", ");

    return {
      ...prev,
      amenities: updatedString,
    };
  });
};



  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files); // FileList → Array
    console.log(selectedFiles);
    setNewRoom(prev => ({
      ...prev,
      image: [...prev.image, ...selectedFiles]
    }));
  };

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
  const [dashboardData, setDashboardData] = useState({});
  const accessToken = localStorage.getItem("accessToken");


  const filteredRooms = filterRooms(rooms, searchTerm, filterStatus);

  const filter = async (v, slug) => {
    let status = { status: v.toLowerCase() };
    console.log("Filtering rooms with status:", v, slug);
    setRooms(prev => prev.map(room =>
      room.slug === slug ? { ...room, status: v } : room
    ));
    try {
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
    catch (error) {
      console.error("Error in filtering rooms:", error);
      return;
    }

  }

  const handleDashboardClick = async () => {
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

  // const handleCreateBooking = async (bookingData: any) => {
  //   setBookings(prev => [...prev, bookingData]);

  //   const response = await fetch(`${import.meta.env.VITE_API_BACKEND_URL}/api/bookings/`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Authorization": `Bearer ${accessToken}`, // include token
  //     },
  //   });
  //   setActiveTab("bookings");
  // };

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
    const intervalId = setTimeout(() => {
      handleGetBookings();
      handleGetRooms();
      handleGetRoomcategories();

      handleDashboardClick();

    }, 30000);

    // Cleanup function to clear interval jab component unmount ho
    return () => clearInterval(intervalId);
  }, []);


  const handleCheckIn = async (bookingId: string) => {
    const status = { status: "checked_in" };

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BACKEND_URL}/api/bookings/${bookingId}/check-in/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`, // include token
        },
        body: JSON.stringify(status),

      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        setBookings(prev => prev.map(booking =>
          booking.id === bookingId ? { ...booking, status: "Active" } : booking
        ));
      }
      return;
    }
    catch (error) {
      console.error("Error in checking in booking:", error);
      return;
    }
  };

  const handleCheckOut = async (bookingId: string) => {
    const status = { status: "checked_out" };


    try {
      const response = await fetch(`${import.meta.env.VITE_API_BACKEND_URL}/api/bookings/${bookingId}/check-out/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`, // include token
        },
        body: JSON.stringify(status),
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        setBookings(prev => prev.map(booking =>
          booking.id === bookingId ? { ...booking, status: "Completed" } : booking
        ));
      }
    }

    catch (error) {
      console.error("Error in checking out booking:", error);
      return;
    }
    console.log(`Checking out booking ${bookingId}`);
  };

  // Add room
  const handleAddRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    // try {

// const formData = new FormData();

// formData.append("bed_type", newRoom?.bed_type);
// formData.append("room_category", newRoom?.room_category?.toLowerCase()?.trim()?.replace(/\s+/g, "-"));
// formData.append("hotel_slug", newRoom?.hotel);
// formData.append("room_size", newRoom?.room_size);
// formData.append("view", newRoom?.view);
// formData.append("room_code", newRoom?.room_code);
// formData.append("floor", newRoom?.floor);
// formData.append("price_per_night", newRoom?.price);
// formData.append("description", newRoom?.description);

// // Agar amenities ek array hai, to usko string me convert kar do
// formData.append("amenities",newRoom?.amenities);

// // Agar multiple images bhejni hain
// if (Array.isArray(newRoom?.image)) {
//   newRoom.image.forEach((img) => {
//     formData.append("media_files", img); // backend me 'media' ek array hoga
//   });
// } else if (newRoom?.image) {
//   formData.append("media", newRoom.image); // single image
// }

// // Request bhejna
// const response = await fetch(`${import.meta.env.VITE_API_BACKEND_URL}/api/rooms/`, {
//   method: "POST",
//   headers: {
//     "Authorization": `Bearer ${accessToken}`, // sirf token header me bhejna
//   },
//   body: formData,
// });

//       // Parse response
//       const data = await response.json();

//       if (!response.ok) {
//         console.error("Error posting room:", response.status);
//         // alert(data.detail || "Failed to add room");
//         return;
//       }
//       else {
//         alert("Room added successfully");
//         setStep(1);
//       }

//       // If successful, update local state
//       setRooms((prev) => [...prev, data]);
//       setShowAddRoom(false);

//       // Reset form
//       setNewRoom({
//         id: "",
//         type: "",
//         status: "available",
//         room_category: "",
//         price: "",
//         guest: "",
//         amenities: "",
//         floor: "",
//         hotel: "ocean-view-resort",
//         image:[],
//         bed_type: "",
//         room_size: "",
//         description: "",
//         view: "",
//         room_code: "",
//         slug: "",

//       });
//       // console.log(response)
//     } catch (error) {
//       console.error("Error in adding room:", error);
//       alert("Something went wrong while adding room");
//     }
  };
  // ✅ Edit room
  const handleEditRoom = async (e: React.FormEvent<HTMLFormElement>, slug: string, hotel: string) => {
    e.preventDefault();
      console.log("Adding Room:", newRoom);

    try {
         if(!slug || !newRoom?.hotel){
        console.log("No hotel slug provided for editing room", slug, newRoom?.hotel);
        return;
      }
const formData = new FormData();

formData.append("bed_type", newRoom?.bed_type);
formData.append("room_category", newRoom?.room_category?.toLowerCase()?.trim()?.replace(/\s+/g, "-"));
formData.append("hotel_slug", newRoom?.hotel);
formData.append("room_size", newRoom?.room_size);
formData.append("view", newRoom?.view);
formData.append("room_code", newRoom?.room_code);
formData.append("floor", newRoom?.floor);
formData.append("price_per_night", newRoom?.price);
formData.append("description", newRoom?.description);

// Agar amenities ek array hai, to usko string me convert kar do
formData.append("amenities",newRoom?.amenities);

// Agar multiple images bhejni hain
if (Array.isArray(newRoom?.image)) {
  newRoom.image.forEach((img) => {
    formData.append("media_files", img); // backend me 'media' ek array hoga
  });
} else if (newRoom?.image) {
  formData.append("media", newRoom.image); // single image
}
 
      const response = await fetch(`${import.meta.env.VITE_API_BACKEND_URL}/api/rooms/${slug}/`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
         body: formData,
      });

      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        console.error("Error updating room:", data);
        return;
      }
        else{
        alert("Room updated successfully");
         setShowEditRoom(false);
        }



     
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
      room_code: "",
      price: "",
      guest: "",
      amenities: "",
      image: [],
      floor: "",
      hotel: "ocean-view-resort",
      bed_type: "",
      room_size: "",
      description: "",
      view: "",
      slug: "",
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
      room_code: room.room_code || "",
      room_category: room.room_category,
      price: room.price_per_night,
      guest: room.guest || "",
      floor: room.floor,
      amenities: room.amenities,
      image: newRoom.image,
      hotel:  newRoom.hotel || "",
      bed_type: room.bed_type || "",
      room_size: room.room_size || "",
      description: room.description || "",
      view: room.view || "",
      slug: room.slug || "",
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

          <form className="space-y-4" onSubmit={handleAddRoom}>
            {/* Step 1 */}
            {step === 1 && (
              <>
                <div>
                  <Label htmlFor="id">Room Code</Label>
                  <Input
                    id="id"
                    value={newRoom.room_code}
                    onChange={e => setNewRoom(r => ({ ...r, room_code: e.target.value }))}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <textarea
                    id="description"
                    value={newRoom.description}
                    onChange={e => setNewRoom(r => ({ ...r, description: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <Label htmlFor="amenities">Amenities</Label>
                  <div id="amenities" className="flex flex-row gap-6 flex-wrap">
                    {amenitiesOptions.map((amenity) => (
                      <label key={amenity} className="flex items-center gap-2 ml-2">
                        <input
                          type="checkbox"
                          value={amenity}
                          checked={newRoom.amenities.includes(amenity)}
                          onChange={() => handleAmenityChange(amenity)}
                        />
                        {amenity}
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="image">Image</Label>
                  <Input
                    id="image"
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*,video/*"
                    onChange={handleImageChange}
                    required
                  />
                </div>

                <div style={{ display: 'flex', gap: '10px', marginTop: '10px', flexWrap: 'wrap' }}>
                  {newRoom.image.map((file, index) => {
                    const objectUrl = URL.createObjectURL(file);
                    return (
                      <div key={index} style={{ position: 'relative', width: '100px', height: '100px' }}>
                        <img
                          src={objectUrl}
                          alt={`preview ${index}`}
                          style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '5px' }}
                        />
                        <span
                          onClick={() => handleRemoveImage(index)}
                          style={{
                            position: 'absolute',
                            top: '2px',
                            right: '2px',
                            background: 'rgba(0,0,0,0.5)',
                            color: 'white',
                            borderRadius: '50%',
                            width: '20px',
                            height: '20px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            cursor: 'pointer',
                            fontWeight: 'bold'
                          }}
                        >
                          ×
                        </span>
                      </div>
                    );
                  })}
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
                    {Roomcategories?.length > 0 && Roomcategories.map((category: any) => {
                      const name = category?.name?.toLowerCase() || "";
                      const formattedName = name
                        .split(" ")
                        .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(" ");
                      return (
                        <option key={category.id} value={category.slug}>
                          {formattedName}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <>
                <div>
                  <Label htmlFor="bed_type">Bed Type</Label>
                  <select
                    id="bed_type"
                    value={newRoom.bed_type}
                    onChange={e => setNewRoom(r => ({ ...r, bed_type: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">-- Select Bed Type --</option>
                    {bedType.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label htmlFor="view">View</Label>
                  <select
                    id="view"
                    value={newRoom.view}
                    onChange={e => setNewRoom(r => ({ ...r, view: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">-- Select View --</option>
                    {view.map((v) => (
                      <option key={v} value={v}>
                        {v}
                      </option>
                    ))}
                  </select>
                </div>


                <div>
                  <Label htmlFor="room_size">Room Size</Label>
                  <Input
                    id="room_size"
                    value={newRoom.room_size}
                    onChange={e => setNewRoom(r => ({ ...r, room_size: e.target.value }))}
                  />
                </div>

                <div>
                  <Label htmlFor="guests">Guests</Label>
                  <Input
                    id="guests"
                    type="text"
                    value={newRoom.guest}
                    onChange={e => setNewRoom(r => ({ ...r, guest: e.target.value }))}
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
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    type="text"
                    value={newRoom.price}
                    onChange={e => setNewRoom(r => ({ ...r, price: e.target.value }))}
                    required
                  />
                </div>
              </>
            )}

            {/* Buttons */}
            <div className="flex justify-between mt-4">
              {step > 1 && (
                <Button type="button" onClick={() => setStep(step - 1)}>
                  Previous
                </Button>
              )}

              {step < 2 ? (
                <Button type="button" onClick={() => setStep(step + 1)} className="ml-auto">
                  Next
                </Button>
              ) : (
                <Button type="submit">Submit</Button>
              )}
            </div>
          </form>
        </DialogContent>
      </Dialog>





      {/* edit Room Dialog */}

      {/* <Dialog open={showEditRoom} onOpenChange={setShowEditRoom}>
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
                {Roomcategories.map((category: any) => (
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
      </Dialog> */}





      <Dialog open={showEditRoom} onOpenChange={setShowEditRoom}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Update Room</DialogTitle>
    </DialogHeader>

    <form className="space-y-4" onSubmit={(e)=>{handleEditRoom(e, newRoom?.slug, newRoom?.hotel)}}>
      {/* Step 1 */}
      {step === 1 && (
        <>
          <div>
            <Label htmlFor="id">Room Code</Label>
            <Input
              id="id"
              value={newRoom.room_code}
              onChange={e => setNewRoom(r => ({ ...r, room_code: e.target.value }))}
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <textarea
              id="description"
              value={newRoom.description}
              onChange={e => setNewRoom(r => ({ ...r, description: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <Label htmlFor="amenities">Amenities</Label>
            <div id="amenities" className="flex flex-row gap-6 flex-wrap">
              {amenitiesOptions.map((amenity) => (
                <label key={amenity} className="flex items-center gap-2 ml-2">
                  <input
                    type="checkbox"
                    value={amenity}
                    checked={newRoom.amenities.includes(amenity)}
                    onChange={() => handleAmenityChange(amenity)}
                  />
                  {amenity}
                </label>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="image">Image</Label>
            <Input
              id="image"
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*,video/*"
              onChange={handleImageChange}
            />
          </div>

          <div style={{ display: 'flex', gap: '10px', marginTop: '10px', flexWrap: 'wrap' }}>
            {newRoom.image.map((file, index) => {
              const objectUrl =
                file instanceof File ? URL.createObjectURL(file) : file; // handle existing URLs
              return (
                <div key={index} style={{ position: 'relative', width: '100px', height: '100px' }}>
                  <img
                    src={objectUrl}
                    alt={`preview ${index}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: '5px'
                    }}
                  />
                  <span
                    onClick={() => handleRemoveImage(index)}
                    style={{
                      position: 'absolute',
                      top: '2px',
                      right: '2px',
                      background: 'rgba(0,0,0,0.5)',
                      color: 'white',
                      borderRadius: '50%',
                      width: '20px',
                      height: '20px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      cursor: 'pointer',
                      fontWeight: 'bold'
                    }}
                  >
                    ×
                  </span>
                </div>
              );
            })}
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
              {Roomcategories?.map((category: any) => {
                const name = category?.name?.toLowerCase() || '';
                const formattedName = name
                  .split(' ')
                  .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(' ');
                return (
                  <option key={category.id} value={category.slug}>
                    {formattedName}
                  </option>
                );
              })}
            </select>
          </div>
        </>
      )}

      {/* Step 2 */}
      {step === 2 && (
        <>
          <div>
            <Label htmlFor="bed_type">Bed Type</Label>
            <select
              id="bed_type"
              value={newRoom.bed_type}
              onChange={e => setNewRoom(r => ({ ...r, bed_type: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-- Select Bed Type --</option>
              {bedType.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Label htmlFor="view">View</Label>
            <select
              id="view"
              value={newRoom.view}
              onChange={e => setNewRoom(r => ({ ...r, view: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-- Select View --</option>
              {view.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Label htmlFor="room_size">Room Size</Label>
            <Input
              id="room_size"
              value={newRoom.room_size}
              onChange={e => setNewRoom(r => ({ ...r, room_size: e.target.value }))}
            />
          </div>

          <div>
            <Label htmlFor="guests">Guests</Label>
            <Input
              id="guests"
              type="text"
              value={newRoom.guest}
              onChange={e => setNewRoom(r => ({ ...r, guest: e.target.value }))}
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
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              type="text"
              value={newRoom.price}
              onChange={e => setNewRoom(r => ({ ...r, price: e.target.value }))}
              required
            />
          </div>
        </>
      )}

      {/* Buttons */}
      <div className="flex justify-between mt-4">
        {step > 1 && (
          <Button type="button" onClick={() => setStep(step - 1)}>
            Previous
          </Button>
        )}

        {step < 2 ? (
          <Button type="button" onClick={() => setStep(step + 1)} className="ml-auto">
            Next
          </Button>
        ) : (
          <Button type="submit">Update Room</Button>
        )}
      </div>
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
                <Select value={filterStatus} onValueChange={(value) => {
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

      {activeTab === "booking" && <RoomBooking category={Roomcategories} />}
    </div>
  );
};
