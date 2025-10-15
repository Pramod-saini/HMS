
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";

interface Booking {
  id: string;
  booking_code: string;
  guest: string;
  room: string;
  checkIn: string;
  checkOut: string;
  status: string;
  amount: number;
  adults: number;
  children: number;
  slug: string;
}

interface BookingsListProps {
  bookings: Booking[];
  onCheckIn: (bookingId: string) => void;
  onCheckOut: (bookingId: string) => void;
  getStatusColor: (status: string) => string;
}

export const BookingsList = ({ bookings, onCheckIn, onCheckOut, getStatusColor }: BookingsListProps) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const handleAction = (action: string, bookingId: string) => {
    console.log(`Action: ${action}, Booking ID: ${bookingId}`);
    // Yahan pe aap real action ka code daal sakte ho
  };

  return (
    <div className="space-y-4">
      {bookings.map((booking) => (
        <div key={booking.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow relative">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-4">
                <div>
                  <h3 className="font-semibold">{booking.guest}</h3>
                  <p className="text-sm text-gray-600">Booking ID: {booking.booking_code}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Room: <span className="font-medium">{booking.room}</span></p>
                  <p className="text-sm text-gray-600">{booking.checkIn} to {booking.checkOut}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Guests: {booking.adults} Adults, {booking.children} Children</p>
                  <p className="text-sm font-medium text-green-600">${booking.amount}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3 relative">
              <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
              {booking.status === "confirmed" && (
                <Button size="sm" onClick={() => onCheckIn(booking.slug)}>Check In</Button>
              )}
              {booking.status === "checked_in" && (
                <Button size="sm" variant="outline" onClick={() => onCheckOut(booking.slug)}>Check Out</Button>
              )}

              <div
                className="relative"
                onMouseEnter={() => setHoveredId(booking.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <Button variant="outline" size="sm">
                  <Eye className="w-3 h-3 mr-1" />
                  Details
                </Button>

                {hoveredId === booking.id && (
                  <div className="absolute right-0 mt-1 w-36 bg-white border rounded-md shadow-lg z-50">
                    <button
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                      onClick={() => handleAction("confirm", booking.id)}
                    >
                      ✅ Confirm
                    </button>
                    <button
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                      onClick={() => handleAction("cancel", booking.id)}
                    >
                      ❌ Cancel
                    </button>
                    <button
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                      onClick={() => handleAction("do", booking.id)}
                    >
                      ➕ pending
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
