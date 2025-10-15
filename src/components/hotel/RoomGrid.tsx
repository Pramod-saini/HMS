import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

interface Room {
  room_number: string;
  id: string;
  room_category: string;
  status: string;
  price_per_night: number;
  guest: string | null;
  floor: number;
  slug: string;
}

interface RoomCategory {
  name: string;
  price_per_night: number;
}

interface RoomGridProps {
  rooms: Room[];
  filter: (value: string, slug: string) => void;
  onStatusChange: (roomId: string, newStatus: string) => void;
  getStatusColor: (status: string) => string;
  onDelete: (slug: string) => void;
  onEdit: (room: Room) => void;
}

export const RoomGrid = ({
  rooms,
  onStatusChange,
  getStatusColor,
  filter,
  onDelete,
  onEdit,
}: RoomGridProps) => {
  const [Roomcategories, setRoomcategories] = useState<RoomCategory[]>([]);

  const handleGetRoomcategories = async () => {
    const accessToken = localStorage.getItem("accessToken");
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BACKEND_URL}/api/room-categories/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      if (response.ok) setRoomcategories(data);
    } catch (error) {
      console.error("Error in fetching room categories:", error);
    }
  };

  useEffect(() => {
    handleGetRoomcategories();
  }, [rooms]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {rooms.map((room) => {
        const matchedCategory = Roomcategories.find((cat) => cat.name === room.room_category);

        return (
          <div key={room.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-lg">{room.room_number}</h3>
              <Badge className={getStatusColor(room.status)}>
                {room.status}
              </Badge>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                Type: <span className="font-medium">{matchedCategory?.name || room.room_category}</span>
              </p>

              <p className="text-sm text-gray-600">
                Floor: <span className="font-medium">{room.floor}</span>
              </p>

              <p className="text-sm text-gray-600">
                Price: <span className="font-medium text-green-600">₹{matchedCategory?.price_per_night ?? "N/A"}/night</span>
              </p>

              {room.guest && (
                <p className="text-sm text-gray-600">
                  Guest: <span className="font-medium">{room.guest}</span>
                </p>
              )}
            </div>

            <div className="mt-3 pt-3 border-t flex space-x-2">
              <Button
                variant="outline"
                className="flex items-center justify-center w-9 h-9 hover:-translate-y-1 bg-blue-100 hover:bg-blue-300 rounded-lg"
                onClick={() => onEdit(room)}
              >
                <Pencil className="w-4 h-4" />
              </Button>

              <Button
                variant="outline"
                className="flex items-center justify-center w-9 h-9 hover:-translate-y-1 bg-red-100 hover:bg-red-300 rounded-lg"
                onClick={() => onDelete(room.slug)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>

              <Select
                onValueChange={(value) => {
                  onStatusChange(room.id, value);
                  filter(value, room.slug);
                }}
              >
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Change Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Available">Available</SelectItem>
                  <SelectItem value="Occupied">Occupied</SelectItem>
                  <SelectItem value="Reserved">Reserved</SelectItem>
                  <SelectItem value="Maintenance">Maintenance</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );
      })}
    </div>
  );
};
