import { createContext, useContext, useEffect, useMemo, useState } from "react";
import apiService from "../services/api";

type UserRole =
  | "individual"
  | "business"
  | "provider"
  | "scholar"
  | "capitalProvider"
  | "admin"
  | null;

type User = {
  id: string;
  fullName?: string;
  institutionName?: string;
  email: string;
  accountStatus: string;
  verificationStatus: any;
  digitalPassport?: any;
  role: UserRole;
};

type AuthContextType = {
  user: User | null;
  role: UserRole;
  isAuthenticated: boolean;
  isLoading: boolean;
  signInAs: (role: Exclude<UserRole, null>) => void;
  signOut: () => void;
  signIn: (credentials: {
    email: string;
    password: string;
    role: UserRole;
  }) => Promise<void>;
  signUp: (userData: any, role: UserRole) => Promise<void>;
  refreshAuth: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const role = user?.role || null;
  const isAuthenticated = !!user;

  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        console.log("Auth initialization - Token exists:", !!token);
        if (token) {
          // Verify token and get user profile
          const response = await apiService.getProfile();
          console.log("Profile response:", response);
          if (response.success) {
            // Get role from localStorage or determine from user data
            const storedRole = localStorage.getItem("role");
            console.log("Stored role:", storedRole);
            setUser({
              ...response.data.user,
              role:
                storedRole ||
                (response.data.user.fullName
                  ? "individual"
                  : "capitalProvider"),
            });
          } else {
            console.log("Profile response failed, clearing tokens");
            // Token is invalid, clear storage
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("role");
          }
        } else {
          console.log("No token found in localStorage");
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
        // Clear invalid tokens
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("role");
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const signInAs = (newRole: Exclude<UserRole, null>) => {
    // This is for demo purposes - in real app, this would be handled by actual sign in
    setUser({
      id: "demo",
      email: "demo@example.com",
      fullName: "Demo User",
      accountStatus: "active",
      verificationStatus: { emailVerified: true },
      role: newRole,
    });
    try {
      localStorage.setItem("role", newRole);
    } catch {}
  };

  const signIn = async (credentials: {
    email: string;
    password: string;
    role: UserRole;
  }) => {
    try {
      setIsLoading(true);
      let response;

      if (credentials.role === "individual") {
        response = await apiService.individualSignin(credentials);
      } else if (credentials.role === "capitalProvider") {
        response = await apiService.capitalProviderSignin(credentials);
      } else {
        throw new Error("Invalid user role");
      }

      if (response.success) {
        // Store tokens
        localStorage.setItem("accessToken", response.data.tokens.accessToken);
        localStorage.setItem("refreshToken", response.data.tokens.refreshToken);
        localStorage.setItem("role", credentials.role);

        // Set user data
        setUser({
          ...response.data.user,
          role: credentials.role,
        });
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.error("Sign in error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (userData: any, role: UserRole) => {
    try {
      setIsLoading(true);
      let response;

      if (role === "individual") {
        response = await apiService.individualSignup(userData);
      } else if (role === "capitalProvider") {
        response = await apiService.capitalProviderSignup(userData);
      } else {
        throw new Error("Invalid user role");
      }

      if (response.success) {
        // Store tokens
        localStorage.setItem("accessToken", response.data.tokens.accessToken);
        localStorage.setItem("refreshToken", response.data.tokens.refreshToken);
        localStorage.setItem("role", role);

        // Set user data
        setUser({
          ...response.data.user,
          role: role,
        });
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.error("Sign up error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      // Call backend signout
      await apiService.signout();
    } catch (error) {
      console.error("Sign out error:", error);
    } finally {
      // Clear local state regardless of backend response
      setUser(null);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("role");
    }
  };

  const refreshAuth = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) {
        throw new Error("No refresh token available");
      }

      const response = await apiService.refreshToken(refreshToken);
      if (response.success) {
        localStorage.setItem("accessToken", response.data.tokens.accessToken);
        localStorage.setItem("refreshToken", response.data.tokens.refreshToken);

        // Get updated user profile
        const profileResponse = await apiService.getProfile();
        if (profileResponse.success) {
          // Get role from localStorage or determine from user data
          const storedRole = localStorage.getItem("role");
          setUser({
            ...profileResponse.data.user,
            role:
              storedRole ||
              (profileResponse.data.user.fullName
                ? "individual"
                : "capitalProvider"),
          });
        }
      } else {
        throw new Error("Token refresh failed");
      }
    } catch (error) {
      console.error("Auth refresh error:", error);
      // If refresh fails, sign out user
      await signOut();
    }
  };

  const value = useMemo(
    () => ({
      user,
      role,
      isAuthenticated,
      isLoading,
      signInAs,
      signOut,
      signIn,
      signUp,
      refreshAuth,
    }),
    [user, role, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
