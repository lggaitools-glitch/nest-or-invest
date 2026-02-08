import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { User, Report, Scenario, UserPlan } from '@/types/monetization';

interface UserContextType {
  user: User | null;
  isLoggedIn: boolean;
  isPremium: boolean;
  reports: Report[];
  scenarios: Scenario[];
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string) => Promise<boolean>;
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
  user: 'homedecision_user',
  reports: 'homedecision_reports',
  scenarios: 'homedecision_scenarios',
};

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [reports, setReports] = useState<Report[]>([]);
  const [scenarios, setScenarios] = useState<Scenario[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem(STORAGE_KEYS.user);
    const storedReports = localStorage.getItem(STORAGE_KEYS.reports);
    const storedScenarios = localStorage.getItem(STORAGE_KEYS.scenarios);

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Failed to parse user from localStorage');
      }
    }

    if (storedReports) {
      try {
        setReports(JSON.parse(storedReports));
      } catch (e) {
        console.error('Failed to parse reports from localStorage');
      }
    }

    if (storedScenarios) {
      try {
        setScenarios(JSON.parse(storedScenarios));
      } catch (e) {
        console.error('Failed to parse scenarios from localStorage');
      }
    }
  }, []);

  // Persist to localStorage on changes
  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEYS.user);
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.reports, JSON.stringify(reports));
  }, [reports]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.scenarios, JSON.stringify(scenarios));
  }, [scenarios]);

  const login = async (email: string, _password: string): Promise<boolean> => {
    // Mock login - always succeeds for demo
    const mockUser: User = {
      id: `usr_${Date.now()}`,
      email,
      plan: 'free',
      createdAt: new Date().toISOString(),
    };
    setUser(mockUser);
    return true;
  };

  const signup = async (email: string, _password: string): Promise<boolean> => {
    // Mock signup - always succeeds for demo
    const mockUser: User = {
      id: `usr_${Date.now()}`,
      email,
      plan: 'free',
      createdAt: new Date().toISOString(),
    };
    setUser(mockUser);
    return true;
  };

  const logout = () => {
    setUser(null);
    setScenarios([]);
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
      setUser({ ...user, plan: 'premium' });
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
