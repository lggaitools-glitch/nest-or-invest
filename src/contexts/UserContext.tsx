import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { User, Report, Scenario, UserPlan } from '@/types/monetization';
import { supabase } from '@/lib/supabase';
import type { Session, AuthError } from '@supabase/supabase-js';

interface UserContextType {
  user: User | null;
  isLoggedIn: boolean;
  isPremium: boolean;
  isLoading: boolean;
  reports: Report[];
  scenarios: Scenario[];
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  addReport: (report: Report) => void;
  getReport: (id: string) => Report | null;
  addScenario: (scenario: Scenario) => void;
  updateScenario: (id: string, updates: Partial<Scenario>) => void;
  deleteScenario: (id: string) => void;
  duplicateScenario: (id: string, newName: string) => Scenario | null;
  upgradeToPremium: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const STORAGE_KEYS = {
  reports: 'homedecision_reports',
  scenarios: 'homedecision_scenarios',
  plan: 'homedecision_plan',
};

function mapAuthError(error: AuthError): string {
  const msg = error.message.toLowerCase();
  if (msg.includes('invalid login credentials') || msg.includes('invalid credentials')) {
    return 'Invalid email or password.';
  }
  if (msg.includes('user already registered') || msg.includes('already been registered')) {
    return 'An account with this email already exists.';
  }
  if (msg.includes('email not confirmed')) {
    return 'Please confirm your email before signing in.';
  }
  if (msg.includes('password') && msg.includes('least')) {
    return 'Password must be at least 6 characters.';
  }
  if (msg.includes('rate limit') || msg.includes('too many')) {
    return 'Too many attempts. Please try again later.';
  }
  return error.message;
}

function sessionToUser(session: Session): User {
  const storedPlan = localStorage.getItem(STORAGE_KEYS.plan);
  return {
    id: session.user.id,
    email: session.user.email || '',
    plan: (storedPlan as UserPlan) || 'free',
    createdAt: session.user.created_at,
  };
}

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [reports, setReports] = useState<Report[]>([]);
  const [scenarios, setScenarios] = useState<Scenario[]>([]);

  // Load reports and scenarios from localStorage
  useEffect(() => {
    const storedReports = localStorage.getItem(STORAGE_KEYS.reports);
    const storedScenarios = localStorage.getItem(STORAGE_KEYS.scenarios);

    if (storedReports) {
      try { setReports(JSON.parse(storedReports)); } catch { /* ignore */ }
    }
    if (storedScenarios) {
      try { setScenarios(JSON.parse(storedScenarios)); } catch { /* ignore */ }
    }
  }, []);

  // Listen to Supabase auth state changes
  useEffect(() => {
    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setUser(sessionToUser(session));
      }
      setIsLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setUser(sessionToUser(session));
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Persist reports and scenarios to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.reports, JSON.stringify(reports));
  }, [reports]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.scenarios, JSON.stringify(scenarios));
  }, [scenarios]);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      return { success: false, error: mapAuthError(error) };
    }
    return { success: true };
  };

  const signup = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      return { success: false, error: mapAuthError(error) };
    }
    return { success: true };
  };

  const logout = () => {
    supabase.auth.signOut();
    setUser(null);
    setScenarios([]);
    localStorage.removeItem(STORAGE_KEYS.plan);
  };

  const addReport = (report: Report) => {
    setReports((prev) => [...prev, report]);
  };

  const getReport = (id: string): Report | null => {
    return reports.find((r) => r.id === id) || null;
  };

  const addScenario = (scenario: Scenario) => {
    setScenarios((prev) => [...prev, scenario]);
  };

  const updateScenario = (id: string, updates: Partial<Scenario>) => {
    setScenarios((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, ...updates, updatedAt: new Date().toISOString() } : s
      )
    );
  };

  const deleteScenario = (id: string) => {
    setScenarios((prev) => prev.filter((s) => s.id !== id));
  };

  const duplicateScenario = (id: string, newName: string): Scenario | null => {
    const original = scenarios.find((s) => s.id === id);
    if (!original) return null;

    const duplicate: Scenario = {
      ...original,
      id: `scn_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
      name: newName,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setScenarios((prev) => [...prev, duplicate]);
    return duplicate;
  };

  const upgradeToPremium = () => {
    if (user) {
      const updated = { ...user, plan: 'premium' as UserPlan };
      setUser(updated);
      localStorage.setItem(STORAGE_KEYS.plan, 'premium');
    }
  };

  const isLoggedIn = user !== null;
  const isPremium = user?.plan === 'premium';

  return (
    <UserContext.Provider
      value={{
        user,
        isLoggedIn,
        isPremium,
        isLoading,
        reports,
        scenarios,
        login,
        signup,
        logout,
        addReport,
        getReport,
        addScenario,
        updateScenario,
        deleteScenario,
        duplicateScenario,
        upgradeToPremium,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
