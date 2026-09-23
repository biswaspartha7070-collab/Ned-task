import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { TaskItem, TaskPriority, TaskStatus } from '../../types';
import { aiService } from '../../services/aiService';
import {
  ListTodo,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Plus,
  Trash2,
  Sparkles,
  Calendar,
  FolderGit2,
  ChevronDown,
  ChevronUp,
  Check,
  Filter,
  CheckSquare,
  Square
} from 'lucide-react';

export const TaskManager: React.FC = () => {
  const { tasks, projects, addTask, updateTask, deleteTask, toggleTaskStatus, toggleSubtask, addSubtask, showToast } = useApp();

  const [activeFilter, setActiveFilter] = useState<'all' | TaskStatus>('all');
  const [priorityFilter, setPriorityFilter] = useState<'all' | TaskPriority>('all');
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [expandedTaskId, setExpandedTaskId] = useState<string | null>(null);

  // New task form state
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newPriority, setNewPriority] = useState<TaskPriority>('medium');
  const [newProjectId, setNewProjectId] = useState<string>('');
  const [newDueDate, setNewDueDate] = useState<string>('');
  const [newEstimatedHours, setNewEstimatedHours] = useState<number>(2);
  const [isAiBreakingDown, setIsAiBreakingDown] = useState(false);
  const [generatedSubtasks, setGeneratedSubtasks] = useState<{ title: string; completed: boolean }[]>([]);

  // Inline subtask input per expanded task
  const [inlineSubtaskText, setInlineSubtaskText] = useState<{ [taskId: string]: string }>({});

  const totalCount = tasks.length;
  const completedCount = tasks.filter((t) => t.status === 'completed').length;
  const inProgressCount = tasks.filter((t) => t.status === 'in_progress').length;
  const todoCount = tasks.filter((t) => t.status === 'todo').length;
  const completionRate = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  // Filter tasks
  const filteredTasks = tasks.filter((task) => {
    const statusMatch = activeFilter === 'all' || task.status === activeFilter;
    const priorityMatch = priorityFilter === 'all' || task.priority === priorityFilter;
    return statusMatch && priorityMatch;
  });

  const handleAiBreakdown = async () => {
    if (!newTitle.trim()) {
      showToast('অনুগ্রহ করে প্রথমে টাস্কের নাম লিখুন', 'info');
      return;
    }
    setIsAiBreakingDown(true);
    try {
      const result = await aiService.breakdownTask({
        taskTitle: newTitle,
        context: newDescription || undefined,
        language: 'bn',
      });
      if (result && result.subtasks) {
        setGeneratedSubtasks(
          result.subtasks.map((st: any) => ({
            title: st.title,
            completed: false,
          }))
        );
        showToast('এআই দ্বারা সাব-টাস্ক তৈরি হয়েছে');
      }
    } catch (err) {
      showToast('টাস্ক বিশ্লেষণে সমস্যা হয়েছে', 'error');
    } finally {
      setIsAiBreakingDown(false);
    }
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    addTask({
      title: newTitle.trim(),
      description: newDescription.trim() || undefined,
      status: 'todo',
      priority: newPriority,
      projectId: newProjectId || undefined,
      dueDate: newDueDate || undefined,
      estimatedHours: newEstimatedHours || 2,
      subtasks: generatedSubtasks.map((st, i) => ({
        id: `st-${Date.now()}-${i}`,
        title: st.title,
        completed: false,
      })),
    });

    // Reset form
    setNewTitle('');
    setNewDescription('');
    setNewPriority('medium');
    setNewProjectId('');
    setNewDueDate('');
    setGeneratedSubtasks([]);
    setIsAddingTask(false);
  };

  const getPriorityBadge = (p: TaskPriority) => {
    switch (p) {
      case 'urgent':
        return { label: 'জরুরি', className: 'text-rose-400 bg-rose-500/10 border-rose-500/20' };
      case 'high':
        return { label: 'উচ্চ', className: 'text-amber-400 bg-amber-500/10 border-amber-500/20' };
      case 'medium':
        return { label: 'মাঝারি', className: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20' };
      case 'low':
        return { label: 'সাধারণ', className: 'text-slate-400 bg-slate-500/10 border-slate-500/20' };
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
            <ListTodo className="w-3.5 h-3.5" />
            <span>টাস্ক ও ওয়ার্কস্পেস ম্যানেজার</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 font-heading">
            দৈনন্দিন কাজ ও প্রোজেক্ট টাস্ক
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            অগ্রগতি ট্র্যাক করুন, সাব-টাস্কে ভাগ করুন এবং প্রজেক্টের সাথে লিঙ্ক করুন
          </p>
        </div>

        <button
          onClick={() => setIsAddingTask(!isAddingTask)}
          className="mobile-press flex items-center gap-2 px-4 py-2 text-xs font-semibold text-[#080d1a] bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-all self-start sm:self-auto shadow-lg shadow-cyan-950/40"
        >
          <Plus className="w-4 h-4" />
          <span>নতুন টাস্ক যোগ করুন</span>
        </button>
      </div>

      {/* Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-[#0e1628] border border-white/[0.08] rounded-2xl p-4 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 block">মোট টাস্ক</span>
            <span className="text-xl sm:text-2xl font-bold font-mono text-slate-100">
              {totalCount}
            </span>
          </div>
          <div className="p-2.5 rounded-xl bg-white/[0.04] text-slate-400">
            <ListTodo className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-[#0e1628] border border-white/[0.08] rounded-2xl p-4 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 block">করতে হবে</span>
            <span className="text-xl sm:text-2xl font-bold font-mono text-amber-400">
              {todoCount}
            </span>
          </div>
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-[#0e1628] border border-white/[0.08] rounded-2xl p-4 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 block">চলমান</span>
            <span className="text-xl sm:text-2xl font-bold font-mono text-cyan-400">
              {inProgressCount}
            </span>
          </div>
          <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-[#0e1628] border border-white/[0.08] rounded-2xl p-4 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 block">সম্পন্ন হয়েছে ({completionRate}%)</span>
            <span className="text-xl sm:text-2xl font-bold font-mono text-emerald-400">
              {completedCount}
            </span>
          </div>
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Add Task Form Drawer / Box */}
      {isAddingTask && (
        <form
          onSubmit={handleCreateTask}
          className="bg-[#0d1527] border border-cyan-500/30 rounded-2xl p-5 sm:p-7 space-y-4 shadow-2xl animate-in fade-in duration-200"
        >
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
            <h3 className="text-sm font-semibold text-slate-100 flex items-center gap-2">
              <Plus className="w-4 h-4 text-cyan-400" />
              নতুন টাস্ক তৈরি ও পরিকল্পনা
            </h3>
            <button
              type="button"
              onClick={() => setIsAddingTask(false)}
              className="text-xs text-slate-400 hover:text-slate-200"
            >
              বাতিল
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1 sm:col-span-2">
              <label className="text-xs font-mono text-slate-300">
                টাস্কের শিরোনাম *
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="যেমন: মোবাইল ভিউতে রেসপন্সিভ মেনু অপ্টিমাইজ করা"
                  className="flex-1 bg-[#080d1a] border border-white/[0.1] focus:border-cyan-500 rounded-xl px-3.5 py-2 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleAiBreakdown}
                  disabled={isAiBreakingDown}
                  className="mobile-press flex items-center gap-1.5 px-3 py-2 bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-500/30 rounded-xl text-xs font-medium transition-colors shrink-0 disabled:opacity-50"
                  title="জেমিনাই এআই দ্বারা সাব-টাস্কে ভাগ করুন"
                >
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                  <span>{isAiBreakingDown ? 'বিশ্লেষণ হচ্ছে...' : 'এআই সাব-টাস্ক'}</span>
                </button>
              </div>
            </div>

            <div className="space-y-1 sm:col-span-2">
              <label className="text-xs font-mono text-slate-300">
                বিবরণ বা বিস্তারিত নোট (ঐচ্ছিক)
              </label>
              <textarea
                rows={2}
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                placeholder="প্রয়োজনীয় টেকনিক্যাল পয়েন্ট ও রেফারেন্স..."
                className="w-full bg-[#080d1a] border border-white/[0.1] focus:border-cyan-500 rounded-xl px-3.5 py-2 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-300">অগ্রাধিকার</label>
              <select
                value={newPriority}
                onChange={(e) => setNewPriority(e.target.value as TaskPriority)}
                className="w-full bg-[#080d1a] border border-white/[0.1] focus:border-cyan-500 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none"
              >
                <option value="urgent">জরুরি (Urgent)</option>
                <option value="high">উচ্চ (High)</option>
                <option value="medium">মাঝারি (Medium)</option>
                <option value="low">সাধারণ (Low)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-300">
                সম্পর্কিত প্রজেক্ট (ঐচ্ছিক)
              </label>
              <select
                value={newProjectId}
                onChange={(e) => setNewProjectId(e.target.value)}
                className="w-full bg-[#080d1a] border border-white/[0.1] focus:border-cyan-500 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none"
              >
                <option value="">কোনো প্রজেক্ট নয় (সাধারণ টাস্ক)</option>
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-300">ডেডলাইন তারিখ</label>
              <input
                type="date"
                value={newDueDate}
                onChange={(e) => setNewDueDate(e.target.value)}
                className="w-full bg-[#080d1a] border border-white/[0.1] focus:border-cyan-500 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-300">আনুমানিক সময় (ঘণ্টা)</label>
              <input
                type="number"
                min="0.5"
                step="0.5"
                value={newEstimatedHours}
                onChange={(e) => setNewEstimatedHours(Number(e.target.value))}
                className="w-full bg-[#080d1a] border border-white/[0.1] focus:border-cyan-500 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none"
              />
            </div>
          </div>

          {/* Generated Subtasks Preview */}
          {generatedSubtasks.length > 0 && (
            <div className="p-3.5 bg-indigo-950/20 border border-indigo-500/20 rounded-xl space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-indigo-300">
                <span>এআই তৈরি সাব-টাস্ক ({generatedSubtasks.length}টি):</span>
                <button
                  type="button"
                  onClick={() => setGeneratedSubtasks([])}
                  className="text-slate-400 hover:text-slate-200"
                >
                  মুছুন
                </button>
              </div>
              <ul className="space-y-1.5">
                {generatedSubtasks.map((st, i) => (
                  <li key={i} className="text-xs text-slate-300 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                    <span>{st.title}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex justify-end gap-2 pt-2 border-t border-white/[0.06]">
            <button
              type="button"
              onClick={() => setIsAddingTask(false)}
              className="px-4 py-2 text-xs text-slate-400 hover:text-slate-200"
            >
              বাতিল
            </button>
            <button
              type="submit"
              className="mobile-press px-5 py-2 text-xs font-semibold text-[#080d1a] bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-all"
            >
              টাস্ক সেভ করুন
            </button>
          </div>
        </form>
      )}

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#0d1527] p-2 rounded-2xl border border-white/[0.06]">
        <div className="flex items-center gap-1">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1.5 text-xs font-medium rounded-xl transition-all ${
              activeFilter === 'all'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            সব ({totalCount})
          </button>
          <button
            onClick={() => setActiveFilter('todo')}
            className={`px-3 py-1.5 text-xs font-medium rounded-xl transition-all ${
              activeFilter === 'todo'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            করতে হবে ({todoCount})
          </button>
          <button
            onClick={() => setActiveFilter('in_progress')}
            className={`px-3 py-1.5 text-xs font-medium rounded-xl transition-all ${
              activeFilter === 'in_progress'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            চলমান ({inProgressCount})
          </button>
          <button
            onClick={() => setActiveFilter('completed')}
            className={`px-3 py-1.5 text-xs font-medium rounded-xl transition-all ${
              activeFilter === 'completed'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            সম্পন্ন ({completedCount})
          </button>
        </div>

        {/* Priority Filter */}
        <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
          <Filter className="w-3.5 h-3.5 text-slate-500" />
          <span>অগ্রাধিকার:</span>
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value as any)}
            className="bg-[#080d1a] border border-white/[0.08] rounded-lg px-2 py-1 text-xs text-slate-300 focus:outline-none"
          >
            <option value="all">সকল অগ্রাধিকার</option>
            <option value="urgent">জরুরি</option>
            <option value="high">উচ্চ</option>
            <option value="medium">মাঝারি</option>
            <option value="low">সাধারণ</option>
          </select>
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-3">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => {
            const isCompleted = task.status === 'completed';
            const isExpanded = expandedTaskId === task.id;
            const priorityBadge = getPriorityBadge(task.priority);
            const associatedProject = projects.find((p) => p.id === task.projectId);
            const subtaskCompleted = task.subtasks.filter((st) => st.completed).length;

            return (
              <div
                key={task.id}
                className={`bg-[#0e1628] border transition-all rounded-2xl p-4 sm:p-5 shadow-lg ${
                  isCompleted
                    ? 'border-emerald-500/20 opacity-80'
                    : 'border-white/[0.08] hover:border-cyan-500/30'
                }`}
              >
                <div className="flex items-start gap-3">
                  {/* Status Toggle Button */}
                  <button
                    onClick={() => toggleTaskStatus(task.id)}
                    className="mobile-press mt-0.5 shrink-0 text-slate-400 hover:text-cyan-400 transition-colors"
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    ) : task.status === 'in_progress' ? (
                      <Clock className="w-5 h-5 text-cyan-400" />
                    ) : (
                      <div className="w-5 h-5 rounded-md border-2 border-slate-500 hover:border-cyan-400 transition-colors" />
                    )}
                  </button>

                  {/* Task Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      {/* Priority Tag */}
                      <span
                        className={`text-[10px] font-mono font-medium px-2 py-0.5 rounded border ${priorityBadge.className}`}
                      >
                        {priorityBadge.label}
                      </span>

                      {/* Associated Project */}
                      {associatedProject && (
                        <span className="flex items-center gap-1 text-[11px] font-mono text-cyan-400">
                          <FolderGit2 className="w-3 h-3" />
                          <span className="truncate max-w-[150px]">
                            {associatedProject.title}
                          </span>
                        </span>
                      )}

                      {/* Due date */}
                      {task.dueDate && (
                        <span className="flex items-center gap-1 text-[11px] font-mono text-slate-400">
                          <Calendar className="w-3 h-3 text-slate-500" />
                          <span>{task.dueDate}</span>
                        </span>
                      )}

                      {/* Estimated hours */}
                      {task.estimatedHours && (
                        <span className="text-[11px] font-mono text-slate-500">
                          ~{task.estimatedHours} ঘণ্টা
                        </span>
                      )}
                    </div>

                    <h4
                      className={`text-sm sm:text-base font-semibold transition-all ${
                        isCompleted
                          ? 'line-through text-slate-400'
                          : 'text-slate-100 hover:text-cyan-300'
                      }`}
                    >
                      {task.title}
                    </h4>

                    {task.description && (
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                        {task.description}
                      </p>
                    )}

                    {/* Subtasks Progress Summary */}
                    {task.subtasks.length > 0 && (
                      <div className="mt-2.5 flex items-center gap-3">
                        <div className="flex-1 max-w-xs h-1.5 bg-white/[0.05] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-cyan-400 rounded-full transition-all"
                            style={{
                              width: `${(subtaskCompleted / task.subtasks.length) * 100}%`,
                            }}
                          />
                        </div>
                        <span className="text-[11px] font-mono text-slate-400">
                          {subtaskCompleted}/{task.subtasks.length} সাব-টাস্ক
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Right Actions */}
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => setExpandedTaskId(isExpanded ? null : task.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-white/[0.05]"
                      title="সাব-টাস্ক তালিকা খুলুন/বন্ধ করুন"
                    >
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                      title="টাস্ক মুছুন"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Expanded Subtasks & Checklist */}
                {isExpanded && (
                  <div className="mt-4 pt-3 border-t border-white/[0.06] pl-8 space-y-2 animate-in fade-in duration-150">
                    <div className="space-y-1.5">
                      {task.subtasks.map((st) => (
                        <div
                          key={st.id}
                          onClick={() => toggleSubtask(task.id, st.id)}
                          className="flex items-center gap-2 text-xs text-slate-300 hover:text-slate-100 cursor-pointer p-1 rounded hover:bg-white/[0.02]"
                        >
                          {st.completed ? (
                            <CheckSquare className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                          ) : (
                            <Square className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                          )}
                          <span className={st.completed ? 'line-through text-slate-500' : ''}>
                            {st.title}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Inline Add Subtask */}
                    <div className="flex items-center gap-2 pt-2">
                      <input
                        type="text"
                        placeholder="নতুন সাব-টাস্ক যুক্ত করুন..."
                        value={inlineSubtaskText[task.id] || ''}
                        onChange={(e) =>
                          setInlineSubtaskText((prev) => ({
                            ...prev,
                            [task.id]: e.target.value,
                          }))
                        }
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            const txt = inlineSubtaskText[task.id];
                            if (txt && txt.trim()) {
                              addSubtask(task.id, txt.trim());
                              setInlineSubtaskText((prev) => ({ ...prev, [task.id]: '' }));
                            }
                          }
                        }}
                        className="flex-1 bg-[#080d1a] border border-white/[0.08] focus:border-cyan-500 rounded-lg px-2.5 py-1 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const txt = inlineSubtaskText[task.id];
                          if (txt && txt.trim()) {
                            addSubtask(task.id, txt.trim());
                            setInlineSubtaskText((prev) => ({ ...prev, [task.id]: '' }));
                          }
                        }}
                        className="mobile-press px-2.5 py-1 text-xs font-medium text-cyan-300 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 rounded-lg transition-colors"
                      >
                        যুক্ত করুন
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="text-center py-12 bg-[#0e1628] border border-white/[0.06] rounded-2xl p-6">
            <p className="text-slate-400 text-sm">এই ক্যাটাগরিতে কোনো টাস্ক নেই।</p>
            <button
              onClick={() => setIsAddingTask(true)}
              className="mt-3 text-xs text-cyan-400 hover:underline inline-flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>একটি নতুন টাস্ক যোগ করুন</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
