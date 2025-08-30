'use client';
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type UserContextType = {
  userEmail: string | null;
  setUserEmail: (email: string | null) => void;
};

const UserContext = createContext<UserContextType>({
  userEmail: null,
  setUserEmail: () => {}
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  useEffect(() => {
    const savedEmail = localStorage.getItem('userEmail');
    if (savedEmail) {
      setUserEmail(savedEmail);
    }
  }, []);

  return (
    <UserContext.Provider value={{ userEmail, setUserEmail }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
