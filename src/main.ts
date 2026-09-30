import '@fontsource/share-tech-mono';
import './styles/style.css';

import { applyQueryParams } from './settings.ts';
import { startTerminal } from './ui/terminal.ts';
import { Game } from './Game.ts';

applyQueryParams();

const game = new Game();

startTerminal(() => game.load());
