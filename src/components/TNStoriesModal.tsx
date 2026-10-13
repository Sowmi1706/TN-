import React, { useState, useEffect } from 'react';
import { 
  X, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  BookOpen, 
  Sparkles, 
  CheckCircle, 
  ShieldAlert, 
  Heart, 
  Share2, 
  Check, 
  Globe2, 
  Users, 
  HelpCircle,
  RotateCcw
} from 'lucide-react';
import { Story } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

interface TNStoriesModalProps {
  story: Story | null;
  onClose: () => void;
}

export const TNStoriesModal: React.FC<TNStoriesModalProps> = ({ story, onClose }) => {
  const { language: appLang, t } = useLanguage();
  const { user, toggleSavedStory } = useAuth();

  const [storyLang, setStoryLang] = useState<'en' | 'ta'>('en');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    if (appLang === 'ta') {
      setStoryLang('ta');
    } else {
      setStoryLang('en');
    }
  }, [appLang, story]);

  // Clean up speech synthesis on close or unmount
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  if (!story) return null;

  const isSaved = user?.savedStories?.includes(story.id);

  const displayTitle = storyLang === 'ta' && story.titleTa ? story.titleTa : story.title;
  const displayContent = storyLang === 'ta' && story.contentTa ? story.contentTa : story.contentEn;

  // Web Speech API text-to-speech audio narrator
  const handleToggleAudio = () => {
    if (!('speechSynthesis' in window)) {
      alert('Text-to-speech narration is not supported in this browser.');
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    } else {
      window.speechSynthesis.cancel();
      const textToSpeak = `${displayTitle}. ${displayContent}`;
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      utterance.lang = storyLang === 'ta' ? 'ta-IN' : 'en-IN';

      utterance.onend = () => {
        setIsPlayingAudio(false);
      };

      utterance.onerror = () => {
        setIsPlayingAudio(false);
      };

      window.speechSynthesis.speak(utterance);
      setIsPlayingAudio(true);
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/85 backdrop-blur-md flex justify-center p-2 sm:p-4 md:p-6 animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col my-auto max-h-[92vh] border border-amber-900/30">
        
        {/* Story Modal Header with Royal Tamil Temple Motif */}
        <div className="sticky top-0 z-30 bg-gradient-to-r from-amber-950 via-stone-900 to-amber-950 text-amber-50 px-4 sm:px-6 py-3.5 flex items-center justify-between border-b border-amber-800/40">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="font-display font-semibold text-xs tracking-wider text-amber-300 uppercase">
              TN Stories · Cultural Chronicle
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Story Language Switcher */}
            <div className="flex items-center bg-stone-800/90 rounded-lg p-0.5 border border-stone-700 text-xs">
              <button
                onClick={() => {
                  setStoryLang('en');
                  if (isPlayingAudio) window.speechSynthesis.cancel();
                  setIsPlayingAudio(false);
                }}
                className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                  storyLang === 'en' ? 'bg-amber-600 text-stone-950 font-bold' : 'text-stone-300 hover:text-white'
                }`}
              >
                English
              </button>
              <button
                onClick={() => {
                  setStoryLang('ta');
                  if (isPlayingAudio) window.speechSynthesis.cancel();
                  setIsPlayingAudio(false);
                }}
                className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                  storyLang === 'ta' ? 'bg-amber-600 text-stone-950 font-bold' : 'text-stone-300 hover:text-white'
                }`}
              >
                தமிழ்
              </button>
            </div>

            <button
              onClick={() => toggleSavedStory(story.id)}
              className="p-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-rose-400 transition-colors cursor-pointer"
              title="Save story"
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>

            <button
              onClick={handleShare}
              className="p-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 transition-colors cursor-pointer"
              title="Share story"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            </button>

            <button
              onClick={() => {
                if (isPlayingAudio) window.speechSynthesis.cancel();
                onClose();
              }}
              className="p-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors cursor-pointer ml-1"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Story Content */}
        <div className="overflow-y-auto flex-1 p-5 sm:p-8 space-y-6 bg-[#fcfaf7]">
          
          {/* Header Distinction Banner: Verified Fact vs Sacred Legend */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-stone-200">
            <div className="flex items-center gap-2">
              {story.type === 'historical_fact' ? (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-semibold">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-700" />
                  <span>{t('verifiedFact')}</span>
                </div>
              ) : (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-amber-100 text-amber-900 border border-amber-300 text-xs font-semibold">
                  <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                  <span>{t('verifiedLegend')}</span>
                </div>
              )}
              <span className="text-stone-400 text-xs">·</span>
              <span className="text-xs font-serif italic text-stone-600">
                {story.historicalEra}
              </span>
            </div>

            <span className="text-xs font-medium text-amber-900 bg-amber-100/60 px-2.5 py-0.5 rounded">
              {story.destinationName}
            </span>
          </div>

          {/* Story Title & Audio Narration Bar */}
          <div className="space-y-3">
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-stone-900 leading-tight">
              {displayTitle}
            </h1>

            {/* Audio Narration Controller */}
            <div className="p-3.5 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <button
                  onClick={handleToggleAudio}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-sm ${
                    isPlayingAudio
                      ? 'bg-amber-600 text-stone-950 animate-pulse'
                      : 'bg-stone-900 hover:bg-amber-700 text-white'
                  }`}
                  title={isPlayingAudio ? 'Pause narration' : 'Listen to story'}
                >
                  {isPlayingAudio ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                </button>
                <div>
                  <h4 className="text-xs font-bold text-stone-900">
                    {isPlayingAudio ? 'Now Narrating Audio Story...' : 'Audio Storytelling Available'}
                  </h4>
                  <p className="text-[11px] text-stone-500">
                    {storyLang === 'ta' ? 'தமிழ் குரல் வழிகாட்டி (Audio narration)' : 'Narrated with regional cadence'}
                  </p>
                </div>
              </div>

              {isPlayingAudio && (
                <button
                  onClick={() => {
                    window.speechSynthesis.cancel();
                    setIsPlayingAudio(false);
                  }}
                  className="text-xs text-rose-600 hover:underline flex items-center gap-1 font-medium"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Stop</span>
                </button>
              )}
            </div>
          </div>

          {/* Story Narrative Text */}
          <div className="prose prose-stone max-w-none">
            <div className="text-stone-800 text-sm sm:text-base leading-relaxed space-y-4 whitespace-pre-line font-serif">
              {displayContent}
            </div>
          </div>

          {/* Key Historical Personalities */}
          {story.keyCharacters && story.keyCharacters.length > 0 && (
            <div className="p-4 bg-white border border-stone-200 rounded-xl space-y-2">
              <h4 className="font-sans text-xs uppercase tracking-wider font-bold text-stone-700 flex items-center gap-1.5">
                <Users className="w-4 h-4 text-amber-700" />
                Historical Personalities & Architects
              </h4>
              <div className="flex flex-wrap gap-2">
                {story.keyCharacters.map((char, i) => (
                  <span key={i} className="px-2.5 py-1 bg-amber-50 border border-amber-200 rounded-md text-xs font-medium text-amber-900">
                    🏛 {char}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Fascinating Facts & Community Knowledge */}
          {story.interestingFacts && story.interestingFacts.length > 0 && (
            <div className="p-4 bg-amber-950/5 border border-amber-900/10 rounded-xl space-y-2.5">
              <h4 className="font-sans text-xs uppercase tracking-wider font-bold text-amber-950 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-700" />
                Curated Facts & Architectural Secrets
              </h4>
              <ul className="space-y-1.5 text-xs text-stone-700">
                {story.interestingFacts.map((fact, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-amber-700 font-bold shrink-0">·</span>
                    <span className="leading-relaxed">{fact}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Verification Disclaimer */}
          <div className="p-3 bg-stone-100 rounded-lg text-[11px] text-stone-500 flex items-center gap-2">
            <HelpCircle className="w-4 h-4 shrink-0 text-stone-400" />
            <span>
              TN Stories distinguishes archaeological epigraphy and Tamil Sangam records from folklore traditions to respect authentic regional history.
            </span>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="bg-stone-100 border-t border-stone-200 px-6 py-3.5 flex items-center justify-between">
          <span className="text-xs text-stone-500 font-mono">
            TN Stories Archive #{story.id}
          </span>
          <button
            onClick={() => {
              if (isPlayingAudio) window.speechSynthesis.cancel();
              onClose();
            }}
            className="py-2 px-4 rounded-lg bg-stone-900 hover:bg-amber-700 text-white text-xs font-semibold transition-colors cursor-pointer"
          >
            Close Story
          </button>
        </div>

      </div>
    </div>
  );
};
