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

export type LayoutType = "FILM" | "EDIT" | "TABLE";
export const LAYOUTS: LayoutType[] = ["FILM", "EDIT", "TABLE"];

export const EASE = [0.4, 0, 0.2, 1] as [number, number, number, number];
