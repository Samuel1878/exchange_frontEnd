import { createContext, useEffect, useState } from "react";

type AuthContextType = {
  user: any;
  token: string | null;
  login: (token: string, user?: any) => void;
  logout: () => void;
  loading: boolean;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  login: () => {},
  logout: () => {},
  loading: true,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // load stored auth on refresh
  useEffect(() => {
    const saved = localStorage.getItem("token");
    if (saved) {
      setToken(saved);
      // normally fetch("/me") to get user profile
      setUser({ name: "Test User" });
    }
    setLoading(false);
  }, []);

  function login(token: string, user?: any) {
    localStorage.setItem("token", token);
    setToken(token);
    setUser(user ?? { name: "Test User" });
  }

  function logout() {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ token, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
