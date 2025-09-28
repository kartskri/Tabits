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

const defaultTasks: Task[] = [
  { id: "P", name: "Project", time: "4:00 PM" },
  { id: "D", name: "Dinner", time: "6:30 PM" },
];

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: defaultTasks,
  setTasks: (tasks) => set({ tasks }),
  addTask: (task) => set((state) => ({ 
    tasks: [...state.tasks, task] 
  })),
  removeTask: (id) => set((state) => ({ 
    tasks: state.tasks.filter(t => t.id !== id) 
  })),
}));