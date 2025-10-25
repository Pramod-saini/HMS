import React from "react";

const destinations = [
  { name: "Delhi", img: "/delhi.jpg", accommodations: "2,004 accommodations" },
  {
    name: "Mussoorie",
    img: "/Mussoorie.jpg",
    accommodations: "2,224 accommodations",
  },
  {
    name: "Udaipur",
    img: "/Udaipur.jpg",
    accommodations: "2,007 accommodations",
  },
  {
    name: "Ranikhet",
    img: "/Ranikhet3.jpg",
    accommodations: "2,000 accommodations",
  },
  {
    name: "Munnar",
    img: "/Munnar2.jpg",
    accommodations: "1,200 accommodations",
  },
  {
    name: "Ladakh",
    img: "/ladhak...jpg",
    accommodations: "500 accommodations",
  },
  { name: "Goa", img: "/goa...jpg", accommodations: "1,550 accommodations" },
  { name: "Auli", img: "/Auli9.jpg", accommodations: "1,800 accommodations" },
  {
    name: "Gulmarg",
    img: "/Gulmarg8.jpg",
    accommodations: "2,500 accommodations",
  },
  {
    name: "Darjeeling",
    img: "/Darjeeling7.jpg",
    accommodations: "2,300 accommodations",
  },
];

export const HeroStats = () => {
  return (
    <section className="w-full py-8 md:py-16  ">
      <div className="max-w-7xl mx-auto px-4">
        {/* Title */}
        <h3 className="text-3xl md:text-4xl font-bold text-center mb-2 text-gray-900">
          Top Hotel & Restro in India
        </h3>

        {/* Divider */}
        <div className="flex justify-center mb-10">
          <div className="w-32 border-t-2 border-gray-400 relative flex items-center justify-center">
            <span className="absolute left-0 -top-2 w-3 h-3 bg-black rounded-full"></span>
            <span className="absolute right-0 -top-2 w-3 h-3 bg-black rounded-full"></span>
            <span className="absolute left-1/2 -translate-x-1/2 -top-3 text-2xl text-gray-400 select-none">
              ✧
            </span>
          </div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-10 gap-4">
          {destinations.map((dest) => (
            <div
              key={dest.name}
              className="flex flex-col items-center cursor-pointer group transition-transform duration-200 hover:scale-105"
            >
              <div className="w-24 h-24 rounded-full overflow-hidden shadow-lg mb-2 border-4 border-white transition-all duration-200 group-hover:border-blue-400 group-hover:shadow-xl">
                <img
                  src={dest.img}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-200"
                />
              </div>
              <h4 className="text-sm font-semibold text-gray-900 text-center truncate w-full group-hover:text-blue-600 transition-colors duration-200">
                {dest.name}
              </h4>
              <p className="text-gray-500 text-xs text-center truncate w-full group-hover:text-blue-400 transition-colors duration-200">
                {dest.accommodations}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
