import { create } from 'zustand';

export type Deadline = {
  id: string;
  title: string;
  date: string;
};

interface DeadlineStore {
  deadlines: Deadline[];
  setDeadlines: (deadlines: Deadline[]) => void;
  addDeadline: (deadline: Deadline) => void;
  removeDeadline: (id: string) => void;
}

export const useDeadlineStore = create<DeadlineStore>((set) => ({
  deadlines: [],
  setDeadlines: (deadlines) => set({ deadlines }),
  addDeadline: (deadline) => set((state) => ({ 
    deadlines: [...state.deadlines, deadline] 
  })),
  removeDeadline: (id) => set((state) => ({ 
    deadlines: state.deadlines.filter(d => d.id !== id) 
  })),
}));