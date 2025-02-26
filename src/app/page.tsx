"use client"

import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    const initializeDB = async () => {
      try {
        const response = await fetch('/api/init-db', { method: 'POST' });

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('Invalid response: Not JSON');
        }

        const data = await response.json();
        console.log('Database Initialization:', data.message);
      } catch (error) {
        console.error('Failed to initialize database:', error);
      }
    };

    initializeDB();
  }, []);

  return (
    <div>
      <p>Main</p>
    </div>
  );
}
