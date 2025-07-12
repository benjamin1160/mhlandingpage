import { create } from "zustand";

export type HomeFields = {
  bedrooms: number;
  style: string;
  budget: string;
};

type HomeState = HomeFields & {
  setAnswer: <K extends keyof HomeFields>(key: K, value: HomeFields[K]) => void;
};

export const useHomeStore = create<HomeState>((set) => ({
  bedrooms: 0,
  style: "",
  budget: "",
  setAnswer: (key, value) => set({ [key]: value }),
}));
