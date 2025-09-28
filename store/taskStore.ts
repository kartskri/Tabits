import { create } from 'zustand';

export type Task = {
  id: string;
  name: string;
  time: string;
};

interface TaskStore {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  addTask: (task: Task) => void;
  removeTask: (id: string) => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  setTasks: (tasks) => set({ tasks }),
  addTask: (task) => set((state) => ({ 
    tasks: [...state.tasks, task] 
  })),
  removeTask: (id) => set((state) => ({ 
    tasks: state.tasks.filter(t => t.id !== id) 
  })),
}));