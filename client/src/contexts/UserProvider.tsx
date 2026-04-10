import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import type { ReactNode } from "react";
import { UserContext, type User } from "./UserContext";
import { API_URL } from "../services/api";

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const fetchUser = useCallback(async () => {
    try {
      const res = await axios.get<{ user: User }>(`${API_URL}/api/me`, {
        withCredentials: true,
      });
      setUser(res.data.user);
    } catch (error) {
      console.error("Erreur fetchUser:", error);
      setUser(null);
    }
  }, []);

  const logout = async () => {
    try {
      await axios.post(`${API_URL}/api/logout`, {}, {
        withCredentials: true,
      });
      setUser(null);
    } catch (err) {
      console.error("Erreur de déconnexion :", err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <UserContext.Provider value={{ user, setUser, fetchUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};
