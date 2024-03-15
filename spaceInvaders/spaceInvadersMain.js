import { Manager } from "../Game_Manager.js";
import { InputMapping } from "../KeyboardMapping.js";

//set the canvas for this game
Manager.setCanvasById('SpaceInvadersCanvas', 'SinglePlayerMode', 'SpaceInvaders');

// setup the game objects

//set background
const SPACEBACKGROUND = ['./sprites/spaceInvadersBackground.png'];
const COLLISIONTAGS = []

Manager.loadBackgroundImage(SPACEBACKGROUND, COLLISIONTAGS);

// start reading input from keyboardMapping constants
Manager.inputHandling(InputMapping, Manager);


// start the game loop
Manager.startGame(COLLISIONTAGS);
