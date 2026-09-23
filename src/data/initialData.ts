import { Project, Experience, SkillCategory, TaskItem, UserProfile } from '../types';

export const initialProfile: UserProfile = {
  name: 'পার্থ বিশ্বাস',
  title: 'সিনিয়র ফুল-স্ট্যাক ও মোবাইল অ্যাপ্লিকেশন ইঞ্জিনিয়ার',
  tagline: 'হাই-পারফরম্যান্স ওয়েব এবং স্কেলেবল ডিজিটাল প্রোডাক্ট নির্মাতা',
  bio: 'গত ৫+ বছর ধরে আধুনিক জাভাস্ক্রিপ্ট ইকোসিস্টেম, ক্লাউড আর্কিটেকচার এবং রেসপন্সিভ নেটিভ ওয়েব অ্যাপ্লিকেশন তৈরিতে কাজ করছি। ব্যবহারকারীর চমৎকার অভিজ্ঞতা এবং অপ্টিমাইজড কোড কোয়ালিটি আমার মূল লক্ষ্য।',
  aboutDetailed: 'আমি আধুনিক প্রযুক্তির সমন্বয়ে জটিল সমস্যার সহজ ও কার্যকর সমাধান তৈরি করতে ভালোবাসি। রিয়্যাক্ট, টাইপস্ক্রিপ্ট, নোড.জেএস এবং নেক্সট.জেএস ব্যবহার করে একাধিক স্কেলেবল প্ল্যাটফর্ম তৈরি করেছি যা প্রতিদিন হাজার হাজার ব্যবহারকারী ব্যবহার করছেন। কোড পারফরম্যান্স, ক্লিন আর্কিটেকচার এবং পারফেক্ট ইউজার ইন্টারফেস তৈরিতে আমার গভীর আগ্রহ রয়েছে।',
  email: 'biswaspartha7070@gmail.com',
  location: 'ঢাকা, বাংলাদেশ (রিমোট ও গ্লোবাল)',
  github: 'https://github.com',
  linkedin: 'https://linkedin.com',
  website: 'https://devpulse.portfolio',
  availableForHire: true,
  experienceYears: 5,
  projectsCompleted: 24,
};

export const initialProjects: Project[] = [
  {
    id: 'proj-1',
    title: 'ফিনটেক ড্যাশবোর্ড ও ওয়ালেট সিস্টেম',
    tagline: 'রিয়েল-টাইম ট্রানজ্যাকশন অ্যানালিটিক্স এবং সুরক্ষিত পেমেন্ট গেটওয়ে ইন্টারফেস',
    category: 'Full-Stack',
    overview: 'একটি পূর্ণাঙ্গ ডিজিটাল আর্থিক সমাধান যাতে প্রতি সেকেন্ডে হাজার হাজার ট্রানজ্যাকশন প্রসেসিংয়ের ভিজ্যুয়াল ডেটা ও ফ্রড ডিটেকশন ড্যাশবোর্ড অন্তর্ভুক্ত রয়েছে।',
    metrics: ['৪০% কম পেজ লোডিং সময়', '১০০কে+ মাসিক লেনদেন সক্ষমতা', '৯৯.৯% আপটাইম'],
    technologies: ['React 19', 'TypeScript', 'Node.js', 'Tailwind CSS', 'PostgreSQL', 'Redis'],
    features: [
      'রিয়েল-টাইম ওয়েব-সকেট ভিত্তিক ব্যালেন্স আপডেট',
      'মাল্টি-কারেন্সি কনভার্সন ও চার্ট ভিজ্যুয়ালাইজেশন',
      'রোল-বেসড অ্যাক্সেস কন্ট্রোল ও অডিট লগ',
      'অফলাইন ট্রানজ্যাকশন ড্রাফটিং সিস্টেম'
    ],
    challengesSolved: 'হাই-কনকারেন্সি রিকোয়েস্ট ম্যানেজমেন্টের জন্য অপ্টিমাইজড ক্যাশিং এবং মেমোইজেশন প্যাটার্ন প্রয়োগ করা হয়েছে।',
    liveUrl: 'https://example.com/fintech-dashboard',
    githubUrl: 'https://github.com/example/fintech-dashboard',
    featured: true,
    completionDate: '২০২৫',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'proj-2',
    title: 'এন্টারপ্রাইজ টাস্ক ও প্রজেক্ট হাব',
    tagline: 'টিম কোলাবোরেশন, কানবান বোর্ড ও ওয়ার্কফ্লো অটোমেশন প্ল্যাটফর্ম',
    category: 'Frontend',
    overview: 'দূরবর্তী দলের কাজের গতিশীলতা বৃদ্ধির জন্য আধুনিক ড্র্যাগ-অ্যান্ড-ড্রপ কানবান ইন্টারফেস ও স্বয়ংক্রিয় প্রগ্রেস ট্র্যাকিং ইঞ্জিন।',
    metrics: ['২৫% দলগত প্রোডাক্টিভিটি বৃদ্ধি', '৬০ এফপিএস স্মুথ ড্র্যাগ ড্রপ', '০ মিলি-সেকেন্ড পারসিভড ল্যাটেন্সি'],
    technologies: ['Next.js', 'Tailwind CSS', 'Zustand', 'Web Workers', 'IndexedDB'],
    features: [
      'স্মুথ ড্র্যাগ অ্যান্ড ড্রপ কানবান বোর্ড',
      'ইন্টারঅ্যাক্টিভ স্প্রিন্ট প্ল্যানার ও গ্যাণ্ট চার্ট',
      'কি-বোর্ড শর্টকাট নেভিগেশন',
      'লোকাল-ফার্স্ট অফলাইন সিনক্রোনাইজেশন'
    ],
    challengesSolved: 'লার্জ-লিস্ট রেন্ডারিং অপ্টিমাইজেশনের জন্য ভার্চুয়ালাইজেশন প্রযুক্তি ব্যবহার করে মেমোরি খরচ অর্ধেকের নিচে নামিয়ে আনা হয়েছে।',
    liveUrl: 'https://example.com/project-hub',
    githubUrl: 'https://github.com/example/project-hub',
    featured: true,
    completionDate: '২০২৪',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'proj-3',
    title: 'এআই-পাওয়ার্ড কনটেন্ট অপ্টিমাইজার',
    tagline: 'ন্যাচারাল ল্যাঙ্গুয়েজ প্রসেসিং ও অটোমেটেড কপিরাইটিং ইঞ্জিন',
    category: 'AI/ML',
    overview: 'ডিজিটাল মার্কেটার এবং কনটেন্ট ক্রিয়েটরদের জন্য জেমিনাই এলএলএম চালিত রিয়েল-টাইম কনটেন্ট বিশ্লেষণ এবং এসইও সমৃদ্ধকরণ টুল।',
    metrics: ['৩ গুণ দ্রুত কপি ড্রাফটিং', '৮৫% নির্ভুল টোন ম্যাচিং'],
    technologies: ['Gemini API', 'Express', 'React', 'TypeScript', 'Tailwind CSS'],
    features: [
      'কনটেক্সচুয়াল হেডলাইন ও মেটা ডেসক্রিপশন জেনারেশন',
      'এসইও কিওয়ার্ড ডেনসিটি অ্যানালাইজার',
      'টোন ও সেন্টিমেন্ট অ্যাডজাস্টমেন্ট স্লাইডার'
    ],
    challengesSolved: 'স্ট্রিমিং রেসপন্স আর্কিটেকচার বাস্তবায়নের মাধ্যমে ব্যবহারকারীকে তাত্ক্ষণিক আউটপুট প্রদর্শন নিশ্চিত করা হয়েছে।',
    liveUrl: 'https://example.com/ai-copywriter',
    githubUrl: 'https://github.com/example/ai-copywriter',
    featured: true,
    completionDate: '২০২৪',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'proj-4',
    title: 'স্বাস্থ্যসেবা ও টেলিমেডিসিন মোবাইল ওয়েব',
    tagline: 'রোগীর অ্যাপয়েন্টমেন্ট শিডিউলিং ও ডিজিটাল প্রেসক্রিপশন ভল্ট',
    category: 'Mobile',
    overview: 'মোবাইল ব্রাউজারে নেটিভ অ্যাপের মতো দ্রুত ও স্মুথ অভিজ্ঞতা সম্পন্ন ডিজিটাল স্বাস্থ্য প্ল্যাটফর্ম।',
    metrics: ['৫০ হাজার সক্রিয় রোগী', '৪.৯ স্টার ইউজার ফিডব্যাক'],
    technologies: ['React', 'TypeScript', 'PWA Service Worker', 'Tailwind CSS'],
    features: [
      'ওয়ান-ট্যাপ ডক্টর অ্যাপয়েন্টমেন্ট শিডিউলিং',
      'এনক্রিপ্টেড প্রেসক্রিপশন ও মেডিকেল হিস্ট্রি ভিউয়ার',
      'অফলাইন মোড সাপোর্ট'
    ],
    challengesSolved: 'দুর্বল মোবাইল নেটওয়ার্কে দ্রুত ডেটা আদান-প্রদানের জন্য ব্যাকগ্রাউন্ড সিন্ক ও কম্প্রেসড ইমেজ ডেলিভারি নিশ্চিত করা হয়েছে।',
    liveUrl: 'https://example.com/health-portal',
    githubUrl: 'https://github.com/example/health-portal',
    featured: false,
    completionDate: '২০২৩',
    createdAt: new Date().toISOString(),
  }
];

export const initialExperiences: Experience[] = [
  {
    id: 'exp-1',
    role: 'লিড ফুল-স্ট্যাক ইঞ্জিনিয়ার',
    company: 'টেকনোলজি সলিউশনস লিমিটেড',
    location: 'ঢাকা / রিমোট',
    employmentType: 'Full-time',
    startDate: 'জানুয়ারি ২০২২',
    endDate: 'বর্তমান',
    isCurrent: true,
    summary: '৮ সদস্যের ইঞ্জিনিয়ারিং দলের নেতৃত্ব প্রদান এবং আধুনিক ক্লাউড আর্কিটেকচারে কোর প্রোডাক্ট ডেভেলপমেন্ট।',
    achievements: [
      'মাইক্রো-ফ্রন্টএন্ড আর্কিটেকচার ডিজাইন ও বাস্তবায়নের মাধ্যমে ডেভেলপমেন্ট ভেলোসিটি ৩৫% বৃদ্ধি।',
      'কোর ওয়েব ভাইটালস অপ্টিমাইজ করে সকল প্রজেক্টে গুগল লাইটহাউস স্কোর ৯০+ অর্জন।',
      'রেস্ট এপিআই থেকে হাইব্রিড গ্রাফকিউএল ও সিaching আর্কিটেকচারে রূপান্তর, যার ফলে সার্ভার রেসপন্স টাইম ৫০% হ্রাস পায়।',
      'জুনিয়র ডেভেলপারদের মেন্টরিং এবং কোড রিভিউ স্ট্যান্ডার্ড নির্ধারণ।'
    ],
    skillsHighlighted: ['React', 'TypeScript', 'Node.js', 'System Design', 'CI/CD', 'Docker']
  },
  {
    id: 'exp-2',
    role: 'সফটওয়্যার ডেভেলপার (ফ্রন্টএন্ড স্পেশালিস্ট)',
    company: 'গ্লোবাল ডিজিটাল ক্রাফটস',
    location: 'ঢাকা',
    employmentType: 'Full-time',
    startDate: 'জুন ২০১৯',
    endDate: 'ডিসেম্বর ২০২১',
    isCurrent: false,
    summary: 'ক্লায়েন্ট ফেসিং একাধিক হাই-ট্রাফিক ওয়েব পোর্টাল এবং মোবাইল রেসপন্সিভ অ্যাপ্লিকেশনের ডিজাইন ও কোডিং।',
    achievements: [
      '১৫+ জটিল কাস্টম ড্যাশবোর্ড এবং ইন্টারঅ্যাক্টিভ ভিজ্যুয়ালাইজেশন সফলভাবে ডেলিভারি।',
      'কম্পোনেন্ট লাইব্রেরি আর্কিটেকচার তৈরি করে প্রোডাক্ট রিলিজ টাইমলাইন ২৫% সাশ্রয়।',
      'ক্রস-ব্রাউজার কম্প্যাটিবিলিটি ও অ্যাক্সেসিবিলিটি (WCAG AA) বাস্তবায়ন।'
    ],
    skillsHighlighted: ['JavaScript (ES6+)', 'React', 'CSS3/Tailwind', 'Redux', 'REST API']
  },
  {
    id: 'exp-3',
    role: 'জুনিয়র ওয়েব অ্যাপ্লিকেশন প্রোগ্রামার',
    company: 'ইনোভেশন ল্যাবস',
    location: 'ঢাকা',
    employmentType: 'Full-time',
    startDate: 'জানুয়ারি ২০১৮',
    endDate: 'মে ২০১৯',
    isCurrent: false,
    summary: 'ইন্টারফেস প্রোটোটাইপিং, বাগ ফিক্সিং এবং ব্যাকএন্ড এপিআই ইন্টিগ্রেশন।',
    achievements: [
      'ক্লায়েন্ট রিকোয়ারমেন্ট অনুযায়ী রেসপন্সিভ সিঙ্গেল পেজ অ্যাপ্লিকেশন তৈরি।',
      'অটোমেটেড ইউনিট টেস্ট লিখে অ্যাপ্লিকেশন টেস্ট কভারেজ ৪০% থেকে ৮০% এ উন্নীত।'
    ],
    skillsHighlighted: ['HTML5', 'CSS3', 'JavaScript', 'Git', 'Bootstrap']
  }
];

export const initialSkillCategories: SkillCategory[] = [
  {
    id: 'cat-frontend',
    name: 'ফ্রন্টএন্ড ও ক্লায়েন্ট টেকনোলজি',
    skills: [
      { name: 'React 19 & Next.js', level: 96 },
      { name: 'TypeScript & Modern JS', level: 94 },
      { name: 'Tailwind CSS & Responsive UI', level: 98 },
      { name: 'State Management (Zustand/Redux)', level: 90 },
      { name: 'Web Performance & Web Vitals', level: 88 }
    ]
  },
  {
    id: 'cat-backend',
    name: 'ব্যাকএন্ড, এপিআই ও ক্লাউড',
    skills: [
      { name: 'Node.js & Express', level: 90 },
      { name: 'REST & GraphQL APIs', level: 86 },
      { name: 'PostgreSQL & MongoDB', level: 84 },
      { name: 'Docker & Containerization', level: 78 },
      { name: 'Cloud & Vercel / Cloud Run', level: 82 }
    ]
  },
  {
    id: 'cat-tools',
    name: 'টুলস, আর্কিটেকচার ও মেথডোলজি',
    skills: [
      { name: 'System Design & Scalability', level: 85 },
      { name: 'Git, GitHub Actions & CI/CD', level: 92 },
      { name: 'Gemini AI API & LLM Integration', level: 88 },
      { name: 'Automated Testing (Jest/Playwright)', level: 80 }
    ]
  }
];

export const initialTasks: TaskItem[] = [
  {
    id: 'task-1',
    title: 'পোর্টফোলিও কেস স্টাডিতে লাইভ প্রজেক্ট ডেমো লিঙ্ক আপডেট',
    description: 'সাম্প্রতিক ফিনটেক ড্যাশবোর্ড প্রজেক্টের সর্বশেষ স্টেবিল বিল্ড ইউআরএল এবং প্রিভিউ স্ক্রিনশট যুক্ত করা।',
    status: 'in_progress',
    priority: 'high',
    category: 'Portfolio',
    projectId: 'proj-1',
    dueDate: '2026-09-28',
    estimatedHours: 2,
    subtasks: [
      { id: 'sub-1', title: 'নতুন প্রোডাকশন ডেমো লিঙ্ক পরীক্ষা করা', completed: true },
      { id: 'sub-2', title: 'আর্কিটেকচার হাইলাইট সামারি চেক করা', completed: true },
      { id: 'sub-3', title: 'রেসপন্সিভ ভিউতে লেআউট টেস্ট করা', completed: false }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'task-2',
    title: 'নতুন এআই টাস্ক ব্রেকডাউন ফিচার ইন্টিগ্রেশন সম্পন্ন করা',
    description: 'জেমিনাই ৩.৮ ফ্ল্যাশ ব্যবহার করে দ্রুত যেকোনো প্রজেক্ট বা টাস্ককে সাব-টাস্কে রূপান্তর সুবিধা নিশ্চিত করা।',
    status: 'completed',
    priority: 'urgent',
    category: 'Feature',
    projectId: 'proj-3',
    dueDate: '2026-09-24',
    estimatedHours: 4,
    subtasks: [
      { id: 'sub-4', title: 'সার্ভার সাইড প্রক্সি এন্ডপয়েন্ট তৈরি', completed: true },
      { id: 'sub-5', title: 'নো-ইমোজি ফিল্টারিং রুলস প্রয়োগ', completed: true },
      { id: 'sub-6', title: 'মোবাইল টাচ অপ্টিমাইজেশন যাচাই', completed: true }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'task-3',
    title: 'লিঙ্কডইন ও রেজুমে কাজের অভিজ্ঞতা বুলেট পয়েন্ট রিভিশন',
    description: '২০২৫-২০২৬ এর প্রজেক্ট কোয়ান্টিফাইড মেট্রিক্স ও কি-রেজাল্টস রেজুমেতে যুক্ত করা।',
    status: 'todo',
    priority: 'medium',
    category: 'Career',
    projectId: undefined,
    dueDate: '2026-10-05',
    estimatedHours: 3,
    subtasks: [
      { id: 'sub-7', title: 'কোয়ান্টিফাইড অর্জনসমূহের তালিকা প্রস্তুত', completed: false },
      { id: 'sub-8', title: 'এআই এক্সপেরিয়েন্স পলিশার দিয়ে রিভিউ করা', completed: false }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'task-4',
    title: 'মোবাইল ওয়েব পারফরম্যান্স অডিট ও লাইটহাউস অপ্টিমাইজেশন',
    description: 'ইমেজ অপ্টিমাইজেশন, ক্যাশিং স্ট্র্যাটেজি ও বান্ডেল সাইজ মিনিমাইজেশন নিশ্চিতকরণ।',
    status: 'todo',
    priority: 'high',
    category: 'Optimization',
    projectId: 'proj-2',
    dueDate: '2026-10-02',
    estimatedHours: 5,
    subtasks: [
      { id: 'sub-9', title: 'আনইউজড সিএসএস ও ফন্ট প্রি-লোড যাচাই', completed: false },
      { id: 'sub-10', title: 'ফার্স্ট কনটেন্টফুল পেইন্ট < ১.২ সেকেন্ডে নামানো', completed: false }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];
