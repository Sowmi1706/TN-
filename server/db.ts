import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import { 
  DESTINATIONS, 
  STORIES, 
  HOTELS, 
  RESTAURANTS, 
  EVENTS, 
  TOUR_PACKAGES 
} from '../src/data/mockData';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.resolve(__dirname, '../data');
const DB_FILE = path.join(DATA_DIR, 'tn_stories_db.json');

export interface UserRecord {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  salt: string;
  role: 'admin' | 'customer';
  preferredLanguage: 'en' | 'ta' | 'hi';
  avatar?: string;
  travelCompanion?: 'family' | 'friends' | 'solo' | 'group' | 'couple';
  interests?: string[];
  wishlist: string[];
  savedStories: string[];
  createdAt: string;
}

export interface BookingRecord {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  type: 'hotel' | 'vehicle' | 'package';
  referenceId: string;
  title: string;
  date: string;
  travelers: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  notes?: string;
  adminNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface DatabaseSchema {
  version: number;
  users: UserRecord[];
  sessions: Record<string, { userId: string; role: 'admin' | 'customer'; expiresAt: number }>;
  destinations: any[];
  events: any[];
  hotels: any[];
  packages: any[];
  bookings: BookingRecord[];
}

export function hashPassword(password: string, salt: string): string {
  return crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
}

export function verifyPassword(password: string, hash: string, salt: string): boolean {
  const computed = hashPassword(password, salt);
  return crypto.timingSafeEqual(Buffer.from(computed, 'hex'), Buffer.from(hash, 'hex'));
}

export function generateToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

let dbCache: DatabaseSchema | null = null;

function initDb(): DatabaseSchema {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (fs.existsSync(DB_FILE)) {
    try {
      const raw = fs.readFileSync(DB_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      // Validate structure
      if (parsed.users && parsed.destinations && parsed.bookings) {
        return parsed;
      }
    } catch (e) {
      console.error('Failed reading existing DB, re-initializing fresh seeded store:', e);
    }
  }

  // Create initial seeded DB
  const adminSalt = crypto.randomBytes(16).toString('hex');
  const adminHash = hashPassword('admin123', adminSalt);

  const customerSalt = crypto.randomBytes(16).toString('hex');
  const customerHash = hashPassword('customer123', customerSalt);

  const initialData: DatabaseSchema = {
    version: 1,
    users: [
      {
        id: 'admin-01',
        name: 'TN Tourism Administrator',
        email: 'admin@tnstories.com',
        passwordHash: adminHash,
        salt: adminSalt,
        role: 'admin',
        preferredLanguage: 'en',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&q=80',
        wishlist: [],
        savedStories: [],
        createdAt: new Date().toISOString()
      },
      {
        id: 'customer-01',
        name: 'Karthik Ramasamy',
        email: 'customer@tnstories.com',
        passwordHash: customerHash,
        salt: customerSalt,
        role: 'customer',
        preferredLanguage: 'en',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
        travelCompanion: 'family',
        interests: ['Temples', 'Heritage', 'Hill Stations'],
        wishlist: ['thanjavur-big-temple', 'dhanushkodi-ghost-town', 'nilgiri-mountain-railway'],
        savedStories: ['story-thanjavur-big-temple', 'story-madurai-meenakshi'],
        createdAt: new Date().toISOString()
      }
    ],
    sessions: {},
    destinations: [...DESTINATIONS],
    events: [...EVENTS],
    hotels: [...HOTELS],
    packages: [...TOUR_PACKAGES],
    bookings: [
      {
        id: 'book-1001',
        customerId: 'customer-01',
        customerName: 'Karthik Ramasamy',
        customerEmail: 'customer@tnstories.com',
        customerPhone: '+91 98401 23456',
        type: 'package',
        referenceId: 'pkg-chola-dynasty',
        title: 'The Great Chola Kingdom Trail (3D/2N)',
        date: '2026-11-14',
        travelers: 2,
        totalPrice: 12998,
        status: 'confirmed',
        notes: 'Vegetarian meals preferred.',
        adminNotes: 'Booking verified with Kaveri Delta Heritage travel partner.',
        createdAt: '2026-10-01',
        updatedAt: '2026-10-02'
      }
    ]
  };

  fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), 'utf-8');
  return initialData;
}

export function getDb(): DatabaseSchema {
  if (!dbCache) {
    dbCache = initDb();
  }
  return dbCache;
}

export function saveDb(db: DatabaseSchema): void {
  db.version += 1;
  dbCache = db;
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed writing DB to disk:', err);
  }
}
