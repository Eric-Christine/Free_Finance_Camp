import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check local storage for existing session (Mock)
    const storedUser = localStorage.getItem('ffc_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const signInWithOtp = async (email) => {
    // Mock sending OTP
    console.log(`Sending OTP to ${email}`);
    return { error: null };
  };

  const verifyOtp = async (email, token) => {
    // Mock verification - accept any token for now, or specific one
    if (token === '123456') {
      const mockUser = { id: 'user_123', email };
      setUser(mockUser);
      localStorage.setItem('ffc_user', JSON.stringify(mockUser));
      return { data: { user: mockUser }, error: null };
    }
    return { error: { message: 'Invalid token' } };
  };

  const signOut = async () => {
    setUser(null);
    localStorage.removeItem('ffc_user');
  };

  return (
    <AuthContext.Provider value={{ user, loading, signInWithOtp, verifyOtp, signOut }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
