import { useState } from 'react';

export default function useVisualMode(initialMode) {
  const [history, setHistory] = useState([initialMode]);

  const transition = (newMode, replace = false) => {
    setHistory(prev => replace ? [...prev.slice(0,-1), newMode] : [...prev, newMode]) 
  };
  const back = () => {
    if (history.length > 1) {
      setHistory(prev => [...prev.slice(0,-1)]);
    };
  };

  return {
    mode: history[history.length - 1],
    transition,
    back
  };
};