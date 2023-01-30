import { useState } from 'react';

export default function useVisualMode(initialMode) {
  const [mode, setMode] = useState(initialMode);
  const [history] = useState([initialMode]);

  const transition = (newMode, replace = false) => {
    if (replace) {
      history.pop();
    };
    setMode(newMode);
    history.push(newMode);
    setMode(history[history.length - 1]);
  };
  const back = () => {
    if (history.length === 1) {
      setMode(history[history.length - 1]);
    } else {
      history.pop()
      setMode(history[history.length - 1]);
    };
  };

  return {
    mode,
    transition,
    back
  };
};