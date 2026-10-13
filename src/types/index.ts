export type Language = 'en' | 'ta' | 'hi';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'admin' | 'user';
  preferredLanguage: Language;
  avatar?: string;
  travelCompanion?: 'family' | 'friends' | 'solo' | 'group' | 'couple';
  interests?: string[];
  wishlist: string[]; // destination IDs
  savedStories: string[]; // story IDs
  savedItineraries: any[];
  bookings: Booking[];
}

export interface Booking {
  id: string;
  customerId?: string;
  customerName?: string;
  customerEmail?: string;
  type: 'hotel' | 'vehicle' | 'package';
  referenceId: string;
  title: string;
  date: string;
  travelers: number;
  totalPrice: number;
  status: 'confirmed' | 'pending' | 'cancelled';
  contactPhone: string;
  notes?: string;
  adminNotes?: string;
  createdAt: string;
  updatedAt?: string;
}

export type DestinationCategory =
  | 'popular'
  | 'hidden'
  | 'temples'
  | 'historical'
  | 'hill_stations'
  | 'beaches'
  | 'waterfalls'
  | 'wildlife'
  | 'adventure'
  | 'heritage'
  | 'museums'
  | 'family'
  | 'weekend';

export interface Destination {
  id: string;
  name: string;
  nameTa: string;
  district: string;
  category: DestinationCategory;
  isPopular: boolean;
  isHiddenSpot: boolean;
  images: string[];
  description: string;
  descriptionTa: string;
  historicalBackground: string;
  culturalImportance: string;
  latitude: number;
  longitude: number;
  openingTime: string; // e.g. "06:00 AM"
  closingTime: string; // e.g. "08:30 PM"
  weeklyHoliday?: string; // e.g. "None" or "Monday"
  openHours24: { open: number; close: number }; // [6, 20.5]
  entryFee: {
    adult: number;
    child: number;
    foreigner: number;
    camera: number;
  };
  bestTimeToVisit: string;
  estimatedVisitingDuration: string; // e.g. "2 - 3 hours"
  accessibilityNotes: string;
  estimatedTripExpense: number; // in INR
  ratings: number;
  reviewCount: number;
  weatherInfo?: {
    temp: number;
    condition: string;
    humidity: number;
  };
  nearbyAttractions: { name: string; distanceKm: number }[];
  localFoodSpecialties: string[];
  transportation: {
    nearestBusStand: string;
    nearestRailwayStation: string;
    busConnectivity: string;
    trainConnectivity: string;
    taxiAvailability: string;
  };
  emergencyContacts: {
    hospital: string;
    hospitalPhone: string;
    policeStation: string;
    policePhone: string;
  };
  storyId?: string;
}

export interface Story {
  id: string;
  destinationId: string;
  destinationName: string;
  title: string;
  titleTa: string;
  type: 'historical_fact' | 'mythology_legend' | 'cultural_heritage';
  summary: string;
  contentEn: string;
  contentTa: string;
  audioNarrationUrl?: string;
  historicalEra: string; // e.g. "Chola Dynasty (1010 CE)", "Pandya Era"
  keyCharacters: string[];
  interestingFacts: string[];
  images: string[];
}

export interface Hotel {
  id: string;
  name: string;
  district: string;
  destinationId?: string;
  category: 'budget' | 'family' | 'luxury' | 'resort' | 'homestay';
  pricePerNight: number;
  rating: number;
  reviewsCount: number;
  image: string;
  address: string;
  distanceFromAttraction: string;
  facilities: string[];
  checkInTime: string;
  checkOutTime: string;
  contactPhone: string;
  verified: boolean;
}

export interface Restaurant {
  id: string;
  name: string;
  district: string;
  destinationId?: string;
  specialityDishes: string[];
  foodType: 'veg' | 'non-veg' | 'both';
  priceRange: '₹' | '₹₹' | '₹₹₹';
  rating: number;
  operatingHours: string;
  address: string;
  image: string;
  contactPhone: string;
}

export interface TransportRoute {
  id: string;
  from: string;
  to: string;
  type: 'govt_bus' | 'train' | 'metro' | 'rental';
  operator: string;
  serviceName: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  approxFare: number;
  frequency: string;
  bookingUrl?: string;
  officialNotes: string;
}

export interface RentalVehicle {
  id: string;
  name: string;
  type: 'bike' | 'scooter' | 'car' | 'suv' | 'tempo';
  seatingCapacity: number;
  pricePerDay: number;
  district: string;
  image: string;
  provider: string;
  providerPhone: string;
  fuelType: string;
  pickupLocation: string;
  terms: string;
}

export interface EventFestival {
  id: string;
  name: string;
  nameTa: string;
  district: string;
  category: 'temple' | 'cultural' | 'music_dance' | 'seasonal' | 'fairs';
  date: string;
  description: string;
  venue: string;
  ticketPrice: string;
  organizer: string;
  image: string;
  highlights: string[];
}

export interface Review {
  id: string;
  destinationId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  visitDate: string;
  travelType: string;
  photos?: string[];
  createdAt: string;
  likes: number;
}

export interface SpecialOffer {
  id: string;
  title: string;
  code: string;
  discount: string;
  category: 'hotel' | 'vehicle' | 'package' | 'food';
  validUntil: string;
  description: string;
  eligibility: string;
  terms: string;
}

export interface TourPackage {
  id: string;
  title: string;
  subtitle: string;
  duration: string; // e.g. "3 Days / 2 Nights"
  category: 'heritage' | 'hills' | 'spiritual' | 'weekend' | 'wildlife';
  price: number; // in INR
  destinationsCovered: string[];
  image: string;
  inclusions: string[];
  exclusions: string[];
  itinerarySummary: string[];
  availableDates: string[];
  cancellationPolicy: string;
}

export interface DayItinerary {
  day: number;
  title: string;
  theme: string;
  activities: {
    time: string;
    destinationName: string;
    description: string;
    travelDuration?: string;
    estimatedCost?: number;
  }[];
  hotelRecommendation: string;
  foodRecommendation: string;
}

export interface CustomItinerary {
  id: string;
  title: string;
  companion: string;
  startingCity: string;
  durationDays: number;
  totalBudget: number;
  days: DayItinerary[];
  transportMode: string;
  createdAt: string;
}
