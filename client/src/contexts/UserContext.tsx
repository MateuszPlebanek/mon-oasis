import { createContext } from "react";

export type User = {
  id: number;
  email: string;
};

export type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  fetchUser: () => Promise<void>;
  logout: () => void;
};

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  fetchUser: async () => {},
  logout: () => {},
});
