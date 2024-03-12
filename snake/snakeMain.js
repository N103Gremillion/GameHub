import { Manager } from "../Game_Manager.js";
import { InputMapping } from "../KeyboardMapping.js";

// set canvas id
Manager.setCanvasById('SnakeCanvas', 'SinglePlayerMode', 'Snake');

// setup the game objects

// set background
const SNAKEBACKGROUND = './sprites/snakeBackground.jpg';
const COLLISIONTAGS = [];
Manager.loadBackgroundImage(SNAKEBACKGROUND, COLLISIONTAGS)

// start reading input from keyboardMapping constants
Manager.inputHandling(InputMapping, Manager);
