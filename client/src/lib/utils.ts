import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { QualificationStatus } from "./enums"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getCurrentTab(currentTab: string) {
  switch (currentTab) {
    case "readiness-level":
      return "Readiness Level"
    case "rns":
      return "Recommended Next Steps"
    case "rna":
      return "Readiness and Needs Assessment"
    default:
      return currentTab.charAt(0).toUpperCase() + currentTab.slice(1)
  }
}

export function getQualificationStatusText(status: number | undefined): string {
  if (!status) return "Loading..."
  const text = QualificationStatus[status]
  if (!text) return "Unknown"
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
}

export const startupStatusMap: Record<number, { label: string; border: string; text: string; bg: string }> = {
  1: {
    label: "Pending",
    border: "border-yellow-400",
    text: "text-yellow-400",
    bg: "bg-yellow-900"
  },
  2: {
    label: "Pending",
    border: "border-yellow-400",
    text: "text-yellow-400",
    bg: "bg-yellow-900"
  },
  3: {
    label: "Qualified",
    border: "border-blue-500",
    text: "text-blue-500",
    bg: "bg-slate-900"
  },
  4: {
    label: "Rejected",
    border: "border-red-400",
    text: "text-red-400",
    bg: "bg-red-900"
  },
  5: {
    label: "Paused",
    border: "border-gray-400",
    text: "text-gray-400",
    bg: "bg-gray-900"
  },
  6: {
    label: "Completed",
    border: "border-green-500",
    text: "text-green-500",
    bg: "bg-green-900"
  }
}
