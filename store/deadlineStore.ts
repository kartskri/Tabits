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

const defaultDeadlines: Deadline[] = [
  { id: "1", title: "Math HW", date: "11/01" },
  { id: "2", title: "Chemistry Project", date: "11/04" },
  { id: "3", title: "English Test", date: "11/12" },
];

export const useDeadlineStore = create<DeadlineStore>((set) => ({
  deadlines: defaultDeadlines,
  setDeadlines: (deadlines) => set({ deadlines }),
  addDeadline: (deadline) => set((state) => ({ 
    deadlines: [...state.deadlines, deadline] 
  })),
  removeDeadline: (id) => set((state) => ({ 
    deadlines: state.deadlines.filter(d => d.id !== id) 
  })),
}));