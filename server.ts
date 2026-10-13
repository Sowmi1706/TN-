import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Initialize Google Gemini SDK on server-side
const apiKey = process.env.GEMINI_API_KEY || '';
let aiClient: GoogleGenAI | null = null;

if (apiKey) {
  try {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  } catch (err) {
    console.error('Failed to initialize GoogleGenAI client:', err);
  }
}

import { 
  getDb, 
  saveDb, 
  hashPassword, 
  verifyPassword, 
  generateToken, 
  UserRecord, 
  BookingRecord 
} from './server/db';

// Token expiration: 7 days
const TOKEN_EXPIRY_MS = 7 * 24 * 60 * 60 * 1000;

// Auth middleware helper
function getUserFromToken(req: Request): UserRecord | null {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) return null;
  const token = authHeader.split(' ')[1];
  const db = getDb();
  const session = db.sessions[token];
  if (!session) return null;
  if (Date.now() > session.expiresAt) {
    delete db.sessions[token];
    saveDb(db);
    return null;
  }
  const user = db.users.find(u => u.id === session.userId);
  return user || null;
}

function requireAuth(req: Request, res: Response, next: () => void) {
  const user = getUserFromToken(req);
  if (!user) {
    return res.status(401).json({ error: 'Unauthorized: Invalid or expired token' });
  }
  (req as any).user = user;
  next();
}

function requireAdmin(req: Request, res: Response, next: () => void) {
  const user = getUserFromToken(req);
  if (!user || user.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden: Admin access required' });
  }
  (req as any).user = user;
  next();
}

// ---------------- API ENDPOINTS ----------------

// 1. Health check
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    app: 'TN Stories',
    aiEnabled: !!aiClient,
    timestamp: new Date().toISOString(),
  });
});

// Database version sync endpoint
app.get('/api/db/version', (_req: Request, res: Response) => {
  const db = getDb();
  res.json({ version: db.version });
});

// Customer Registration
app.post('/api/auth/customer/register', (req: Request, res: Response) => {
  try {
    const { name, email, password, preferredLanguage = 'en' } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email and password are required' });
    }
    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    const db = getDb();
    const existing = db.users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      return res.status(409).json({ error: 'An account with this email already exists' });
    }

    const salt = generateToken().substring(0, 16);
    const passwordHash = hashPassword(password, salt);
    const newUser: UserRecord = {
      id: `customer-${Date.now()}`,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      passwordHash,
      salt,
      role: 'customer',
      preferredLanguage,
      wishlist: [],
      savedStories: [],
      createdAt: new Date().toISOString()
    };

    const token = generateToken();
    db.users.push(newUser);
    db.sessions[token] = {
      userId: newUser.id,
      role: 'customer',
      expiresAt: Date.now() + TOKEN_EXPIRY_MS
    };
    saveDb(db);

    const { passwordHash: _, salt: __, ...userProfile } = newUser;
    res.status(201).json({
      token,
      user: userProfile
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Registration failed' });
  }
});

// Customer Login
app.post('/api/auth/customer/login', (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const db = getDb();
    const user = db.users.find(u => u.email.toLowerCase() === email.trim().toLowerCase());
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    if (user.role !== 'customer') {
      return res.status(403).json({ error: 'This portal is for customers only. Please use the Admin Login page.' });
    }

    const valid = verifyPassword(password, user.passwordHash, user.salt);
    if (!valid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = generateToken();
    db.sessions[token] = {
      userId: user.id,
      role: 'customer',
      expiresAt: Date.now() + TOKEN_EXPIRY_MS
    };
    saveDb(db);

    const { passwordHash: _, salt: __, ...userProfile } = user;
    res.json({ token, user: userProfile });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Login failed' });
  }
});

// Admin Login (Strictly separate from Customer)
app.post('/api/auth/admin/login', (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const db = getDb();
    const user = db.users.find(u => u.email.toLowerCase() === email.trim().toLowerCase());
    if (!user) {
      return res.status(401).json({ error: 'Invalid administrator credentials' });
    }

    if (user.role !== 'admin') {
      return res.status(403).json({ error: 'Access Denied: You do not have administrator privileges.' });
    }

    const valid = verifyPassword(password, user.passwordHash, user.salt);
    if (!valid) {
      return res.status(401).json({ error: 'Invalid administrator credentials' });
    }

    const token = generateToken();
    db.sessions[token] = {
      userId: user.id,
      role: 'admin',
      expiresAt: Date.now() + TOKEN_EXPIRY_MS
    };
    saveDb(db);

    const { passwordHash: _, salt: __, ...userProfile } = user;
    res.json({ token, user: userProfile });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Admin login failed' });
  }
});

// Current User Verification
app.get('/api/auth/me', (req: Request, res: Response) => {
  const user = getUserFromToken(req);
  if (!user) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  const { passwordHash: _, salt: __, ...userProfile } = user;
  res.json({ user: userProfile });
});

// Logout
app.post('/api/auth/logout', (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    const db = getDb();
    delete db.sessions[token];
    saveDb(db);
  }
  res.json({ success: true });
});

// Destinations CRUD
app.get('/api/destinations', (_req: Request, res: Response) => {
  const db = getDb();
  res.json(db.destinations);
});

app.post('/api/destinations', requireAdmin, (req: Request, res: Response) => {
  const db = getDb();
  const newDest = {
    ...req.body,
    id: req.body.id || `dest-${Date.now()}`
  };
  db.destinations.unshift(newDest);
  saveDb(db);
  res.status(201).json(newDest);
});

app.put('/api/destinations/:id', requireAdmin, (req: Request, res: Response) => {
  const db = getDb();
  const index = db.destinations.findIndex(d => d.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Destination not found' });
  }
  db.destinations[index] = { ...db.destinations[index], ...req.body };
  saveDb(db);
  res.json(db.destinations[index]);
});

app.delete('/api/destinations/:id', requireAdmin, (req: Request, res: Response) => {
  const db = getDb();
  db.destinations = db.destinations.filter(d => d.id !== req.params.id);
  saveDb(db);
  res.json({ success: true });
});

// Events CRUD
app.get('/api/events', (_req: Request, res: Response) => {
  const db = getDb();
  res.json(db.events);
});

app.post('/api/events', requireAdmin, (req: Request, res: Response) => {
  const db = getDb();
  const newEvent = { ...req.body, id: req.body.id || `event-${Date.now()}` };
  db.events.unshift(newEvent);
  saveDb(db);
  res.status(201).json(newEvent);
});

app.delete('/api/events/:id', requireAdmin, (req: Request, res: Response) => {
  const db = getDb();
  db.events = db.events.filter(e => e.id !== req.params.id);
  saveDb(db);
  res.json({ success: true });
});

// Hotels CRUD
app.get('/api/hotels', (_req: Request, res: Response) => {
  const db = getDb();
  res.json(db.hotels);
});

app.post('/api/hotels', requireAdmin, (req: Request, res: Response) => {
  const db = getDb();
  const newHotel = { ...req.body, id: req.body.id || `hotel-${Date.now()}` };
  db.hotels.unshift(newHotel);
  saveDb(db);
  res.status(201).json(newHotel);
});

app.delete('/api/hotels/:id', requireAdmin, (req: Request, res: Response) => {
  const db = getDb();
  db.hotels = db.hotels.filter(h => h.id !== req.params.id);
  saveDb(db);
  res.json({ success: true });
});

// Packages CRUD
app.get('/api/packages', (_req: Request, res: Response) => {
  const db = getDb();
  res.json(db.packages);
});

app.post('/api/packages', requireAdmin, (req: Request, res: Response) => {
  const db = getDb();
  const newPkg = { ...req.body, id: req.body.id || `pkg-${Date.now()}` };
  db.packages.unshift(newPkg);
  saveDb(db);
  res.status(201).json(newPkg);
});

app.delete('/api/packages/:id', requireAdmin, (req: Request, res: Response) => {
  const db = getDb();
  db.packages = db.packages.filter(p => p.id !== req.params.id);
  saveDb(db);
  res.json({ success: true });
});

// Bookings Management
app.get('/api/bookings', requireAuth, (req: Request, res: Response) => {
  const user = (req as any).user as UserRecord;
  const db = getDb();
  if (user.role === 'admin') {
    return res.json(db.bookings);
  }
  const customerBookings = db.bookings.filter(b => b.customerId === user.id);
  res.json(customerBookings);
});

app.post('/api/bookings', requireAuth, (req: Request, res: Response) => {
  const user = (req as any).user as UserRecord;
  const db = getDb();
  const { type, referenceId, title, date, travelers, totalPrice, contactPhone, notes } = req.body;

  if (!title || !date || !totalPrice) {
    return res.status(400).json({ error: 'Missing required booking details' });
  }

  const newBooking: BookingRecord = {
    id: `book-${Date.now()}`,
    customerId: user.id,
    customerName: user.name,
    customerEmail: user.email,
    customerPhone: contactPhone || '+91 98401 23456',
    type: type || 'package',
    referenceId: referenceId || '',
    title,
    date,
    travelers: Number(travelers) || 1,
    totalPrice: Number(totalPrice),
    status: 'pending',
    notes,
    adminNotes: 'Booking queued for partner verification.',
    createdAt: new Date().toISOString().split('T')[0],
    updatedAt: new Date().toISOString().split('T')[0]
  };

  db.bookings.unshift(newBooking);
  saveDb(db);
  res.status(201).json(newBooking);
});

app.put('/api/bookings/:id/status', requireAdmin, (req: Request, res: Response) => {
  const db = getDb();
  const { status, adminNotes } = req.body;
  const booking = db.bookings.find(b => b.id === req.params.id);
  if (!booking) {
    return res.status(404).json({ error: 'Booking not found' });
  }

  if (status) booking.status = status;
  if (adminNotes !== undefined) booking.adminNotes = adminNotes;
  booking.updatedAt = new Date().toISOString().split('T')[0];

  saveDb(db);
  res.json(booking);
});

// Customer Booking Cancellation Endpoint
app.put('/api/bookings/:id/cancel', requireAuth, (req: Request, res: Response) => {
  const user = (req as any).user as UserRecord;
  const db = getDb();
  const booking = db.bookings.find(b => b.id === req.params.id);
  if (!booking) {
    return res.status(404).json({ error: 'Booking not found' });
  }
  if (user.role !== 'admin' && booking.customerId !== user.id) {
    return res.status(403).json({ error: 'Forbidden: You can only cancel your own bookings' });
  }
  booking.status = 'cancelled';
  booking.updatedAt = new Date().toISOString().split('T')[0];
  saveDb(db);
  res.json(booking);
});

// Customer Wishlist & Profile Preferences Persistence
app.put('/api/customer/wishlist', requireAuth, (req: Request, res: Response) => {
  const user = (req as any).user as UserRecord;
  const { destinationId } = req.body;
  if (!destinationId) return res.status(400).json({ error: 'Destination ID required' });

  const db = getDb();
  const dbUser = db.users.find(u => u.id === user.id);
  if (!dbUser) return res.status(404).json({ error: 'User not found' });

  const exists = dbUser.wishlist.includes(destinationId);
  if (exists) {
    dbUser.wishlist = dbUser.wishlist.filter(id => id !== destinationId);
  } else {
    dbUser.wishlist.push(destinationId);
  }
  saveDb(db);

  const { passwordHash: _, salt: __, ...userProfile } = dbUser;
  res.json({ wishlist: dbUser.wishlist, user: userProfile });
});

app.put('/api/customer/profile', requireAuth, (req: Request, res: Response) => {
  const user = (req as any).user as UserRecord;
  const db = getDb();
  const dbUser = db.users.find(u => u.id === user.id);
  if (!dbUser) return res.status(404).json({ error: 'User not found' });

  const { name, preferredLanguage, travelCompanion, interests } = req.body;
  if (name) dbUser.name = name.trim();
  if (preferredLanguage) dbUser.preferredLanguage = preferredLanguage;
  if (travelCompanion) dbUser.travelCompanion = travelCompanion;
  if (interests) dbUser.interests = interests;

  saveDb(db);
  const { passwordHash: _, salt: __, ...userProfile } = dbUser;
  res.json({ user: userProfile });
});

// Admin Metrics Stats
app.get('/api/admin/stats', requireAdmin, (_req: Request, res: Response) => {
  const db = getDb();
  res.json({
    totalDestinations: db.destinations.length,
    hiddenGemsCount: db.destinations.filter(d => d.isHiddenSpot).length,
    totalEvents: db.events.length,
    totalHotels: db.hotels.length,
    totalPackages: db.packages.length,
    totalBookings: db.bookings.length,
    pendingBookings: db.bookings.filter(b => b.status === 'pending').length,
    confirmedBookings: db.bookings.filter(b => b.status === 'confirmed').length,
    totalUsers: db.users.length,
    totalCustomers: db.users.filter(u => u.role === 'customer').length,
  });
});

// 2. AI Tourism Chatbot Endpoint
app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const { message, language = 'en', userPreferences, conversationHistory = [] } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    const languageInstruction =
      language === 'ta'
        ? 'Respond primarily in natural, polite Tamil (தமிழ்). Include English place names in brackets where helpful for navigation.'
        : language === 'hi'
        ? 'Respond primarily in clear, polite Hindi (हिन्दी). Include English names in brackets where helpful.'
        : 'Respond in welcoming, engaging, culturally evocative English with authentic Tamil terminology (e.g. Vanakkam, Kovil, Gopuram, Jigarthanda).';

    const systemPrompt = `You are "TN Stories Guru", an expert AI tourism guide and cultural storyteller for Tamil Nadu, India.
Your mission is to help travelers discover Tamil Nadu's living heritage, hidden gems, sacred temple architecture, Western Ghats hill stations, authentic regional food (Chettinad, Madurai, Kongu, Tanjore), government transport (SETC / TNSTC / Southern Railway), and budget calculations.

Key Guidelines:
1. ${languageInstruction}
2. Always provide practical, verified details (accurate timings, realistic travel hours, approximate budget in INR ₹).
3. Do not invent fictitious destinations or imaginary train schedules.
4. If asked about temples, mention appropriate cultural etiquette (modest dress codes, photography restrictions, darshan timings).
5. If asked about food, recommend authentic regional specialties (e.g., Madurai Kari Dosa & Jigarthanda, Chettinad Kozhi Varuval, Tirunelveli Iruttu Kadai Halwa, Kumbakonam Degree Coffee).
6. When planning trips, maintain a relaxed, unhurried pace respecting driving times on ghat roads and highway speeds.
7. Mention official resources like tnstc.in for government buses and irctc.co.in for railway connections when relevant.`;

    if (aiClient) {
      try {
        const response = await aiClient.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: message,
          config: {
            systemInstruction: systemPrompt,
            temperature: 0.7,
          },
        });

        const reply = response.text || 'Vanakkam! I am ready to guide your journey across Tamil Nadu.';
        return res.json({ reply, source: 'gemini-3.8-flash' });
      } catch (geminiError: any) {
        console.warn('Gemini API call warning:', geminiError?.message || geminiError);
        // Fall through to contextual fallback below
      }
    }

    // Contextual intelligent fallback if API key is unset or in case of transient quota
    let fallbackReply = '';
    const lower = message.toLowerCase();

    if (lower.includes('madurai') || lower.includes('மதுரை')) {
      fallbackReply =
        language === 'ta'
          ? 'வணக்கம்! மதுரை மீனாட்சி அம்மன் கோயில் காலை 5:00 முதல் 12:30 வரை, பின் மாலை 4:00 முதல் இரவு 10:00 வரை திறந்திருக்கும். புகழ்பெற்ற ஜிகர்தண்டா மற்றும் கரி தோசையை ருசிக்க மறக்காதீர்கள்!'
          : 'Vanakkam! In Madurai, begin at the majestic Meenakshi Amman Temple (open 5:00 AM - 12:30 PM & 4:00 PM - 10:00 PM). Don’t miss Thirumalai Nayakkar Mahal, followed by authentic Madurai Bun Parotta and Famous Jigarthanda on East Marret Street.';
    } else if (lower.includes('hidden') || lower.includes('மறைந்த') || lower.includes('secret')) {
      fallbackReply =
        language === 'ta'
          ? 'தமிழ்நாட்டின் சிறந்த மறைந்த இடங்கள்: 1) கொடைக்கானல் அருகிலுள்ள மண்ணவனூர் சூழல் ஏரி 2) நீலகிரியில் உள்ள அவலான்ச் ஏரி 3) 4400 கால்வாய்கள் கொண்ட பிச்சாவரம் அலையாத்தி காடுகள் 4) 70 கொண்டை ஊசி வளைவுகள் கொண்ட கொல்லிமலை.'
          : 'Top verified hidden gems in Tamil Nadu:\n1. Mannavanur Eco Village (serene meadows 35km from Kodaikanal)\n2. Avalanche Lake in Nilgiris (untouched pine forests)\n3. Pichavaram Mangrove Forest (world’s 2nd largest mangrove maze near Chidambaram)\n4. Kolli Hills (70 hairpin bends and Agaya Gangai waterfalls).';
    } else if (lower.includes('budget') || lower.includes('cost') || lower.includes('செலவு')) {
      fallbackReply =
        'For a comfortable 3-day trip in Tamil Nadu:\n- Budget Traveler: ₹1,500 - ₹2,000 / day (TNSTC government express buses, clean lodges, South Indian meals).\n- Moderate / Family: ₹3,500 - ₹5,000 / day (AC hotels, hired cabs, entry fees).\n- Heritage / Luxury: ₹8,000+ / day (Palace homestays like Chettinad mansions and private guides).';
    } else {
      fallbackReply =
        language === 'ta'
          ? 'வணக்கம்! தஞ்சைப் பெருவுடையார் கோயில், ஊட்டி மலை இரயில், மதுரை, ராமேஸ்வரம் தனுஷ்கோடி அல்லது மறைந்த எழில் கொஞ்சும் இடங்களைப் பற்றி என்னிடம் கேளுங்கள். நான் வழிகாட்டுகிறேன்!'
          : 'Vanakkam! I can help you plan personalized day trips, discover ancient temple lore, find government bus schedules (SETC/TNSTC), recommend regional dishes, or uncover peaceful hidden spots. What destination or district are you curious about today?';
    }

    return res.json({ reply: fallbackReply, source: 'assistant-knowledgebase' });
  } catch (error: any) {
    console.error('Chat endpoint error:', error);
    res.status(500).json({ error: 'Failed to process chat request' });
  }
});

// 3. AI Itinerary Generator Endpoint
app.post('/api/itineraries/generate', async (req: Request, res: Response) => {
  try {
    const { startingCity, destinationTheme, durationDays = 3, budget, companions, foodPreference } = req.body;

    const prompt = `Create a realistic, detailed ${durationDays}-day travel itinerary for Tamil Nadu starting from ${startingCity || 'Chennai'}.
Theme: ${destinationTheme || 'Heritage & Temples'}
Companions: ${companions || 'Family'}
Budget tier: ${budget || 'Moderate'}
Food: ${foodPreference || 'Authentic Tamil Vegetarian and Regional specialties'}

Provide a well-paced day-by-day itinerary considering real travel distances, opening hours, local transport, recommended restaurants, and hotel types.`;

    if (aiClient) {
      try {
        const response = await aiClient.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            systemInstruction: 'You are an itinerary planner specialized in Tamil Nadu tourism. Output clear, day-by-day structured travel plans with travel times, costs in INR, and practical tips.',
          },
        });

        return res.json({
          planText: response.text,
          startingCity,
          durationDays,
        });
      } catch (err: any) {
        console.warn('Gemini itinerary generation fallback:', err?.message);
      }
    }

    // Fallback structured itinerary
    res.json({
      planText: `Custom ${durationDays}-Day Tamil Nadu Journey\n\nDay 1: Arrival in ${startingCity || 'Madurai'} - Heritage Check-in & Historic Temple Walk.\nDay 2: Morning cultural tour, traditional lunch, and scenic afternoon excursion.\nDay 3: Nature exploration, shopping for local crafts & departure.`,
      startingCity,
      durationDays,
    });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to generate itinerary' });
  }
});

// 4. Weather proxy
app.get('/api/weather', (req: Request, res: Response) => {
  const district = (req.query.district as string) || 'Chennai';
  // Realistic localized weather for Tamil Nadu regions
  const hillDistricts = ['Nilgiris', 'Dindigul'];
  const isHill = hillDistricts.some((h) => district.toLowerCase().includes(h.toLowerCase()));

  const weather = isHill
    ? { district, temp: 17, condition: 'Misty & Refreshing', humidity: 82, bestTime: 'Morning 8am - 11am' }
    : { district, temp: 30, condition: 'Sunny & Pleasant', humidity: 64, bestTime: 'Early Morning & Evening' };

  res.json(weather);
});

// ---------------- SERVE STATIC / VITE ----------------

async function setupApp() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`TN Stories backend server running on http://0.0.0.0:${PORT}`);
  });
}

setupApp();
