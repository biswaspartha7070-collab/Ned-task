import React from 'react';
import { Project } from '../../types';
import { X, ExternalLink, Github, CheckCircle2, Cpu, Wrench, Layers } from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="bg-[#0f172a] border border-white/[0.1] rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-white/[0.08] flex items-start justify-between gap-4 sticky top-0 bg-[#0f172a]/95 backdrop-blur-md z-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
              <span>{project.category}</span>
              <span aria-hidden="true">·</span>
              <span>{project.completionDate || '২০২৬'}</span>
            </div>
            <h3 className="text-xl font-bold text-slate-100">
              {project.title}
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              {project.tagline}
            </p>
          </div>
          <button
            onClick={onClose}
            className="mobile-press p-2 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-white/[0.05]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">
          {/* Overview */}
          <div>
            <h4 className="text-xs font-medium uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              প্রজেক্ট বিবরণী ও উদ্দেশ্য
            </h4>
            <p className="text-sm text-slate-300 leading-relaxed">
              {project.overview}
            </p>
          </div>

          {/* Key Metrics / Impact */}
          {project.metrics && project.metrics.length > 0 && (
            <div>
              <h4 className="text-xs font-medium uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                পরিমাপযোগ্য ফলাফল ও মেট্রিক্স
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {project.metrics.map((metric, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-xs font-medium text-slate-200 flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                    <span>{metric}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Core Features */}
          {project.features && project.features.length > 0 && (
            <div>
              <h4 className="text-xs font-medium uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                মূল বৈশিষ্ট্যসমূহ
              </h4>
              <ul className="space-y-2">
                {project.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className="text-xs text-slate-300 flex items-start gap-2"
                  >
                    <span className="text-cyan-400 font-mono mt-0.5">·</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Architecture & Challenges Solved */}
          {project.challengesSolved && (
            <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/20">
              <h4 className="text-xs font-medium uppercase tracking-wider text-cyan-300 mb-1.5 flex items-center gap-1.5">
                <Wrench className="w-3.5 h-3.5 text-cyan-400" />
                কারিগরি চ্যালেঞ্জ ও সমাধান
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {project.challengesSolved}
              </p>
            </div>
          )}

          {/* Tech Stack */}
          <div>
            <h4 className="text-xs font-medium uppercase tracking-wider text-slate-400 mb-2">
              ব্যবহৃত প্রযুক্তি স্ট্যাক
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 text-xs font-mono rounded-lg bg-white/[0.05] border border-white/[0.08] text-slate-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-6 border-t border-white/[0.08] bg-[#0c1222] flex items-center justify-end gap-3 rounded-b-2xl">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mobile-press flex items-center gap-2 px-4 py-2 text-xs font-medium text-slate-300 bg-white/[0.05] hover:bg-white/[0.08] border border-white/[0.1] rounded-xl transition-all"
            >
              <Github className="w-4 h-4" />
              <span>সোর্স কোড</span>
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mobile-press flex items-center gap-2 px-4 py-2 text-xs font-medium text-[#080d1a] bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-all font-semibold"
            >
              <ExternalLink className="w-4 h-4" />
              <span>লাইভ প্রিভিউ দেখুন</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
