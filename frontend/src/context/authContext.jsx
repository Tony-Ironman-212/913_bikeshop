import { createContext, useContext, useState } from 'react';

// B1 tạo AuthContext
const AuthContext = createContext();

// B2 tạo AuthProvider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // lấy user từ localStorage nếu có
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [token, setToken] = useState(() => {
    // lấy token từ localStorage nếu có
    return localStorage.getItem('token') || null;
  });

  const login = (newUser, newToken) => {
    setUser(newUser);
    setToken(newToken);
    // lưu user và token vào localStorage
    localStorage.setItem('user', JSON.stringify(newUser));
    localStorage.setItem('token', newToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    // xóa user và token khỏi localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  // debug log
  // useEffect(() => {
  //   console.log('🔑 Auth state:', { user, token });
  // }, [user, token]);

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// B3 tạo custom hook useAuth
export function useAuth() {
  return useContext(AuthContext);
}
