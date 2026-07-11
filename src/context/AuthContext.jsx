import { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isMockAuth, isAuthAvailable } from '../lib/supabase';

const AuthContext = createContext();

const PROD_AUTH_REDIRECT_BASE = 'https://freefinancecamp.com';

function getAuthRedirectUrl() {
  if (typeof window === 'undefined') return `${PROD_AUTH_REDIRECT_BASE}/map`;
  const origin = window.location.origin;
  const isLocalhost = origin.includes('localhost') || origin.includes('127.0.0.1');
  const base = isLocalhost ? origin : PROD_AUTH_REDIRECT_BASE;
  return `${base}/map`;
}

function getStoredMockUser() {
  try {
    const storedUser = localStorage.getItem('ffc_user');
    if (!storedUser) return null;
    return JSON.parse(storedUser);
  } catch (error) {
    console.warn('Ignoring invalid stored user data:', error);
    try {
      localStorage.removeItem('ffc_user');
    } catch {
      // Storage may be blocked; rendering should continue without a saved user.
    }
    return null;
  }
}

function setStoredMockUser(user) {
  try {
    localStorage.setItem('ffc_user', JSON.stringify(user));
  } catch (error) {
    console.warn('Unable to save mock user data:', error);
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    let authSubscription = null;

    const initAuth = async () => {
      try {
        if (supabase) {
          // Real Supabase auth
          const { data: { session } } = await supabase.auth.getSession();
          if (!isMounted) return;
          setUser(session?.user ?? null);

          const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (_event, session) => {
              setUser(session?.user ?? null);
            }
          );

          authSubscription = subscription;
        } else {
          // Fall back to mock auth (for local dev without Supabase)
          const storedUser = getStoredMockUser();
          if (storedUser && isMounted) {
            setUser(storedUser);
          }
        }
      } catch (error) {
        console.error('Failed to initialize authentication:', error);
        if (isMounted) {
          setUser(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    void initAuth();

    return () => {
      isMounted = false;
      authSubscription?.unsubscribe();
    };
  }, []);

  const signInWithOtp = async (email) => {
    if (supabase) {
      // Real Supabase magic link
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: getAuthRedirectUrl()
        }
      });
      return { error };
    } else if (isMockAuth) {
      // Mock - simulate sending OTP
      console.log(`[Mock] Sending OTP to ${email}`);
      return { error: null };
    }
    return { error: { message: 'Authentication is currently unavailable. Please contact support.' } };
  };

  const verifyOtp = async (email, token) => {
    if (supabase) {
      // With magic links, verification happens automatically via the link
      // This is only used for mock mode now
      return { error: { message: 'Use the magic link sent to your email' } };
    } else if (isMockAuth) {
      // Mock verification
      if (token === '123456') {
        const mockUser = { id: 'user_123', email };
        setUser(mockUser);
        setStoredMockUser(mockUser);
        return { data: { user: mockUser }, error: null };
      }
      return { error: { message: 'Invalid token' } };
    }
    return { error: { message: 'Authentication is currently unavailable. Please contact support.' } };
  };

  const signInWithOAuth = async (provider) => {
    if (supabase) {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
          redirectTo: getAuthRedirectUrl()
        }
      });
      return { data, error };
    } else if (isMockAuth) {
      // Mock OAuth - instant login
      console.log(`[Mock] Signing in with ${provider}`);
      const mockUser = {
        id: `user_${provider}`,
        email: `test@${provider}.com`,
        app_metadata: { provider: provider }
      };
      setUser(mockUser);
      setStoredMockUser(mockUser);
      return { data: { user: mockUser }, error: null };
    }
    return { error: { message: 'Authentication is currently unavailable. Please contact support.' } };
  };

  const signOut = async () => {
    if (supabase) {
      await supabase.auth.signOut();
    }
    setUser(null);
    try {
      localStorage.removeItem('ffc_user');
    } catch {
      // Storage may be blocked; the in-memory user state is already cleared.
    }
  };

  // Check if we're using real auth
  const isRealAuth = !!supabase;

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      signInWithOtp,
      verifyOtp,
      signInWithOAuth,
      signOut,
      isRealAuth,
      isMockAuth,
      isAuthAvailable
    }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
