'use client';

import { useEffect } from 'react';

export default function MonetagServiceWorkerRegister() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('Monetag service worker registered:', registration.scope);
        })
        .catch((error) => {
          console.error('Monetag service worker registration failed:', error);
        });
    }
  }, []);

  return null;
}
