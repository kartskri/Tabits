import { create } from 'zustand';

export type LeaderboardUser = {
  id: string;
  name: string;
  score: number;
  rank: number;
};

interface LeaderboardStore {
  leaderboard: LeaderboardUser[];
  setLeaderboard: (leaderboard: LeaderboardUser[]) => void;
}

const defaultLeaderboard: LeaderboardUser[] = [
  { id: "1", name: "You", score: 850, rank: 1 },
  { id: "2", name: "Alex", score: 720, rank: 2 },
  { id: "3", name: "Sarah", score: 680, rank: 3 },
  { id: "4", name: "Mike", score: 620, rank: 4 },
  { id: "5", name: "Emma", score: 580, rank: 5 },
];

export const useLeaderboardStore = create<LeaderboardStore>((set) => ({
  leaderboard: defaultLeaderboard,
  setLeaderboard: (leaderboard) => set({ leaderboard }),
}));