import { Manager } from "../Game_Manager.js";
import { InputMapping } from "../KeyboardMapping.js";


//set the canvas for this game
Manager.setCanvasById('SpaceInvadersCanvas', 'SinglePlayerMode', 'SpaceInvaders');

// setup the game objects

//set background
const SPACEBACKGROUND = ['./sprites/spaceInvadersBackground.png'];
const COLLISIONTAGS = []

// setup the game and it's elements
Manager.loadBackgroundImage(SPACEBACKGROUND, COLLISIONTAGS);
Manager.setup((gameObjects, gameScores, Game_Manager) => {
  let CANVAS_WIDTH = Game_Manager.canvas.width;
  let CANVAS_HEIGHT = Game_Manager.canvas.height;
  let spaceshipX = CANVAS_WIDTH * 0.5;
  let spaceshipY = CANVAS_HEIGHT* 0.9;
  const SPACESHIPTAG = "Spaceship";
  gameObjects.push(new 
});

// start reading input from keyboardMapping constants
Manager.inputHandling(InputMapping, Manager);


// start the game loop
Manager.startGame(COLLISIONTAGS);