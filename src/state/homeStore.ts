import { create } from "zustand";

type HomeState = {
  bedrooms: number;
  style: string;
  budget: string;
  setAnswer: (
    key: keyof Omit<HomeState, "setAnswer">,
    value: number | string,
  ) => void;
};

export const useHomeStore = create<HomeState>((set) => ({
  bedrooms: 0,
  style: "",
  budget: "",
  setAnswer: (key, value) => set({ [key]: value }),
}));
