"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/firebase";

const AuthContext = createContext<{ user: any; loading: boolean }>({
  user: null,
  loading: true,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState(null as any);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let logoutTimer: ReturnType<typeof setTimeout>;

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);

      if (user) {
        // Set auto-logout timer (15 minutes)
        logoutTimer = setTimeout(() => {
          signOut(auth);
        }, 15 * 60 * 1000);
      } else {
        clearTimeout(logoutTimer);
      }
    });

    return () => {
      unsubscribe();
      clearTimeout(logoutTimer);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
