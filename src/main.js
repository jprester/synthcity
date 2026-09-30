import '@fontsource/share-tech-mono';
import './styles/style.css';

import { applyQueryParams } from './settings.js';
import { startTerminal } from './ui/terminal.js';
import { Game } from './Game.js';

applyQueryParams();

const game = new Game();

startTerminal(() => game.load());
