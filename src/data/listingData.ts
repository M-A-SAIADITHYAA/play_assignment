export interface Photo {
  id: number;
  room: string;
  alt: string;
  src: string;
}

export interface RoomCategory {
  room: string;
  tags: string[];
  photoIds: number[];
}

export interface Amenity {
  label: string;
  icon: string;
  available: boolean;
}

export interface Review {
  id: string;
  author: string;
  avatarUrl?: string;
  avatarColor: string;
  membership: string;
  rating: number;
  date: string;
  text: string;
}

export interface NearbyListing {
  id: string;
  title: string;
  price: number;
  rating: number;
  photoSrc: string;
}

const buildPexelsUrl = (path: string) =>
  `https://images.pexels.com/photos/${path}?auto=compress&cs=tinysrgb&w=1200`;

const createPhoto = (id: number, room: string, path: string): Photo => ({
  id,
  room,
  alt: `${room} photo`,
  src: buildPexelsUrl(path),
});

export const LISTING_DATA = {
  title: "Romantic Jacuzzi 1BHK Candolim | Mirashya UG10",
  propertyType: "Entire serviced apartment in Candolim, India",
  location: "Candolim, Goa, India",
  guests: 3,
  bedrooms: 1,
  beds: 1,
  bathrooms: 1,
  rating: 4.95,
  reviewCount: 19,
  pricePerStay: 28499,
  pricePerNight: 5699,
  nights: 5,
  checkIn: "2026-10-18",
  checkOut: "2026-10-23",
  cancellationDate: "17 October",
  host: {
    name: "Mirashya Homes",
    avatarColor: "#0b3d2e",
    yearsHosting: 2,
    reviewCount: 1463,
    rating: 4.68,
    bornDecade: "80s",
    responseRate: 100,
    responseTime: "an hour",
    school: "NICMAR GOA",
  },
  coHosts: [
    { name: "Sharath" },
    { name: "Aman Dev Pahwa" },
    { name: "Maria Karen Priyanka" },
    { name: "Simran" },
    { name: "Pallavi" },
    { name: "Sanyukta" },
    { name: "Shruti", avatarColor: "#f4a4b8" },
    { name: "Amisha", avatarColor: "#c9d6f7" },
  ],
  highlights: [
    {
      title: "Outdoor entertainment",
      description: "The pool and alfresco dining are great for summer trips.",
      icon: "Sun",
    },
    {
      title: "Designed for staying cool",
      description: "Beat the heat with the A/C and ceiling fan.",
      icon: "Wind",
    },
    {
      title: "Self check-in",
      description: "You can check in with the building staff.",
      icon: "Key",
    },
  ],
  description:
    "🌴 Plan Your Relaxing Holiday at Amor De Goa by Mirashya Homes! ✨ Stay in this cozy 1BHK in the heart of Candolim, featuring a private jacuzzi 🛁 for the perfect unwind. Enjoy high-speed WiFi 💻, Smart TV 📺, pet-friendly comfort 🐾, and stylish interiors. Just minutes from Candolim Beach 🏖️, popular cafés, restaurants, and nightlife 🍹, it’s ideal for couples seeking romance, relaxation, and a touch of luxury in North Goa. ❤️🌴",
  whereYouSleep: [
    { room: "Bedroom", bedInfo: "1 double bed", icon: "Bed" },
    { room: "Living room", bedInfo: "1 sofa", icon: "Armchair" },
  ],
  amenities: [
    { label: "Kitchen", icon: "Utensils", available: true },
    { label: "Wifi", icon: "Wifi", available: true },
    { label: "Dedicated workspace", icon: "Laptop", available: true },
    { label: "Free parking on premises", icon: "Car", available: true },
    { label: "Pool", icon: "Waves", available: true },
    { label: "Hot tub", icon: "Bath", available: true },
    { label: "Pets allowed", icon: "PawPrint", available: true },
    { label: "Exterior security cameras on property", icon: "Camera", available: true },
    { label: "Carbon monoxide alarm", icon: "AlertTriangle", available: false },
    { label: "Smoke alarm", icon: "Flame", available: false },
  ],
  allAmenitiesModal: [
    {
      category: "Bathroom",
      items: ["Hair dryer", "Cleaning products", "Shampoo", "Conditioner", "Body soap", "Hot water"],
    },
    {
      category: "Bedroom and laundry",
      items: ["Washing machine", "Essentials (Towels, bed sheets, soap, toilet paper)", "Hangers", "Bed linen", "Extra pillows and blankets", "Iron", "Drying rack for clothing", "Wardrobe"],
    },
    {
      category: "Entertainment",
      items: ["Smart TV", "High-speed Wifi"],
    },
    {
      category: "Heating and cooling",
      items: ["Air conditioning", "Ceiling fan"],
    },
    {
      category: "Home safety",
      items: ["Exterior security cameras on property", "First aid kit", "Fire extinguisher"],
    },
    {
      category: "Kitchen and dining",
      items: ["Kitchen", "Refrigerator", "Microwave", "Cooking basics (Pots, pans, oil, salt and pepper)", "Dishes and silverware", "Stove", "Electric kettle", "Toaster", "Dining table"],
    },
    {
      category: "Location features",
      items: ["Waterfront / near beach", "Private entrance", "Resort access"],
    },
    {
      category: "Outdoor",
      items: ["Private balcony", "Outdoor furniture", "Outdoor dining area", "Shared outdoor pool", "Private hot tub / jacuzzi"],
    },
    {
      category: "Parking and facilities",
      items: ["Free parking on premises", "Shared gym / fitness center", "Elevator in building"],
    },
    {
      category: "Services",
      items: ["Pets allowed", "Self check-in with building staff", "Long-term stays allowed"],
    },
  ],
  rooms: [
    {
      room: "Living room 1",
      tags: ["Sofa", "Air conditioning", "Ceiling fan", "TV"],
      photoIds: [1000, 1001, 1002],
    },
    {
      room: "Living room 2",
      tags: ["Lounge seating", "Reading nook"],
      photoIds: [1003, 1004],
    },
    {
      room: "Full kitchen",
      tags: ["Refrigerator", "Stove", "Cookware"],
      photoIds: [1005, 1006],
    },
    {
      room: "Bedroom",
      tags: ["1 double bed", "Wardrobe", "Blackout curtains"],
      photoIds: [1007, 1008, 1009],
    },
    {
      room: "Full bathroom",
      tags: ["Hot water", "Hair dryer", "Shower"],
      photoIds: [1010, 1011],
    },
    {
      room: "Gym",
      tags: ["Free weights", "Treadmill"],
      photoIds: [1012, 1013],
    },
    {
      room: "Exterior",
      tags: ["Building view", "Parking"],
      photoIds: [1014, 1015],
    },
    {
      room: "Pool",
      tags: ["Rooftop pool", "Loungers"],
      photoIds: [1016, 1017],
    },
    {
      room: "Additional photos",
      tags: [],
      photoIds: [1018, 1019, 1020],
    },
  ],
  photos: [
    createPhoto(1000, "Living room 1", "276746/pexels-photo-276746.jpeg"),
    createPhoto(1001, "Living room 1", "29012619/pexels-photo-29012619/free-photo-of-bright-modern-living-room-with-soft-white-interiors.jpeg"),
    createPhoto(1002, "Living room 1", "30386991/pexels-photo-30386991/free-photo-of-modern-living-room-with-cozy-navy-sofa.jpeg"),
    createPhoto(1003, "Living room 2", "33537442/pexels-photo-33537442/free-photo-of-cozy-brick-walled-living-room-with-large-window.jpeg"),
    createPhoto(1004, "Living room 2", "28542161/pexels-photo-28542161/free-photo-of-cozy-living-room-with-modern-art-decor.jpeg"),
    createPhoto(1005, "Full kitchen", "19836790/pexels-photo-19836790/free-photo-of-view-of-a-kitchen-with-white-cabinets-and-a-silver-sink.jpeg"),
    createPhoto(1006, "Full kitchen", "7045356/pexels-photo-7045356.jpeg"),
    createPhoto(1007, "Bedroom", "34574606/pexels-photo-34574606/free-photo-of-elegant-bedroom-interior-with-blue-accents-and-natural-light.jpeg"),
    createPhoto(1008, "Bedroom", "30767888/pexels-photo-30767888/free-photo-of-cozy-modern-bedroom-in-santa-teresa-brazil.jpeg"),
    createPhoto(1009, "Bedroom", "15456211/pexels-photo-15456211/free-photo-of-rustic-pretty-bedroom.jpeg"),
    createPhoto(1010, "Full bathroom", "6957081/pexels-photo-6957081.jpeg"),
    createPhoto(1011, "Full bathroom", "8082195/pexels-photo-8082195.jpeg"),
    createPhoto(1012, "Gym", "11593505/pexels-photo-11593505.jpeg"),
    createPhoto(1013, "Gym", "27195989/pexels-photo-27195989/free-photo-of-a-gym-room-with-exercise-equipment-and-a-ceiling-light.jpeg"),
    createPhoto(1014, "Exterior", "18153132/pexels-photo-18153132/free-photo-of-apartments-with-balconies.jpeg"),
    createPhoto(1015, "Exterior", "37301680/pexels-photo-37301680/free-photo-of-modern-urban-building-architecture-against-blue-sky.jpeg"),
    createPhoto(1016, "Pool", "15088502/pexels-photo-15088502/free-photo-of-a-rooftop-swimming-pool.jpeg"),
    createPhoto(1017, "Pool", "33819401/pexels-photo-33819401/free-photo-of-aerial-view-of-rooftop-pool-and-surrounding-cityscape.jpeg"),
    createPhoto(1018, "Additional photos", "6980724/pexels-photo-6980724.jpeg"),
    createPhoto(1019, "Additional photos", "6899357/pexels-photo-6899357.jpeg"),
    createPhoto(1020, "Additional photos", "4488754/pexels-photo-4488754.jpeg"),
  ],
  overallRatingBreakdown: [
    { stars: 5, percent: 92 },
    { stars: 4, percent: 8 },
    { stars: 3, percent: 0 },
    { stars: 2, percent: 0 },
    { stars: 1, percent: 0 },
  ],
  categoryRatings: [
    { label: "Cleanliness", value: 5.0, icon: "Sparkles" },
    { label: "Accuracy", value: 5.0, icon: "CheckCircle2" },
    { label: "Check-in", value: 5.0, icon: "Key" },
    { label: "Communication", value: 5.0, icon: "MessageSquare" },
    { label: "Location", value: 4.8, icon: "MapPin" },
    { label: "Value", value: 4.8, icon: "Tag" },
  ],
  highlightTags: [
    { emoji: "🛋️", label: "Comfort", count: 6 },
    { emoji: "✅", label: "Accuracy", count: 5 },
    { emoji: "🛁", label: "Hot tub", count: 5 },
    { emoji: "🥫", label: "Condition", count: 4 },
    { emoji: "🎁", label: "Hospitality", count: 8 },
    { emoji: "🛍️", label: "Cleanliness", count: 4 },
    { emoji: "🧖", label: "Amenities", count: 2 },
    { emoji: "🖼️", label: "Decor", count: 2 },
    { emoji: "🪑", label: "Indoor spaces", count: 2 },
    { emoji: "📍", label: "Location", count: 2 },
  ],
  reviews: [
    {
      id: "amit",
      author: "Amit",
      avatarUrl: "/avatars/amit.png",
      avatarColor: "#F7EFE3",
      membership: "2 months on Airbnb",
      rating: 5,
      date: "1 week ago",
      text: "Very helpful and responsive team. Safe and peaceful stay. loved everything about the property.",
    },
    {
      id: "aheesh",
      author: "Aheesh",
      avatarUrl: "/avatars/aheesh.png",
      avatarColor: "#3e6de0",
      membership: "3 years on Airbnb",
      rating: 5,
      date: "2 weeks ago",
      text: "We had a wonderful stay. The apartment was clean, comfortable, and exactly as shown in the photos. The host was very responsive and helpful throughout our stay. We would definitely recommend this place and would love to stay here again.",
    },
    {
      id: "samiksha",
      author: "Samiksha",
      avatarUrl: "/avatars/samiksha.png",
      avatarColor: "#d63e8a",
      membership: "8 months on Airbnb",
      rating: 5,
      date: "May 2026",
      text: "the host nitish was really great help",
    },
    {
      id: "vedant",
      author: "Vedant",
      avatarUrl: "/avatars/vedant.png",
      avatarColor: "#ECE6FA",
      membership: "4 years on Airbnb",
      rating: 5,
      date: "May 2026",
      text: "We had an amazing stay at this property in Goa! The entire home was spotless and exceptionally well-maintained, making us feel comfortable from the moment we arrived. The cleanliness standards were truly impressive, with every corner of the house looking fresh and pristine. The highlight of our stay was definitely the jacuzzi. It was clean, well-kept, and the perfect place to relax after a day of exploring Goa. It added a luxurious touch to our vacation and made our experience even more memorable. The property was exactly as described, well-equipped, and offered a peaceful atmosphere. We would highly recommend this place to anyone looking for a comfortable, clean, and relaxing stay in Goa. Looking forward to visiting again!",
    },
    {
      id: "vaibhav",
      author: "Vaibhav S",
      avatarUrl: "/avatars/vaibhav.png",
      avatarColor: "#e0433e",
      membership: "3 years on Airbnb",
      rating: 5,
      date: "May 2026",
      text: "Great great experience living out there , can't expect more , will always look for it in the future and will recommend my friends too.",
    },
    {
      id: "mohd",
      author: "Mohd",
      avatarUrl: "/avatars/mohd.png",
      avatarColor: "#3ee0c7",
      membership: "5 years on Airbnb",
      rating: 5,
      date: "May 2026",
      text: "Great place. Exactly as described in the listing.",
    },
  ],
  neighbourhoodHighlight:
    "Located in the heart of Candolim, Amor de Goa offers a peaceful stay with easy access to beaches, cafés, and popular attractions.",
  thingsToKnow: {
    cancellationPolicy:
      "Free cancellation before 17 October. Cancel before check-in on 18 October for a partial refund.",
    houseRules: [
      "Check-in after 2:00 pm",
      "Checkout before 11:00 am",
      "3 guests maximum",
    ],
    safety: [
      "Carbon monoxide alarm not reported",
      "Smoke alarm not reported",
      "Exterior security cameras on property",
    ],
  },
  nearbyListings: [
    {
      id: "studio-view",
      title: "Beautiful Studio with a view to die for",
      price: 23600,
      rating: 4.91,
      photoSrc: buildPexelsUrl("30386991/pexels-photo-30386991/free-photo-of-modern-living-room-with-cozy-navy-sofa.jpeg"),
    },
    {
      id: "naqab-pool",
      title: "NAQAB - 1bhk with private pool",
      price: 42218,
      rating: 4.95,
      photoSrc: buildPexelsUrl("15088502/pexels-photo-15088502/free-photo-of-a-rooftop-swimming-pool.jpeg"),
    },
    {
      id: "greentique-flat",
      title: "Greentique Luxury Flat with plunge pool, Calangute",
      price: 44506,
      rating: 4.94,
      photoSrc: buildPexelsUrl("28542161/pexels-photo-28542161/free-photo-of-cozy-living-room-with-modern-art-decor.jpeg"),
    },
    {
      id: "tropical-studio",
      title: "The Tropical Studio | 5 mins to Beach",
      price: 22824,
      rating: 4.96,
      photoSrc: buildPexelsUrl("34574606/pexels-photo-34574606/free-photo-of-elegant-bedroom-interior-with-blue-accents-and-natural-light.jpeg"),
    },
    {
      id: "casa-bella",
      title: "Luxury Casa Bella 1BHK with plunge pool, Calangute",
      price: 39942,
      rating: 4.95,
      photoSrc: buildPexelsUrl("33819401/pexels-photo-33819401/free-photo-of-aerial-view-of-rooftop-pool-and-surrounding-cityscape.jpeg"),
    },
  ],
};
