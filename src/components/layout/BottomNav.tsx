import React from 'react';
import { useApp, ActiveTab } from '../../context/AppContext';
import {
  FolderGit2,
  Briefcase,
  ListTodo,
  Sliders,
  Sparkles
} from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab, tasks } = useApp();
  const pendingCount = tasks.filter((t) => t.status !== 'completed').length;

  const tabs: { id: ActiveTab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'portfolio', label: 'পোর্টফোলিও', icon: FolderGit2 },
    { id: 'experience', label: 'অভিজ্ঞতা', icon: Briefcase },
    { id: 'tasks', label: 'টাস্ক বোর্ড', icon: ListTodo },
    { id: 'studio', label: 'ম্যানেজমেন্ট', icon: Sliders },
    { id: 'ai', label: 'এআই ল্যাব', icon: Sparkles },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#080d1a]/95 backdrop-blur-xl border-t border-white/[0.08] pb-safe">
      <div className="flex items-center justify-around h-16 px-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          const isAI = tab.id === 'ai';

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`mobile-press flex-1 flex flex-col items-center justify-center py-1 transition-all relative ${
                isActive
                  ? isAI
                    ? 'text-indigo-400 font-medium'
                    : 'text-cyan-400 font-medium'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform ${
                    isActive ? 'scale-110' : 'scale-100'
                  }`}
                />
                {tab.id === 'tasks' && pendingCount > 0 && (
                  <span className="absolute -top-1.5 -right-2.5 w-4 h-4 bg-cyan-500 text-[#080d1a] font-mono text-[9px] font-bold rounded-full flex items-center justify-center">
                    {pendingCount > 9 ? '9+' : pendingCount}
                  </span>
                )}
                {isAI && (
                  <span className="absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full bg-indigo-400 animate-ping" />
                )}
              </div>
              <span className="text-[10px] tracking-tight mt-1 truncate max-w-[64px]">
                {tab.label}
              </span>
              {isActive && (
                <div
                  className={`absolute -bottom-1 w-8 h-1 rounded-full ${
                    isAI ? 'bg-indigo-400' : 'bg-cyan-400'
                  }`}
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
