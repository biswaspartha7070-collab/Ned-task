import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { aiService } from '../../services/aiService';
import {
  Sparkles,
  FolderGit2,
  Briefcase,
  ListTodo,
  User,
  ArrowRight,
  CheckCircle2,
  Copy,
  Check,
  Cpu,
  Layers
} from 'lucide-react';

export const AIAssistantModal: React.FC = () => {
  const { addProject, addExperience, addTask, updateProfile, showToast, setActiveTab } = useApp();

  const [activeTool, setActiveTool] = useState<'project' | 'experience' | 'task' | 'bio'>('project');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  // 1. Project generator state
  const [projName, setProjName] = useState('');
  const [projStack, setProjStack] = useState('React, TypeScript, Node.js, Tailwind CSS');
  const [projDescription, setProjDescription] = useState('');
  const [generatedProject, setGeneratedProject] = useState<any>(null);

  // 2. Experience polisher state
  const [expRole, setExpRole] = useState('');
  const [expCompany, setExpCompany] = useState('');
  const [expRawText, setExpRawText] = useState('');
  const [polishedExperience, setPolishedExperience] = useState<any>(null);

  // 3. Task breakdown state
  const [taskName, setTaskName] = useState('');
  const [taskContext, setTaskContext] = useState('');
  const [brokenDownTask, setBrokenDownTask] = useState<any>(null);

  // 4. Bio generator state
  const [bioExperienceYears, setBioExperienceYears] = useState('5');
  const [bioSkills, setBioSkills] = useState('React 19, TypeScript, System Design, Cloud APIs');
  const [generatedBio, setGeneratedBio] = useState<any>(null);

  const handleGenerateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projName.trim()) return;
    setLoading(true);
    setGeneratedProject(null);
    try {
      const res = await aiService.generateProjectCaseStudy({
        title: projName,
        domain: 'Full-Stack Web Application',
        techStack: projStack,
        description: projDescription,
        language: 'bn',
      });
      setGeneratedProject(res);
      showToast('এআই প্রজেক্ট কেস স্টাডি সফলভাবে তৈরি হয়েছে');
    } catch {
      showToast('প্রজেক্ট তৈরিতে ত্রুটি', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleApplyProject = () => {
    if (!generatedProject) return;
    addProject({
      title: generatedProject.title || projName,
      tagline: generatedProject.tagline || 'আধুনিক হাই-স্কেল ডিজিটাল প্রজেক্ট',
      category: generatedProject.category || 'Full-Stack',
      overview: generatedProject.overview || projDescription,
      technologies: generatedProject.technologies || ['React', 'TypeScript'],
      metrics: generatedProject.metrics || ['উন্নত কার্যক্ষমতা', 'অপ্টিমাইজড আর্কিটেকচার'],
      features: generatedProject.features || ['রেসপন্সিভ ডিজাইন'],
      challengesSolved: generatedProject.challengesSolved,
      featured: true,
      completionDate: '২০২৬',
    });
    setActiveTab('portfolio');
  };

  const handlePolishExperience = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!expRole.trim() || !expCompany.trim()) return;
    setLoading(true);
    setPolishedExperience(null);
    try {
      const res = await aiService.polishExperience({
        role: expRole,
        company: expCompany,
        rawResponsibilities: expRawText,
        language: 'bn',
      });
      setPolishedExperience(res);
      showToast('কাজের অভিজ্ঞতা সফলভাবে পলিশ করা হয়েছে');
    } catch {
      showToast('অভিজ্ঞতা অপ্টিমাইজেশনে ত্রুটি', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleApplyExperience = () => {
    if (!polishedExperience) return;
    addExperience({
      role: polishedExperience.role || expRole,
      company: polishedExperience.company || expCompany,
      employmentType: 'Full-time',
      startDate: '২০২৩',
      endDate: 'বর্তমান',
      isCurrent: true,
      summary: polishedExperience.summary || expRawText,
      achievements: polishedExperience.achievements || [],
      skillsHighlighted: polishedExperience.skillsHighlighted || ['Software Engineering'],
    });
    setActiveTab('experience');
  };

  const handleBreakdownTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskName.trim()) return;
    setLoading(true);
    setBrokenDownTask(null);
    try {
      const res = await aiService.breakdownTask({
        taskTitle: taskName,
        context: taskContext,
        language: 'bn',
      });
      setBrokenDownTask(res);
      showToast('টাস্ক বিশ্লেষণ ও সাব-টাস্ক তৈরি সম্পন্ন');
    } catch {
      showToast('টাস্ক বিশ্লেষণে ত্রুটি', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleApplyTask = () => {
    if (!brokenDownTask) return;
    addTask({
      title: taskName,
      description: brokenDownTask.technicalNotes,
      status: 'todo',
      priority: 'high',
      dueDate: new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10),
      estimatedHours: 4,
      subtasks: (brokenDownTask.subtasks || []).map((st: any, i: number) => ({
        id: `st-ai-${Date.now()}-${i}`,
        title: st.title,
        completed: false,
      })),
    });
    setActiveTab('tasks');
  };

  const handleGenerateBio = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setGeneratedBio(null);
    try {
      const res = await aiService.generateSummary({
        name: 'পার্থ বিশ্বাস',
        title: 'সিনিয়র ফুল-স্ট্যাক ইঞ্জিনিয়ার',
        currentSkills: bioSkills,
        yearsOfExperience: `${bioExperienceYears}+ বছর`,
        language: 'bn',
      });
      setGeneratedBio(res);
      showToast('প্রোফাইল বায়ো তৈরি হয়েছে');
    } catch {
      showToast('বায়ো জেনারেশনে ত্রুটি', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleApplyBio = () => {
    if (!generatedBio) return;
    updateProfile({
      tagline: generatedBio.headline,
      bio: generatedBio.bioShort,
      aboutDetailed: generatedBio.bioDetailed,
    });
    setActiveTab('portfolio');
  };

  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 mb-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>জেমিনাই এআই চালিত স্মার্ট অ্যাসিস্ট্যান্ট</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 font-heading">
          এআই স্টুডিও ল্যাব
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          এক ক্লিকে প্রজেক্ট কেস স্টাডি, রেজুমে বুলেটস, টাস্ক ব্রেকডাউন এবং প্রফেশনাল বায়ো তৈরি করুন
        </p>
      </div>

      {/* Tool Selection Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        <button
          onClick={() => setActiveTool('project')}
          className={`mobile-press p-3.5 rounded-2xl border text-left transition-all ${
            activeTool === 'project'
              ? 'bg-indigo-500/15 border-indigo-500/40 text-indigo-300 shadow-lg'
              : 'bg-[#0e1628] border-white/[0.08] text-slate-400 hover:text-slate-200'
          }`}
        >
          <FolderGit2 className="w-4 h-4 mb-1.5 text-indigo-400" />
          <h4 className="text-xs font-semibold block text-slate-200">প্রজেক্ট জেনারেটর</h4>
          <span className="text-[10px] text-slate-400 block mt-0.5">আইডিয়া থেকে কেস স্টাডি</span>
        </button>

        <button
          onClick={() => setActiveTool('experience')}
          className={`mobile-press p-3.5 rounded-2xl border text-left transition-all ${
            activeTool === 'experience'
              ? 'bg-indigo-500/15 border-indigo-500/40 text-indigo-300 shadow-lg'
              : 'bg-[#0e1628] border-white/[0.08] text-slate-400 hover:text-slate-200'
          }`}
        >
          <Briefcase className="w-4 h-4 mb-1.5 text-indigo-400" />
          <h4 className="text-xs font-semibold block text-slate-200">অভিজ্ঞতা পলিশার</h4>
          <span className="text-[10px] text-slate-400 block mt-0.5">কোয়ান্টিফাইড রেজুমে বুলেটস</span>
        </button>

        <button
          onClick={() => setActiveTool('task')}
          className={`mobile-press p-3.5 rounded-2xl border text-left transition-all ${
            activeTool === 'task'
              ? 'bg-indigo-500/15 border-indigo-500/40 text-indigo-300 shadow-lg'
              : 'bg-[#0e1628] border-white/[0.08] text-slate-400 hover:text-slate-200'
          }`}
        >
          <ListTodo className="w-4 h-4 mb-1.5 text-indigo-400" />
          <h4 className="text-xs font-semibold block text-slate-200">টাস্ক ব্রেকডাউন</h4>
          <span className="text-[10px] text-slate-400 block mt-0.5">ফিচারকে সাব-টাস্কে রূপান্তর</span>
        </button>

        <button
          onClick={() => setActiveTool('bio')}
          className={`mobile-press p-3.5 rounded-2xl border text-left transition-all ${
            activeTool === 'bio'
              ? 'bg-indigo-500/15 border-indigo-500/40 text-indigo-300 shadow-lg'
              : 'bg-[#0e1628] border-white/[0.08] text-slate-400 hover:text-slate-200'
          }`}
        >
          <User className="w-4 h-4 mb-1.5 text-indigo-400" />
          <h4 className="text-xs font-semibold block text-slate-200">প্রোফাইল বায়ো</h4>
          <span className="text-[10px] text-slate-400 block mt-0.5">হেডলাইন ও সামারি তৈরি</span>
        </button>
      </div>

      {/* TOOL 1: Project Case Study Generator */}
      {activeTool === 'project' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <form
            onSubmit={handleGenerateProject}
            className="bg-[#0e1628] border border-white/[0.08] rounded-2xl p-5 sm:p-6 space-y-4 shadow-xl"
          >
            <h3 className="text-sm font-semibold text-slate-100 flex items-center gap-2 border-b border-white/[0.06] pb-3">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>প্রজেক্টের বিবরণ ইনপুট করুন</span>
            </h3>

            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-300">প্রজেক্ট নাম বা কনসেপ্ট *</label>
              <input
                type="text"
                required
                value={projName}
                onChange={(e) => setProjName(e.target.value)}
                placeholder="যেমন: ক্লাউড ড্রাইভ ও ফাইল শেয়ারিং অ্যাপ"
                className="w-full bg-[#080d1a] border border-white/[0.08] focus:border-indigo-500 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-300">টেকনোলজি স্ট্যাক</label>
              <input
                type="text"
                value={projStack}
                onChange={(e) => setProjStack(e.target.value)}
                placeholder="React, TypeScript, Node.js, AWS S3"
                className="w-full bg-[#080d1a] border border-white/[0.08] focus:border-indigo-500 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-300">প্রাথমিক নোট বা উদ্দেশ্য</label>
              <textarea
                rows={3}
                value={projDescription}
                onChange={(e) => setProjDescription(e.target.value)}
                placeholder="ব্যবহারকারীরা যেন বড় ফাইল সহজে এনক্রিপ্ট করে শেয়ার করতে পারেন..."
                className="w-full bg-[#080d1a] border border-white/[0.08] focus:border-indigo-500 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mobile-press w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-500 hover:bg-indigo-400 disabled:opacity-50 text-white font-semibold text-xs rounded-xl transition-all shadow-lg shadow-indigo-950/50"
            >
              <Sparkles className="w-4 h-4" />
              <span>{loading ? 'এআই প্রজেক্ট তৈরি করছে...' : 'কেস স্টাডি জেনারেট করুন'}</span>
            </button>
          </form>

          {/* Result Card */}
          <div className="bg-[#0e1628] border border-white/[0.08] rounded-2xl p-5 sm:p-6 flex flex-col justify-between shadow-xl">
            {generatedProject ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
                  <div>
                    <span className="text-[11px] font-mono text-indigo-400">
                      {generatedProject.category}
                    </span>
                    <h3 className="text-base font-bold text-slate-100">
                      {generatedProject.title}
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono bg-indigo-500/10 text-indigo-300 px-2 py-0.5 rounded border border-indigo-500/20">
                    এআই জেনারেটেড
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {generatedProject.overview}
                </p>

                {generatedProject.metrics && (
                  <div className="space-y-1">
                    <span className="text-[11px] font-mono text-slate-400">মেট্রিক্স:</span>
                    {generatedProject.metrics.map((m: string, i: number) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{m}</span>
                      </div>
                    ))}
                  </div>
                )}

                {generatedProject.technologies && (
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {generatedProject.technologies.map((t: string, i: number) => (
                      <span
                        key={i}
                        className="text-[11px] font-mono text-slate-400 bg-white/[0.03] px-2 py-0.5 rounded border border-white/[0.05]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}

                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-end gap-2">
                  <button
                    onClick={handleApplyProject}
                    className="mobile-press flex items-center gap-1.5 px-4 py-2 bg-cyan-400 hover:bg-cyan-300 text-[#080d1a] font-semibold text-xs rounded-xl transition-all"
                  >
                    <span>সরাসরি পোর্টফোলিওতে যুক্ত করুন</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-2">
                <Sparkles className="w-8 h-8 text-slate-600" />
                <p className="text-xs text-slate-400">
                  বামপাশে তথ্য পূরণ করে "কেস স্টাডি জেনারেট করুন" বাটনে ক্লিক করুন।
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TOOL 2: Experience Polisher */}
      {activeTool === 'experience' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <form
            onSubmit={handlePolishExperience}
            className="bg-[#0e1628] border border-white/[0.08] rounded-2xl p-5 sm:p-6 space-y-4 shadow-xl"
          >
            <h3 className="text-sm font-semibold text-slate-100 flex items-center gap-2 border-b border-white/[0.06] pb-3">
              <Briefcase className="w-4 h-4 text-indigo-400" />
              <span>চাকরি বা পদের তথ্য দিন</span>
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-300">পদবী *</label>
                <input
                  type="text"
                  required
                  value={expRole}
                  onChange={(e) => setExpRole(e.target.value)}
                  placeholder="যেমন: ফ্রন্টএন্ড ইঞ্জিনিয়ার"
                  className="w-full bg-[#080d1a] border border-white/[0.08] focus:border-indigo-500 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-300">কোম্পানি *</label>
                <input
                  type="text"
                  required
                  value={expCompany}
                  onChange={(e) => setExpCompany(e.target.value)}
                  placeholder="যেমন: টেক স্টুডিও"
                  className="w-full bg-[#080d1a] border border-white/[0.08] focus:border-indigo-500 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-300">
                আপনার সাধারণ কাজের নোট বা দায়িত্ব
              </label>
              <textarea
                rows={4}
                value={expRawText}
                onChange={(e) => setExpRawText(e.target.value)}
                placeholder="যেমন: রিয়্যাক্ট দিয়ে ওয়েব অ্যাপ বানিয়েছি, বাগ ফিক্স করেছি, এপিআই কল অপ্টিমাইজ করেছি..."
                className="w-full bg-[#080d1a] border border-white/[0.08] focus:border-indigo-500 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mobile-press w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-500 hover:bg-indigo-400 disabled:opacity-50 text-white font-semibold text-xs rounded-xl transition-all shadow-lg"
            >
              <Sparkles className="w-4 h-4" />
              <span>{loading ? 'পলিশ করা হচ্ছে...' : 'রেজুমে বুলেটস অপ্টিমাইজ করুন'}</span>
            </button>
          </form>

          {/* Result Card */}
          <div className="bg-[#0e1628] border border-white/[0.08] rounded-2xl p-5 sm:p-6 flex flex-col justify-between shadow-xl">
            {polishedExperience ? (
              <div className="space-y-4">
                <div className="border-b border-white/[0.06] pb-3">
                  <span className="text-xs font-mono text-indigo-400">
                    {polishedExperience.company}
                  </span>
                  <h3 className="text-base font-bold text-slate-100">
                    {polishedExperience.role}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    {polishedExperience.summary}
                  </p>
                </div>

                <div className="space-y-2">
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                    অপ্টিমাইজড রেজুমে অর্জনসমূহ:
                  </span>
                  <ul className="space-y-2">
                    {polishedExperience.achievements.map((ach: string, i: number) => (
                      <li key={i} className="text-xs text-slate-200 flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-end gap-2">
                  <button
                    onClick={handleApplyExperience}
                    className="mobile-press flex items-center gap-1.5 px-4 py-2 bg-cyan-400 hover:bg-cyan-300 text-[#080d1a] font-semibold text-xs rounded-xl transition-all"
                  >
                    <span>কাজের অভিজ্ঞতায় যুক্ত করুন</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-2">
                <Sparkles className="w-8 h-8 text-slate-600" />
                <p className="text-xs text-slate-400">
                  আপনার পদের দায়িত্বসমূহ লিখে পলিশ বাটনে চাপলে উচ্চ-ইমপ্যাক্ট বুলেটস তৈরি হবে।
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TOOL 3: Task Breakdown Assistant */}
      {activeTool === 'task' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <form
            onSubmit={handleBreakdownTask}
            className="bg-[#0e1628] border border-white/[0.08] rounded-2xl p-5 sm:p-6 space-y-4 shadow-xl"
          >
            <h3 className="text-sm font-semibold text-slate-100 flex items-center gap-2 border-b border-white/[0.06] pb-3">
              <ListTodo className="w-4 h-4 text-indigo-400" />
              <span>টাস্ক বা ফিচারের নাম দিন</span>
            </h3>

            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-300">ফিচার বা টাস্ক *</label>
              <input
                type="text"
                required
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                placeholder="যেমন: গুগল ও গিটহাব সোশ্যাল লগইন সিস্টেম তৈরি"
                className="w-full bg-[#080d1a] border border-white/[0.08] focus:border-indigo-500 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-300">প্রাসঙ্গিক তথ্য (ঐচ্ছিক)</label>
              <textarea
                rows={3}
                value={taskContext}
                onChange={(e) => setTaskContext(e.target.value)}
                placeholder="টোকেন সিকিউরিটি, রিফ্রেশ টোকেন হ্যান্ডলিং এবং এরর স্টেট..."
                className="w-full bg-[#080d1a] border border-white/[0.08] focus:border-indigo-500 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mobile-press w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-500 hover:bg-indigo-400 disabled:opacity-50 text-white font-semibold text-xs rounded-xl transition-all shadow-lg"
            >
              <Sparkles className="w-4 h-4" />
              <span>{loading ? 'সাব-টাস্ক তৈরি হচ্ছে...' : 'স্মার্ট সাব-টাস্কে ভাগ করুন'}</span>
            </button>
          </form>

          {/* Result Card */}
          <div className="bg-[#0e1628] border border-white/[0.08] rounded-2xl p-5 sm:p-6 flex flex-col justify-between shadow-xl">
            {brokenDownTask ? (
              <div className="space-y-4">
                <div className="border-b border-white/[0.06] pb-3">
                  <span className="text-[11px] font-mono text-indigo-400">
                    ট্যাগ: {brokenDownTask.suggestedTag || 'Feature'}
                  </span>
                  <h3 className="text-base font-bold text-slate-100">{taskName}</h3>
                  {brokenDownTask.technicalNotes && (
                    <p className="text-xs text-slate-400 mt-1">
                      পরামর্শ: {brokenDownTask.technicalNotes}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <span className="text-[11px] font-mono text-slate-400">
                    কার্যকর সাব-টাস্কসমূহ:
                  </span>
                  <div className="space-y-1.5">
                    {brokenDownTask.subtasks.map((st: any, i: number) => (
                      <div
                        key={i}
                        className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04] flex items-center justify-between text-xs"
                      >
                        <span className="text-slate-200">{st.title}</span>
                        <div className="flex items-center gap-2 font-mono text-[11px]">
                          <span className="text-cyan-400">~{st.estimatedHours}h</span>
                          <span className="text-slate-500 uppercase">{st.priority}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-end gap-2">
                  <button
                    onClick={handleApplyTask}
                    className="mobile-press flex items-center gap-1.5 px-4 py-2 bg-cyan-400 hover:bg-cyan-300 text-[#080d1a] font-semibold text-xs rounded-xl transition-all"
                  >
                    <span>টাস্ক বোর্ডে সেভ করুন</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-2">
                <Sparkles className="w-8 h-8 text-slate-600" />
                <p className="text-xs text-slate-400">
                  যেকোনো জটিল ফিচার বা প্রজেক্ট টাস্ককে স্বয়ংক্রিয়ভাবে ছোট ছোট ধাপে ভাগ করে নিন।
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TOOL 4: Bio & Headline Generator */}
      {activeTool === 'bio' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <form
            onSubmit={handleGenerateBio}
            className="bg-[#0e1628] border border-white/[0.08] rounded-2xl p-5 sm:p-6 space-y-4 shadow-xl"
          >
            <h3 className="text-sm font-semibold text-slate-100 flex items-center gap-2 border-b border-white/[0.06] pb-3">
              <User className="w-4 h-4 text-indigo-400" />
              <span>আপনার অভিজ্ঞতা ও দক্ষতার বিবরণ</span>
            </h3>

            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-300">কাজের অভিজ্ঞতা (বছর)</label>
              <input
                type="number"
                min="1"
                value={bioExperienceYears}
                onChange={(e) => setBioExperienceYears(e.target.value)}
                className="w-full bg-[#080d1a] border border-white/[0.08] focus:border-indigo-500 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-300">মূল প্রযুক্তি ও বিশেষত্ব</label>
              <input
                type="text"
                value={bioSkills}
                onChange={(e) => setBioSkills(e.target.value)}
                className="w-full bg-[#080d1a] border border-white/[0.08] focus:border-indigo-500 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mobile-press w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-500 hover:bg-indigo-400 disabled:opacity-50 text-white font-semibold text-xs rounded-xl transition-all shadow-lg"
            >
              <Sparkles className="w-4 h-4" />
              <span>{loading ? 'বায়ো তৈরি হচ্ছে...' : 'প্রোফাইল বায়ো জেনারেট করুন'}</span>
            </button>
          </form>

          {/* Result Card */}
          <div className="bg-[#0e1628] border border-white/[0.08] rounded-2xl p-5 sm:p-6 flex flex-col justify-between shadow-xl">
            {generatedBio ? (
              <div className="space-y-4">
                <div className="border-b border-white/[0.06] pb-3">
                  <span className="text-[11px] font-mono text-indigo-400">প্রস্তাবিত হেডলাইন:</span>
                  <h3 className="text-base font-bold text-slate-100 mt-0.5">
                    {generatedBio.headline}
                  </h3>
                </div>

                <div>
                  <span className="text-[11px] font-mono text-slate-400">সংক্ষিপ্ত বায়ো (Hero):</span>
                  <p className="text-xs text-slate-300 leading-relaxed mt-1">
                    {generatedBio.bioShort}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-end gap-2">
                  <button
                    onClick={handleApplyBio}
                    className="mobile-press flex items-center gap-1.5 px-4 py-2 bg-cyan-400 hover:bg-cyan-300 text-[#080d1a] font-semibold text-xs rounded-xl transition-all"
                  >
                    <span>প্রোফাইলে প্রয়োগ করুন</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-2">
                <Sparkles className="w-8 h-8 text-slate-600" />
                <p className="text-xs text-slate-400">
                  আপনার দক্ষতা অনুযায়ী আকর্ষণীয় বায়ো ও হেডলাইন তৈরি করে প্রোফাইলে যুক্ত করুন।
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
