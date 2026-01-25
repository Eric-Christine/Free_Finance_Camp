import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for Supabase session or fall back to localStorage mock
    const initAuth = async () => {
      if (supabase) {
        // Real Supabase auth
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user ?? null);

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          (_event, session) => {
            setUser(session?.user ?? null);
          }
        );

        setLoading(false);
        return () => subscription.unsubscribe();
      } else {
        // Fall back to mock auth (for local dev without Supabase)
        const storedUser = localStorage.getItem('ffc_user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const signInWithOtp = async (email) => {
    if (supabase) {
      // Real Supabase magic link
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: window.location.origin + '/map'
        }
      });
      return { error };
    } else {
      // Mock - simulate sending OTP
      console.log(`[Mock] Sending OTP to ${email}`);
      return { error: null };
    }
  };

  const verifyOtp = async (email, token) => {
    if (supabase) {
      // With magic links, verification happens automatically via the link
      // This is only used for mock mode now
      return { error: { message: 'Use the magic link sent to your email' } };
    } else {
      // Mock verification
      if (token === '123456') {
        const mockUser = { id: 'user_123', email };
        setUser(mockUser);
        localStorage.setItem('ffc_user', JSON.stringify(mockUser));
        return { data: { user: mockUser }, error: null };
      }
      return { error: { message: 'Invalid token' } };
    }
  };

  const signOut = async () => {
    if (supabase) {
      await supabase.auth.signOut();
    }
    setUser(null);
    localStorage.removeItem('ffc_user');
  };

  // Check if we're using real or mock auth
  const isRealAuth = !!supabase;

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      signInWithOtp,
      verifyOtp,
      signOut,
      isRealAuth
    }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
