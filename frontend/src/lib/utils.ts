import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { browser } from '$app/environment';
import type { Role } from './types';
import axiosInstance from './axios';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const readiness = [
  'Technology',
  'Investment',
  'Acceptance',
  'Regulatory',
  'Organizational',
  'Market'
];

export const getRole = (
  role: 'Manager' | 'Mentor' | 'Startup' | 'Manager_as_Mentor'
) => {
  const roles = {
    Manager: 'Manager',
    Mentor: 'Mentor',
    Startup: 'Startup',
    Manager_as_Mentor: 'Manager as Mentor'
  };

  return roles[`${role}`];
};

export const setLocal = (name: string, value: any) => {
  if (browser) {
    localStorage.setItem(name, value);
  }
};

export const getLocal = (name: string) => {
  if (browser) {
    return localStorage.getItem(name);
  }
};

export const getColumns = () => {
  return [
    {
      name: 'Discontinued',
      value: 2,
      items: [],
      show: true
    },
    {
      name: 'Scheduled',
      value: 4,
      items: [],
      show: true
    },
    {
      name: 'Track',
      value: 5,
      items: [],
      show: true
    },
    {
      name: 'Delayed',
      value: 3,
      items: [],
      show: true
    },
    {
      name: 'Completed',
      value: 6,
      items: [],
      show: true
    }
  ];
};

export const getReadiness = () => {
  return [
    {
      name: 'Technology',
      show: true
    },
    {
      name: 'Investment',
      show: true
    },
    {
      name: 'Regulatory',
      show: true
    },
    {
      name: 'Acceptance',
      show: true
    },
    {
      name: 'Organizational',
      show: true
    },
    {
      name: 'Market',
      show: true
    }
  ];
};

export const updateTab = (name: string, tab: string) => {
  if (getAllowedTabs(name).includes(tab)) {
    setLocal(name, tab);
    const url = new URL(window.location.href);
    url.searchParams.set('tab', tab);
    window.history.replaceState({}, '', url);

    return tab;
  } else {
    return getAllowedTabs(name)[0];
  }
};

export const getAllowedTabs = (name: string) => {
  return [name, `ai-${name}`];
};

export const isMentor = (role: Role) => {
  if (['Mentor', 'Manager as Mentor'].includes(role)) return true;

  return false;
};

export const getSelectedTab = (name: string): string => {
  if (getAllowedTabs(name).includes(getLocal(name) ?? ''))
    return getLocal(name)!;
  return name;
};

export const getSavedTab = (name: string, searchParam: any) => {
  const savedTab = getLocal('initiatives');
  let selectedTab;

  if (searchParam && getAllowedTabs(name).includes(searchParam)) {
    selectedTab = searchParam;
    setLocal(name, searchParam);
  } else if (savedTab && getAllowedTabs(name).includes(savedTab)) {
    selectedTab = savedTab;

    const url = new URL(window.location.href);
    url.searchParams.set('tab', savedTab);
    window.history.replaceState({}, '', url);
  } else {
    selectedTab = name;
    const url = new URL(window.location.href);
    url.searchParams.set('tab', name);
    window.history.replaceState({}, '', url);
    setLocal(name, name);
  }

  return selectedTab;
};

export const getData = async (url: string, access: string) => {
  const localhostURL = `http://localhost:3000${url}`;
  const response = await axiosInstance.get(localhostURL, {
    headers: {
      Authorization: `Bearer ${access}`
    }
  });
  return response.data;
};

export const zIndex = ['z-50', 'z-40', 'z-30', 'z-20', 'z-10', 'z-0'];

export const profileColor = [
  'bg-red-500',
  'bg-blue-500',
  'bg-green-500',
  'bg-yellow-500',
  'bg-purple-500',
  'bg-pink-500',
  'bg-orange-500',
  'bg-teal-500',
  'bg-indigo-500',
  'bg-cyan-500',
  'bg-lime-500',
  'bg-amber-500',
  'bg-rose-500',
  'bg-sky-500',
  'bg-emerald-500',
  'bg-violet-500',
  'bg-fuchsia-500',
  'bg-gray-500',
  'bg-slate-500',
  'bg-zinc-500',
  'bg-stone-500'
];

export const getPriorityStyles = (
  priority: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
) => {
  const priorityClasses = {
    1: 'bg-red-700 hover:bg-red-800',
    2: 'bg-orange-700 hover:bg-orange-800',
    3: 'bg-yellow-700 hover:bg-yellow-800',
    4: 'bg-lime-700 hover:bg-lime-800',
    5: 'bg-green-700 hover:bg-green-800',
    6: 'bg-teal-700 hover:bg-teal-800',
    7: 'bg-blue-700 hover:bg-blue-800',
    8: 'bg-indigo-700 hover:bg-indigo-800',
    9: 'bg-purple-700 hover:bg-purple-800',
    10: 'bg-pink-700 hover:bg-pink-800'
  };

  // Default styles if priority is out of range
  return priorityClasses[priority] || 'bg-gray-500 hover:bg-gray-600';
};

export const getReadinessStyles = (
  type:
    | 'Technology'
    | 'Market'
    | 'Acceptance'
    | 'Regulatory'
    | 'Organizational'
    | 'Investment'
) => {
  const readinessClasses = {
    Technology: 'bg-sky-700 hover:bg-sky-800', // Neutral
    Market: 'bg-cyan-700 hover:bg-cyan-800', // Bright cyan
    Acceptance: 'bg-amber-700 hover:bg-amber-800', // Amber
    Regulatory: 'bg-fuchsia-700 hover:bg-fuchsia-800', // Fuchsia
    Organizational: 'bg-emerald-700 hover:bg-emerald-800', // Emerald
    Investment: 'bg-green-700 hover:bg-green-800' // Slate
  };

  // Default styles if type is unrecognized
  return readinessClasses[type] || 'bg-zinc-500 hover:bg-zinc-600'; // Backup gray
};

export function getProfileColor(firstName: string) {
  if (!firstName || typeof firstName !== 'string') {
    return 'bg-gray-500'; // Default color if no valid name is provided
  }

  // Get the ASCII value of the first letter, convert it to uppercase for consistency
  const firstChar = firstName[0].toUpperCase();
  const asciiValue = firstChar.charCodeAt(0);

  // Map the ASCII value to an index in the profileColor array
  const colorIndex = asciiValue % profileColor.length;

  return profileColor[colorIndex];
}

export const getReadinessTypes = () => {
  return [
    {
      id: 2,
      name: 'Technology'
    },
    {
      id: 3,
      name: 'Market'
    },
    {
      id: 4,
      name: 'Acceptance'
    },
    {
      id: 5,
      name: 'Organizational'
    },
    {
      id: 6,
      name: 'Regulatory'
    },
    {
      id: 7,
      name: 'Investment'
    }
  ];
};

export const getReadinessLevels = (
  readiness:
    | 'Technology'
    | 'Market'
    | 'Acceptance'
    | 'Organizational'
    | 'Regulatory'
    | 'Investment'
) => {
  const levels = {
    Technology: [
      { id: 2, level: 1 },
      { id: 3, level: 2 },
      { id: 4, level: 3 },
      { id: 5, level: 4 },
      { id: 6, level: 5 },
      { id: 7, level: 6 },
      { id: 8, level: 7 },
      { id: 9, level: 8 },
      { id: 10, level: 9 }
    ],
    Market: [
      { id: 11, level: 1 },
      { id: 12, level: 2 },
      { id: 13, level: 3 },
      { id: 14, level: 4 },
      { id: 15, level: 5 },
      { id: 16, level: 6 },
      { id: 17, level: 7 },
      { id: 18, level: 8 },
      { id: 19, level: 9 }
    ],
    Acceptance: [
      { id: 20, level: 1 },
      { id: 21, level: 2 },
      { id: 22, level: 3 },
      { id: 23, level: 4 },
      { id: 24, level: 5 },
      { id: 25, level: 6 },
      { id: 26, level: 7 },
      { id: 27, level: 8 },
      { id: 28, level: 9 }
    ],
    Organizational: [
      { id: 29, level: 1 },
      { id: 30, level: 2 },
      { id: 31, level: 3 },
      { id: 32, level: 4 },
      { id: 33, level: 5 },
      { id: 34, level: 6 },
      { id: 35, level: 7 },
      { id: 36, level: 8 },
      { id: 37, level: 9 }
    ],
    Regulatory: [
      { id: 38, level: 1 },
      { id: 39, level: 2 },
      { id: 40, level: 3 },
      { id: 41, level: 4 },
      { id: 42, level: 5 },
      { id: 43, level: 6 },
      { id: 44, level: 7 },
      { id: 45, level: 8 },
      { id: 46, level: 9 }
    ],
    Investment: [
      { id: 47, level: 1 },
      { id: 48, level: 2 },
      { id: 49, level: 3 },
      { id: 50, level: 4 },
      { id: 51, level: 5 },
      { id: 52, level: 6 },
      { id: 53, level: 7 },
      { id: 54, level: 8 },
      { id: 55, level: 9 }
    ]
  };

  return levels[readiness];
};

export const getStatusName = (s: 2 | 3 | 4 | 5 | 6) => {
  const status = {
    6: 'Completed',
    5: 'Track',
    4: 'Scheduled',
    3: 'Delayed',
    2: 'Discontinued'
  };

  return status[s];
};
