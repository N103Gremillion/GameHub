import { Manager } from "../Game_Manager.js";
import { InputMapping } from "../KeyboardMapping.js";
import Spaceship from "./Spaceship.js";


//set the canvas for this game
Manager.setCanvasById('SpaceInvadersCanvas', 'SinglePlayerMode', 'SpaceInvaders');

// setup the game objects
Manager.setup((gameObjects, gameScores, Game_Manager) => {
  let CANVAS_WIDTH = Game_Manager.canvas.width;
  let CANVAS_HEIGHT = Game_Manager.canvas.height;
  let spaceshipX = CANVAS_WIDTH * 0.5;
  let spaceshipY = CANVAS_HEIGHT* 0.9;
  let spaceshipWidth = CANVAS_WIDTH * 0.05;
  let spaceshipHeight = CANVAS_HEIGHT * 0.05;
  const SPACESHIPTAG = "Spaceship";
  const SPACESHIPSPRITES = ['./sprites/spaceShip1.png', './sprites/spaceShip2.png', './sprites/spaceShip3.png', './sprites/spaceShip4.png', './sprites/spaceShip5.png'];
  const VELOCITY = CANVAS_WIDTH/200;
  gameObjects.push(new Spaceship(spaceshipX, spaceshipY, spaceshipWidth, spaceshipHeight, SPACESHIPTAG, SPACESHIPSPRITES, VELOCITY));
});

//set background
const SPACEBACKGROUND = ['./sprites/spaceInvadersBackground.png'];
const COLLISIONTAGS = []

// setup the game and it's elements
Manager.loadBackgroundImage(SPACEBACKGROUND, COLLISIONTAGS);

// start reading input from keyboardMapping constants
Manager.inputHandling(InputMapping, Manager);


// start the game loop
Manager.startGame(COLLISIONTAGS);
