import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Briefcase,
  Calendar,
  MapPin,
  CheckCircle2,
  Sparkles,
  Edit3,
  Trash2,
  Plus
} from 'lucide-react';

export const ExperienceTimeline: React.FC = () => {
  const { experiences, previewMode, setActiveTab, deleteExperience } = useApp();

  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
            <Briefcase className="w-3.5 h-3.5" />
            <span>প্রফেশনাল ক্যারিয়ার ট্র্যাক ও কর্মজীবন</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 font-heading">
            কাজের অভিজ্ঞতা ও অর্জন
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            বিভিন্ন কোম্পানিতে দায়িত্ব পালন, টিম লিডারশিপ ও পরিমাপযোগ্য প্রযুক্তিগত সাফল্য
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('ai')}
            className="mobile-press flex items-center gap-1.5 px-3 py-1.5 text-xs text-indigo-300 hover:text-indigo-200 bg-indigo-500/10 border border-indigo-500/20 rounded-xl transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>এআই দিয়ে অভিজ্ঞতা পলিশ করুন</span>
          </button>
          {!previewMode && (
            <button
              onClick={() => setActiveTab('studio')}
              className="mobile-press flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#080d1a] bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-all font-semibold"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>নতুন অভিজ্ঞতা যোগ করুন</span>
            </button>
          )}
        </div>
      </div>

      {/* Timeline Layout */}
      <div className="relative pl-6 sm:pl-8 border-l border-white/[0.1] space-y-8 sm:space-y-12 ml-2 sm:ml-4">
        {experiences.map((exp) => (
          <div key={exp.id} className="relative group">
            {/* Timeline node dot */}
            <div
              className={`absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full border-2 ${
                exp.isCurrent
                  ? 'bg-cyan-500 border-[#080d1a] shadow-[0_0_12px_rgba(6,182,212,0.8)]'
                  : 'bg-[#1e293b] border-[#080d1a]'
              }`}
            />

            {/* Experience Card */}
            <div className="bg-[#0e1628] border border-white/[0.08] group-hover:border-cyan-500/30 rounded-2xl p-5 sm:p-7 transition-all space-y-4 shadow-xl">
              {/* Top metadata */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                    <span>{exp.company}</span>
                    {exp.location && (
                      <>
                        <span aria-hidden="true" className="text-slate-600">·</span>
                        <span className="text-slate-400 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-slate-500" />
                          {exp.location}
                        </span>
                      </>
                    )}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-100 mt-1">
                    {exp.role}
                  </h3>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                  <Calendar className="w-3.5 h-3.5 text-slate-500" />
                  <span>
                    {exp.startDate} – {exp.endDate}
                  </span>
                  {exp.isCurrent && (
                    <span className="ml-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      বর্তমান
                    </span>
                  )}
                </div>
              </div>

              {/* Summary */}
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {exp.summary}
              </p>

              {/* Achievements list */}
              {exp.achievements && exp.achievements.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-white/[0.06]">
                  <h4 className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                    মূল অর্জনসমূহ ও ইমপ্যাক্ট
                  </h4>
                  <ul className="space-y-1.5">
                    {exp.achievements.map((ach, idx) => (
                      <li
                        key={idx}
                        className="text-xs text-slate-300 flex items-start gap-2 leading-relaxed"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Highlighted Skills */}
              {exp.skillsHighlighted && exp.skillsHighlighted.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5 pt-2">
                  <span className="text-[11px] text-slate-500 font-mono mr-1">ব্যবহৃত স্কিলস:</span>
                  {exp.skillsHighlighted.map((skill, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] font-mono text-slate-300 bg-white/[0.04] px-2 py-0.5 rounded border border-white/[0.06]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}

              {/* Admin/Studio Quick Delete if in edit mode */}
              {!previewMode && (
                <div className="pt-3 border-t border-white/[0.06] flex items-center justify-end gap-2">
                  <button
                    onClick={() => {
                      if (window.confirm('আপনি কি এই অভিজ্ঞতা মুছে ফেলতে চান?')) {
                        deleteExperience(exp.id);
                      }
                    }}
                    className="mobile-press flex items-center gap-1 text-xs text-rose-400/80 hover:text-rose-300 p-1.5 rounded-lg hover:bg-rose-500/10 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>মুছে ফেলুন</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
