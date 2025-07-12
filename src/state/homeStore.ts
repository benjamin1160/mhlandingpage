import { create } from "zustand";

export type HomeAnswers = Record<string, string | number>;

interface HomeState {
  answers: HomeAnswers;
  setAnswer: (key: string, value: string | number) => void;
}

export const useHomeStore = create<HomeState>((set) => ({
  answers: {},
  setAnswer: (key, value) =>
    set((state) => ({ answers: { ...state.answers, [key]: value } })),
}));
