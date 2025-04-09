import { useState, useEffect, useCallback, createContext } from "react";
import type { ReactNode } from "react";
import axios from "axios";

// Type utilisateur
export type User = {
  id: number;
  email: string;
};

type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  fetchUser: () => Promise<void>;
  logout: () => void;
};

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  fetchUser: async () => {},
  logout: () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const fetchUser = useCallback(async () => {
    try {
      const res = await axios.get<{ user: User }>("http://localhost:5002/api/me", {
        withCredentials: true,
      });
      setUser(res.data.user);
    } catch (error) {
      console.error("Erreur fetchUser:", error);
      setUser(null);
    }
  }, []);

  const logout = () => {
    setUser(null);
    document.cookie = "authToken=; Max-Age=0; path=/;";
  };

  // ✅ On ne fetch l'utilisateur que si un cookie est présent
  useEffect(() => {
    const hasAuthCookie = document.cookie.includes("authToken");
    if (hasAuthCookie) {
      fetchUser();
    }
  }, [fetchUser]);

  return (
    <UserContext.Provider value={{ user, setUser, fetchUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
