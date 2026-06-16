import { createContext, useContext, useState, useEffect } from "react";
import { authApi } from "@/api/auth";

interface User {
  id: string;
  email: string;
  fullName?: string;
  role: string;
  avatarUrl?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAdmin: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName?: string) => Promise<void>;
  signOut: () => void;
  refreshUser: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

function loadUser(): User | null {
  try {
    const u = localStorage.getItem("user");
    const t = localStorage.getItem("token");
    if (u && t) return JSON.parse(u);
  } catch {}
  return null;
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(loadUser);
  const [isLoading, setIsLoading] = useState(false);

  // عند التحميل: جيب بيانات اليوزر من الـ API عشان تتحدث دايمًا
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    setIsLoading(true);
    authApi.me()
      .then((data) => {
        const userData: User = {
          id: data.id,
          email: data.email,
          fullName: data.fullName,
          role: data.role,
          avatarUrl: data.avatarUrl,
        };
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
      })
      .catch(() => {
        // لو الـ token انتهى أو invalid، سجل خروج
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const signIn = async (email: string, password: string) => {
    const data = await authApi.login(email, password);
    const userData: User = {
      id: data.id,
      email: data.email,
      fullName: data.fullName,
      role: data.role,
      avatarUrl: data.avatarUrl,
    };
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const signUp = async (email: string, password: string, fullName?: string) => {
    const data = await authApi.register(email, password, fullName);
    const userData: User = {
      id: data.id,
      email: data.email,
      fullName: data.fullName,
      role: data.role,
      avatarUrl: data.avatarUrl,
    };
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const signOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/";
  };

  // بيقرأ من localStorage ويحدث الـ state — بتستدعيه بعد تحديث الـ Profile
  const refreshUser = () => {
    const updated = loadUser();
    setUser(updated);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAdmin: user?.role === "admin",
        signIn,
        signUp,
        signOut,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
