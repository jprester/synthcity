import UiShell from './ui/UiShell';
import SynthCityScene from './scene/systems/SynthCityScene';
import { GameProvider } from './context/GameContext';

export default function App() {
  return (
    <GameProvider>
      <SynthCityScene />
      <UiShell />
    </GameProvider>
  );
}
