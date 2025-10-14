import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, MapPin, Users } from "lucide-react";

const HolidayPackageSearch = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* From City */}
        <div className="lg:col-span-1">
          <label className="block text-xs font-medium text-gray-600 mb-1">FROM</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Select>
              <SelectTrigger className="pl-10 h-12 border-gray-200">
                <SelectValue placeholder="Delhi" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="del">Delhi</SelectItem>
                <SelectItem value="bom">Mumbai</SelectItem>
                <SelectItem value="blr">Bangalore</SelectItem>
                <SelectItem value="ccu">Kolkata</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* To Destination */}
        <div className="lg:col-span-1">
          <label className="block text-xs font-medium text-gray-600 mb-1">TO</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Goa, Thailand, Europe"
              className="pl-10 h-12 border-gray-200"
            />
          </div>
        </div>

        {/* Departure Date */}
        <div className="lg:col-span-1">
          <label className="block text-xs font-medium text-gray-600 mb-1">DEPARTURE</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full h-12 justify-start text-left font-normal border-gray-200"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                Select date
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                initialFocus
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Travellers */}
        <div className="lg:col-span-1">
          <label className="block text-xs font-medium text-gray-600 mb-1">TRAVELLERS</label>
          <Select>
            <SelectTrigger className="h-12 border-gray-200">
              <div className="flex items-center">
                <Users className="mr-2 h-4 w-4 text-gray-400" />
                <SelectValue placeholder="2 Adults" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 Adult</SelectItem>
              <SelectItem value="2">2 Adults</SelectItem>
              <SelectItem value="2-1">2 Adults, 1 Child</SelectItem>
              <SelectItem value="4">4 Adults</SelectItem>
              <SelectItem value="4-2">4 Adults, 2 Children</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Search Button */}
        <div className="lg:col-span-1 flex items-end">
          <Button 
            className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white font-semibold text-base rounded-lg transition-all duration-200 hover:scale-105"
          >
            SEARCH
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HolidayPackageSearch;