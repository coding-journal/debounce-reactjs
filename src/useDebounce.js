import React, { useState, useEffect } from 'react';

// Our hook
export default function useDebounce(value, delay) {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(
    () => {
      // Set debouncedValue to value (passed in) after the specified delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      // After we return we want to set default the timer
      return () => {
        clearTimeout(handler);
      };
    },
    [value] 
  );

  return debouncedValue;
}