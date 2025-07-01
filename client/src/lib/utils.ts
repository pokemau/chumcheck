import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const startupStatusMap: Record<
  number,
  { label: string; border: string; text: string; bg: string }
> = {
  1: {
    label: 'Pending',
    border: 'border-yellow-400',
    text: 'text-yellow-400',
    bg: 'bg-yellow-900'
  },
  2: {
    label: 'Pending',
    border: 'border-yellow-400',
    text: 'text-yellow-400',
    bg: 'bg-yellow-900'
  },
  3: {
    label: 'Qualified',
    border: 'border-blue-500',
    text: 'text-blue-500',
    bg: 'bg-slate-900'
  },
  4: {
    label: 'Rejected',
    border: 'border-red-400',
    text: 'text-red-400',
    bg: 'bg-red-900'
  },
  5: {
    label: 'Paused',
    border: 'border-gray-400',
    text: 'text-gray-400',
    bg: 'bg-gray-900'
  },
  6: {
    label: 'Completed',
    border: 'border-green-500',
    text: 'text-green-500',
    bg: 'bg-green-900'
  }
};
