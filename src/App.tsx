/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { AppHeader } from './components/layout/AppHeader';
import { BottomNav } from './components/layout/BottomNav';
import { PortfolioView } from './components/portfolio/PortfolioView';
import { ExperienceTimeline } from './components/experience/ExperienceTimeline';
import { TaskManager } from './components/tasks/TaskManager';
import { StudioManager } from './components/studio/StudioManager';
import { AIAssistantModal } from './components/ai/AIAssistantModal';
import { Toast } from './components/common/Toast';

const MainContent: React.FC = () => {
  const { activeTab, previewMode } = useApp();

  // If user toggles previewMode, show the public-facing portfolio view
  if (previewMode) {
    return <PortfolioView />;
  }

  switch (activeTab) {
    case 'portfolio':
      return <PortfolioView />;
    case 'experience':
      return <ExperienceTimeline />;
    case 'tasks':
      return <TaskManager />;
    case 'studio':
      return <StudioManager />;
    case 'ai':
      return <AIAssistantModal />;
    default:
      return <PortfolioView />;
  }
};

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-[#080d1a] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/20 selection:text-cyan-200">
        {/* Native App Top Header */}
        <AppHeader />

        {/* Viewport Frame */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 pt-4 sm:pt-6">
          <MainContent />
        </main>

        {/* Global Toast */}
        <Toast />

        {/* Mobile Native Bottom Nav */}
        <BottomNav />
      </div>
    </AppProvider>
  );
}
