import { create } from "zustand";

interface HeaderState {
  title: string;
  description?: string;
  headerChildren?: React.ReactNode;
  setHeader: (config: { title: string; description?: string; headerChildren?: React.ReactNode }) => void;
  clearHeader: () => void;
}

export const useHeaderStore = create<HeaderState>((set) => ({
  title: "",
  description: "",
  headerChildren: null,
  setHeader: (config) => set(config),
  clearHeader: () => set({ title: "", description: "", headerChildren: null }),
}));
