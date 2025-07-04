'use client';
import { useEffect, useState } from 'react';

interface User {
  id: number;
  email: string;
  role: 'Startup' | 'Mentor' | 'Manager' | 'Manager as Mentor';
  firstName?: string;
  lastName?: string;
}

export function useCurrentUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch('/api/user');
        if (response.ok) {
          const userData = await response.json();
          setUser(userData.user);
        }
      } catch (error) {
        console.error('Failed to fetch user:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  return { user, loading };
}
