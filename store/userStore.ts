import { create } from 'zustand';

export type User = {
  id: string;
  email: string;
  password: string;
  name: string;
};

interface UserStore {
  users: User[];
  currentUser: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const defaultUsers: User[] = [
  { id: "1", email: "prahladkarthik@outlook.com", password: "password123", name: "Prahload" },
  { id: "2", email: "karthiksk81@gmail.com", password: "password123", name: "Karthik" },
  { id: "3", email: "pallavikarthik29@gmail.com", password: "password123", name: "Pallavi" },
];

export const useUserStore = create<UserStore>((set, get) => ({
  users: defaultUsers,
  currentUser: null,
  login: (email, password) => {
    const user = get().users.find(u => u.email === email && u.password === password);
    if (user) {
      set({ currentUser: user });
      return true;
    }
    return false;
  },
  logout: () => set({ currentUser: null }),
}));
