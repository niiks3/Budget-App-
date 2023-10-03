import { useState, useEffect } from "react";

export default function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    try {
      const jsonValue = localStorage.getItem(key);
      if (jsonValue != null) return JSON.parse(jsonValue);

      if (typeof defaultValue === "function") {
        return defaultValue();
      } else {
        return defaultValue;
      }
    } catch (error) {
      console.error("Error while parsing localStorage data:", error);
      return typeof defaultValue === "function" ? defaultValue() : defaultValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error while storing data in localStorage:", error);     
    }
  }, [key, value]);

  return [value, setValue];
}
