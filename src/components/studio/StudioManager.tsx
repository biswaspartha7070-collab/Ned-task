import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Project, Experience } from '../../types';
import { aiService } from '../../services/aiService';
import {
  Sliders,
  FolderGit2,
  Briefcase,
  Code2,
  User,
  Plus,
  Trash2,
  Edit3,
  Pin,
  Sparkles,
  Save,
  Check,
  ExternalLink,
  Github
} from 'lucide-react';

export const StudioManager: React.FC = () => {
  const {
    profile,
    updateProfile,
    projects,
    addProject,
    updateProject,
    deleteProject,
    toggleProjectFeatured,
    experiences,
    addExperience,
    updateExperience,
    deleteExperience,
    skillCategories,
    addSkillToCategory,
    removeSkillFromCategory,
    showToast
  } = useApp();

  const [activeSection, setActiveSection] = useState<'projects' | 'experience' | 'skills' | 'profile'>('projects');

  // Project form state
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [projTitle, setProjTitle] = useState('');
  const [projTagline, setProjTagline] = useState('');
  const [projCategory, setProjCategory] = useState<Project['category']>('Full-Stack');
  const [projOverview, setProjOverview] = useState('');
  const [projTech, setProjTech] = useState('');
  const [projMetrics, setProjMetrics] = useState('');
  const [projFeatures, setProjFeatures] = useState('');
  const [projLiveUrl, setProjLiveUrl] = useState('');
  const [projGithubUrl, setProjGithubUrl] = useState('');
  const [projChallenges, setProjChallenges] = useState('');
  const [isAiGeneratingProj, setIsAiGeneratingProj] = useState(false);

  // Experience form state
  const [editingExpId, setEditingExpId] = useState<string | null>(null);
  const [expRole, setExpRole] = useState('');
  const [expCompany, setExpCompany] = useState('');
  const [expLocation, setExpLocation] = useState('');
  const [expEmploymentType, setExpEmploymentType] = useState<Experience['employmentType']>('Full-time');
  const [expStartDate, setExpStartDate] = useState('');
  const [expEndDate, setExpEndDate] = useState('');
  const [expIsCurrent, setExpIsCurrent] = useState(false);
  const [expSummary, setExpSummary] = useState('');
  const [expAchievements, setExpAchievements] = useState('');
  const [expSkills, setExpSkills] = useState('');
  const [isAiPolishingExp, setIsAiPolishingExp] = useState(false);

  // Skill form state
  const [selectedCatId, setSelectedCatId] = useState<string>(skillCategories[0]?.id || '');
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillLevel, setNewSkillLevel] = useState<number>(85);

  // Profile form state
  const [profileForm, setProfileForm] = useState(profile);

  // Handle Project Form Submission
  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projTitle.trim()) return;

    const techArray = projTech.split(',').map((t) => t.trim()).filter(Boolean);
    const metricsArray = projMetrics.split('\n').map((m) => m.trim()).filter(Boolean);
    const featuresArray = projFeatures.split('\n').map((f) => f.trim()).filter(Boolean);

    if (editingProjectId) {
      updateProject(editingProjectId, {
        title: projTitle.trim(),
        tagline: projTagline.trim(),
        category: projCategory,
        overview: projOverview.trim(),
        technologies: techArray,
        metrics: metricsArray,
        features: featuresArray,
        challengesSolved: projChallenges.trim() || undefined,
        liveUrl: projLiveUrl.trim() || undefined,
        githubUrl: projGithubUrl.trim() || undefined,
      });
      setEditingProjectId(null);
    } else {
      addProject({
        title: projTitle.trim(),
        tagline: projTagline.trim(),
        category: projCategory,
        overview: projOverview.trim(),
        technologies: techArray.length ? techArray : ['React', 'TypeScript'],
        metrics: metricsArray,
        features: featuresArray,
        challengesSolved: projChallenges.trim() || undefined,
        liveUrl: projLiveUrl.trim() || undefined,
        githubUrl: projGithubUrl.trim() || undefined,
        featured: false,
        completionDate: '২০২৬',
      });
    }

    // Reset
    resetProjectForm();
  };

  const resetProjectForm = () => {
    setEditingProjectId(null);
    setProjTitle('');
    setProjTagline('');
    setProjCategory('Full-Stack');
    setProjOverview('');
    setProjTech('');
    setProjMetrics('');
    setProjFeatures('');
    setProjLiveUrl('');
    setProjGithubUrl('');
    setProjChallenges('');
  };

  const startEditProject = (p: Project) => {
    setEditingProjectId(p.id);
    setProjTitle(p.title);
    setProjTagline(p.tagline);
    setProjCategory(p.category);
    setProjOverview(p.overview);
    setProjTech(p.technologies.join(', '));
    setProjMetrics(p.metrics.join('\n'));
    setProjFeatures(p.features.join('\n'));
    setProjLiveUrl(p.liveUrl || '');
    setProjGithubUrl(p.githubUrl || '');
    setProjChallenges(p.challengesSolved || '');
  };

  const handleAiFillProject = async () => {
    if (!projTitle.trim() && !projOverview.trim()) {
      showToast('অনুগ্রহ করে অন্তত প্রজেক্টের নাম বা আইডিয়া লিখুন', 'info');
      return;
    }
    setIsAiGeneratingProj(true);
    try {
      const generated = await aiService.generateProjectCaseStudy({
        title: projTitle,
        domain: projCategory,
        techStack: projTech,
        description: projOverview,
        language: 'bn',
      });

      if (generated) {
        if (generated.title) setProjTitle(generated.title);
        if (generated.tagline) setProjTagline(generated.tagline);
        if (generated.category) setProjCategory(generated.category as any);
        if (generated.overview) setProjOverview(generated.overview);
        if (generated.metrics) setProjMetrics(generated.metrics.join('\n'));
        if (generated.technologies) setProjTech(generated.technologies.join(', '));
        if (generated.features) setProjFeatures(generated.features.join('\n'));
        if (generated.challengesSolved) setProjChallenges(generated.challengesSolved);
        showToast('এআই প্রজেক্ট বিবরণ সফলভাবে তৈরি করেছে');
      }
    } catch {
      showToast('এআই জেনারেশনে ত্রুটি', 'error');
    } finally {
      setIsAiGeneratingProj(false);
    }
  };

  // Handle Experience Form Submission
  const handleSaveExperience = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expRole.trim() || !expCompany.trim()) return;

    const achievementsArray = expAchievements.split('\n').map((a) => a.trim()).filter(Boolean);
    const skillsArray = expSkills.split(',').map((s) => s.trim()).filter(Boolean);

    if (editingExpId) {
      updateExperience(editingExpId, {
        role: expRole.trim(),
        company: expCompany.trim(),
        location: expLocation.trim() || undefined,
        employmentType: expEmploymentType,
        startDate: expStartDate.trim(),
        endDate: expIsCurrent ? 'বর্তমান' : expEndDate.trim(),
        isCurrent: expIsCurrent,
        summary: expSummary.trim(),
        achievements: achievementsArray,
        skillsHighlighted: skillsArray,
      });
      setEditingExpId(null);
    } else {
      addExperience({
        role: expRole.trim(),
        company: expCompany.trim(),
        location: expLocation.trim() || undefined,
        employmentType: expEmploymentType,
        startDate: expStartDate.trim() || '২০২৪',
        endDate: expIsCurrent ? 'বর্তমান' : (expEndDate.trim() || '২০২৬'),
        isCurrent: expIsCurrent,
        summary: expSummary.trim(),
        achievements: achievementsArray,
        skillsHighlighted: skillsArray,
      });
    }

    resetExperienceForm();
  };

  const resetExperienceForm = () => {
    setEditingExpId(null);
    setExpRole('');
    setExpCompany('');
    setExpLocation('');
    setExpEmploymentType('Full-time');
    setExpStartDate('');
    setExpEndDate('');
    setExpIsCurrent(false);
    setExpSummary('');
    setExpAchievements('');
    setExpSkills('');
  };

  const startEditExperience = (exp: Experience) => {
    setEditingExpId(exp.id);
    setExpRole(exp.role);
    setExpCompany(exp.company);
    setExpLocation(exp.location || '');
    setExpEmploymentType(exp.employmentType);
    setExpStartDate(exp.startDate);
    setExpEndDate(exp.endDate);
    setExpIsCurrent(exp.isCurrent);
    setExpSummary(exp.summary);
    setExpAchievements(exp.achievements.join('\n'));
    setExpSkills(exp.skillsHighlighted.join(', '));
  };

  const handleAiPolishExperience = async () => {
    if (!expRole.trim() || !expCompany.trim()) {
      showToast('অনুগ্রহ করে পদবী এবং কোম্পানির নাম লিখুন', 'info');
      return;
    }
    setIsAiPolishingExp(true);
    try {
      const polished = await aiService.polishExperience({
        role: expRole,
        company: expCompany,
        rawResponsibilities: expSummary || expAchievements,
        language: 'bn',
      });
      if (polished) {
        if (polished.summary) setExpSummary(polished.summary);
        if (polished.achievements) setExpAchievements(polished.achievements.join('\n'));
        if (polished.skillsHighlighted) setExpSkills(polished.skillsHighlighted.join(', '));
        showToast('এআই দ্বারা কাজের বিবরণ সমৃদ্ধ করা হয়েছে');
      }
    } catch {
      showToast('অভিজ্ঞতা অপ্টিমাইজেশনে সমস্যা হয়েছে', 'error');
    } finally {
      setIsAiPolishingExp(false);
    }
  };

  // Handle Add Skill
  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillName.trim() || !selectedCatId) return;

    addSkillToCategory(selectedCatId, {
      name: newSkillName.trim(),
      level: newSkillLevel,
    });
    setNewSkillName('');
  };

  // Handle Profile Update
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(profileForm);
  };

  return (
    <div className="space-y-8 pb-20">
      {/* Studio Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
          <Sliders className="w-3.5 h-3.5" />
          <span>পোর্টফোলিও ও প্রোফাইল নিয়ন্ত্রণ কেন্দ্র</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 font-heading">
          ম্যানেজমেন্ট স্টুডিও
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          প্রজেক্ট, কাজের অভিজ্ঞতা, স্কিলস এবং ব্যক্তিগত তথ্য সম্পাদনা ও আপডেট করুন
        </p>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-white/[0.08] pb-3 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveSection('projects')}
          className={`mobile-press flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-xl transition-all whitespace-nowrap ${
            activeSection === 'projects'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <FolderGit2 className="w-4 h-4" />
          <span>প্রজেক্ট ম্যানেজমেন্ট ({projects.length})</span>
        </button>

        <button
          onClick={() => setActiveSection('experience')}
          className={`mobile-press flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-xl transition-all whitespace-nowrap ${
            activeSection === 'experience'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>কাজের অভিজ্ঞতা ({experiences.length})</span>
        </button>

        <button
          onClick={() => setActiveSection('skills')}
          className={`mobile-press flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-xl transition-all whitespace-nowrap ${
            activeSection === 'skills'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Code2 className="w-4 h-4" />
          <span>দক্ষতা ও প্রযুক্তি</span>
        </button>

        <button
          onClick={() => setActiveSection('profile')}
          className={`mobile-press flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-xl transition-all whitespace-nowrap ${
            activeSection === 'profile'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <User className="w-4 h-4" />
          <span>প্রোফাইল তথ্য ও যোগাযোগ</span>
        </button>
      </div>

      {/* SECTION: Projects Management */}
      {activeSection === 'projects' && (
        <div className="space-y-6">
          {/* Add / Edit Form */}
          <form
            onSubmit={handleSaveProject}
            className="bg-[#0e1628] border border-white/[0.08] rounded-2xl p-5 sm:p-7 space-y-4 shadow-xl"
          >
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
              <h3 className="text-sm font-semibold text-slate-100 flex items-center gap-2">
                <FolderGit2 className="w-4 h-4 text-cyan-400" />
                <span>
                  {editingProjectId ? 'প্রজেক্ট সম্পাদনা করুন' : 'নতুন প্রজেক্ট যুক্ত করুন'}
                </span>
              </h3>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleAiFillProject}
                  disabled={isAiGeneratingProj}
                  className="mobile-press flex items-center gap-1.5 px-3 py-1.5 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-xl text-xs font-medium transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                  <span>{isAiGeneratingProj ? 'তৈরি হচ্ছে...' : 'এআই অটো-ফিল'}</span>
                </button>
                {editingProjectId && (
                  <button
                    type="button"
                    onClick={resetProjectForm}
                    className="text-xs text-slate-400 hover:text-slate-200"
                  >
                    বাতিল
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1 sm:col-span-2">
                <label className="text-xs font-mono text-slate-300">প্রজেক্ট নাম / শিরোনাম *</label>
                <input
                  type="text"
                  required
                  value={projTitle}
                  onChange={(e) => setProjTitle(e.target.value)}
                  placeholder="যেমন: এআই-পাওয়ার্ড ফিনটেক ড্যাশবোর্ড"
                  className="w-full bg-[#080d1a] border border-white/[0.08] focus:border-cyan-500 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-300">ক্যাটাগরি</label>
                <select
                  value={projCategory}
                  onChange={(e) => setProjCategory(e.target.value as any)}
                  className="w-full bg-[#080d1a] border border-white/[0.08] focus:border-cyan-500 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none"
                >
                  <option value="Full-Stack">Full-Stack</option>
                  <option value="Frontend">Frontend</option>
                  <option value="Mobile">Mobile</option>
                  <option value="AI/ML">AI/ML</option>
                  <option value="Backend">Backend</option>
                  <option value="DevOps">DevOps</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-300">সংক্ষিপ্ত ট্যাগলাইন</label>
                <input
                  type="text"
                  value={projTagline}
                  onChange={(e) => setProjTagline(e.target.value)}
                  placeholder="যেমন: রিয়েল-টাইম ট্রানজ্যাকশন অ্যানালিটিক্স প্ল্যাটফর্ম"
                  className="w-full bg-[#080d1a] border border-white/[0.08] focus:border-cyan-500 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none"
                />
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="text-xs font-mono text-slate-300">বিস্তারিত বিবরণী (Overview)</label>
                <textarea
                  rows={2}
                  value={projOverview}
                  onChange={(e) => setProjOverview(e.target.value)}
                  placeholder="প্রজেক্টটি কী কাজ করে এবং কেন তৈরি করা হয়েছে..."
                  className="w-full bg-[#080d1a] border border-white/[0.08] focus:border-cyan-500 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none"
                />
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="text-xs font-mono text-slate-300">
                  ব্যবহৃত প্রযুক্তি (কমা দিয়ে আলাদা করুন)
                </label>
                <input
                  type="text"
                  value={projTech}
                  onChange={(e) => setProjTech(e.target.value)}
                  placeholder="React 19, TypeScript, Tailwind CSS, Node.js"
                  className="w-full bg-[#080d1a] border border-white/[0.08] focus:border-cyan-500 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-300">
                  পরিমাপযোগ্য ফলাফল / মেট্রিক্স (প্রতি লাইনে একটি)
                </label>
                <textarea
                  rows={2}
                  value={projMetrics}
                  onChange={(e) => setProjMetrics(e.target.value)}
                  placeholder="৪০% কম লোডিং সময়&#10;১০ হাজার+ অ্যাক্টিভ ইউজার"
                  className="w-full bg-[#080d1a] border border-white/[0.08] focus:border-cyan-500 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-300">
                  প্রধান ফিচারসমূহ (প্রতি লাইনে একটি)
                </label>
                <textarea
                  rows={2}
                  value={projFeatures}
                  onChange={(e) => setProjFeatures(e.target.value)}
                  placeholder="রিয়েল-টাইম ওয়েব-সকেট সিঙ্ক&#10;অফলাইন সাপোর্ট"
                  className="w-full bg-[#080d1a] border border-white/[0.08] focus:border-cyan-500 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-300">লাইভ ডেমো ইউআরএল</label>
                <input
                  type="url"
                  value={projLiveUrl}
                  onChange={(e) => setProjLiveUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="w-full bg-[#080d1a] border border-white/[0.08] focus:border-cyan-500 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-300">গিটহাব রিপোজিটরি ইউআরএল</label>
                <input
                  type="url"
                  value={projGithubUrl}
                  onChange={(e) => setProjGithubUrl(e.target.value)}
                  placeholder="https://github.com/username/project"
                  className="w-full bg-[#080d1a] border border-white/[0.08] focus:border-cyan-500 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-white/[0.06]">
              {editingProjectId && (
                <button
                  type="button"
                  onClick={resetProjectForm}
                  className="px-4 py-2 text-xs text-slate-400 hover:text-slate-200"
                >
                  বাতিল
                </button>
              )}
              <button
                type="submit"
                className="mobile-press flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-[#080d1a] bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-all"
              >
                <Save className="w-4 h-4" />
                <span>{editingProjectId ? 'পরিবর্তন সেভ করুন' : 'প্রজেক্ট যোগ করুন'}</span>
              </button>
            </div>
          </form>

          {/* Current Projects List */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400">
              বর্তমান প্রজেক্ট তালিকা ({projects.length})
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {projects.map((p) => (
                <div
                  key={p.id}
                  className="bg-[#0b1222] border border-white/[0.06] rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                      <span>{p.category}</span>
                      {p.featured && (
                        <span className="text-[10px] text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded">
                          হাইলাইট
                        </span>
                      )}
                    </div>
                    <h4 className="text-sm font-semibold text-slate-100 mt-0.5">{p.title}</h4>
                    <p className="text-xs text-slate-400 truncate max-w-md">{p.tagline}</p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                    <button
                      onClick={() => toggleProjectFeatured(p.id)}
                      title={p.featured ? 'হাইলাইট সরান' : 'হাইলাইট করুন'}
                      className={`p-1.5 rounded-lg border transition-colors ${
                        p.featured
                          ? 'bg-amber-400/10 text-amber-400 border-amber-400/30'
                          : 'text-slate-400 hover:text-slate-200 border-white/[0.06]'
                      }`}
                    >
                      <Pin className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => startEditProject(p)}
                      title="সম্পাদনা করুন"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-cyan-500/10 border border-white/[0.06] transition-colors"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm('আপনি কি এই প্রজেক্ট মুছে ফেলতে চান?')) {
                          deleteProject(p.id);
                        }
                      }}
                      title="মুছে ফেলুন"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 border border-white/[0.06] transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SECTION: Experience Management */}
      {activeSection === 'experience' && (
        <div className="space-y-6">
          {/* Add / Edit Experience Form */}
          <form
            onSubmit={handleSaveExperience}
            className="bg-[#0e1628] border border-white/[0.08] rounded-2xl p-5 sm:p-7 space-y-4 shadow-xl"
          >
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
              <h3 className="text-sm font-semibold text-slate-100 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-cyan-400" />
                <span>
                  {editingExpId ? 'কাজের অভিজ্ঞতা সম্পাদনা করুন' : 'নতুন কাজের অভিজ্ঞতা যোগ করুন'}
                </span>
              </h3>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleAiPolishExperience}
                  disabled={isAiPolishingExp}
                  className="mobile-press flex items-center gap-1.5 px-3 py-1.5 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-xl text-xs font-medium transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                  <span>{isAiPolishingExp ? 'পলিশ হচ্ছে...' : 'এআই রেজুমে পলিশ'}</span>
                </button>
                {editingExpId && (
                  <button
                    type="button"
                    onClick={resetExperienceForm}
                    className="text-xs text-slate-400 hover:text-slate-200"
                  >
                    বাতিল
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-300">পদের নাম / পদবী *</label>
                <input
                  type="text"
                  required
                  value={expRole}
                  onChange={(e) => setExpRole(e.target.value)}
                  placeholder="যেমন: সিনিয়র ফ্রন্টএন্ড ইঞ্জিনিয়ার"
                  className="w-full bg-[#080d1a] border border-white/[0.08] focus:border-cyan-500 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-300">কোম্পানির নাম *</label>
                <input
                  type="text"
                  required
                  value={expCompany}
                  onChange={(e) => setExpCompany(e.target.value)}
                  placeholder="যেমন: টেকনোলজি সলিউশনস লিমিটেড"
                  className="w-full bg-[#080d1a] border border-white/[0.08] focus:border-cyan-500 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-300">লোকেশন (ঐচ্ছিক)</label>
                <input
                  type="text"
                  value={expLocation}
                  onChange={(e) => setExpLocation(e.target.value)}
                  placeholder="ঢাকা / রিমোট"
                  className="w-full bg-[#080d1a] border border-white/[0.08] focus:border-cyan-500 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-300">চাকরির ধরন</label>
                <select
                  value={expEmploymentType}
                  onChange={(e) => setExpEmploymentType(e.target.value as any)}
                  className="w-full bg-[#080d1a] border border-white/[0.08] focus:border-cyan-500 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none"
                >
                  <option value="Full-time">Full-time (পূর্ণকালীন)</option>
                  <option value="Remote">Remote (দূরবর্তী)</option>
                  <option value="Contract">Contract (চুক্তিভিত্তিক)</option>
                  <option value="Part-time">Part-time (খণ্ডকালীন)</option>
                  <option value="Freelance">Freelance (ফ্রিল্যান্স)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-300">শুরুর সময়</label>
                <input
                  type="text"
                  value={expStartDate}
                  onChange={(e) => setExpStartDate(e.target.value)}
                  placeholder="যেমন: জানুয়ারি ২০২২"
                  className="w-full bg-[#080d1a] border border-white/[0.08] focus:border-cyan-500 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-mono text-slate-300">শেষের সময়</label>
                  <label className="text-xs text-slate-400 flex items-center gap-1 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={expIsCurrent}
                      onChange={(e) => setExpIsCurrent(e.target.checked)}
                      className="rounded bg-[#080d1a] border-white/[0.1] text-cyan-400 focus:ring-0"
                    />
                    <span>বর্তমানে কর্মরত</span>
                  </label>
                </div>
                <input
                  type="text"
                  disabled={expIsCurrent}
                  value={expIsCurrent ? 'বর্তমান' : expEndDate}
                  onChange={(e) => setExpEndDate(e.target.value)}
                  placeholder="যেমন: ডিসেম্বর ২০২৪"
                  className="w-full bg-[#080d1a] border border-white/[0.08] focus:border-cyan-500 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none disabled:opacity-50"
                />
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="text-xs font-mono text-slate-300">ভূমিকা ও দায়িত্বের সারসংক্ষেপ</label>
                <textarea
                  rows={2}
                  value={expSummary}
                  onChange={(e) => setExpSummary(e.target.value)}
                  placeholder="কোম্পানিতে আপনার ভূমিকা এবং কী ধরণের দায়িত্ব পালন করেছেন..."
                  className="w-full bg-[#080d1a] border border-white/[0.08] focus:border-cyan-500 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none"
                />
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="text-xs font-mono text-slate-300">
                  মূল অর্জনসমূহ ও ইমপ্যাক্ট বুলেটস (প্রতি লাইনে একটি)
                </label>
                <textarea
                  rows={3}
                  value={expAchievements}
                  onChange={(e) => setExpAchievements(e.target.value)}
                  placeholder="মাইক্রো-ফ্রন্টএন্ড আর্কিটেকচার বাস্তবায়ন করে পারফরম্যান্স ৪০% বৃদ্ধি&#10;৮ জনের ইঞ্জিনিয়ারিং টিমের নেতৃত্ব প্রদান"
                  className="w-full bg-[#080d1a] border border-white/[0.08] focus:border-cyan-500 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none"
                />
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="text-xs font-mono text-slate-300">ব্যবহৃত স্কিলস (কমা দিয়ে আলাদা)</label>
                <input
                  type="text"
                  value={expSkills}
                  onChange={(e) => setExpSkills(e.target.value)}
                  placeholder="React, TypeScript, System Design, CI/CD"
                  className="w-full bg-[#080d1a] border border-white/[0.08] focus:border-cyan-500 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-white/[0.06]">
              {editingExpId && (
                <button
                  type="button"
                  onClick={resetExperienceForm}
                  className="px-4 py-2 text-xs text-slate-400 hover:text-slate-200"
                >
                  বাতিল
                </button>
              )}
              <button
                type="submit"
                className="mobile-press flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-[#080d1a] bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-all"
              >
                <Save className="w-4 h-4" />
                <span>{editingExpId ? 'আপডেট সম্পন্ন করুন' : 'অভিজ্ঞতা যোগ করুন'}</span>
              </button>
            </div>
          </form>

          {/* Current Experience List */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400">
              বর্তমান অভিজ্ঞতার তালিকা ({experiences.length})
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {experiences.map((exp) => (
                <div
                  key={exp.id}
                  className="bg-[#0b1222] border border-white/[0.06] rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div>
                    <span className="text-xs font-mono text-cyan-400">{exp.company}</span>
                    <h4 className="text-sm font-semibold text-slate-100">{exp.role}</h4>
                    <span className="text-xs text-slate-400 font-mono">
                      {exp.startDate} - {exp.endDate}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => startEditExperience(exp)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-cyan-500/10 border border-white/[0.06] transition-colors"
                      title="সম্পাদনা করুন"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm('আপনি কি এই অভিজ্ঞতা মুছে ফেলতে চান?')) {
                          deleteExperience(exp.id);
                        }
                      }}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 border border-white/[0.06] transition-colors"
                      title="মুছে ফেলুন"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SECTION: Skills Management */}
      {activeSection === 'skills' && (
        <div className="space-y-6">
          <form
            onSubmit={handleAddSkill}
            className="bg-[#0e1628] border border-white/[0.08] rounded-2xl p-5 sm:p-7 space-y-4 shadow-xl"
          >
            <h3 className="text-sm font-semibold text-slate-100 flex items-center gap-2 border-b border-white/[0.06] pb-3">
              <Code2 className="w-4 h-4 text-cyan-400" />
              <span>নতুন স্কিল বা প্রযুক্তি যুক্ত করুন</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-300">ক্যাটাগরি</label>
                <select
                  value={selectedCatId}
                  onChange={(e) => setSelectedCatId(e.target.value)}
                  className="w-full bg-[#080d1a] border border-white/[0.08] focus:border-cyan-500 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none"
                >
                  {skillCategories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-300">স্কিলের নাম *</label>
                <input
                  type="text"
                  required
                  value={newSkillName}
                  onChange={(e) => setNewSkillName(e.target.value)}
                  placeholder="যেমন: GraphQL বা Docker"
                  className="w-full bg-[#080d1a] border border-white/[0.08] focus:border-cyan-500 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-center text-xs font-mono text-slate-300">
                  <span>দক্ষতা স্তর (Level)</span>
                  <span className="text-cyan-400">{newSkillLevel}%</span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="100"
                  value={newSkillLevel}
                  onChange={(e) => setNewSkillLevel(Number(e.target.value))}
                  className="w-full accent-cyan-400 h-2 bg-[#080d1a] rounded-lg cursor-pointer"
                />
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-white/[0.06]">
              <button
                type="submit"
                className="mobile-press flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-[#080d1a] bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>স্কিল যোগ করুন</span>
              </button>
            </div>
          </form>

          {/* Current Skills Groups */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {skillCategories.map((cat) => (
              <div
                key={cat.id}
                className="bg-[#0b1222] border border-white/[0.06] rounded-2xl p-5 space-y-3"
              >
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold border-b border-white/[0.06] pb-2">
                  {cat.name}
                </h4>
                <div className="space-y-2">
                  {cat.skills.map((skill, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between text-xs p-2 rounded-lg bg-white/[0.02] border border-white/[0.04]"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-slate-200">{skill.name}</span>
                        <span className="text-cyan-400 font-mono text-[11px]">({skill.level}%)</span>
                      </div>
                      <button
                        onClick={() => removeSkillFromCategory(cat.id, skill.name)}
                        className="p-1 text-slate-500 hover:text-rose-400 transition-colors"
                        title="মুছুন"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION: Profile Info */}
      {activeSection === 'profile' && (
        <form
          onSubmit={handleSaveProfile}
          className="bg-[#0e1628] border border-white/[0.08] rounded-2xl p-5 sm:p-7 space-y-5 shadow-xl"
        >
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
            <h3 className="text-sm font-semibold text-slate-100 flex items-center gap-2">
              <User className="w-4 h-4 text-cyan-400" />
              <span>প্রোফাইল ও যোগাযোগ তথ্য হালনাগাদ</span>
            </h3>
            <button
              type="submit"
              className="mobile-press flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#080d1a] bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-all"
            >
              <Save className="w-4 h-4" />
              <span>প্রোফাইল সেভ করুন</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-300">পূর্ণ নাম</label>
              <input
                type="text"
                value={profileForm.name}
                onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                className="w-full bg-[#080d1a] border border-white/[0.08] focus:border-cyan-500 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-300">প্রফেশনাল পদবী (Title)</label>
              <input
                type="text"
                value={profileForm.title}
                onChange={(e) => setProfileForm({ ...profileForm, title: e.target.value })}
                className="w-full bg-[#080d1a] border border-white/[0.08] focus:border-cyan-500 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none"
              />
            </div>

            <div className="space-y-1 sm:col-span-2">
              <label className="text-xs font-mono text-slate-300">ট্যাগলাইন (Tagline)</label>
              <input
                type="text"
                value={profileForm.tagline}
                onChange={(e) => setProfileForm({ ...profileForm, tagline: e.target.value })}
                className="w-full bg-[#080d1a] border border-white/[0.08] focus:border-cyan-500 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none"
              />
            </div>

            <div className="space-y-1 sm:col-span-2">
              <label className="text-xs font-mono text-slate-300">সংক্ষিপ্ত বায়ো (Bio)</label>
              <textarea
                rows={3}
                value={profileForm.bio}
                onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                className="w-full bg-[#080d1a] border border-white/[0.08] focus:border-cyan-500 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-300">ইমেইল অ্যাড্রেস</label>
              <input
                type="email"
                value={profileForm.email}
                onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                className="w-full bg-[#080d1a] border border-white/[0.08] focus:border-cyan-500 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-300">লোকেশন</label>
              <input
                type="text"
                value={profileForm.location}
                onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                className="w-full bg-[#080d1a] border border-white/[0.08] focus:border-cyan-500 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-300">গিটহাব প্রোফাইল ইউআরএল</label>
              <input
                type="url"
                value={profileForm.github}
                onChange={(e) => setProfileForm({ ...profileForm, github: e.target.value })}
                className="w-full bg-[#080d1a] border border-white/[0.08] focus:border-cyan-500 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-300">লিঙ্কডইন প্রোফাইল ইউআরএল</label>
              <input
                type="url"
                value={profileForm.linkedin}
                onChange={(e) => setProfileForm({ ...profileForm, linkedin: e.target.value })}
                className="w-full bg-[#080d1a] border border-white/[0.08] focus:border-cyan-500 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-300">কাজের অভিজ্ঞতা (বছর)</label>
              <input
                type="number"
                min="0"
                value={profileForm.experienceYears}
                onChange={(e) =>
                  setProfileForm({ ...profileForm, experienceYears: Number(e.target.value) })
                }
                className="w-full bg-[#080d1a] border border-white/[0.08] focus:border-cyan-500 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none"
              />
            </div>

            <div className="space-y-1 flex items-center pt-5">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-mono text-slate-300">
                <input
                  type="checkbox"
                  checked={profileForm.availableForHire}
                  onChange={(e) =>
                    setProfileForm({ ...profileForm, availableForHire: e.target.checked })
                  }
                  className="rounded bg-[#080d1a] border-white/[0.1] text-cyan-400 focus:ring-0"
                />
                <span>নতুন প্রজেক্ট বা চাকরির জন্য প্রস্তুত (Available for Hire)</span>
              </label>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};
