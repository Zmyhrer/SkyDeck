import { useState, useEffect } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T | undefined>(undefined);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const saved = localStorage.getItem(key);

    if (saved) {
      try {
        setStoredValue(JSON.parse(saved));
      } catch (error) {
        console.error("Error parsing JSON from localStorage:", error);
        setStoredValue(initialValue);
      }
    } else {
      setStoredValue(initialValue);
    }
  }, []);

  useEffect(() => {
    if (isClient && storedValue !== undefined) {
      try {
        localStorage.setItem(key, JSON.stringify(storedValue));
      } catch (error) {
        console.error("Error saving data to localStorage:", error);
      }
    }
  }, [key, storedValue, isClient]);

  return [storedValue, setStoredValue] as const;
}
