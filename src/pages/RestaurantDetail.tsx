import { useParams, Link } from "react-router-dom";
import { ArrowLeft, MapPin, Star, Clock, Phone, Mail, Award, Users, Utensils, Wine, Calendar, Camera, Share2, Heart, ChefHat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const RestaurantDetail = () => {
  const { id } = useParams();

  // Enhanced restaurant data with much more detail
  const restaurant = {
    id: 1,
    name: "La Bella Vista",
    description: "Experience authentic Italian cuisine with breathtaking panoramic city views from the 45th floor. Our master chefs use only the finest imported ingredients from Italy, creating traditional dishes with a modern twist that celebrates the rich culinary heritage of Italy.",
    longDescription: "Nestled high above the bustling city, La Bella Vista offers an unparalleled dining experience that combines authentic Italian flavors with stunning panoramic views. Our restaurant features floor-to-ceiling windows that showcase the city's skyline, creating the perfect ambiance for romantic dinners and special celebrations. Our executive chef, Marco Antonelli, brings over 20 years of experience from renowned restaurants in Rome and Milan, ensuring each dish tells a story of Italian tradition and innovation.",
    images: [
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1528712306091-ed0763094c98?w=800&h=600&fit=crop"
    ],
    rating: 4.9,
    reviewCount: 312,
    location: "Downtown, Sky Tower, 45th Floor",
    cuisine: "Italian Fine Dining",
    priceRange: "$$$",
    averageCost: "$85 per person",
    dresscode: "Smart Casual to Formal",
    hours: {
      "Monday - Thursday": "5:00 PM - 10:00 PM",
      "Friday - Saturday": "5:00 PM - 11:00 PM",
      "Sunday": "4:00 PM - 9:00 PM",
      "Lunch (Weekends)": "12:00 PM - 3:00 PM",
    },
    menu: [
      { 
        category: "Antipasti", 
        description: "Traditional Italian starters to awaken your palate",
        items: [
          { name: "Burrata Caprese", description: "Fresh burrata with heirloom tomatoes, basil, aged balsamic", price: "$18" },
          { name: "Antipasto della Casa", description: "Chef's selection of Italian meats, cheeses, and marinated vegetables", price: "$24" },
          { name: "Crudo di Tonno", description: "Yellowfin tuna crudo with Sicilian capers and lemon", price: "$22" },
          { name: "Vitello Tonnato", description: "Sliced veal with tuna sauce and fried capers", price: "$20" }
        ]
      },
      { 
        category: "Primi Piatti", 
        description: "House-made pasta and risotto prepared to perfection",
        items: [
          { name: "Spaghetti Carbonara", description: "Traditional Roman carbonara with guanciale and pecorino", price: "$28" },
          { name: "Risotto ai Porcini", description: "Arborio rice with wild porcini mushrooms and truffle oil", price: "$32" },
          { name: "Lasagna della Nonna", description: "Traditional meat lasagna with bechamel and San Marzano tomatoes", price: "$26" },
          { name: "Gnocchi Gorgonzola", description: "Handmade potato gnocchi in gorgonzola cream sauce", price: "$24" }
        ]
      },
      { 
        category: "Secondi Piatti", 
        description: "Main courses featuring the finest meats and seafood",
        items: [
          { name: "Osso Buco alla Milanese", description: "Braised veal shank with saffron risotto", price: "$42" },
          { name: "Branzino al Sale", description: "Mediterranean sea bass baked in sea salt crust", price: "$38" },
          { name: "Costoletta alla Milanese", description: "Breaded veal chop with arugula and cherry tomatoes", price: "$45" },
          { name: "Salmone Grigliato", description: "Grilled Atlantic salmon with Mediterranean herbs", price: "$34" }
        ]
      },
      { 
        category: "Dolci", 
        description: "Traditional Italian desserts made in-house daily",
        items: [
          { name: "Tiramisu Classico", description: "Traditional tiramisu with ladyfingers and mascarpone", price: "$12" },
          { name: "Panna Cotta ai Frutti", description: "Vanilla panna cotta with seasonal berry compote", price: "$10" },
          { name: "Cannoli Siciliani", description: "Crispy shells filled with sweet ricotta and chocolate chips", price: "$11" },
          { name: "Gelato Selection", description: "Three scoops of house-made Italian gelato", price: "$9" }
        ]
      },
    ],
    contact: {
      phone: "+1 (555) 987-6543",
      email: "reservations@labellavista.com",
      website: "www.labellavista.com",
      address: "45th Floor, Sky Tower, 123 Downtown Plaza, City Center",
    },
    features: ["Panoramic City Views", "Wine Cellar", "Private Dining Rooms", "Outdoor Terrace", "Valet Parking", "Live Piano Music"],
    specialties: ["Handmade Pasta", "Wood-Fired Pizza", "Aged Steaks", "Extensive Wine List", "Homemade Gelato"],
    awards: [
      "Michelin Guide Recommended 2023",
      "Wine Spectator Award of Excellence",
      "Best Italian Restaurant - City Magazine",
      "OpenTable Diners' Choice 2023",
      "AAA Four Diamond Award"
    ],
    chefSpecials: [
      { name: "Truffle Tasting Menu", description: "5-course tasting menu featuring seasonal truffles", price: "$125 per person" },
      { name: "Wine Pairing Dinner", description: "7-course meal with expertly paired Italian wines", price: "$150 per person" }
    ],
    wineCollection: {
      totalBottles: "Over 500 bottles",
      regions: ["Tuscany", "Piedmont", "Veneto", "Sicily", "Champagne", "Bordeaux"],
      features: ["Temperature-controlled cellar", "Sommelier recommendations", "Wine tasting events"]
    },
    events: [
      "Wine Tasting Fridays",
      "Cooking Classes",
      "Private Dining Events",
      "Corporate Functions",
      "Wedding Celebrations"
    ],
    guestReviews: [
      {
        name: "Alexandra M.",
        rating: 5,
        date: "2 days ago",
        comment: "Absolutely phenomenal dining experience! The osso buco was perfection and the city views are breathtaking. Service was impeccable throughout the evening.",
        verified: true
      },
      {
        name: "Robert K.",
        rating: 5,
        date: "1 week ago", 
        comment: "Celebrated our anniversary here and it exceeded all expectations. The truffle risotto was divine and the wine selection is outstanding. Will definitely return!",
        verified: true
      },
      {
        name: "Maria S.",
        rating: 4,
        date: "2 weeks ago",
        comment: "Beautiful restaurant with authentic Italian flavors. The tiramisu was the best I've had outside of Italy. Reservations are definitely needed!",
        verified: true
      }
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/home">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Restaurants
                </Link>
              </Button>
              <h1 className="text-2xl font-bold text-primary">HospitalityHub</h1>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Heart className="h-4 w-4 mr-2" />
                Save
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Restaurant Images Gallery */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-8">
          <div className="lg:col-span-2">
            <div className="aspect-video bg-muted rounded-lg overflow-hidden relative group">
              <img
                src={restaurant.images[0]}
                alt={restaurant.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
              <div className="absolute bottom-4 left-4">
                <Badge className="bg-black/70 text-white">
                  <Camera className="h-3 w-3 mr-1" />
                  View All Photos
                </Badge>
              </div>
            </div>
          </div>
          <div className="lg:col-span-2 grid grid-cols-2 gap-4">
            {restaurant.images.slice(1).map((image, index) => (
              <div key={index} className="aspect-video bg-muted rounded-lg overflow-hidden group">
                <img
                  src={image}
                  alt={`${restaurant.name} ${index + 2}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Restaurant Header */}
            <div>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-4xl font-bold mb-2">{restaurant.name}</h1>
                  <p className="text-lg text-muted-foreground">{restaurant.cuisine}</p>
                </div>
                <div className="text-right">
                  <Badge variant="secondary" className="text-lg px-3 py-1 mb-2">
                    {restaurant.priceRange}
                  </Badge>
                  <div className="text-sm text-muted-foreground">
                    Avg: {restaurant.averageCost}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{restaurant.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{restaurant.rating}</span>
                  <span className="text-muted-foreground">({restaurant.reviewCount} reviews)</span>
                </div>
                <Badge variant="outline">{restaurant.cuisine}</Badge>
                <Badge variant="outline">
                  <Award className="h-3 w-3 mr-1" />
                  Award Winner
                </Badge>
              </div>

              <p className="text-lg leading-relaxed mb-4">{restaurant.description}</p>
              <p className="text-muted-foreground leading-relaxed">{restaurant.longDescription}</p>
            </div>

            {/* Awards Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Awards & Recognition
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {restaurant.awards.map((award, index) => (
                    <div key={index} className="flex items-center gap-2 p-3 border rounded-lg">
                      <Award className="h-4 w-4 text-yellow-600" />
                      <span className="text-sm font-medium">{award}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            <Card>
              <CardHeader>
                <CardTitle>Restaurant Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {restaurant.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                      <Utensils className="h-4 w-4 text-primary" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Menu */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ChefHat className="h-5 w-5" />
                  Our Menu
                </CardTitle>
                <CardDescription>Authentic Italian cuisine crafted with passion</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {restaurant.menu.map((section, index) => (
                    <div key={index}>
                      <div className="border-b pb-4 mb-6">
                        <h4 className="font-semibold text-xl mb-2 text-primary">
                          {section.category}
                        </h4>
                        <p className="text-muted-foreground text-sm">{section.description}</p>
                      </div>
                      <div className="grid gap-4">
                        {section.items.map((item, itemIndex) => (
                          <div key={itemIndex} className="flex justify-between items-start p-4 border rounded-lg hover:shadow-md transition-shadow">
                            <div className="flex-1">
                              <h5 className="font-medium mb-1">{item.name}</h5>
                              <p className="text-sm text-muted-foreground">{item.description}</p>
                            </div>
                            <div className="text-right ml-4">
                              <span className="font-semibold text-primary">{item.price}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Chef's Specials */}
            <Card>
              <CardHeader>
                <CardTitle>Chef's Special Experiences</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {restaurant.chefSpecials.map((special, index) => (
                    <div key={index} className="p-4 border rounded-lg bg-gradient-to-r from-primary/5 to-primary/10">
                      <div className="flex justify-between items-start">
                        <div>
                          <h5 className="font-semibold mb-2">{special.name}</h5>
                          <p className="text-muted-foreground">{special.description}</p>
                        </div>
                        <Badge variant="secondary" className="ml-4">
                          {special.price}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Wine Collection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wine className="h-5 w-5" />
                  Wine Collection
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-semibold mb-3">{restaurant.wineCollection.totalBottles}</h5>
                    <div className="space-y-2">
                      {restaurant.wineCollection.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Wine className="h-3 w-3 text-primary" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h5 className="font-semibold mb-3">Wine Regions</h5>
                    <div className="flex flex-wrap gap-2">
                      {restaurant.wineCollection.regions.map((region, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {region}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Reviews */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {restaurant.guestReviews.map((review, index) => (
                    <div key={index} className="border-b pb-4 last:border-b-0">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h5 className="font-medium">{review.name}</h5>
                          <div className="flex items-center gap-2">
                            <div className="flex">
                              {[...Array(review.rating)].map((_, i) => (
                                <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              ))}
                            </div>
                            {review.verified && (
                              <Badge variant="outline" className="text-xs">
                                Verified
                              </Badge>
                            )}
                          </div>
                        </div>
                        <span className="text-sm text-muted-foreground">{review.date}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Reservation Sidebar */}
          <div className="space-y-6">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Make a Reservation</CardTitle>
                <CardDescription>Book your table for an unforgettable experience</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full" size="lg">
                  <Calendar className="h-4 w-4 mr-2" />
                  Reserve Table
                </Button>
                <div className="text-center text-sm text-muted-foreground">
                  or call us directly
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <span>{restaurant.contact.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <span>{restaurant.contact.email}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 mt-0.5" />
                    <span>{restaurant.contact.address}</span>
                  </div>
                </div>
                <div className="pt-2 border-t">
                  <p className="text-xs text-muted-foreground">
                    <strong>Dress Code:</strong> {restaurant.dresscode}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>
                  <Clock className="h-4 w-4 inline mr-2" />
                  Opening Hours
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  {Object.entries(restaurant.hours).map(([day, hours]) => (
                    <div key={day} className="flex justify-between">
                      <span className="font-medium">{day}:</span>
                      <span className="text-muted-foreground">{hours}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Special Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {restaurant.events.map((event, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <Badge variant="outline" className="mt-0.5">
                        <Calendar className="h-3 w-3 mr-1" />
                      </Badge>
                      <span className="text-sm">{event}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Why Dine With Us?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <Badge variant="outline" className="mt-0.5">✓</Badge>
                    <span className="text-sm">Award-winning Italian cuisine</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Badge variant="outline" className="mt-0.5">✓</Badge>
                    <span className="text-sm">Panoramic city views</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Badge variant="outline" className="mt-0.5">✓</Badge>
                    <span className="text-sm">Expert sommelier service</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Badge variant="outline" className="mt-0.5">✓</Badge>
                    <span className="text-sm">Private dining available</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetail;
