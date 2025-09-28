import { create } from 'zustand';

export type Habit = {
  id: string;
  title: string;
  status: "Complete" | "Incomplete";
  xp: number;
  image: string;
  favorite: boolean;
};

interface HabitStore {
  habits: Habit[];
  setHabits: (habits: Habit[]) => void;
  addHabit: (habit: Habit) => void;
  updateHabit: (id: string, updates: Partial<Habit>) => void;
  removeHabit: (id: string) => void;
}

export const useHabitStore = create<HabitStore>((set) => ({
  habits: [],
  setHabits: (habits) => set({ habits }),
  addHabit: (habit) => set((state) => ({ 
    habits: [...state.habits, habit] 
  })),
  updateHabit: (id, updates) => set((state) => ({
    habits: state.habits.map(habit => 
      habit.id === id ? { ...habit, ...updates } : habit
    )
  })),
  removeHabit: (id) => set((state) => ({ 
    habits: state.habits.filter(h => h.id !== id) 
  })),
}));