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

export const useScheduleStore = create<ScheduleStore>((set) => ({
  schedule: [],
  setSchedule: (schedule) => set({ schedule }),
  addScheduleItem: (item) => set((state) => ({ 
    schedule: [...state.schedule, item] 
  })),
  removeScheduleItem: (id) => set((state) => ({ 
    schedule: state.schedule.filter(s => s.id !== id) 
  })),
}));