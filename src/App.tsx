import UiShell from './ui/UiShell';
import R3FExperience from './r3f/Experience';
import { GameProvider } from './game/GameContext';

export default function App() {
  return (
    <GameProvider>
      <R3FExperience />
      <UiShell />
    </GameProvider>
  );
}
