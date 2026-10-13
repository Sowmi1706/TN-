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
