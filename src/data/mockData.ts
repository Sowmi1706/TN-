import {
  Destination,
  Story,
  Hotel,
  Restaurant,
  TransportRoute,
  RentalVehicle,
  EventFestival,
  SpecialOffer,
  TourPackage,
  Review
} from '../types';

export const DESTINATIONS: Destination[] = [
  {
    id: 'thanjavur-big-temple',
    name: 'Brihadisvara Temple (The Big Temple)',
    nameTa: 'தஞ்சைப் பெருவுடையார் கோயில்',
    district: 'Thanjavur',
    category: 'temples',
    isPopular: true,
    isHiddenSpot: false,
    images: [
      'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600100397608-f010f4438317?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1609137144822-261546b5e5a2?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'A UNESCO World Heritage Site built by Raja Raja Chola I in 1010 CE, renowned for its 216-foot vimana, single-granite 80-tonne capstone, and grand Nandi.',
    descriptionTa: 'கி.பி 1010-ல் முதலாம் இராஜராஜ சோழனால் கட்டப்பட்ட யுனெஸ்கோ உலக பாரம்பரிய தளம். 216 அடி உயர விமானமும், 80 டன் எடை கொண்ட ஒரே கல் சிகரமும் இதன் சிறப்பம்சங்கள்.',
    historicalBackground: 'Commissioned in 1004 CE and completed in 1010 CE to celebrate the Chola Empire’s naval and cultural supremacy across South and Southeast Asia. The temple showcases pinnacle Dravidian engineering without binding mortar.',
    culturalImportance: 'Epicenter of classic Bharatanatyam dance traditions, ancient Tamil epigraphy, bronze casting, and Chola fresco paintings.',
    latitude: 10.7828,
    longitude: 79.1318,
    openingTime: '06:00 AM',
    closingTime: '08:30 PM',
    weeklyHoliday: 'Open all days',
    openHours24: { open: 6.0, close: 20.5 },
    entryFee: { adult: 0, child: 0, foreigner: 250, camera: 50 },
    bestTimeToVisit: 'October to March (Pleasant winter climate)',
    estimatedVisitingDuration: '2.5 to 3.5 hours',
    accessibilityNotes: 'Wheelchair access ramp available at outer courtyard; footwear stand provided outside inner sanctum.',
    estimatedTripExpense: 800,
    ratings: 4.9,
    reviewCount: 3420,
    weatherInfo: { temp: 29, condition: 'Sunny & Pleasant', humidity: 62 },
    nearbyAttractions: [
      { name: 'Thanjavur Maratha Palace & Saraswathi Mahal Library', distanceKm: 1.8 },
      { name: 'Schwartz Church & Sivaganga Park', distanceKm: 0.9 },
      { name: 'Punnainallur Mariamman Temple', distanceKm: 6.2 }
    ],
    localFoodSpecialties: ['Thanjavur Kadappa & Idli', 'Ashoka Halwa (Thiruvaiyaru)', 'Degree Filter Coffee'],
    transportation: {
      nearestBusStand: 'Thanjavur Old Bus Stand (1.2 km) / New Bus Stand (4.5 km)',
      nearestRailwayStation: 'Thanjavur Junction (TJ) - 1.5 km',
      busConnectivity: 'Frequent city buses every 5 minutes from both bus stands.',
      trainConnectivity: 'Direct express trains from Chennai Egmore, Trichy, and Madurai.',
      taxiAvailability: 'Auto-rickshaws (₹60-₹100) and app-cabs readily available.'
    },
    emergencyContacts: {
      hospital: 'Thanjavur Medical College Hospital (Ph: 04362-240024)',
      hospitalPhone: '04362-240024',
      policeStation: 'Thanjavur Town West Police Station (Ph: 04362-230303)',
      policePhone: '04362-230303'
    },
    storyId: 'story-thanjavur-big-temple'
  },
  {
    id: 'madurai-meenakshi-temple',
    name: 'Meenakshi Sundareswarar Temple',
    nameTa: 'மதுரை மீனாட்சி சுந்தரேசுவரர் திருக்கோயில்',
    district: 'Madurai',
    category: 'temples',
    isPopular: true,
    isHiddenSpot: false,
    images: [
      'https://images.unsplash.com/photo-1605649487212-47bdab064df8?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'The soul of Tamil Nadu with 14 iconic multi-tiered gopurams, the thousand-pillar hall, sacred Golden Lotus pond, and divine aura.',
    descriptionTa: '14 கம்பீரமான கோபுரங்கள், ஆயிரங்கால் மண்டபம், பொற்றாமரைக்குளம் கொண்ட தமிழ்நாட்டின் ஆன்மிகத் தலைநகரம்.',
    historicalBackground: 'Mentioned in ancient Tamil Sangam literature (6th century BCE). Rebuilt by the Nayak rulers in the 16th-17th centuries with intricate stone sculptures and musical pillars.',
    culturalImportance: 'Dedicated to Goddess Meenakshi (Parvati) and Lord Sundareswarar (Shiva). Goddess Meenakshi is worshipped first, symbolizing matriarchal spiritual reverence.',
    latitude: 9.9195,
    longitude: 78.1193,
    openingTime: '05:00 AM',
    closingTime: '10:00 PM',
    weeklyHoliday: 'Open all days (Closed 12:30 PM - 4:00 PM)',
    openHours24: { open: 5.0, close: 22.0 },
    entryFee: { adult: 0, child: 0, foreigner: 100, camera: 0 },
    bestTimeToVisit: 'October to March; April during the Chithirai Festival',
    estimatedVisitingDuration: '3 to 4 hours',
    accessibilityNotes: 'Battery-operated carts outside perimeter; strict dress code (traditional wear); electronics checked into locker.',
    estimatedTripExpense: 600,
    ratings: 4.9,
    reviewCount: 4890,
    weatherInfo: { temp: 31, condition: 'Clear Sky', humidity: 55 },
    nearbyAttractions: [
      { name: 'Thirumalai Nayakkar Mahal', distanceKm: 2.1 },
      { name: 'Gandhi Memorial Museum', distanceKm: 4.2 },
      { name: 'Alagar Kovil Hill Temple', distanceKm: 21.0 }
    ],
    localFoodSpecialties: ['Madurai Kari Dosa (Mess style)', 'Famous Jigarthanda', 'Bun Parotta', 'Malli Idli'],
    transportation: {
      nearestBusStand: 'Periyar Bus Stand (1.1 km) / Mattuthavani Integrated Bus Terminus (6.5 km)',
      nearestRailwayStation: 'Madurai Junction (MDU) - 1.8 km',
      busConnectivity: 'Constant city buses (Route 48, 77) connecting from all terminals.',
      trainConnectivity: 'Major Southern Railway junction with Superfast & Vande Bharat links.',
      taxiAvailability: 'Local auto rickshaws, taxi stands, and Ola/Uber services available 24/7.'
    },
    emergencyContacts: {
      hospital: 'Meenakshi Mission Hospital & Research Centre (Ph: 0452-4263000)',
      hospitalPhone: '0452-4263000',
      policeStation: 'Madurai Temple Police Station (Ph: 0452-2342300)',
      policePhone: '0452-2342300'
    },
    storyId: 'story-madurai-meenakshi'
  },
  {
    id: 'dhanushkodi-ghost-town',
    name: 'Dhanushkodi Beach & Ghost Town',
    nameTa: 'தனுஷ்கோடி கடற்கரை & சிதிலமடைந்த நகரம்',
    district: 'Ramanathapuram',
    category: 'hidden',
    isPopular: false,
    isHiddenSpot: true,
    images: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'The tip of India where the Bay of Bengal meets the Indian Ocean. A poetic abandoned town preserved after the 1964 cyclone, with Ram Setu vantage points.',
    descriptionTa: 'வங்காள விரிகுடாவும் இந்தியப் பெருங்கடலும் சங்கமிக்கும் இந்தியாவின் விளிம்பு. 1964 புயலுக்குப் பின் உறைந்த அமைதி பூமி.',
    historicalBackground: 'Once a flourishing port city with rail connections to Sri Lanka (Boat Mail Express). Destroyed in the catastrophic 1964 Rameswaram cyclone, declared an uninhabitable ghost town.',
    culturalImportance: 'Legendary point where Lord Rama’s bow (Dhanush) marked the alignment for building the Ram Setu (Adam’s Bridge) towards Lanka.',
    latitude: 9.1763,
    longitude: 79.4187,
    openingTime: '06:00 AM',
    closingTime: '05:30 PM',
    weeklyHoliday: 'Open all days (Strict entry closes at 5:00 PM for safety)',
    openHours24: { open: 6.0, close: 17.5 },
    entryFee: { adult: 0, child: 0, foreigner: 0, camera: 0 },
    bestTimeToVisit: 'November to February (Early morning or sunset hour)',
    estimatedVisitingDuration: '2 to 3 hours',
    accessibilityNotes: 'Well-paved national highway (NH 87) leads straight to Arichal Munai. Sandy walking paths near ruins.',
    estimatedTripExpense: 750,
    ratings: 4.8,
    reviewCount: 1980,
    weatherInfo: { temp: 28, condition: 'Ocean Breezes', humidity: 74 },
    nearbyAttractions: [
      { name: 'Arichal Munai (Land’s End Point)', distanceKm: 1.5 },
      { name: 'Ramanathaswamy Temple Rameswaram', distanceKm: 19.0 },
      { name: 'Dr. APJ Abdul Kalam National Memorial', distanceKm: 23.5 }
    ],
    localFoodSpecialties: ['Fresh coastal fish fry', 'Nannari Sarbath', 'Sweet tender coconut'],
    transportation: {
      nearestBusStand: 'Rameswaram Bus Stand (18 km)',
      nearestRailwayStation: 'Rameswaram Railway Station (RMM) - 19 km / Pamban',
      busConnectivity: 'Government buses ply every 30 minutes from Rameswaram to Dhanushkodi.',
      trainConnectivity: 'Take train to Rameswaram over the historic Pamban Sea Bridge, then road.',
      taxiAvailability: 'Shared tourist jeeps and cabs available from Rameswaram temple.'
    },
    emergencyContacts: {
      hospital: 'Government Hospital Rameswaram (Ph: 04573-221233)',
      hospitalPhone: '04573-221233',
      policeStation: 'Dhanushkodi Police Checkpost & Coastal Security (Ph: 04573-221222)',
      policePhone: '04573-221222'
    },
    storyId: 'story-dhanushkodi'
  },
  {
    id: 'pichavaram-mangrove-forest',
    name: 'Pichavaram Mangrove Forest',
    nameTa: 'பிச்சாவரம் அலையாத்தி காடுகள்',
    district: 'Cuddalore',
    category: 'wildlife',
    isPopular: false,
    isHiddenSpot: true,
    images: [
      'https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'The world’s second-largest mangrove ecosystem with 4,400 canals and 1,100 hectares of water channels sheltered by evergreen trees.',
    descriptionTa: 'உலகின் இரண்டாவது மிகப்பெரிய அலையாத்தி காடுகள். 4,400 இயற்கைக் கால்வாய்களுடன் கூடிய சூழல் சொர்க்கம்.',
    historicalBackground: 'Naturally nurtured by the Vellar and Coleroon estuaries for over a millennium. Protected the inland delta during the 2004 tsunami with its dense root network.',
    culturalImportance: 'Critical refuge for 177 species of migratory birds including snipes, pelicans, and egrets. Traditional rowing community guardians.',
    latitude: 11.4285,
    longitude: 79.7828,
    openingTime: '08:00 AM',
    closingTime: '05:00 PM',
    weeklyHoliday: 'Open all days',
    openHours24: { open: 8.0, close: 17.0 },
    entryFee: { adult: 20, child: 10, foreigner: 100, camera: 50 },
    bestTimeToVisit: 'November to February (Migratory bird watching season)',
    estimatedVisitingDuration: '2 to 3 hours (Row boat tour)',
    accessibilityNotes: 'Boarding jetty requires walking down steps; life jackets mandatory for all passengers.',
    estimatedTripExpense: 550,
    ratings: 4.7,
    reviewCount: 1450,
    weatherInfo: { temp: 27, condition: 'Mild & Shaded', humidity: 70 },
    nearbyAttractions: [
      { name: 'Chidambaram Nataraja Temple', distanceKm: 15.0 },
      { name: 'Tarangambadi (Tranquebar Danish Fort)', distanceKm: 42.0 },
      { name: 'Vaitheeswaran Koil', distanceKm: 32.0 }
    ],
    localFoodSpecialties: ['Crab Masala & Prawn Fry (Local coastal seafood)', 'Chidambaram Kothsu & Idli'],
    transportation: {
      nearestBusStand: 'Chidambaram Central Bus Stand (16 km)',
      nearestRailwayStation: 'Chidambaram (CDM) - 15 km',
      busConnectivity: 'Regular town buses and shared autos connect Chidambaram to Pichavaram eco-dock.',
      trainConnectivity: 'Mainline trains between Chennai and Tiruchirappalli halt at Chidambaram.',
      taxiAvailability: 'Private taxis readily hired from Chidambaram railway station.'
    },
    emergencyContacts: {
      hospital: 'Rajah Muthiah Medical College & Hospital, Annamalainagar (Ph: 04144-238249)',
      hospitalPhone: '04144-238249',
      policeStation: 'Killai Coastal Police Station (Ph: 04144-245333)',
      policePhone: '04144-245333'
    },
    storyId: 'story-pichavaram'
  },
  {
    id: 'nilgiri-mountain-railway',
    name: 'Nilgiri Mountain Railway & Ooty',
    nameTa: 'நீலகிரி மலை இரயில் & ஊட்டச்சத்து உறைவிடம்',
    district: 'Nilgiris',
    category: 'hill_stations',
    isPopular: true,
    isHiddenSpot: false,
    images: [
      'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'A 1908 UNESCO World Heritage meter-gauge steam train climbing through lush tea estates, 16 tunnels, 250 bridges, and eucalyptus clouds to Queen of Hill Stations.',
    descriptionTa: '1908-ம் ஆண்டு யுனெஸ்கோ உலக பாரம்பரிய நீராவி மலை இரயில். மேகங்களைத் தொடும் தேயிலைத் தோட்டங்கள் வழியே மறக்க முடியாத பயணம்.',
    historicalBackground: 'Engineered by Swiss engineer Riggenbach and British engineers using the Abt rack and pinion system to conquer the steepest mountain grade in Asia (1 in 12.5 gradient).',
    culturalImportance: 'Celebrated symbol of hill heritage, Toda tribal community homelands, and colonial botanical architecture.',
    latitude: 11.4102,
    longitude: 76.695,
    openingTime: '07:10 AM',
    closingTime: '06:00 PM',
    weeklyHoliday: 'Daily services (Subject to monsoon track clearance)',
    openHours24: { open: 7.0, close: 18.0 },
    entryFee: { adult: 205, child: 100, foreigner: 450, camera: 30 },
    bestTimeToVisit: 'March to June (Summer) and September to November (Post-monsoon freshness)',
    estimatedVisitingDuration: 'Half day to full day experience',
    accessibilityNotes: 'Wheelchair assistance available on station platforms (Mettupalayam, Coonoor, Ooty).',
    estimatedTripExpense: 1200,
    ratings: 4.9,
    reviewCount: 5210,
    weatherInfo: { temp: 16, condition: 'Cool Mist & Fog', humidity: 82 },
    nearbyAttractions: [
      { name: 'Ooty Botanical Gardens', distanceKm: 2.5 },
      { name: 'Doddabetta Peak (Highest point in Tamil Nadu)', distanceKm: 8.5 },
      { name: 'Avalanche Lake & Emerald Dam', distanceKm: 24.0 },
      { name: 'Coonoor Sim’s Park & Tea Factories', distanceKm: 19.0 }
    ],
    localFoodSpecialties: ['Ooty Varkey (crisp buttery pastry)', 'Handmade chocolates', 'Nilgiri Orthodox Silver Needle Tea'],
    transportation: {
      nearestBusStand: 'Ooty Central Bus Stand (0.5 km) / Coonoor Bus Stand (19 km)',
      nearestRailwayStation: 'Udhagamandalam Railway Station (UAM) - in town center',
      busConnectivity: 'Direct buses every 15 mins to Coimbatore, Mysore, Bangalore, and Calicut.',
      trainConnectivity: 'Connected to Mettupalayam (MTP), which links to Chennai via Nilgiri Express.',
      taxiAvailability: 'Prepaid tourist cabs and shared jeeps available at Charring Cross.'
    },
    emergencyContacts: {
      hospital: 'Government District Headquarters Hospital Ooty (Ph: 0423-2442212)',
      hospitalPhone: '0423-2442212',
      policeStation: 'Ooty Town Police Station (Ph: 0423-2442222)',
      policePhone: '0423-2442222'
    },
    storyId: 'story-nilgiri-railway'
  },
  {
    id: 'avalanche-lake-nilgiris',
    name: 'Avalanche Lake & Sanctuary (Hidden Gem)',
    nameTa: 'அவலான்ச் ஏரி மற்றும் சரணாலயம்',
    district: 'Nilgiris',
    category: 'hidden',
    isPopular: false,
    isHiddenSpot: true,
    images: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'An untouched alpine-like valley surrounded by rolling green hills, rhododendrons, trout fishing streams, and secluded forest department safaris.',
    descriptionTa: 'சுற்றுலாப் பயணிகளின் கூட்ட நெரிசலற்ற அழகிய அமைதியான ஏரி. பூக்கள் பூத்துக் குலுங்கும் பசுமை பள்ளத்தாக்கு.',
    historicalBackground: 'Formed naturally after a colossal landslide in 1823 that reshaped the topography, creating this tranquil reservoir in the Nilgiri Biosphere reserve.',
    culturalImportance: 'Crucial watershed and pristine sanctuary for endangered Nilgiri Tahr, wild bison (Gaur), and rare montane flora.',
    latitude: 11.3125,
    longitude: 76.5925,
    openingTime: '09:00 AM',
    closingTime: '03:30 PM',
    weeklyHoliday: 'Open all days (Forest eco-safari vehicle mandatory)',
    openHours24: { open: 9.0, close: 15.5 },
    entryFee: { adult: 250, child: 150, foreigner: 400, camera: 100 },
    bestTimeToVisit: 'September to March (Post-monsoon blooming)',
    estimatedVisitingDuration: '3 to 4 hours',
    accessibilityNotes: 'Private vehicles must park at Forest Checkpost; Forest department safari buses take visitors inside.',
    estimatedTripExpense: 850,
    ratings: 4.8,
    reviewCount: 960,
    weatherInfo: { temp: 14, condition: 'Crisp Mountain Breeze', humidity: 78 },
    nearbyAttractions: [
      { name: 'Emerald Lake & Tea Village', distanceKm: 7.0 },
      { name: 'Upper Bhavani Reservoir (Restricted Forest Zone)', distanceKm: 18.0 },
      { name: 'Parsons Valley', distanceKm: 15.0 }
    ],
    localFoodSpecialties: ['Fresh farm carrots', 'Locally brewed Nilgiri mountain tea', 'Steaming hot Maggi & corn'],
    transportation: {
      nearestBusStand: 'Ooty Bus Stand (26 km)',
      nearestRailwayStation: 'Udhagamandalam Railway Station (26 km)',
      busConnectivity: 'Limited local buses (2 daily from Ooty); hired cabs recommended.',
      trainConnectivity: 'Via Ooty / Mettupalayam railway stations.',
      taxiAvailability: 'Taxis can be hired for half-day round trips from Ooty town center.'
    },
    emergencyContacts: {
      hospital: 'Cantonment General Hospital Wellington (Ph: 0423-2230230)',
      hospitalPhone: '0423-2230230',
      policeStation: 'Avalanche Forest Checkpost & Emerald Police Station (Ph: 0423-2595222)',
      policePhone: '0423-2595222'
    },
    storyId: 'story-avalanche-lake'
  },
  {
    id: 'mahabalipuram-shore-temple',
    name: 'Mahabalipuram Shore Temple & Pancha Rathas',
    nameTa: 'மாமல்லபுரம் கடற்கரைக் கோயில் & ஐந்து ரதங்கள்',
    district: 'Chengalpattu',
    category: 'heritage',
    isPopular: true,
    isHiddenSpot: false,
    images: [
      'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80'
    ],
    description: '7th-century rock-cut monolithic wonders facing the Bay of Bengal, built by the Pallava kings Narasimhavarman II. Features Arjuna’s Penance bas-relief.',
    descriptionTa: '7-ம் நூற்றாண்டின் பல்லவர் கால பாறை குடைவரை சிற்பங்கள் மற்றும் கடற்கரைக் கோயில். யுனெஸ்கோ உலக பாரம்பரிய பெருமை.',
    historicalBackground: 'Ancient port of the Pallava dynasty where merchant ships sailed to Cambodia, Java, and Sri Lanka. The Shore Temple has withstood sea salt, storms, and the 2004 tsunami.',
    culturalImportance: 'Cradle of South Indian temple architecture transition from rock-cut caves to free-standing structural stone shrines.',
    latitude: 12.6163,
    longitude: 80.1983,
    openingTime: '06:00 AM',
    closingTime: '06:00 PM',
    weeklyHoliday: 'Open all days',
    openHours24: { open: 6.0, close: 18.0 },
    entryFee: { adult: 40, child: 0, foreigner: 600, camera: 25 },
    bestTimeToVisit: 'November to February; December during Indian Dance Festival',
    estimatedVisitingDuration: '3 to 4 hours',
    accessibilityNotes: 'Paved stone pathways connect monuments; battery cars available for senior citizens.',
    estimatedTripExpense: 700,
    ratings: 4.8,
    reviewCount: 3820,
    weatherInfo: { temp: 28, condition: 'Coastal Sunshine', humidity: 68 },
    nearbyAttractions: [
      { name: 'Arjuna’s Penance (Descent of the Ganges)', distanceKm: 0.8 },
      { name: 'Krishna’s Butter Ball', distanceKm: 1.0 },
      { name: 'Covelong Surf Beach', distanceKm: 20.0 },
      { name: 'DakshinaChitra Living Heritage Museum', distanceKm: 24.0 }
    ],
    localFoodSpecialties: ['Fresh grilled catch of the day', 'Tender coconut pudding', 'Chennai South Indian Thali'],
    transportation: {
      nearestBusStand: 'Mamallapuram Bus Stand (0.6 km)',
      nearestRailwayStation: 'Chengalpattu Junction (29 km) / Chennai Central (55 km)',
      busConnectivity: 'Frequent ECR AC buses (588, 599) from Chennai CMBT and Thiruvanmiyur.',
      trainConnectivity: 'Chengalpattu Junction connects to Southern Railway lines.',
      taxiAvailability: 'ECR taxis, auto-rickshaws, and bicycle rentals available everywhere.'
    },
    emergencyContacts: {
      hospital: 'Government Primary Health Centre Mamallapuram (Ph: 044-27442220)',
      hospitalPhone: '044-27442220',
      policeStation: 'Mamallapuram Tourist Police Station (Ph: 044-27442229)',
      policePhone: '044-27442229'
    },
    storyId: 'story-mahabalipuram'
  },
  {
    id: 'kodaikanal-mannavanur',
    name: 'Mannavanur Eco Village & Lake (Hidden Spot)',
    nameTa: 'மண்ணவனூர் சூழல் கிராமம் & ஏரி',
    district: 'Dindigul',
    category: 'hidden',
    isPopular: false,
    isHiddenSpot: true,
    images: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'A postcard-perfect farming hamlet 35 km from Kodaikanal with terraced cabbage fields, sheep research farms, serene lake coracle rides, and pine breezes.',
    descriptionTa: 'கொடைக்கானலிலிருந்து 35 கி.மீ தொலைவில் உள்ள இயற்கை எழில் கொஞ்சும் கிராமம். அமைதியான ஏரியும் பசுமைப் புல்வெளிகளும்.',
    historicalBackground: 'Traditional indigenous farming community that has preserved organic terraced agriculture and indigenous sheep rearing for over 200 years.',
    culturalImportance: 'Location of the Central Sheep & Wool Research Institute and high-altitude wetland ecosystem.',
    latitude: 10.2783,
    longitude: 77.3486,
    openingTime: '09:00 AM',
    closingTime: '05:00 PM',
    weeklyHoliday: 'Open all days',
    openHours24: { open: 9.0, close: 17.0 },
    entryFee: { adult: 50, child: 25, foreigner: 150, camera: 50 },
    bestTimeToVisit: 'October to May',
    estimatedVisitingDuration: '3 to 4 hours',
    accessibilityNotes: 'Scenic country road; grass meadows involve gentle walking.',
    estimatedTripExpense: 650,
    ratings: 4.8,
    reviewCount: 880,
    weatherInfo: { temp: 18, condition: 'Fresh Highland Air', humidity: 72 },
    nearbyAttractions: [
      { name: 'Kodaikanal Lake & Coaker’s Walk', distanceKm: 34.0 },
      { name: 'Pillar Rocks & Guna Caves', distanceKm: 38.0 },
      { name: 'Poombarai Village & Murugan Temple', distanceKm: 16.0 }
    ],
    localFoodSpecialties: ['Hill Garlic (Malai Poondu)', 'Fresh butter & homemade goat cheese', 'Steaming hot millet porridge'],
    transportation: {
      nearestBusStand: 'Kodaikanal Bus Stand (35 km)',
      nearestRailwayStation: 'Kodai Road Railway Station (KQN) - 115 km',
      busConnectivity: 'Government buses depart Kodaikanal bus stand at 6:30 AM, 12:00 PM, and 4:00 PM.',
      trainConnectivity: 'Kodai Road on Madurai-Dindigul line, followed by scenic ghat road cab.',
      taxiAvailability: 'Day-hire cabs from Kodaikanal town charge approx ₹1800-₹2400 for return trip.'
    },
    emergencyContacts: {
      hospital: 'Van Allen Hospital Kodaikanal (Ph: 04542-241273)',
      hospitalPhone: '04542-241273',
      policeStation: 'Kodaikanal Police Station (Ph: 04542-240333)',
      policePhone: '04542-240333'
    },
    storyId: 'story-mannavanur'
  },
  {
    id: 'kanyakumari-memorial',
    name: 'Vivekananda Rock Memorial & Thiruvalluvar Statue',
    nameTa: 'விவேகானந்தர் பாறை நினைவு மண்டபம் & திருவள்ளுவர் சிலை',
    district: 'Kanyakumari',
    category: 'popular',
    isPopular: true,
    isHiddenSpot: false,
    images: [
      'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'The southernmost tip of the Indian subcontinent (Triveni Sangam), where Swami Vivekananda meditated and the 133-foot stone statue of Tamil poet Thiruvalluvar stands tall.',
    descriptionTa: 'முக்கடல் சங்கமிக்கும் இந்தியாவின் தென் முனை. 133 அடி திருவள்ளுவர் சிலையும் விவேகானந்தர் பாறையும் கம்பீரக் காட்சி.',
    historicalBackground: 'Built in 1970 to honor Swami Vivekananda’s enlightenment here in 1892. The Thiruvalluvar statue by Dr. V. Ganapati Sthapati weighs over 7,000 tonnes, symbolizing the 133 chapters of Thirukkural.',
    culturalImportance: 'Tri-sea confluence of Indian Ocean, Arabian Sea, and Bay of Bengal. Rare geography where both sunrise and sunset can be viewed from the exact same beach.',
    latitude: 8.078,
    longitude: 77.555,
    openingTime: '08:00 AM',
    closingTime: '04:00 PM',
    weeklyHoliday: 'Open all days (Ferry subject to sea conditions)',
    openHours24: { open: 8.0, close: 16.0 },
    entryFee: { adult: 50, child: 25, foreigner: 200, camera: 30 },
    bestTimeToVisit: 'October to March (Chitra Pournami full moon in April is legendary)',
    estimatedVisitingDuration: '2.5 to 3.5 hours',
    accessibilityNotes: 'Government Poompuhar ferry services have assisted ramps; life jackets mandatory.',
    estimatedTripExpense: 500,
    ratings: 4.8,
    reviewCount: 4120,
    weatherInfo: { temp: 29, condition: 'Breezy & Sunny', humidity: 76 },
    nearbyAttractions: [
      { name: 'Padmanabhapuram Wooden Palace', distanceKm: 34.0 },
      { name: 'Suchindram Thanumalayan Temple', distanceKm: 12.0 },
      { name: 'Vattakottai Fort (Circular Seaside Fort)', distanceKm: 6.5 }
    ],
    localFoodSpecialties: ['Nanjil Nadu Fish Curry & Red Rice', 'Banana Chips in Pure Coconut Oil', 'Marthandam Forest Honey'],
    transportation: {
      nearestBusStand: 'Kanyakumari Central Bus Terminal (1.0 km)',
      nearestRailwayStation: 'Kanyakumari Railway Station (CAPE) - 1.2 km',
      busConnectivity: 'Direct express buses to Chennai, Madurai, Trivandrum, and Bangalore.',
      trainConnectivity: 'Direct long-distance trains from Jammu Tawi, Dibrugarh, Mumbai, and Delhi.',
      taxiAvailability: 'Local auto stands and taxis line the beach road and railway exit.'
    },
    emergencyContacts: {
      hospital: 'Kanyakumari Government Hospital (Ph: 04652-246234)',
      hospitalPhone: '04652-246234',
      policeStation: 'Kanyakumari Marine & Coastal Police Station (Ph: 04652-246222)',
      policePhone: '04652-246222'
    },
    storyId: 'story-kanyakumari'
  },
  {
    id: 'hogenakkal-falls',
    name: 'Hogenakkal Waterfalls (Niagara of India)',
    nameTa: 'ஒகேனக்கல் நீர்வீழ்ச்சி',
    district: 'Dharmapuri',
    category: 'waterfalls',
    isPopular: true,
    isHiddenSpot: false,
    images: [
      'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'The thundering Kaveri River cuts through ancient carbonatite rocks, creating mist that looks like smoke ("Hoge" = smoke, "Kal" = rock). Famous for coracle rides.',
    descriptionTa: 'காவிரி ஆற்றின் கம்பீரப் பிரவாகம். பரிசல் சவாரியும் மூலிகை எண்ணெய்க் குளியலும் புகழ்பெற்ற அனுபவம்.',
    historicalBackground: 'The carbonatite rock formations here are among the oldest geological structures in South Asia, dating back over 2 billion years.',
    culturalImportance: 'Famous for traditional herbal oil massages and freshly caught river fish fry prepared by local boatmen communities.',
    latitude: 12.118,
    longitude: 77.776,
    openingTime: '06:00 AM',
    closingTime: '06:00 PM',
    weeklyHoliday: 'Open all days (Coracle rides suspended during peak flood warning)',
    openHours24: { open: 6.0, close: 18.0 },
    entryFee: { adult: 10, child: 5, foreigner: 50, camera: 30 },
    bestTimeToVisit: 'August to December (Good water volume after monsoon)',
    estimatedVisitingDuration: '3 to 5 hours',
    accessibilityNotes: 'Suspension bridge gives clear panoramic view; stairs lead to coracle boarding point.',
    estimatedTripExpense: 800,
    ratings: 4.6,
    reviewCount: 2240,
    weatherInfo: { temp: 28, condition: 'Humid & Misty', humidity: 75 },
    nearbyAttractions: [
      { name: 'Hogenakkal Crocodile Rehabilitation Park', distanceKm: 1.2 },
      { name: 'Pennagaram Town & Temple', distanceKm: 16.0 },
      { name: 'Theerthamalai Sacred Theertham', distanceKm: 65.0 }
    ],
    localFoodSpecialties: ['Fresh river Kendai fish fry on banana leaf', 'Ragi Mudde (Finger Millet Ball) & Country Chicken Curry'],
    transportation: {
      nearestBusStand: 'Pennagaram Bus Stand (16 km) / Dharmapuri Central (46 km)',
      nearestRailwayStation: 'Dharmapuri (DPJ) - 46 km / Salem Junction - 85 km',
      busConnectivity: 'Frequent TNSTC buses running every 20 minutes from Dharmapuri to Hogenakkal.',
      trainConnectivity: 'Trains to Dharmapuri on Bangalore-Salem route.',
      taxiAvailability: 'Private cabs easily hired from Dharmapuri railway station.'
    },
    emergencyContacts: {
      hospital: 'Government Hospital Pennagaram (Ph: 04342-255222)',
      hospitalPhone: '04342-255222',
      policeStation: 'Hogenakkal Police Station (Ph: 04342-256222)',
      policePhone: '04342-256222'
    },
    storyId: 'story-hogenakkal'
  },
  {
    id: 'chettinad-kanadukathan',
    name: 'Chettinad Heritage Mansions & Athangudi',
    nameTa: 'செட்டிநாடு பாரம்பரிய மாளிகைகள் & ஆத்தங்குடி',
    district: 'Sivaganga',
    category: 'heritage',
    isPopular: false,
    isHiddenSpot: true,
    images: [
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Palatial 19th-century mansions built by Nagarathar seafaring merchants with Burmese teak, Italian marble, Belgian crystal chandeliers, and handmade Athangudi tiles.',
    descriptionTa: 'பர்மா தேக்கு மரங்கள், இத்தாலிய பளிங்கு கற்கள், கைவினை ஆத்தங்குடி டைல்ஸ்களுடன் கட்டப்பட்ட செட்டிநாட்டு மாளிகைகள்.',
    historicalBackground: 'The Nagarathar trading community traded spices, gems, and textiles across Burma, Malaya, Ceylon, and Vietnam, channeling their global fortunes into building these self-sustaining mansions.',
    culturalImportance: 'Renowned globally for Chettinad culinary architecture, brass kitchenware craft, and traditional Kottan palm-leaf basketry.',
    latitude: 10.165,
    longitude: 78.784,
    openingTime: '09:00 AM',
    closingTime: '06:00 PM',
    weeklyHoliday: 'Open all days',
    openHours24: { open: 9.0, close: 18.0 },
    entryFee: { adult: 100, child: 50, foreigner: 200, camera: 50 },
    bestTimeToVisit: 'October to March',
    estimatedVisitingDuration: '4 hours to full day',
    accessibilityNotes: 'Most mansion ground courtyards are accessible on level flagstones.',
    estimatedTripExpense: 1100,
    ratings: 4.8,
    reviewCount: 1320,
    weatherInfo: { temp: 30, condition: 'Warm & Dry', humidity: 50 },
    nearbyAttractions: [
      { name: 'Athangudi Handmade Tile Workshops', distanceKm: 12.0 },
      { name: 'Karaikudi Antique Street & Pillayarpatti Temple', distanceKm: 14.0 },
      { name: 'Kundrakudi Murugan Kovil', distanceKm: 18.0 }
    ],
    localFoodSpecialties: ['Chettinad Kozhi Varuval (Pepper Chicken)', 'Kuzhi Paniyaram with Tomato Thokku', 'Seeyam & Kandharappam'],
    transportation: {
      nearestBusStand: 'Karaikudi Central Bus Stand (14 km)',
      nearestRailwayStation: 'Karaikudi Junction (KKDI) - 13 km / Chettinad Station (CNND) - 3 km',
      busConnectivity: 'Local town buses connect Karaikudi to Kanadukathan every 30 minutes.',
      trainConnectivity: 'Karaikudi connects via Pallavan Express and Rameswaram Express to Chennai.',
      taxiAvailability: 'Heritage homestays arrange autos, taxis, and heritage cycle tours.'
    },
    emergencyContacts: {
      hospital: 'Government District Headquarters Hospital Karaikudi (Ph: 04565-238240)',
      hospitalPhone: '04565-238240',
      policeStation: 'Kanadukathan Police Station (Ph: 04565-273222)',
      policePhone: '04565-273222'
    },
    storyId: 'story-chettinad'
  },
  {
    id: 'kolli-hills-agaya-gangai',
    name: 'Kolli Hills & Agaya Gangai Falls (Hidden Spot)',
    nameTa: 'கொல்லிமலை & ஆகாய கங்கை நீர்வீழ்ச்சி',
    district: 'Namakkal',
    category: 'hidden',
    isPopular: false,
    isHiddenSpot: true,
    images: [
      'https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'An unexplored mountain of medicine with 70 continuous hairpin bends, medicinal herbs, Arapaleeswarar temple, and the magnificent 300-foot Agaya Gangai waterfall.',
    descriptionTa: '70 கொண்டை ஊசி வளைவுகளுடன் கூடிய மூலிகை மலை. 300 அடி உயரத்திலிருந்து விழும் ஆகாய கங்கை நீர்வீழ்ச்சி.',
    historicalBackground: 'Ruled in the Sangam era by the legendary philanthropic king Valvil Ori, famous for his unmatched archery skill celebrated in Purananuru poetry.',
    culturalImportance: 'Revered as a Siddha medicine haven. The cool waters of Agaya Gangai are believed to wash through dense medicinal herbs in the Eastern Ghats.',
    latitude: 11.2825,
    longitude: 78.3375,
    openingTime: '06:00 AM',
    closingTime: '05:30 PM',
    weeklyHoliday: 'Open all days',
    openHours24: { open: 6.0, close: 17.5 },
    entryFee: { adult: 20, child: 10, foreigner: 50, camera: 30 },
    bestTimeToVisit: 'September to February (Lush greenery and steady stream)',
    estimatedVisitingDuration: 'Half day (1000 steep stone steps descend to falls)',
    accessibilityNotes: 'Trek down to waterfall requires good physical stamina (1,000 steps); viewpoint at top is wheelchair-friendly.',
    estimatedTripExpense: 600,
    ratings: 4.7,
    reviewCount: 920,
    weatherInfo: { temp: 22, condition: 'Refreshing Hill Breeze', humidity: 65 },
    nearbyAttractions: [
      { name: 'Arapaleeswarar Temple (Sangam period shrine)', distanceKm: 0.5 },
      { name: 'Seekuparai & Selur Viewpoints', distanceKm: 9.0 },
      { name: 'Masila Falls & Herbal Botanical Garden', distanceKm: 12.0 }
    ],
    localFoodSpecialties: ['Organic Kolli Jackfruit & Wild Honey', 'Spicy Country Chicken Masala with Parotta', 'Thinai (Foxtail Millet) Laddu'],
    transportation: {
      nearestBusStand: 'Semmedu Bus Stand (Kolli Hills top) / Namakkal Bus Stand (55 km)',
      nearestRailwayStation: 'Salem Junction (SA) - 90 km / Namakkal (NMKL) - 55 km',
      busConnectivity: 'Direct TNSTC buses climb up from Namakkal and Salem throughout the day.',
      trainConnectivity: 'Namakkal and Salem connected on the Bangalore-Madurai railway grid.',
      taxiAvailability: 'Experienced mountain taxis available at the base town of Kalappanaickenpatti.'
    },
    emergencyContacts: {
      hospital: 'Government Hospital Semmedu, Kolli Hills (Ph: 04286-247230)',
      hospitalPhone: '04286-247230',
      policeStation: 'Kolli Hills Semmedu Police Station (Ph: 04286-247222)',
      policePhone: '04286-247222'
    },
    storyId: 'story-kolli-hills'
  }
];

export const STORIES: Story[] = [
  {
    id: 'story-thanjavur-big-temple',
    destinationId: 'thanjavur-big-temple',
    destinationName: 'Brihadisvara Temple (The Big Temple)',
    title: 'The Capstone Mystery and The Grand Vision of Raja Raja Chola',
    titleTa: 'தஞ்சைப் பெருவுடையார் கோயிலும் 80 டன் சிகரக் கல் அதிசயமும்',
    type: 'historical_fact',
    historicalEra: 'Chola Dynasty (1010 CE)',
    summary: 'How ancient Tamil engineers moved an 80-tonne single granite block to a height of 216 feet without modern cranes, and why the temple cast no noon shadow.',
    contentEn: `In the year 1004 CE, Emperor Raja Raja Chola I envisioned an architectural wonder that would embody the boundless sovereignty of Lord Shiva and the zenith of the Chola realm. 

Granite does not naturally occur in the Thanjavur river delta. The builders brought over 130,000 tonnes of heavy granite stones from quarries near Tiruchirappalli across the Kaveri river using rafts, timber rollers, and war elephants.

The crowning glory is the Kumbam—the top dome capstone. Weighing a staggering 80 tonnes, this monolithic stone was hoisted to a dizzying height of 216 feet (66 meters). Inscriptions and architectural studies reveal that Chola engineers constructed a gentle earthen ramp spanning almost six kilometers from the village of Sarapallam. Teams of elephants and thousands of workers hauled the stone up this inclined earthen ramp on timber rollers over several years.

Contrary to the popular urban myth that the shadow never touches the ground, the shadow falls only within the temple complex itself. The temple remains a marvel of interlocking stone architecture built without a single drop of mortar.`,
    contentTa: `கி.பி 1004-ல் இராஜராஜ சோழ மன்னன், தமிழ் கலாச்சாரத்தின் மகுடமாக தஞ்சை பெருவுடையார் கோயிலை அமைக்கத் திட்டமிட்டார்.

தஞ்சாவூர் சமவெளிப் பகுதியில் கிரானைட் பாறைகள் கிடையாது. திருச்சிக்கு அருகிலுள்ள நார்த்தாமலை பகுதியிலிருந்து காவிரி நதி வழியாக மூங்கில் படகுகள் மற்றும் யானைகள் மூலம் சுமார் 1,30,000 டன் கிரானைட் பாறைகள் கொண்டுவரப்பட்டன.

கோயிலின் சிகரத்தில் உள்ள 80 டன் எடையுள்ள ஒரே கல் சிகரத்தை 216 அடி உயரத்திற்கு ஏற்றிய விதம் உலக அதிசயங்களில் ஒன்றாகும். சாரப்பள்ளம் என்ற கிராமத்திலிருந்து சுமார் 6 கி.மீ தொலைவுக்கு மணல் சாய்வுப் பாதை (Ramp) அமைத்து, யானைகள் மற்றும் உருளை மரக்கட்டைகள் மூலம் இக்கல் மேலே ஏற்றப்பட்டது என்று கல்வெட்டுகள் சான்றளிக்கின்றன.

சிமென்ட், சுண்ணாம்பு போன்ற எந்த பிணைப்புப் பொருட்களும் இன்றி, கற்களை ஒன்றுக்குள் ஒன்று பூட்டும் (Interlocking system) முறையில் இக்கோயில் 1000 ஆண்டுகளைக் கடந்து பூகம்பங்களையும் தாங்கி கம்பீரமாய் நிற்கிறது.`,
    keyCharacters: ['Raja Raja Chola I (Arulmozhivarman)', 'Kunjara Mallan Raja Raja Perunthachan (Chief Architect)', 'Kundavai Pirattiyar (Royal Sister)'],
    interestingFacts: [
      'The entire structure is made of 130,000 tonnes of granite, though no granite exists within 60 km of Thanjavur.',
      'The temple vimana was the tallest architectural structure in India when completed in 1010 CE.',
      'The massive monolithic Nandi statue at the entrance measures 12 feet high and 19 feet long.'
    ],
    images: [
      'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600100397608-f010f4438317?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    id: 'story-madurai-meenakshi',
    destinationId: 'madurai-meenakshi-temple',
    destinationName: 'Meenakshi Sundareswarar Temple',
    title: 'The Legend of the Fish-Eyed Queen and the Celestial Wedding',
    titleTa: 'மீன் போன்ற கண்களுடைய அரசியும் மதுரை திருக்கல்யாணமும்',
    type: 'mythology_legend',
    historicalEra: 'Pandya Dynasty & Nayak Renaissance',
    summary: 'The mythological origins of Queen Meenakshi born with three breasts from the sacred sacrificial fire, and her celestial coronation as the ruler of Madurai.',
    contentEn: `According to the sacred Thiruvilaiyadal Puranam, King Malayadhwaja Pandya and Queen Kanchanamala performed a yajna for a child. From the flames stepped a three-year-old girl with fish-shaped eyes (Meenakshi) and a third breast. A divine voice announced that her third breast would disappear the moment she laid eyes on her destined consort.

Trained as a fearless warrior princess, Meenakshi conquered all eight directions. When she reached Mount Kailash to face Lord Shiva, her third breast miraculously dissolved, and she recognized Shiva as Lord Sundareswarar.

They were wed in Madurai amidst all the celestial beings in a magnificent royal wedding. To this day, the annual Chithirai Festival reenacts this divine coronation and wedding, where Goddess Meenakshi receives the royal scepter to govern the kingdom of Madurai. This is why worshippers visit Goddess Meenakshi’s sanctum before Lord Sundareswarar’s.`,
    contentTa: `திருவிளையாடல் புராணத்தின் படி, மலையத்துவச பாண்டிய மன்னனும் காஞ்சனமாலையும் நடத்திய புத்திர காமேஷ்டி யாகத்தில் மூன்று முலைகளுடன் தோன்றிய தெய்வீகக் குழந்தையே மீனாட்சி. தன் மணாளனைக் காணும்போது மூன்றாவது முலை மறையும் என்பது அசரீரி வாக்கு.

அரசகுமாரியாக அனைத்து போர்க்கலைகளையும் கற்று, திக்கெட்டும் வெற்றி பெற்ற மீனாட்சி, கயிலாயத்தில் சிவபெருமானை நேருக்கு நேர் சந்தித்த கணம் மூன்றாவது முலை மறைந்தது.

மதுரையில் நடந்த அவர்களின் தெய்வீகத் திருமணமே ஆண்டுதோறும் 'சித்திரைத் திருவிழா'வாக கோடிக்கணக்கான மக்களால் கொண்டாடப்படுகிறது. மதுரையின் உண்மையான அரசியாக மீனாட்சியே கருதப்படுவதால், இன்றும் கோயிலில் அன்னையை வழிபட்ட பிறகே சுந்தரேசுவரரை வழிபடும் மரபு உள்ளது.`,
    keyCharacters: ['Goddess Meenakshi (Tadaatagai)', 'Lord Sundareswarar', 'Malayadhwaja Pandya', 'Thirumalai Nayakkar'],
    interestingFacts: [
      'The temple complex has over 33,000 stone and stucco sculptures.',
      'The Hall of Thousand Pillars actually has 985 exquisitely carved pillars, two of which produce musical notes when tapped.',
      'The lotus pond (Potramarai Kulam) was where ancient Sangam poets evaluated literary manuscripts.'
    ],
    images: [
      'https://images.unsplash.com/photo-1605649487212-47bdab064df8?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    id: 'story-dhanushkodi',
    destinationId: 'dhanushkodi-ghost-town',
    destinationName: 'Dhanushkodi Beach & Ghost Town',
    title: 'The Ghost Port of the Boat Mail and the Vanishing Sands',
    titleTa: 'போட் மெயில் ரயிலும் புயலில் மறைந்த தனுஷ்கோடி நகரமும்',
    type: 'historical_fact',
    historicalEra: '1964 Ceylon Ferry Era',
    summary: 'The fateful December night in 1964 when a super cyclone submerged a passenger train and erased an international transit town, leaving a haunting paradise.',
    contentEn: `Until December 1964, Dhanushkodi was a bustling international transit point. Passengers could board the legendary Boat Mail Express at Egmore station in Madras, travel by rail right onto the Dhanushkodi pier, and seamlessly board the Ceylon ferry to Talaimannar in Sri Lanka on a single railway ticket.

On the fateful night of December 22, 1964, an unprecedented super-cyclone generated 20-foot tidal waves that engulfed the entire spit of land. Train No. 653, with 115 passengers and crew, was swept into the roaring Palk Strait as it approached Dhanushkodi station. Over 1,800 lives were claimed in hours.

The Madras government subsequently declared the town unfit for human habitation. Today, the skeletal remnants of the railway station, church, post office, and school stand against pristine turquoise waters—a silent, majestic monument to nature’s raw power and human resilience.`,
    contentTa: `1964 டிசம்பர் வரை, தனுஷ்கோடி இந்தியா மற்றும் இலங்கையை இணைக்கும் சர்வதேச துறைமுக நகரமாக திகழ்ந்தது. சென்னை எழும்பூரிலிருந்து புறப்படும் 'போட் மெயில்' ரயில் தனுஷ்கோடி வரை சென்று, அங்கிருந்து கப்பல் மூலம் இலங்கைக்கு பயணிகள் சென்றனர்.

1964 டிசம்பர் 22 நள்ளிரவில் வீசிய கோரப் புயலில் 20 அடி உயர கடல் அலைகள் தனுஷ்கோடியை மூழ்கடித்தன. 115 பயணிகளுடன் வந்த ரயில் நடுக்கடலில் அடித்துச் செல்லப்பட்டது. 1,800-க்கும் மேற்பட்டோர் உயிரிழந்தனர்.

அதன் பின் மனிதர்கள் வசிக்கத் தகுதியற்ற நகரமாக அறிவிக்கப்பட்ட தனுஷ்கோடியில், இன்றும் சிதைந்த ரயில் நிலையம், தேவாலயம், பள்ளிக் கூடம் ஆகியவை இயற்கையின் பேரமைதியோடு காட்சியளிக்கின்றன.`,
    keyCharacters: ['Boat Mail Express Crew', 'Pamban Port Pilots', 'Fisherman Communities of Arichal Munai'],
    interestingFacts: [
      'Sri Lanka is only 18 nautical miles (about 29 km) away from Arichal Munai, making mobile phones catch Sri Lankan signals occasionally.',
      'NASA satellite imagery famously identified limestone shoals extending from Dhanushkodi to Mannar Island, matching the ancient Ram Setu descriptions.',
      'The newly built National Highway 87 connects Rameswaram straight to the edge of the Indian Ocean.'
    ],
    images: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    id: 'story-nilgiri-railway',
    destinationId: 'nilgiri-mountain-railway',
    destinationName: 'Nilgiri Mountain Railway',
    title: 'The Swiss Engineering Miracle of the Blue Mountain Train',
    titleTa: 'நீலகிரி மலை ரயிலும் சுவிஸ் பொறியியல் அதிசயமும்',
    type: 'historical_fact',
    historicalEra: 'Colonial Era (1899 - 1908 CE)',
    summary: 'How pioneering railway engineers solved the impossible gradient of the Western Ghats using the patented Abt rack-and-pinion system.',
    contentEn: `In the 19th century, British administrators retreating from Madras's scorching summer heat sought a comfortable way into the cool Nilgiris. Ordinary trains slip when the gradient exceeds 1 in 40; the Nilgiris climb at an astonishing 1 in 12.5.

Swiss inventor Roman Abt had patented a system using dual toothed rack bars between the regular rails. A cogwheel under the locomotive locks into these teeth, mechanically pulling the train uphill and preventing it from rolling backwards on descents.

After grueling decades of blasting granite tunnels and braving malaria in the Kallar jungles, the line opened to traffic in 1908. To this day, the X-class steam engines (made by SLM in Switzerland and Golden Rock Workshop in Trichy) push the coaches from behind on the uphill journey, ensuring passenger safety if a coupling ever snaps.`,
    contentTa: `சென்னையின் கொளுத்தும் வெயிலில் இருந்து தப்பிக்க பிரிட்டிஷார் ஊட்டியைத் தேர்ந்தெடுத்தபோது, செங்குத்தான மலைப்பாதையில் ரயிலை இயக்குவது பெரும் சவாலாக இருந்தது.

சுவிட்சர்லாந்து பொறியாளர் ரோமன் ஆப்ட் கண்டுபிடித்த 'பல்சக்கர அமைப்பு' (Rack and Pinion) மூலம் இரண்டு தண்டவாளங்களுக்கு இடையே கூடுதல் பல்சக்கர இரும்புத் தடம் அமைக்கப்பட்டது.

1908-ல் மக்கள் பயன்பாட்டுக்கு வந்த இந்த மலை ரயில் பாதையில் 16 குகைகளும் 250 பாலங்களும் உள்ளன. இன்றும் என்ஜின் ரயிலின் பின்னால் நின்று தள்ளிக்கொண்டு செல்வது, பாதுகாப்புக்கான தனித்துவமான அமைப்பாகும்.`,
    keyCharacters: ['Roman Abt (Inventor)', 'Major J.L.L. Morant (Engineer)', 'Golden Rock Railway Workshop Artisans'],
    interestingFacts: [
      'It has the steepest track of any operational railway in all of Asia (8.33% slope gradient).',
      'It was declared a UNESCO World Heritage Site in 2005 alongside the Darjeeling Himalayan Railway.',
      'The train travels at a leisurely 10 to 12 km/h, allowing travelers to smell eucalyptus and wild tea as they ride.'
    ],
    images: [
      'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    id: 'story-chettinad',
    destinationId: 'chettinad-kanadukathan',
    destinationName: 'Chettinad Heritage Mansions',
    title: 'The Seafaring Merchant Aristocracy and the Mansion Palaces',
    titleTa: 'செட்டிநாட்டு தனவணிகர்களும் அரண்மனை மாளிகைகளும்',
    type: 'cultural_heritage',
    historicalEra: '1850 - 1930 CE',
    summary: 'How the Nagarathars accumulated fortunes across Southeast Asia and channeled them into constructing grand, self-cooling mansions spanning city blocks.',
    contentEn: `The Nagarathars, also known as Nattukottai Chettiars, trace their ancestry to the ancient Chola port of Kaveripoompattinam (Poompuhar). Following a legendary tidal flood, they migrated inland to the dry semi-arid plains of Sivaganga and Pudukkottai.

Between 1850 and 1930, their merchant fleets financed rubber, banking, and rice trades in Burma, Ceylon, Vietnam, and Malaysia. They sent home raw materials: teak logs from Mandalay, glazed tiles from Minton England, and crystal chandeliers from Venice.

The mansions were built with ingenious climate engineering. Long central courtyards (Valavu) channel cooling updrafts, while thick walls coated with egg-white, seashell lime, and limestone plaster keep room temperatures 6 to 8 degrees cooler than the outside sun.`,
    contentTa: `பூம்புகார் கடற்கரையில் வணிகம் செய்து வந்த நகரத்தார் பெருமக்கள், பெரும் ஆழிப்பேரலைக்குப் பின் சிவகங்கை சமவெளிப் பகுதிக்கு குடிபெயர்ந்தனர்.

19-ம் நூற்றாண்டில் பர்மா, இலங்கை, மலேசியா, வியட்நாம் உள்ளிட்ட நாடுகளுடன் கடல்வழி வணிகம் செய்து பொருளீட்டிய இவர்கள், உலகின் தலைசிறந்த மூலப்பொருட்களைக் கொண்டு தங்கள் சொந்த ஊர்களில் மாபெரும் மாளிகைகளை எழுப்பினர்.

பர்மா தேக்குத் தூண்கள், பெல்ஜியம் கண்ணாடிகள், முட்டை வெள்ளைக்கருவும் கிளிஞ்சல் சுண்ணாம்பும் கொண்டு பளபளப்பாக்கப்பட்ட குளிர்ச்சி தரும் சுவர்கள் இம்மாளிகைகளின் தனிப்பெரும் அடையாளங்கள் ஆகும்.`,
    keyCharacters: ['Raja Sir Annamalai Chettiar', 'Athangudi Tile Guild Masters', 'Nagarathar Merchant Families'],
    interestingFacts: [
      'Many Chettinad mansions have over 50 rooms and two to three successive inner courtyards.',
      'Athangudi tiles are made individually by hand using local river sand, cement, and glass molds.',
      'Chettinad cuisine features over 20 roasted spices, with black peppercorns replacing heavy red chillies.'
    ],
    images: [
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80'
    ]
  }
];

export const HOTELS: Hotel[] = [
  {
    id: 'hotel-visalam-chettinad',
    name: 'Visalam - CGH Earth Heritage Palace',
    district: 'Sivaganga',
    destinationId: 'chettinad-kanadukathan',
    category: 'homestay',
    pricePerNight: 7200,
    rating: 4.9,
    reviewsCount: 312,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    address: '73, Kanadukathan Main Road, Chettinad, Sivaganga',
    distanceFromAttraction: '0.4 km from Kanadukathan Palace',
    facilities: ['Swimming Pool', 'Authentic Chettinad Dining', 'Free Wi-Fi', 'Heritage Cycle Tours', 'Tile Workshop Visit'],
    checkInTime: '02:00 PM',
    checkOutTime: '11:00 AM',
    contactPhone: '+91 4565 273222',
    verified: true
  },
  {
    id: 'hotel-heritage-madurai',
    name: 'Heritage Madurai Resort',
    district: 'Madurai',
    destinationId: 'madurai-meenakshi-temple',
    category: 'luxury',
    pricePerNight: 5800,
    rating: 4.8,
    reviewsCount: 640,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
    address: '11, Melakkal Main Road, Kochadai, Madurai',
    distanceFromAttraction: '3.8 km from Meenakshi Temple',
    facilities: ['Olympic Temple Pool', 'Ayurvedic Spa', 'Banyan Tree Restaurant', 'Free Wi-Fi', 'Free Valet Parking'],
    checkInTime: '02:00 PM',
    checkOutTime: '12:00 PM',
    contactPhone: '+91 452 2385455',
    verified: true
  },
  {
    id: 'hotel-sangam-thanjavur',
    name: 'Hotel Sangam Thanjavur',
    district: 'Thanjavur',
    destinationId: 'thanjavur-big-temple',
    category: 'family',
    pricePerNight: 3400,
    rating: 4.6,
    reviewsCount: 520,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
    address: 'Trichy Road, Opp. Gandhi Nagar, Thanjavur',
    distanceFromAttraction: '1.2 km from Big Temple',
    facilities: ['Vegetarian & Multi-Cuisine Dining', 'Swimming Pool', 'Bar', 'Travel Desk', 'Wheelchair Accessible'],
    checkInTime: '12:00 PM',
    checkOutTime: '11:00 AM',
    contactPhone: '+91 4362 239898',
    verified: true
  },
  {
    id: 'hotel-savoy-ooty',
    name: 'Savoy - IHCL SeleQtions Ooty',
    district: 'Nilgiris',
    destinationId: 'nilgiri-mountain-railway',
    category: 'resort',
    pricePerNight: 9500,
    rating: 4.9,
    reviewsCount: 480,
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80',
    address: '77, Sylks Road, Ooty, Nilgiris',
    distanceFromAttraction: '1.5 km from Ooty Railway Station',
    facilities: ['Colonial Fireplace Rooms', 'English High Tea', 'Spa Sanctuary', 'Lush Gardens', 'Free Wi-Fi'],
    checkInTime: '02:00 PM',
    checkOutTime: '12:00 PM',
    contactPhone: '+91 423 2225500',
    verified: true
  },
  {
    id: 'hotel-daiwik-rameswaram',
    name: 'Daiwik Hotel Rameswaram',
    district: 'Ramanathapuram',
    destinationId: 'dhanushkodi-ghost-town',
    category: 'family',
    pricePerNight: 3200,
    rating: 4.7,
    reviewsCount: 890,
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80',
    address: 'NH 49, Near Rameswaram Railway Station, Rameswaram',
    distanceFromAttraction: '18 km from Dhanushkodi Beach',
    facilities: ['Pure Veg Aahaar Restaurant', 'Spiritual Spa', 'Free Temple Shuttle', '24/7 Room Service', 'Wi-Fi'],
    checkInTime: '12:00 PM',
    checkOutTime: '11:00 AM',
    contactPhone: '+91 4573 221777',
    verified: true
  },
  {
    id: 'hotel-sp-residency-kodaikanal',
    name: 'Sterling Kodai Lake Resort',
    district: 'Dindigul',
    destinationId: 'kodaikanal-mannavanur',
    category: 'resort',
    pricePerNight: 4900,
    rating: 4.7,
    reviewsCount: 710,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    address: 'Gymkhana Road, Near Lake, Kodaikanal',
    distanceFromAttraction: '32 km from Mannavanur',
    facilities: ['Lake View Cottages', 'Bonfire & Stargazing', 'Indoor Games', 'Multi-Cuisine Restaurant', 'Wi-Fi'],
    checkInTime: '01:00 PM',
    checkOutTime: '11:00 AM',
    contactPhone: '+91 4542 240600',
    verified: true
  }
];

export const RESTAURANTS: Restaurant[] = [
  {
    id: 'rest-murugan-idli-madurai',
    name: 'Murugan Idli Shop',
    district: 'Madurai',
    destinationId: 'madurai-meenakshi-temple',
    specialityDishes: ['Podi Idli with Ghee', 'Onion Uthappam', 'Four Variety Chutneys', 'Madurai Jigarthanda'],
    foodType: 'veg',
    priceRange: '₹',
    rating: 4.8,
    operatingHours: '06:30 AM - 11:00 PM',
    address: '196, West Masi Street, Madurai',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',
    contactPhone: '+91 452 2341379'
  },
  {
    id: 'rest-amudham-thanjavur',
    name: 'Sathars Restaurant & Thanjavur Mess',
    district: 'Thanjavur',
    destinationId: 'thanjavur-big-temple',
    specialityDishes: ['Traditional Thanjavur Banana Leaf Meals', 'Kadappa with Idli', 'Mutton Sukka', 'Ashoka Halwa'],
    foodType: 'both',
    priceRange: '₹₹',
    rating: 4.6,
    operatingHours: '11:30 AM - 10:30 PM',
    address: 'South Main Street, Near Old Bus Stand, Thanjavur',
    image: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80',
    contactPhone: '+91 4362 230456'
  },
  {
    id: 'rest-shree-anand-chettinad',
    name: 'The Bangala Dining Experience',
    district: 'Sivaganga',
    destinationId: 'chettinad-kanadukathan',
    specialityDishes: ['Chettinad Crab Curry', 'Vellai Paniyaram', 'Uppu Kari', 'Mutton Chops', 'Pineapple Rasam'],
    foodType: 'both',
    priceRange: '₹₹₹',
    rating: 4.9,
    operatingHours: '12:30 PM - 03:00 PM & 07:30 PM - 10:00 PM',
    address: 'Senjai, Karaikudi, Sivaganga',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
    contactPhone: '+91 4565 220221'
  },
  {
    id: 'rest-shary-jigarthanda-madurai',
    name: 'Famous Jigarthanda (Original Since 1977)',
    district: 'Madurai',
    destinationId: 'madurai-meenakshi-temple',
    specialityDishes: ['Special Ice Cream Jigarthanda', 'Basundi Jigarthanda', 'Badam Pisin Milk'],
    foodType: 'veg',
    priceRange: '₹',
    rating: 4.9,
    operatingHours: '09:00 AM - 11:30 PM',
    address: 'East Marret Street, Near St. Mary’s Cathedral, Madurai',
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80',
    contactPhone: '+91 98421 23456'
  },
  {
    id: 'rest-shinkows-ooty',
    name: 'Earl’s Secret & Shinkows',
    district: 'Nilgiris',
    destinationId: 'nilgiri-mountain-railway',
    specialityDishes: ['English Scones with Jam & Clotted Cream', 'Shepherd’s Pie', 'Nilgiri Lemon Tea', 'Steamed Dumplings'],
    foodType: 'both',
    priceRange: '₹₹',
    rating: 4.7,
    operatingHours: '11:00 AM - 10:00 PM',
    address: 'Havelock Road, Police Quarters, Ooty',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    contactPhone: '+91 423 2442382'
  }
];

export const TRANSPORT_ROUTES: TransportRoute[] = [
  {
    id: 'tr-setc-chennai-madurai',
    from: 'Chennai (Kilambakkam KCBT)',
    to: 'Madurai (Mattuthavani MIBT)',
    type: 'govt_bus',
    operator: 'SETC Tamil Nadu (State Express)',
    serviceName: 'AC Sleeper / Multi-Axle Ultra Deluxe',
    departureTime: '21:30 (Every 20 mins)',
    arrivalTime: '05:30 (+1 Day)',
    duration: '8 hrs',
    approxFare: 680,
    frequency: 'Hourly round the clock',
    bookingUrl: 'https://www.tnstc.in',
    officialNotes: 'Official government reservation available via TNSTC app or tnstc.in portal.'
  },
  {
    id: 'tr-vande-bharat-chennai-coimbatore',
    from: 'Chennai Central (MAS)',
    to: 'Coimbatore Junction (CBE)',
    type: 'train',
    operator: 'Southern Railway (Train 20643)',
    serviceName: 'Vande Bharat Express',
    departureTime: '06:10 AM',
    arrivalTime: '11:50 AM',
    duration: '5 hrs 40 mins',
    approxFare: 1365,
    frequency: 'Daily except Wednesdays',
    bookingUrl: 'https://www.irctc.co.in',
    officialNotes: 'Fastest connection between Chennai and Western Tamil Nadu.'
  },
  {
    id: 'tr-tnstc-coimbatore-ooty',
    from: 'Coimbatore (Gandhipuram Bus Stand)',
    to: 'Ooty Central Bus Stand',
    type: 'govt_bus',
    operator: 'TNSTC Coimbatore Region',
    serviceName: 'Point-to-Point Hill Rider Deluxe',
    departureTime: '05:00 AM (Every 15 mins)',
    arrivalTime: '08:30 AM',
    duration: '3.5 hrs',
    approxFare: 140,
    frequency: 'Every 15 minutes',
    bookingUrl: 'https://www.tnstc.in',
    officialNotes: 'Direct hill route climbing through Mettupalayam and Coonoor ghat roads.'
  },
  {
    id: 'tr-toy-train-mettupalayam-ooty',
    from: 'Mettupalayam (MTP)',
    to: 'Ooty (UAM)',
    type: 'train',
    operator: 'Southern Railway (NMR - Train 56136)',
    serviceName: 'Nilgiri Mountain Railway Heritage Steam',
    departureTime: '07:10 AM',
    arrivalTime: '12:00 PM',
    duration: '4 hrs 50 mins',
    approxFare: 205,
    frequency: 'Once daily morning service',
    bookingUrl: 'https://www.irctc.co.in',
    officialNotes: 'Advance IRCTC reservation strongly recommended 60-120 days prior.'
  },
  {
    id: 'tr-vaigai-chennai-madurai',
    from: 'Chennai Egmore (MS)',
    to: 'Madurai Junction (MDU)',
    type: 'train',
    operator: 'Southern Railway (Train 12635)',
    serviceName: 'Vaigai Superfast Express',
    departureTime: '13:50 PM',
    arrivalTime: '21:15 PM',
    duration: '7 hrs 25 mins',
    approxFare: 245,
    frequency: 'Daily service',
    bookingUrl: 'https://www.irctc.co.in',
    officialNotes: 'Iconic daytime train stopping at Villupuram, Trichy, and Dindigul.'
  },
  {
    id: 'tr-tnstc-madurai-rameswaram',
    from: 'Madurai (Mattuthavani)',
    to: 'Rameswaram Bus Terminal',
    type: 'govt_bus',
    operator: 'TNSTC Kumbakonam/Madurai',
    serviceName: 'Express Non-Stop Rider',
    departureTime: '06:00 AM (Every 30 mins)',
    arrivalTime: '09:45 AM',
    duration: '3 hrs 45 mins',
    approxFare: 165,
    frequency: 'Every 30 minutes',
    bookingUrl: 'https://www.tnstc.in',
    officialNotes: 'Crosses Ramanathapuram and the newly modernized coastal highway.'
  }
];

export const RENTAL_VEHICLES: RentalVehicle[] = [
  {
    id: 'rental-enfield-ooty',
    name: 'Royal Enfield Classic 350',
    type: 'bike',
    seatingCapacity: 2,
    pricePerDay: 1200,
    district: 'Nilgiris',
    image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80',
    provider: 'Nilgiri Mountain Moto Rentals',
    providerPhone: '+91 94432 11223',
    fuelType: 'Petrol',
    pickupLocation: 'Charring Cross, Ooty Central',
    terms: 'Valid driving license required. ₹2000 refundable security deposit. 2 helmets included.'
  },
  {
    id: 'rental-activa-madurai',
    name: 'Honda Activa 6G Scooter',
    type: 'scooter',
    seatingCapacity: 2,
    pricePerDay: 450,
    district: 'Madurai',
    image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=800&q=80',
    provider: 'Madurai City Self-Drive Wheels',
    providerPhone: '+91 98425 44556',
    fuelType: 'Petrol',
    pickupLocation: 'Near Madurai Railway Junction (Platform 1 exit)',
    terms: 'Original ID proof + ₹1000 security deposit. Unlimited kms within district.'
  },
  {
    id: 'rental-swift-chennai',
    name: 'Maruti Suzuki Swift (Self Drive)',
    type: 'car',
    seatingCapacity: 5,
    pricePerDay: 1900,
    district: 'Chennai',
    image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=800&q=80',
    provider: 'Tamil Nadu Wheels Drive Co.',
    providerPhone: '+91 98840 77889',
    fuelType: 'Petrol / Automatic',
    pickupLocation: 'Chennai Airport T1 / Guindy Metro Hub',
    terms: 'Valid 4-wheeler license. Fastag pre-loaded. 24/7 roadside breakdown assistance.'
  },
  {
    id: 'rental-innova-coimbatore',
    name: 'Toyota Innova Crysta (with Chauffeur)',
    type: 'suv',
    seatingCapacity: 7,
    pricePerDay: 3800,
    district: 'Coimbatore',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
    provider: 'Kongu Tourist Chauffeur Services',
    providerPhone: '+91 94422 88990',
    fuelType: 'Diesel',
    pickupLocation: 'Coimbatore Airport / Junction / Doorstep',
    terms: 'Experienced ghat road driver. Includes 250 km/day. Clean AC vehicle.'
  }
];

export const EVENTS: EventFestival[] = [
  {
    id: 'event-pongal-jallikattu',
    name: 'Pongal Harvest & Alanganallur Jallikattu',
    nameTa: 'பொங்கல் திருநாள் & அலங்காநல்லூர் ஜல்லிக்கட்டு',
    district: 'Madurai',
    category: 'cultural',
    date: 'January 14 - 17 annually',
    description: 'Tamil Nadu’s biggest cultural harvest festival featuring bull-taming valor, sweet sugarcane, kolam rangolis, and community worship.',
    venue: 'Alanganallur Arena, Madurai & villages statewide',
    ticketPrice: 'Free general admission (Gallery passes via district portal)',
    organizer: 'Government of Tamil Nadu Tourism & Animal Husbandry Dept',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
    highlights: ['Native Pulikulam and Kangayam bulls', 'Traditional Nadhaswaram performances', 'Clay pot sweet Pongal making']
  },
  {
    id: 'event-chithirai-thiruvizha',
    name: 'Madurai Chithirai Thiruvizha & Kallazhagar Entry',
    nameTa: 'மதுரை சித்திரைத் திருவிழா & கள்ளழகர் வைகை ஆற்றில் இறங்குதல்',
    district: 'Madurai',
    category: 'temple',
    date: 'April - May (Chithirai Tamil Month)',
    description: 'A 12-day spectacle drawing over a million devotees to witness Meenakshi’s coronation and Lord Kallazhagar riding into the Vaigai river on a golden horse.',
    venue: 'Madurai Meenakshi Temple & Vaigai Riverbed',
    ticketPrice: 'Free entry for all pilgrims',
    organizer: 'Arulmigu Meenakshi Sundareswarar Thirukoil Devasthanam',
    image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df8?auto=format&fit=crop&w=800&q=80',
    highlights: ['Grand Temple Car Chariot pulling', 'Celestial Divine Wedding ceremony', 'Golden horse river entry in emerald robes']
  },
  {
    id: 'event-mamallapuram-dance',
    name: 'Mamallapuram Indian Dance Festival',
    nameTa: 'மாமல்லபுரம் இந்திய நாட்டிய விழா',
    district: 'Chengalpattu',
    category: 'music_dance',
    date: 'December 25 - January 25 annually',
    description: 'A month-long open-air festival where classical Bharatanatyam, Kathakali, Kuchipudi, and Odissi exponents perform against the floodlit 7th-century rock reliefs.',
    venue: 'Arjuna’s Penance Open Air Stage, Mahabalipuram',
    ticketPrice: 'Free admission with archaeological monument ticket',
    organizer: 'Department of Tourism, Government of Tamil Nadu',
    image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80',
    highlights: ['Performances backdropped by ancient rock sculptures', 'Folk dances including Karagattam and Kavadi Attam', 'Seaside winter evening breeze']
  },
  {
    id: 'event-ooty-flower-show',
    name: 'Annual Ooty Flower Show & Fruit Festival',
    nameTa: 'ஊட்டி மலர்க் கண்காட்சி & பழக் கண்காட்சி',
    district: 'Nilgiris',
    category: 'seasonal',
    date: 'May 15 - 25 annually',
    description: 'Over 200,000 potted plants and intricate botanical floral sculptures displayed across the 55-acre heritage Government Botanical Garden in Ooty.',
    venue: 'Government Botanical Gardens, Ooty',
    ticketPrice: '₹50 Adults, ₹30 Children',
    organizer: 'Tamil Nadu Horticulture Department',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
    highlights: ['50-foot tall floral replicas', 'Exotic orchid and bonsai galleries', 'Summer music concerts in the hills']
  }
];

export const SPECIAL_OFFERS: SpecialOffer[] = [
  {
    id: 'offer-vanakkam15',
    title: 'Vanakkam Tamil Nadu - New Explorer Discount',
    code: 'VANAKKAM15',
    discount: '15% OFF',
    category: 'package',
    validUntil: 'Valid on first reservation',
    description: 'Get an instant 15% discount on all heritage tour packages and curated homestays across Tamil Nadu.',
    eligibility: 'All newly registered TN Stories explorers',
    terms: 'Applicable on bookings of ₹2000 or above. Maximum discount ₹1500.'
  },
  {
    id: 'offer-templepass',
    title: 'Spiritual Circuit Audio Guide Pass',
    code: 'TEMPLESTORY',
    discount: '100% FREE',
    category: 'package',
    validUntil: 'Active unlimited',
    description: 'Unlock unlimited Tamil & English audio guides and architectural stories for all 15+ major shrines.',
    eligibility: 'Available to all logged-in members',
    terms: 'No booking fee required. Stream or listen offline anytime.'
  },
  {
    id: 'offer-rideeasy',
    title: 'Nilgiri & Madurai Scooter Rental Promo',
    code: 'TNRIDE20',
    discount: '₹200 OFF',
    category: 'vehicle',
    validUntil: 'Valid this season',
    description: 'Flat ₹200 concession on 2-day bike or scooter rentals in Ooty, Kodaikanal, and Madurai.',
    eligibility: 'Applicable on 48-hr rental reservations',
    terms: 'Valid on verified rental partner fleets.'
  }
];

export const TOUR_PACKAGES: TourPackage[] = [
  {
    id: 'pkg-chola-dynasty',
    title: 'The Great Chola Kingdom Trail',
    subtitle: 'UNESCO Living Chola Temples & Delta Heritage',
    duration: '3 Days / 2 Nights',
    category: 'heritage',
    price: 6499,
    destinationsCovered: ['Thanjavur Big Temple', 'Gangaikonda Cholapuram', 'Darasuram Airavatesvara', 'Pichavaram Mangrove'],
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
    inclusions: [
      '2 Nights AC Heritage Homestay / 3-Star Hotel',
      'Dedicated AC chauffeur-driven transport',
      'Certified historian guide at all UNESCO monuments',
      'Traditional Thanjavur banana leaf meals & breakfasts',
      'Pichavaram row boat canal pass'
    ],
    exclusions: ['Air/Train fare to starting city', 'Personal camera charges', 'Tips and personal shopping'],
    itinerarySummary: [
      'Day 1: Arrive Thanjavur, Big Temple architecture tour & Saraswathi Mahal Palace.',
      'Day 2: Gangaikonda Cholapuram & Darasuram musical stone pillars.',
      'Day 3: Sunrise boat ride through Pichavaram Mangrove labyrinth & departure.'
    ],
    availableDates: ['Every Friday & Saturday', 'Custom dates for groups of 4+'],
    cancellationPolicy: 'Free cancellation up to 48 hours prior to departure.'
  },
  {
    id: 'pkg-western-ghats-tea',
    title: 'Western Ghats Clouds & Secret Valleys',
    subtitle: 'Nilgiri Heritage Train, Avalanche & Coonoor High Seas',
    duration: '3 Days / 2 Nights',
    category: 'hills',
    price: 7899,
    destinationsCovered: ['Nilgiri Mountain Railway', 'Avalanche Lake', 'Doddabetta', 'Sim’s Park Coonoor'],
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
    inclusions: [
      '2 Nights stay in Colonial tea estate bungalow',
      'Confirmed 1st Class Nilgiri Heritage Toy Train tickets',
      'Forest department 4x4 safari permit for Avalanche Lake',
      'All breakfasts & tea factory tasting sessions',
      'Private hill-expert chauffeur'
    ],
    exclusions: ['Lunch and dinner meals outside itinerary', 'Personal riding gear'],
    itinerarySummary: [
      'Day 1: Board Nilgiri Toy Train at Mettupalayam, check into Ooty tea bungalow.',
      'Day 2: Morning safari to pristine Avalanche Lake & Emerald valley trek.',
      'Day 3: Tea tasting in Coonoor, Dolphin’s Nose viewpoint & return.'
    ],
    availableDates: ['Every Thursday & Saturday', 'Weekend departures weekly'],
    cancellationPolicy: '100% refund up to 72 hours before trip start.'
  },
  {
    id: 'pkg-southern-spiritual-coast',
    title: 'Sacred Lands & Ocean Edge Pilgrimage',
    subtitle: 'Madurai, Rameswaram, Dhanushkodi & Kanyakumari',
    duration: '4 Days / 3 Nights',
    category: 'spiritual',
    price: 8999,
    destinationsCovered: ['Meenakshi Temple', 'Ramanathaswamy 22 Theerthams', 'Dhanushkodi Land’s End', 'Vivekananda Rock Memorial'],
    image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df8?auto=format&fit=crop&w=800&q=80',
    inclusions: [
      '3 Nights Deluxe Hotel accommodation',
      'Comfortable AC SUV transport for all transfers',
      'Poompuhar Ferry VIP ticket at Kanyakumari',
      'Special darshan facilitation at Meenakshi & Rameswaram',
      'Daily South Indian vegetarian breakfast'
    ],
    exclusions: ['Special puja offerings', 'Individual water bath rituals'],
    itinerarySummary: [
      'Day 1: Madurai Meenakshi Temple & evening street food trail.',
      'Day 2: Drive across Pamban bridge to Rameswaram; holy theertham bath.',
      'Day 3: Sunrise at Dhanushkodi Arichal Munai; coastal drive to Kanyakumari.',
      'Day 4: Vivekananda Rock Memorial & Thiruvalluvar Statue; sunset viewing & departure.'
    ],
    availableDates: ['Daily on-demand departures', 'Group batches every Wednesday'],
    cancellationPolicy: 'Full refund if cancelled 4 days prior.'
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    destinationId: 'thanjavur-big-temple',
    userId: 'user-karthik',
    userName: 'Karthik S.',
    userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
    rating: 5,
    comment: 'Standing beneath the 216-foot vimana at sunset was a life-changing experience. The acoustic echo in the outer corridors and the story of how they hauled the 80-tonne granite capstone using the Sarapallam ramp made it ten times more magical!',
    visitDate: 'September 2026',
    travelType: 'Family Trip',
    createdAt: '2026-09-28',
    likes: 42
  },
  {
    id: 'rev-2',
    destinationId: 'dhanushkodi-ghost-town',
    userId: 'user-priya',
    userName: 'Priya Narayanan',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
    rating: 5,
    comment: 'The new highway all the way to Arichal Munai makes this so accessible now! Stand at the very tip where the rough Bay of Bengal meets the calm Indian Ocean. The silence of the 1964 cyclone church ruins is hauntingly beautiful.',
    visitDate: 'October 2026',
    travelType: 'Solo Traveler',
    createdAt: '2026-10-04',
    likes: 31
  },
  {
    id: 'rev-3',
    destinationId: 'nilgiri-mountain-railway',
    userId: 'user-aravind',
    userName: 'Aravind Menon',
    userAvatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&q=80',
    rating: 5,
    comment: 'Booked the morning train from Mettupalayam. The smell of steam, pine trees, and fresh mist as the cogwheels chug up the rack system is pure nostalgia. Truly a bucket list Indian journey!',
    visitDate: 'August 2026',
    travelType: 'Couples Trip',
    createdAt: '2026-08-19',
    likes: 19
  }
];
