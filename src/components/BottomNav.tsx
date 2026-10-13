import React from 'react';
import { Home, Compass, Calendar, Bot, User as UserIcon } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenChat: () => void;
  isChatOpen: boolean;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  setActiveTab,
  onOpenChat,
  isChatOpen
}) => {
  const { t } = useLanguage();
  const { isAuthenticated } = useAuth();

  const navItems = [
    { id: 'home', label: t('navHome'), icon: Home },
    { id: 'explore', label: t('navExplore'), icon: Compass },
    { id: 'trips', label: t('navTrips'), icon: Calendar },
    { id: 'chat', label: 'AI Guide', icon: Bot, isAction: true },
    { id: 'profile', label: t('navProfile'), icon: UserIcon },
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 bg-stone-900/98 border-t border-stone-800 backdrop-blur-lg sm:hidden safe-area-pb">
      <div className="grid grid-cols-5 h-16 items-center px-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.isAction ? isChatOpen : activeTab === item.id && !isChatOpen;

          return (
            <button
              key={item.id}
              onClick={() => {
                if (item.isAction) {
                  onOpenChat();
                } else {
                  setActiveTab(item.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className={`flex flex-col items-center justify-center h-full py-1 transition-colors cursor-pointer ${
                isActive
                  ? 'text-amber-400 font-medium'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <div className={`p-1 rounded-full ${isActive && item.isAction ? 'bg-amber-500/20' : ''}`}>
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.75]'}`} />
              </div>
              <span className="text-[10px] tracking-tight truncate max-w-[60px]">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
