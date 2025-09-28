import { create } from 'zustand';

export type Habit = {
  id: string;
  title: string;
  status: "Complete" | "Incomplete";
  xp: number;
  image: string;
  favorite: boolean;
  completedDates: string[]; // Array of dates in YYYY-MM-DD format
};

interface HabitStore {
  habits: Habit[];
  setHabits: (habits: Habit[]) => void;
  addHabit: (habit: Habit) => void;
  updateHabit: (id: string, updates: Partial<Habit>) => void;
  removeHabit: (id: string) => void;
  toggleHabitForToday: (id: string) => void;
}

const getTodayString = () => new Date().toISOString().split('T')[0];

const defaultHabits: Habit[] = [
  {
    id: "1",
    title: "Meditate",
    status: "Complete",
    xp: 10,
    image: "https://cdn-icons-png.flaticon.com/512/2904/2904972.png",
    favorite: true,
    completedDates: [getTodayString()],
  },
  {
    id: "2",
    title: "Journal",
    status: "Incomplete",
    xp: 5,
    image: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    favorite: false,
    completedDates: [],
  },
  {
    id: "3",
    title: "Ride a Bike",
    status: "Complete",
    xp: 5,
    image: "https://cdn-icons-png.flaticon.com/512/3197/3197980.png",
    favorite: false,
    completedDates: [getTodayString()],
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
  toggleHabitForToday: (id) => set((state) => {
    const today = getTodayString();
    return {
      habits: state.habits.map(habit => {
        if (habit.id === id) {
          const isCompletedToday = habit.completedDates.includes(today);
          const newCompletedDates = isCompletedToday
            ? habit.completedDates.filter(date => date !== today)
            : [...habit.completedDates, today];
          return {
            ...habit,
            completedDates: newCompletedDates,
            status: newCompletedDates.includes(today) ? "Complete" : "Incomplete"
          };
        }
        return habit;
      })
    };
  }),
  removeHabit: (id) => set((state) => ({ 
    habits: state.habits.filter(h => h.id !== id) 
  })),
}));