import UiShell from './ui/UiShell.jsx';
import R3FExperience from './r3f/Experience.jsx';
import { GameProvider } from './game/GameContext.jsx';

export default function App() {
  return (
    <GameProvider>
      <R3FExperience />
      <UiShell />
    </GameProvider>
  );
}
