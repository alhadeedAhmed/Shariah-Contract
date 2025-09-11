import { createContext, useContext, useEffect, useMemo, useState } from "react";

type UserRole =
  | "individual"
  | "business"
  | "provider"
  | "scholar"
  | "capitalProvider"
  | "admin"
  | null;

type AuthContextType = {
  role: UserRole;
  isAuthenticated: boolean;
  signInAs: (role: Exclude<UserRole, null>) => void;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [role, setRole] = useState<UserRole>(() => {
    try {
      const stored = localStorage.getItem("role");
      return (stored as Exclude<UserRole, null>) ?? null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    // Keep role in sync if external changes happen
    try {
      const stored = localStorage.getItem("role");
      if (stored && stored !== role) setRole(stored as Exclude<UserRole, null>);
    } catch {}
  }, [role]);

  const signInAs = (newRole: Exclude<UserRole, null>) => {
    setRole(newRole);
    try {
      localStorage.setItem("role", newRole);
    } catch {}
  };

  const signOut = () => {
    setRole(null);
    try {
      localStorage.removeItem("role");
    } catch {}
  };

  const value = useMemo(
    () => ({ role, isAuthenticated: !!role, signInAs, signOut }),
    [role]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
