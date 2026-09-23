import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { Project } from '../../types';
import { ProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';
import {
  Search,
  SlidersHorizontal,
  Mail,
  Github,
  Linkedin,
  Globe,
  MapPin,
  Briefcase,
  Layers,
  Sparkles,
  ArrowUpRight,
  Copy,
  Check,
  Code2
} from 'lucide-react';

export const PortfolioView: React.FC = () => {
  const { profile, projects, skillCategories, setActiveTab } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const categories = ['all', 'Full-Stack', 'Frontend', 'Mobile', 'AI/ML'];

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchesCategory =
        selectedCategory === 'all' || p.category === selectedCategory;
      const matchesSearch =
        searchQuery === '' ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.technologies.some((t) =>
          t.toLowerCase().includes(searchQuery.toLowerCase())
        );
      return matchesCategory && matchesSearch;
    });
  }, [projects, selectedCategory, searchQuery]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div className="space-y-12 sm:space-y-16 pb-20">
      {/* Hero Section */}
      <section className="relative pt-4 sm:pt-8">
        <div className="bg-[#0b1322] border border-white/[0.08] rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-2xl">
          {/* Subtle background ambient glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-4xl">
            {/* Availability & Location Bar */}
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400 mb-4">
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span>{profile.availableForHire ? 'নতুন প্রজেক্টের জন্য উপলব্ধ' : 'ব্যস্ত'}</span>
              </span>
              <span className="flex items-center gap-1 text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                <span>{profile.location}</span>
              </span>
              <span className="hidden sm:inline text-slate-600">·</span>
              <span className="hidden sm:flex items-center gap-1 text-slate-400">
                <Briefcase className="w-3.5 h-3.5 text-slate-500" />
                <span>{profile.experienceYears}+ বছর প্রফেশনাল অভিজ্ঞতা</span>
              </span>
            </div>

            {/* Headline and Title */}
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-100 font-heading">
              {profile.name}
            </h1>
            <p className="text-cyan-400 text-sm sm:text-lg font-medium mt-1 font-mono">
              {profile.title}
            </p>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mt-4 max-w-2xl">
              {profile.bio}
            </p>

            {/* Quick Metrics Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8">
              <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-3.5">
                <span className="block text-xl sm:text-2xl font-bold font-mono text-slate-100">
                  {profile.experienceYears}+
                </span>
                <span className="text-[11px] text-slate-400">কাজের অভিজ্ঞতা (বছর)</span>
              </div>
              <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-3.5">
                <span className="block text-xl sm:text-2xl font-bold font-mono text-cyan-400">
                  {projects.length}
                </span>
                <span className="text-[11px] text-slate-400">সফল প্রজেক্ট ডেলিভারি</span>
              </div>
              <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-3.5">
                <span className="block text-xl sm:text-2xl font-bold font-mono text-indigo-400">
                  ৯৯.৯%
                </span>
                <span className="text-[11px] text-slate-400">ক্লায়েন্ট স্যাটিসফ্যাকশন</span>
              </div>
              <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-3.5">
                <span className="block text-xl sm:text-2xl font-bold font-mono text-emerald-400">
                  ১০০%
                </span>
                <span className="text-[11px] text-slate-400">রেসপন্সিভ ও অপ্টিমাইজড</span>
              </div>
            </div>

            {/* Connect & Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 mt-8">
              <a
                href={`mailto:${profile.email}`}
                className="mobile-press flex items-center gap-2 px-4 py-2.5 bg-cyan-400 hover:bg-cyan-300 text-[#080d1a] font-semibold text-xs sm:text-sm rounded-xl transition-all shadow-lg shadow-cyan-950/50"
              >
                <Mail className="w-4 h-4" />
                <span>যোগাযোগ করুন</span>
              </a>

              <button
                onClick={handleCopyEmail}
                className="mobile-press flex items-center gap-2 px-3.5 py-2.5 bg-white/[0.05] hover:bg-white/[0.08] border border-white/[0.08] text-slate-200 text-xs sm:text-sm rounded-xl transition-all"
                title="ইমেইল অ্যাড্রেস কপি করুন"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-300">কপি হয়েছে</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-slate-400" />
                    <span>ইমেইল কপি</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setActiveTab('studio')}
                className="mobile-press flex items-center gap-2 px-3.5 py-2.5 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs sm:text-sm rounded-xl transition-all"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>ম্যানেজমেন্ট স্টুডিও খুলুন</span>
              </button>

              <div className="flex items-center gap-1.5 ml-auto">
                {profile.github && (
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] text-slate-300 transition-colors"
                    title="গিটহাব প্রোফাইল"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                )}
                {profile.linkedin && (
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] text-slate-300 transition-colors"
                    title="লিঙ্কডইন প্রোফাইল"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}
                {profile.website && (
                  <a
                    href={profile.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] text-slate-300 transition-colors"
                    title="ওয়েবসাইট"
                  >
                    <Globe className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Showcase Header & Controls */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
              <Layers className="w-3.5 h-3.5" />
              <span>নির্বাচিত পোর্টফোলিও প্রজেক্ট</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100 font-heading">
              সাম্প্রতিক কাজ ও কেস স্টাডি
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              বাস্তব সমস্যার সমাধানে তৈরি আধুনিক অ্যাপ্লিকেশন ও আর্কিটেকচার
            </p>
          </div>

          {/* Quick AI Trigger */}
          <button
            onClick={() => setActiveTab('ai')}
            className="mobile-press flex items-center gap-1.5 self-start sm:self-auto text-xs text-indigo-300 hover:text-indigo-200 bg-indigo-500/10 px-3 py-1.5 rounded-lg border border-indigo-500/20 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>এআই দিয়ে নতুন প্রজেক্ট জেনারেট করুন</span>
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-[#0d1524] p-2 rounded-2xl border border-white/[0.06]">
          {/* Category Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`mobile-press px-3 py-1.5 text-xs font-medium rounded-xl whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
                }`}
              >
                {cat === 'all' ? 'সকল প্রজেক্ট' : cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[220px]">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="প্রজেক্ট বা টেকনোলজি খুঁজুন..."
              className="w-full bg-[#080d1a] border border-white/[0.08] focus:border-cyan-500/50 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onSelect={(p) => setActiveModalProject(p)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-[#0b1322] border border-white/[0.06] rounded-2xl p-6">
            <p className="text-slate-400 text-sm">কোনো প্রজেক্ট পাওয়া যায়নি।</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="mt-3 text-xs text-cyan-400 hover:underline"
            >
              ফিল্টার ক্লিয়ার করুন
            </button>
          </div>
        )}
      </section>

      {/* Skills Matrix Section */}
      <section className="bg-[#0b1322] border border-white/[0.08] rounded-3xl p-6 sm:p-8">
        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
            <Code2 className="w-3.5 h-3.5" />
            <span>টেকনিক্যাল দক্ষতা ও টুলকিট</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-100 font-heading">
            প্রযুক্তি ও পারদর্শিতা
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            উন্নত ক্লায়েন্ট-সাইড, ব্যাকএন্ড আর্কিটেকচার এবং আধুনিক ইঞ্জিনিয়ারিং টুলস
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {skillCategories.map((category) => (
            <div
              key={category.id}
              className="bg-[#0e1728] border border-white/[0.06] rounded-2xl p-5 space-y-4"
            >
              <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wider border-b border-white/[0.06] pb-2">
                {category.name}
              </h3>
              <div className="space-y-3">
                {category.skills.map((skill, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-300">{skill.name}</span>
                      <span className="text-cyan-400 font-semibold">{skill.level}%</span>
                    </div>
                    {/* Linear native progress bar */}
                    <div className="h-1.5 w-full bg-white/[0.05] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full transition-all duration-500"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact & Next Steps CTA */}
      <section className="bg-gradient-to-br from-[#0c1629] to-[#0d1b33] border border-cyan-500/20 rounded-3xl p-6 sm:p-10 text-center relative overflow-hidden">
        <div className="max-w-xl mx-auto space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 font-heading">
            আপনার পরবর্তী প্রজেক্ট নিয়ে আলোচনা করতে চান?
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            আমি রিমোট প্রজেক্ট, ফুল-টাইম কনসাল্টিং এবং উদ্ভাবনী ডিজিটাল প্রোডাক্ট ডেভেলপমেন্টের জন্য প্রস্তুত।
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href={`mailto:${profile.email}`}
              className="mobile-press flex items-center gap-2 px-5 py-2.5 bg-cyan-400 hover:bg-cyan-300 text-[#080d1a] font-semibold text-xs sm:text-sm rounded-xl transition-all"
            >
              <Mail className="w-4 h-4" />
              <span>ইমেইল পাঠান: {profile.email}</span>
            </a>
            <button
              onClick={() => setActiveTab('experience')}
              className="mobile-press flex items-center gap-2 px-4 py-2.5 bg-white/[0.05] hover:bg-white/[0.08] border border-white/[0.08] text-slate-200 text-xs sm:text-sm rounded-xl transition-all"
            >
              <span>কাজের অভিজ্ঞতা টাইমলাইন দেখুন</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Modal for detailed case study */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </div>
  );
};
