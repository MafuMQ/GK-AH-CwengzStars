import React, { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { auth } from '../lib/firebase';

const RequireAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState(() => auth.currentUser);
  const [, setLocation] = useLocation();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
      if (!firebaseUser) {
        setLocation('/login');
      }
    });
    return () => unsubscribe();
  }, [setLocation]);
  if (!user) return null;
  return <>{children}</>;
};

export default RequireAuth;
