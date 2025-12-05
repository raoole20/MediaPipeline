export type NavSection = {
  title: string;
  items: { label: string; active?: boolean }[];
};

export type QuickFilter = {
  label: string;
  count: number;
  accent: string;
};

export type MockFile = {
  name: string;
  type: string;
  size: string;
  updated: string;
  accent: string;
};
