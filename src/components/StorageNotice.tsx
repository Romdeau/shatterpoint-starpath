import { useEffect, useState } from 'react';
import { storageEvent } from '../lib/storage';

export function StorageNotice() {
  const [message, setMessage] = useState('');
  useEffect(() => {
    const handler = (event: Event) => setMessage((event as CustomEvent<string>).detail);
    window.addEventListener(storageEvent, handler);
    return () => window.removeEventListener(storageEvent, handler);
  }, []);
  return message ? <p role="alert" className="border border-amber-500 p-4 text-amber-500">{message}</p> : null;
}
