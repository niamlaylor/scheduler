import { useState } from 'react';

export default function useVisualMode(initialMode) {
  const [history, setHistory] = useState([initialMode]);

  const transition = (newMode, replace = false) => {
    // Do we want to erase the last item in history? If yes, use slice to remove (like a .pop), if no, add the newMode to history (like a .push)
    setHistory(prev => replace ? [...prev.slice(0,-1), newMode] : [...prev, newMode]) 
  };
  const back = () => {
    // We cannot go back a mode if there is only one mode in history state
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