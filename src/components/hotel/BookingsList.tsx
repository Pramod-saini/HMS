
import { useState } from "react";
import { Button } from "@/components/ui/button";
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

export const BookingsList = ({
  bookings,
  onCheckIn,
  onCheckOut,
  getStatusColor,
}: BookingsListProps) => {
  const [dropdownOpenId, setDropdownOpenId] = useState<string | null>(null);
  const accessToken = localStorage.getItem("accessToken");

  const handleAction = async (
    bookingSlug: string,
    status: string,
    booking: Booking
  ) => {
    const updateObj = { ...booking, status };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BACKEND_URL}/api/bookings/${bookingSlug}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(updateObj),
        }
      );

      // Agar server error aaya
      if (!response.ok) {
        // Try to read error text (could be HTML)
        const text = await response.text();
        console.error("Server returned error:", response.status, text);
        throw new Error(`Failed to update booking: ${response.status}`);
      }

      // Parse JSON safely
      const data = await response.json();
      console.log("Update success:", data);
    } catch (error) {
      console.error("handleAction error:", error);
    }
  };


  return (
    <div className="space-y-4">
      {bookings.map((booking) => (
        <div
          key={booking.id}
          className="p-4 border rounded-lg hover:shadow-md transition-shadow relative"
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-4">
                <div>
                  <h3 className="font-semibold">{booking.guest}</h3>
                  <p className="text-sm text-gray-600">
                    Booking ID: {booking.booking_code}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">
                    Room:{" "}
                    <span className="font-medium">{booking.room}</span>
                  </p>
                  <p className="text-sm text-gray-600">
                    {booking.checkIn} to {booking.checkOut}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">
                    Guests: {booking.adults} Adults, {booking.children} Children
                  </p>
                  <p className="text-sm font-medium text-green-600">
                    ${booking.amount}
                  </p>
                </div>
              </div>
            </div>

            {/* Right side controls */}
            <div className="flex items-center space-x-3 relative">

              {/* Status dropdown (styled like badge) */}
              <div className="relative">
                {/* <button
                  onClick={() =>
                    setDropdownOpenId(
                      dropdownOpenId === booking.id ? null : booking.id
                    )
                  }
                  className={`text-xs font-medium px-2.5 py-0.5 rounded-full bg-white text-black hover:bg-orange-600 hover:text-white w-24 text-center capitalize border ${getStatusColor(
                    booking.status
                  )}`}
                >
                  {booking.status}
                </button> */}


                <button
                  onClick={() =>
                    setDropdownOpenId(
                      dropdownOpenId === booking.id ? null : booking.id
                    )
                  }
                  className={`text-xs font-medium px-2.5 py-0.5 rounded-full bg-white text-black hover:bg-orange-600 hover:text-white w-24 text-center capitalize border ${getStatusColor(
                    booking.status
                  )}`}
                >
                  {booking.status === "confirmed"
                    ? "Confirmed"
                    : booking.status === "checked_in"
                      ? "Checked In"
                    : booking.status === "checked_out"
                      ? "Completed"
                      : "Pending"}
                </button>


                {dropdownOpenId === booking.id && (
                  <div className="absolute top-full left-0 mt-1 w-full bg-white border rounded-md shadow-lg z-50">
                    <button
                      className="block w-full text-center text-xs px-2.5 py-0.5 hover:bg-orange-600 hover:text-white"
                      onClick={() => handleAction(booking?.slug, "checked_in", booking)}
                    >
                      Confirm
                    </button>
                    <button
                      className="block w-full text-center text-xs px-2.5 py-0.5 hover:bg-orange-600 hover:text-white"
                      onClick={() => handleAction(booking?.slug, "cancel", booking)}
                    >
                      Cancel
                    </button>
                    <button
                      className="block w-full text-center text-xs px-2.5 py-0.5 hover:bg-orange-600 hover:text-white"
                      onClick={() => handleAction(booking?.slug, "pending", booking)}
                    >
                      Pending
                    </button>
                  </div>
                )}
              </div>

              {/* Check In / Out buttons */}
              {booking.status === "confirmed" && (
                <Button size="sm" onClick={() => onCheckIn(booking.slug)}>
                  Check In
                </Button>
              )}
              {booking.status === "checked_in" && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onCheckOut(booking.slug)}
                >
                  Check Out
                </Button>
              )}

              {/* Eye icon */}
              <Button variant="outline" size="sm">
                <Eye className="w-3 h-3 mr-1" />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
