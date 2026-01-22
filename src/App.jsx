import { useEffect } from 'react';
import { startGame } from './index.js';

export default function App() {
  useEffect(() => {
    startGame();
  }, []);

  return null;
}
