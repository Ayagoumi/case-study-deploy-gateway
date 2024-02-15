import { useEffect, useState } from 'react';

function useLocalStorage(
  key: string,
  initialValue: string,
): [string, (value: string | ((val: string) => string)) => void] {
  const [storedValue, setStoredValue] = useState<string>(initialValue);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      setStoredValue(item !== null ? item : initialValue);
    } catch (error) {
      console.error(`Error reading localStorage key “${key}”:`, error);
    }
  }, [key, initialValue]);

  const setValue: (value: string | ((val: string) => string)) => void = (value) => {
    try {
      const valueToStore = typeof value === 'function' ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, valueToStore);
    } catch (error) {
      console.error(`Error setting localStorage key “${key}”:`, error);
    }
  };

  return [storedValue, setValue];
}

export default useLocalStorage;
