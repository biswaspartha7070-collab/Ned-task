import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toast } = useApp();

  if (!toast) return null;

  const isSuccess = toast.type === 'success' || !toast.type;
  const isError = toast.type === 'error';

  return (
    <div className="fixed bottom-20 md:bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 px-4 py-2.5 bg-[#0f172a]/95 backdrop-blur-md border border-white/[0.12] rounded-xl shadow-2xl animate-in fade-in slide-in-from-bottom-2 duration-150">
      {isSuccess && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
      {isError && <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />}
      {toast.type === 'info' && <Info className="w-4 h-4 text-cyan-400 shrink-0" />}
      <span className="text-xs font-medium text-slate-100">{toast.text}</span>
    </div>
  );
};
