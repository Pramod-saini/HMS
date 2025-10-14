
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
}

interface BookingsListProps {
  bookings: Booking[];
  onCheckIn: (bookingId: string) => void;
  onCheckOut: (bookingId: string) => void;
  getStatusColor: (status: string) => string;
}

export const BookingsList = ({ bookings, onCheckIn, onCheckOut, getStatusColor }: BookingsListProps) => {
  console.log("Rendering BookingsList with bookings:", bookings);
  return (
    <div className="space-y-4">
      {bookings.map((booking) => (
        <div key={booking.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
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
            <div className="flex items-center space-x-3">
              <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
              {booking.status === "confirmed" && (
                <Button size="sm" onClick={() => onCheckIn(booking.id)}>Check In</Button>
              )}
              {booking.status === "active" && (
                <Button size="sm" variant="outline" onClick={() => onCheckOut(booking.id)}>Check Out</Button>
              )}
              <Button variant="outline" size="sm">
                <Eye className="w-3 h-3 mr-1" />
                Details
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
