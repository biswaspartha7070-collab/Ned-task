import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  FolderGit2,
  Briefcase,
  ListTodo,
  Sliders,
  Sparkles,
  Eye,
  Edit3,
  Download,
  Upload,
  RefreshCw,
  Code2
} from 'lucide-react';

export const AppHeader: React.FC = () => {
  const {
    profile,
    activeTab,
    setActiveTab,
    previewMode,
    setPreviewMode,
    tasks,
    exportDataJSON,
    importDataJSON,
    resetAllData
  } = useApp();

  const pendingTasksCount = tasks.filter((t) => t.status !== 'completed').length;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        importDataJSON(content);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <header className="sticky top-0 z-40 bg-[#080d1a]/90 backdrop-blur-md border-b border-white/[0.08] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand / Profile Info */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 border border-cyan-500/30 flex items-center justify-center shrink-0 shadow-inner">
            <Code2 className="w-5 h-5 text-cyan-400" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-100 text-sm sm:text-base truncate">
                {profile.name}
              </span>
              <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="hidden sm:inline text-xs text-emerald-400 font-mono">
                {profile.availableForHire ? 'কাজের জন্য উপলব্ধ' : 'ব্যস্ত'}
              </span>
            </div>
            <p className="text-xs text-slate-400 truncate max-w-[200px] sm:max-w-xs font-mono">
              {profile.title}
            </p>
          </div>
        </div>

        {/* Desktop Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1 bg-[#0f172a]/90 p-1 rounded-xl border border-white/[0.06]">
          <button
            onClick={() => setActiveTab('portfolio')}
            className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
              activeTab === 'portfolio'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.03]'
            }`}
          >
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>পোর্টফোলিও</span>
          </button>

          <button
            onClick={() => setActiveTab('experience')}
            className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
              activeTab === 'experience'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.03]'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>অভিজ্ঞতা</span>
          </button>

          <button
            onClick={() => setActiveTab('tasks')}
            className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg transition-all relative ${
              activeTab === 'tasks'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.03]'
            }`}
          >
            <ListTodo className="w-3.5 h-3.5" />
            <span>টাস্ক বোর্ড</span>
            {pendingTasksCount > 0 && (
              <span className="px-1.5 py-0.2 text-[10px] font-mono bg-cyan-500/30 text-cyan-200 rounded-full">
                {pendingTasksCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('studio')}
            className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
              activeTab === 'studio'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.03]'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>ম্যানেজমেন্ট স্টুডিও</span>
          </button>

          <button
            onClick={() => setActiveTab('ai')}
            className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
              activeTab === 'ai'
                ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 shadow-sm'
                : 'text-slate-400 hover:text-indigo-300 hover:bg-indigo-500/10'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>এআই ল্যাব</span>
          </button>
        </nav>

        {/* Action Controls & View Switcher */}
        <div className="flex items-center gap-2">
          {/* Live Preview Toggle Button */}
          <button
            onClick={() => setPreviewMode(!previewMode)}
            title={previewMode ? 'স্টুডিও মোডে ফিরে যান' : 'লাইভ প্রিভিউ দেখুন'}
            className={`mobile-press flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
              previewMode
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-sm'
                : 'bg-white/[0.05] text-slate-300 border-white/[0.08] hover:bg-white/[0.08]'
            }`}
          >
            {previewMode ? (
              <>
                <Edit3 className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden sm:inline">স্টুডিও এডিট মোড</span>
              </>
            ) : (
              <>
                <Eye className="w-3.5 h-3.5 text-cyan-400" />
                <span className="hidden sm:inline">লাইভ ভিউ</span>
              </>
            )}
          </button>

          {/* Backup & Actions Dropdown / Quick Tools */}
          <div className="flex items-center gap-1 border-l border-white/[0.08] pl-2">
            <button
              onClick={exportDataJSON}
              title="ব্যাকআপ ডাউনলোড করুন (JSON)"
              className="mobile-press p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-white/[0.05] transition-colors"
            >
              <Download className="w-4 h-4" />
            </button>

            <label
              title="ব্যাকআপ ইমপোর্ট করুন"
              className="mobile-press p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-white/[0.05] transition-colors cursor-pointer"
            >
              <Upload className="w-4 h-4" />
              <input
                type="file"
                accept=".json"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>

            <button
              onClick={() => {
                if (window.confirm('আপনি কি সকল ডেটা ডিফল্ট অবস্থায় রিসেট করতে চান?')) {
                  resetAllData();
                }
              }}
              title="ডিফল্ট ডেটা রিস্টোর করুন"
              className="mobile-press p-2 rounded-lg text-slate-500 hover:text-amber-400 hover:bg-amber-500/10 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
