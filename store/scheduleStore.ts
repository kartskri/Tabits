import { create } from 'zustand';

export type ScheduleItem = {
  id: string;
  name: string;
  time: string;
};

interface ScheduleStore {
  schedule: ScheduleItem[];
  setSchedule: (schedule: ScheduleItem[]) => void;
  addScheduleItem: (item: ScheduleItem) => void;
  removeScheduleItem: (id: string) => void;
}

const defaultSchedule: ScheduleItem[] = [
  { id: "W", name: "Wake Up", time: "7:00 AM" },
  { id: "E", name: "Eat Breakfast", time: "7:30 AM" },
  { id: "S", name: "School", time: "8:00 AM" },
  { id: "P", name: "Project", time: "4:00 PM" },
  { id: "D", name: "Dinner", time: "6:30 PM" },
];

export const useScheduleStore = create<ScheduleStore>((set) => ({
  schedule: defaultSchedule,
  setSchedule: (schedule) => set({ schedule }),
  addScheduleItem: (item) => set((state) => ({ 
    schedule: [...state.schedule, item] 
  })),
  removeScheduleItem: (id) => set((state) => ({ 
    schedule: state.schedule.filter(s => s.id !== id) 
  })),
}));