import { useState } from "react";
import { cn } from "@/lib/utils";
import FlightSearch from "@/components/search/FlightSearch";    
import HotelSearch from "@/components/search/HotelSearch";
import HomestaySearch from "@/components/search/HomestaySearch";
import HolidayPackageSearch from "@/components/search/HolidayPackageSearch";
import TrainSearch from "@/components/search/TrainSearch";
import BusSearch from "@/components/search/BusSearch";
import CabSearch from "@/components/search/CabSearch";
import RestaurantSearch from "@/components/search/RestaurantSearch";

const SearchBox = () => {
  const [activeTab, setActiveTab] = useState("Hotels");

  const tabs = [
    "Hotels","Restaurants","Flights",  "Homestays", "Holiday Packages", 
    "Trains", "Buses", "Cabs", 
  ];

  return (
    <div className="w-full max-w-7xl mx-auto bg-white rounded-2xl shadow-2xl p-6 animate-fade-in">
      {/* Tabs */}
      <div className="flex justify-center overflow-x-auto border-b  border-gray-200 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "flex-shrink-0 px-4 py-3 text-sm font-medium border-b-2 transition-all duration-200 hover:bg-gray-50",
              activeTab === tab
                ? "border-[hsl(var(--makemytrip-blue))] text-[hsl(var(--makemytrip-blue))] bg-[hsl(var(--makemytrip-blue-light))]"
                : "border-transparent text-gray-600 hover:text-gray-900"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="space-y-6">
        {activeTab === "Hotels" && <HotelSearch />}
         {activeTab === "Restaurants" && <RestaurantSearch />}
        {activeTab === "Flights" && <FlightSearch />}
        {activeTab === "Homestays" && <HomestaySearch />}
        {activeTab === "Holiday Packages" && <HolidayPackageSearch />}
        {activeTab === "Trains" && <TrainSearch />}
        {activeTab === "Buses" && <BusSearch />}
        {activeTab === "Cabs" && <CabSearch />}
       
      </div>
    </div>
  );
};

export default SearchBox;