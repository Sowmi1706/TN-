import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '../types';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    appName: 'TN Stories',
    tagline: 'Soul of Tamil Nadu: Discover Hidden Spots & Living Heritage',
    navHome: 'Home',
    navExplore: 'Explore',
    navStories: 'TN Stories',
    navTrips: 'AI Planner',
    navMap: 'Live Map',
    navTransport: 'Transport',
    navHotels: 'Stay',
    navFood: 'Local Food',
    navEmergency: 'Emergency',
    navProfile: 'Profile',
    navAdmin: 'Admin',
    searchPlaceholder: 'Search temples, hill stations, hidden gems, or districts...',
    categoryAll: 'All Destinations',
    categoryPopular: 'Popular Places',
    categoryHidden: 'Hidden Spots',
    categoryTemples: 'Temples & Shrines',
    categoryHistorical: 'Historical Monuments',
    categoryHills: 'Hill Stations',
    categoryBeaches: 'Beaches & Coast',
    categoryWaterfalls: 'Waterfalls',
    categoryWildlife: 'Wildlife & Nature',
    categoryAdventure: 'Adventure Spots',
    categoryHeritage: 'Heritage & Culture',
    categoryFamily: 'Family Friendly',
    categoryWeekend: 'Weekend Getaways',
    statusOpen: 'Open Now',
    statusClosed: 'Closed',
    entryFee: 'Entry Fee',
    freeEntry: 'Free Entry',
    viewDetails: 'Explore Place',
    discoverStory: 'Discover the Story',
    listenStory: 'Listen to Narration',
    planTrip: 'Plan Trip with AI',
    findTransport: 'Find Transport',
    bookStay: 'Book Stay',
    emergencyHelpline: 'Emergency 24x7',
    weather: 'Live Weather',
    directions: 'Get Directions',
    reviews: 'Reviews',
    writeReview: 'Share Experience',
    login: 'Log In',
    signup: 'Create Account',
    logout: 'Log Out',
    myWishlist: 'My Saved Places',
    myItineraries: 'Saved Trips',
    myBookings: 'My Bookings',
    aiAssistant: 'AI Travel Guide',
    verifiedLegend: 'Mythology & Sacred Legend',
    verifiedFact: 'Historically Verified Fact',
    culturalHeritage: 'Cultural Living Heritage',
    welcomeTitle: 'Vanakkam! Welcome to Tamil Nadu',
    welcomeSubtitle: 'Where ancient Chola temples meet mist-covered Western Ghats and living legends.',
    startExploring: 'Start Exploring',
    selectLanguage: 'Choose Preferred Language'
  },
  ta: {
    appName: 'TN கதைகள் (TN Stories)',
    tagline: 'தமிழ்நாட்டின் ஆன்மா: மறைந்த பொக்கிஷங்களும் வரலாற்றுப் பெருமைகளும்',
    navHome: 'முகப்பு',
    navExplore: 'சுற்றுலா தலங்கள்',
    navStories: 'தமிழ் கதைகள்',
    navTrips: 'AI பயணத் திட்டம்',
    navMap: 'வரைபடம்',
    navTransport: 'போக்குவரத்து',
    navHotels: 'தங்குமிடங்கள்',
    navFood: 'பாரம்பரிய உணவு',
    navEmergency: 'அவசர உதவி',
    navProfile: 'சுயவிவரம்',
    navAdmin: 'நிர்வாகம்',
    searchPlaceholder: 'கோயில்கள், மலைவாசஸ்தலங்கள், மறைந்த இடங்கள் அல்லது மாவட்டங்களைத் தேடுங்கள்...',
    categoryAll: 'அனைத்து இடங்கள்',
    categoryPopular: 'பிரபல இடங்கள்',
    categoryHidden: 'மறைந்த பொக்கிஷங்கள்',
    categoryTemples: 'கோயில்கள் & வழிபாட்டுத் தலங்கள்',
    categoryHistorical: 'வரலாற்றுச் சின்னங்கள்',
    categoryHills: 'மலைவாசஸ்தலங்கள்',
    categoryBeaches: 'கடற்கரைகள்',
    categoryWaterfalls: 'நீர்வீழ்ச்சிகள்',
    categoryWildlife: 'இயற்கை & சரணாலயங்கள்',
    categoryAdventure: 'சாகச சுற்றுலா',
    categoryHeritage: 'பாரம்பரிய கலைகள்',
    categoryFamily: 'குடும்ப சுற்றுலா',
    categoryWeekend: 'வார இறுதிப் பயணம்',
    statusOpen: 'தற்போது திறந்துள்ளது',
    statusClosed: 'தற்போது மூடப்பட்டுள்ளது',
    entryFee: 'நுழைவுக் கட்டணம்',
    freeEntry: 'இலவச அனுமதி',
    viewDetails: 'முழு விவரம்',
    discoverStory: 'இடத்தின் கதையைக் கேட்க',
    listenStory: 'ஒலிவடிவில் கேட்க',
    planTrip: 'AI உடன் பயணத் திட்டம்',
    findTransport: 'போக்குவரத்து விபரம்',
    bookStay: 'அறை முன்பதிவு',
    emergencyHelpline: 'அவசர உதவி 24x7',
    weather: 'தற்போதைய வானிலை',
    directions: 'வழிகாட்டுதல்',
    reviews: 'பயணிகளின் மதிப்புரைகள்',
    writeReview: 'அனுபவத்தைப் பகிர்க',
    login: 'உள்நுழைக',
    signup: 'புதிய கணக்கு',
    logout: 'வெளியேறு',
    myWishlist: 'விருப்பப் பட்டியல்',
    myItineraries: 'சேமித்த பயணங்கள்',
    myBookings: 'எனது முன்பதிவுகள்',
    aiAssistant: 'AI பயண வழிகாட்டி',
    verifiedLegend: 'புராணத் திருக்கதை & ஐதீகம்',
    verifiedFact: 'வரலாற்று ரீதியாக உறுதிப்படுத்தப்பட்ட உண்மை',
    culturalHeritage: 'வாழும் தமிழ் பண்பாடு',
    welcomeTitle: 'வணக்கம்! தமிழ்நாடு உங்களை வரவேற்கிறது',
    welcomeSubtitle: 'ஆயிரங்கால சோழர் கோயில்களும், பசுமை மேகக் காடுகளும் சங்கமிக்கும் புனித பூமி.',
    startExploring: 'பயணத்தைத் தொடங்குக',
    selectLanguage: 'மொழியைத் தேர்ந்தெடுக்கவும்'
  },
  hi: {
    appName: 'TN Stories (टीएन स्टोरीज)',
    tagline: 'तमिलनाडु की आत्मा: छुपे हुए पर्यटन स्थल और जीवंत धरोहर',
    navHome: 'होम',
    navExplore: 'स्थान खोजें',
    navStories: 'टीएन कहानियां',
    navTrips: 'एआई यात्रा योजना',
    navMap: 'नक्शा',
    navTransport: 'परिवहन',
    navHotels: 'होटल',
    navFood: 'स्थानीय भोजन',
    navEmergency: 'आपातकालीन',
    navProfile: 'प्रोफ़ाइल',
    navAdmin: 'व्यवस्थापक',
    searchPlaceholder: 'मंदिर, हिल स्टेशन, छिपे हुए स्थान या जिले खोजें...',
    categoryAll: 'सभी स्थान',
    categoryPopular: 'लोकप्रिय स्थान',
    categoryHidden: 'छिपे हुए स्थल',
    categoryTemples: 'मंदिर और तीर्थ',
    categoryHistorical: 'ऐतिहासिक स्मारक',
    categoryHills: 'हिल स्टेशन',
    categoryBeaches: 'समुद्र तट',
    categoryWaterfalls: 'झरने',
    categoryWildlife: 'वन्यजीव और प्रकृति',
    categoryAdventure: 'रोमांचक यात्रा',
    categoryHeritage: 'संस्कृति और विरासत',
    categoryFamily: 'पारिवारिक पर्यटन',
    categoryWeekend: 'सप्ताहांत यात्रा',
    statusOpen: 'अब खुला है',
    statusClosed: 'बंद है',
    entryFee: 'प्रवेश शुल्क',
    freeEntry: 'निःशुल्क प्रवेश',
    viewDetails: 'विस्तार से देखें',
    discoverStory: 'स्थान की कहानी जानें',
    listenStory: 'कहानी सुनें',
    planTrip: 'एआई के साथ योजना बनाएं',
    findTransport: 'परिवहन खोजें',
    bookStay: 'होटल बुक करें',
    emergencyHelpline: 'आपातकालीन सहायता',
    weather: 'मौसम',
    directions: 'दिशा-निर्देश',
    reviews: 'समीक्षाएं',
    writeReview: 'अनुभव साझा करें',
    login: 'लॉग इन',
    signup: 'खाता बनाएं',
    logout: 'लॉग आउट',
    myWishlist: 'पसंदीदा स्थान',
    myItineraries: 'सहेजी गई यात्राएं',
    myBookings: 'मेरी बुकिंग्स',
    aiAssistant: 'एआई टूर गाइड',
    verifiedLegend: 'पौराणिक कथा और मान्यता',
    verifiedFact: 'ऐतिहासिक रूप से सत्यापित तथ्य',
    culturalHeritage: 'जीवंत तमिल संस्कृति',
    welcomeTitle: 'வணக்கம்! तमिलनाडु में आपका स्वागत है',
    welcomeSubtitle: 'प्राचीन चोल मंदिरों और नीलगिरि की वादियों की खोज करें।',
    startExploring: 'यात्रा शुरू करें',
    selectLanguage: 'भाषा चुनें'
  }
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key) => key,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('tn_stories_lang');
    return (saved === 'ta' || saved === 'hi' || saved === 'en') ? saved : 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('tn_stories_lang', lang);
  };

  const t = (key: string): string => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
