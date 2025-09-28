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

const defaultHabits: Habit[] = [
  {
    id: "1",
    title: "Meditate",
    status: "Complete",
    xp: 10,
    image: "https://cdn-icons-png.flaticon.com/512/2904/2904972.png",
    favorite: true,
  },
  {
    id: "2",
    title: "Journal",
    status: "Incomplete",
    xp: 5,
    image: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    favorite: false,
  },
  {
    id: "3",
    title: "Ride a Bike",
    status: "Complete",
    xp: 5,
    image: "https://cdn-icons-png.flaticon.com/512/3197/3197980.png",
    favorite: false,
  },
];

export const useHabitStore = create<HabitStore>((set) => ({
  habits: defaultHabits,
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