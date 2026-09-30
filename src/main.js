import '@fontsource/share-tech-mono';
import './styles/style.css';

import { applyQueryParams } from './settings.js';
import { startTerminal } from './ui/terminal.js';
import { Game } from './Game.js';

applyQueryParams();

// City generator items still reach the game through this global.
window.game = new Game();

startTerminal(() => window.game.load());
