import React from 'react';
import { Project } from '../../types';
import { ExternalLink, Github, ChevronRight, Pin } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect }) => {
  return (
    <article
      onClick={() => onSelect(project)}
      className="mobile-press group bg-[#0e1626] hover:bg-[#121c30] border border-white/[0.08] hover:border-cyan-500/40 rounded-2xl p-5 sm:p-6 transition-all cursor-pointer flex flex-col justify-between relative overflow-hidden"
    >
      {/* Top subtle highlight */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      <div>
        {/* Category & Status Line */}
        <div className="flex items-center justify-between gap-2 text-xs text-slate-400 mb-2.5">
          <div className="flex items-center gap-1.5 font-mono">
            <span className="text-cyan-400">{project.category}</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>{project.completionDate || '২০২৫-২০২৬'}</span>
          </div>
          {project.featured && (
            <span className="flex items-center gap-1 text-[11px] font-mono text-amber-400/90 bg-amber-400/10 px-2 py-0.5 rounded-md border border-amber-400/20">
              <Pin className="w-3 h-3" />
              <span>হাইলাইট</span>
            </span>
          )}
        </div>

        {/* Title & Tagline */}
        <h3 className="text-base sm:text-lg font-bold text-slate-100 group-hover:text-cyan-300 transition-colors line-clamp-1">
          {project.title}
        </h3>
        <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
          {project.tagline}
        </p>

        {/* Key Metrics / Highlights */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="mt-3.5 space-y-1">
            {project.metrics.slice(0, 2).map((m, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-slate-300 font-mono">
                <span className="w-1 h-1 rounded-full bg-cyan-400 shrink-0" />
                <span className="truncate">{m}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer: Tech stack & Links */}
      <div className="mt-5 pt-4 border-t border-white/[0.06] flex items-center justify-between gap-2">
        <div className="flex flex-wrap gap-1.5 overflow-hidden max-h-6">
          {project.technologies.slice(0, 3).map((tech, i) => (
            <span
              key={i}
              className="text-[11px] font-mono text-slate-400 bg-white/[0.03] px-2 py-0.5 rounded border border-white/[0.05]"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="text-[10px] font-mono text-slate-500 self-center">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>

        {/* Quick buttons */}
        <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="সোর্স কোড"
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-white/[0.06] transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="লাইভ লিঙ্ক"
              className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-cyan-500/10 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
          <button
            onClick={() => onSelect(project)}
            title="বিস্তারিত দেখুন"
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-white/[0.06] transition-colors"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </article>
  );
};
