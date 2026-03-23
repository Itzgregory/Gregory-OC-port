
export interface Project {
  year: string;
  title: string;
  category: string;
  description: string;
  stack: string[];
  previewAvailable: boolean;
  url?: string;
  screenshot?: string;
}

export interface StackItem {
  name: string;
  desc: string;
}

export const EASE = [0.4, 0, 0.2, 1] as const;