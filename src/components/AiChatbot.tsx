import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  X, 
  RotateCcw, 
  User as UserIcon, 
  MapPin, 
  Compass, 
  Coffee, 
  Loader2,
  Calendar,
  IndianRupee
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  source?: string;
}

interface AiChatbotProps {
  isOpen: boolean;
  onClose: () => void;
  isFloating?: boolean;
}

export const AiChatbot: React.FC<AiChatbotProps> = ({ isOpen, onClose, isFloating = false }) => {
  const { language, t } = useLanguage();
  const { user } = useAuth();

  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: language === 'ta'
        ? 'வணக்கம்! நான் உங்கள் TN Stories வழிகாட்டி. மதுரை, தஞ்சாவூர், ஊட்டி அல்லது மறைந்த சுற்றுலா தலங்கள் பற்றியும், போக்குவரத்து மற்றும் உணவு பற்றியும் என்னிடம் கேட்கலாம்.'
        : 'Vanakkam! I am your TN Stories AI Guide. Ask me to plan custom itineraries, calculate budgets, find authentic street food spots, or uncover verified hidden gems across Tamil Nadu.',
      timestamp: 'Just now',
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedPrompts = [
    'Plan a one-day spiritual trip in Madurai',
    'Find verified hidden places near Coimbatore & Nilgiris',
    'Suggest a 3-day family trip within Rs. 10,000',
    'Recommend iconic local food & messes in Chennai',
    'What is the history behind Thanjavur Big Temple?',
    'Weekend getaway with friends from Trichy'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim() || loading) return;

    const userMsg: Message = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text.trim(),
          language,
          userPreferences: {
            companion: user?.travelCompanion || 'family',
            interests: user?.interests || []
          }
        })
      });

      const data = await response.json();

      const assistantMsg: Message = {
        id: `msg-${Date.now() + 1}`,
        sender: 'assistant',
        text: data.reply || 'Vanakkam! How else may I assist your journey?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: data.source
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (err) {
      console.error('Chat request failed:', err);
      setMessages(prev => [
        ...prev,
        {
          id: `msg-${Date.now() + 1}`,
          sender: 'assistant',
          text: 'Vanakkam! I am currently refreshing my network. Tamil Nadu has 38 districts with extraordinary wonders—tell me which region you want to explore next!',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen && isFloating) return null;

  return (
    <div className={`flex flex-col bg-stone-900 border border-stone-800 rounded-2xl shadow-2xl overflow-hidden ${
      isFloating 
        ? 'fixed bottom-20 right-4 sm:right-6 w-[calc(100vw-2rem)] sm:w-[440px] h-[580px] z-50' 
        : 'w-full h-[650px]'
    }`}>
      
      {/* Chatbot Header */}
      <div className="bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 px-4 py-3.5 border-b border-stone-800 flex items-center justify-between text-stone-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-display font-bold text-sm text-amber-100">
                TN Stories AI Guide
              </h3>
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
            </div>
            <p className="text-[10px] text-amber-200/70">
              Powered by Gemini 3.8 Flash · Tamil Nadu Travel Intelligence
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setMessages([messages[0]])}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-200 hover:bg-stone-800 transition-colors cursor-pointer"
            title="Reset conversation"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          {isFloating && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
              title="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Suggested Quick Prompt Chips */}
      <div className="bg-stone-950/70 px-3 py-2 border-b border-stone-800/80 overflow-x-auto flex gap-1.5 no-scrollbar">
        {suggestedPrompts.slice(0, 4).map((prompt, i) => (
          <button
            key={i}
            onClick={() => handleSendMessage(prompt)}
            disabled={loading}
            className="px-2.5 py-1 rounded bg-stone-800/80 hover:bg-amber-900/60 border border-stone-700/60 hover:border-amber-600/60 text-[11px] text-stone-300 hover:text-amber-200 whitespace-nowrap cursor-pointer transition-colors"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-stone-950/40 text-xs">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-2.5 ${
              msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
            }`}
          >
            <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs ${
              msg.sender === 'user'
                ? 'bg-amber-600 text-stone-950 font-bold'
                : 'bg-stone-800 text-amber-300 border border-stone-700'
            }`}>
              {msg.sender === 'user' ? 'U' : <Bot className="w-4 h-4" />}
            </div>

            <div className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 leading-relaxed space-y-1 ${
              msg.sender === 'user'
                ? 'bg-amber-600 text-stone-950 rounded-tr-none font-medium'
                : 'bg-stone-800/90 text-stone-200 border border-stone-700/60 rounded-tl-none'
            }`}>
              <div className="whitespace-pre-line">
                {msg.text}
              </div>
              <div className={`text-[9px] flex items-center justify-end gap-1 ${
                msg.sender === 'user' ? 'text-amber-950/70' : 'text-stone-400'
              }`}>
                <span>{msg.timestamp}</span>
                {msg.source && (
                  <span>· {msg.source === 'gemini-3.8-flash' ? 'Gemini 3.8' : 'Knowledge Base'}</span>
                )}
              </div>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2 text-stone-400 text-xs pl-9">
            <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-500" />
            <span>Consulting Tamil Nadu stories & route guides...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Form Bar */}
      <form 
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="p-3 bg-stone-900 border-t border-stone-800 flex items-center gap-2"
      >
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder={
            language === 'ta'
              ? 'சுற்றுலா தலங்கள், உணவு அல்லது பயண செலவு பற்றி கேளுங்கள்...'
              : 'Ask about temples, hidden spots, bus schedules, or food...'
          }
          disabled={loading}
          className="flex-1 bg-stone-800 border border-stone-700 rounded-xl px-3.5 py-2 text-xs text-stone-100 placeholder-stone-400 focus:outline-none focus:border-amber-500 transition-colors"
        />

        <button
          type="submit"
          disabled={!inputMessage.trim() || loading}
          className="p-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 disabled:opacity-40 text-stone-950 transition-colors cursor-pointer"
          aria-label="Send message"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

    </div>
  );
};
