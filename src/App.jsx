import UiShell from './ui/UiShell.jsx';
import R3FExperience from './r3f/Experience.jsx';

export default function App() {
  const params = new URLSearchParams(window.location.search);
  const useR3f = params.get('r3f') === '1';

  return useR3f ? <R3FExperience /> : <UiShell />;
}
