import React from 'react';
import { 
  PhoneCall, 
  ShieldAlert, 
  HeartPulse, 
  AlertTriangle, 
  MapPin, 
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const EmergencySection: React.FC = () => {
  const { t } = useLanguage();

  const primaryHelplines = [
    { title: 'National Emergency Number', number: '112', desc: 'Unified 24x7 pan-India emergency dispatch', color: 'bg-rose-600' },
    { title: 'Ambulance Emergency (Tamil Nadu)', number: '108', desc: 'Free emergency medical service & life support', color: 'bg-red-700' },
    { title: 'Tamil Nadu Police Control', number: '100', desc: 'Immediate police intervention & PCR patrol', color: 'bg-blue-800' },
    { title: 'Tourist Police Helpline', number: '1363', desc: 'Guidance and safety assistance for travelers', color: 'bg-amber-700' },
    { title: 'Women Safety Helpline', number: '1091', desc: '24-hour round-the-clock protection & support', color: 'bg-purple-800' },
    { title: 'State Disaster Management (TNSDMA)', number: '1070', desc: 'Cyclone, flood, and mountain emergency monitoring', color: 'bg-stone-800' }
  ];

  const majorHospitals = [
    {
      name: 'Apollo Hospitals Greams Road',
      district: 'Chennai',
      address: '21 Greams Lane, Thousand Lights, Chennai',
      phone: '044-28290200',
      emergency: '044-28293333',
      services: '24/7 Trauma, ICU, Cardiac Care'
    },
    {
      name: 'Meenakshi Mission Hospital & Research Centre',
      district: 'Madurai',
      address: 'Melur Main Road, Lake Area, Madurai',
      phone: '0452-4263000',
      emergency: '0452-4263108',
      services: '24/7 Multi-Specialty Emergency Care'
    },
    {
      name: 'Ganga Medical Centre & Hospital',
      district: 'Coimbatore',
      address: '313, Mettupalayam Road, Coimbatore',
      phone: '0422-2485000',
      emergency: '0422-2485108',
      services: '24/7 Orthopedic Trauma & Microsurgery'
    },
    {
      name: 'Government District Headquarters Hospital',
      district: 'Ooty (Nilgiris)',
      address: 'Hospital Road, Upper Bazaar, Ooty',
      phone: '0423-2442212',
      emergency: '108',
      services: 'High altitude mountain trauma care'
    },
    {
      name: 'Thanjavur Medical College Hospital',
      district: 'Thanjavur',
      address: 'Medical College Road, Thanjavur',
      phone: '04362-240024',
      emergency: '108',
      services: 'Tertiary referral center for Kaveri delta'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="p-6 bg-gradient-to-r from-rose-950 via-stone-900 to-rose-950 rounded-2xl text-white border border-rose-800/50 shadow-lg space-y-3">
        <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase tracking-wider">
          <ShieldAlert className="w-4 h-4" />
          <span>Official Safety & Medical Network</span>
        </div>
        <h1 className="font-display text-2xl sm:text-4xl font-bold">
          Emergency Assistance (24x7)
        </h1>
        <p className="text-stone-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
          Immediate access to government helplines, major emergency tertiary hospitals, and tourist police stations across Tamil Nadu. Click any number to dial immediately.
        </p>
      </div>

      {/* Primary Helpline Numbers */}
      <div className="space-y-3">
        <h2 className="font-display text-lg font-bold text-stone-900">
          Immediate Dispatch Helplines (Toll-Free)
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {primaryHelplines.map((line, i) => (
            <a
              key={i}
              href={`tel:${line.number}`}
              className="p-5 bg-white border border-stone-200 rounded-xl shadow-sm hover:shadow-md hover:border-rose-400 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-stone-700">{line.title}</span>
                  <PhoneCall className="w-4 h-4 text-rose-600 group-hover:scale-110 transition-transform" />
                </div>
                <div className="font-mono text-3xl font-extrabold text-rose-700 my-2">
                  {line.number}
                </div>
                <p className="text-xs text-stone-500 leading-relaxed">{line.desc}</p>
              </div>
              <div className="pt-3 mt-2 border-t border-stone-100 text-[11px] text-rose-700 font-bold flex items-center gap-1">
                <span>Tap to Call Instantly</span>
                <span>➔</span>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Major Referral Hospitals Directory */}
      <div className="space-y-4">
        <h2 className="font-display text-lg font-bold text-stone-900">
          Major 24/7 Tertiary Referral Hospitals
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {majorHospitals.map((hosp, i) => (
            <div key={i} className="p-5 bg-white border border-stone-200 rounded-xl shadow-sm space-y-3">
              <div>
                <div className="flex items-center justify-between text-xs text-amber-900 font-bold mb-1">
                  <span>{hosp.district}</span>
                  <span className="text-emerald-700 font-medium">● 24x7 Open</span>
                </div>
                <h3 className="font-display font-bold text-stone-900 text-base">{hosp.name}</h3>
                <p className="text-xs text-stone-500 mt-0.5">{hosp.address}</p>
              </div>

              <div className="p-2.5 bg-stone-50 rounded-lg text-xs space-y-1">
                <p className="text-stone-700"><strong className="text-stone-900">Emergency Desk:</strong> {hosp.emergency}</p>
                <p className="text-stone-700"><strong className="text-stone-900">Services:</strong> {hosp.services}</p>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <a
                  href={`tel:${hosp.phone}`}
                  className="flex-1 py-2 px-3 rounded-lg bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Call Reception ({hosp.phone})</span>
                </a>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hosp.name + ' ' + hosp.district)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700"
                  title="View on Map"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
