import { createContext, useContext, useState } from 'react';

// B1 tạo AuthContext
const AuthContext = createContext();

// B2 tạo AuthProvider
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const login = (newUser, newToken) => {
    setUser(newUser);
    setToken(newToken);
  };
  const logout = () => {
    setUser(null);
    setToken(null);
  };
  console.log('user:', user, 'token:', token);

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// B3 tạo custom hook useAuth
export function useAuth() {
  return useContext(AuthContext);
}
