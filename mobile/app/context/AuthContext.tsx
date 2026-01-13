import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setAuthToken, apiFetch } from "../utils/api";
import { router } from "expo-router";

type AuthContextType = {
  token: string | null;
  isLoading: boolean;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  token: null,
  isLoading: true,
  login: async () => {},
  logout: async () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadToken();
  }, []);

  async function loadToken() {
    try {
      const storedToken = await AsyncStorage.getItem("auth_token");
      if (storedToken) {
        setToken(storedToken);
        setAuthToken(storedToken);
        // Optional: specific checkUser endpoint if you have one
      }
    } catch (error) {
      console.error("Failed to load token", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function login(newToken: string) {
    try {
      await AsyncStorage.setItem("auth_token", newToken);
      setToken(newToken);
      setAuthToken(newToken);
    } catch (error) {
      console.error("Failed to save token", error);
    }
  }

  async function logout() {
    try {
      await AsyncStorage.removeItem("auth_token");
      setToken(null);
      setAuthToken("");
      router.replace("/");
    } catch (error) {
      console.error("Failed to remove token", error);
    }
  }

  return <AuthContext.Provider value={{ token, isLoading, login, logout }}>{children}</AuthContext.Provider>;
}

