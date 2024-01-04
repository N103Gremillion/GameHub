import Game_Manager from './Game_Manager.js';
import Paddle from './Paddle.js';
import Ball from './Ball.js';
import { InputMapping } from '../KeyboardMapping.js';

const PADDLE_WIDTH_PERCENTAGE = .05;
const PADDLE_HEIGHT_PERCENTAGE = .1;
const BALL_SIZE_PERCENTAGE = .03;
const WINDOW_WIDTH = window.innerWidth;
const WINDOW_HEIGHT = window.innerHeight;

let pongGameManager = new Game_Manager; 

// setup gameObjects
pongGameManager.setup((gameObjects) => {
  let paddleWidth = WINDOW_WIDTH * PADDLE_WIDTH_PERCENTAGE;
  let paddleHeight = WINDOW_HEIGHT * PADDLE_HEIGHT_PERCENTAGE;
  let radius = WINDOW_WIDTH * BALL_SIZE_PERCENTAGE;
  let ballVelocity = 5;
  let paddleVelocity = 5;

  gameObjects.push(new Paddle(paddleWidth, paddleHeight, paddleVelocity, WINDOW_WIDTH/4 - paddleWidth, WINDOW_WIDTH/2 - paddleHeight, randomRGB(), 'w', 's'));
  gameObjects.push(new Paddle(paddleWidth, paddleHeight, paddleVelocity, (WINDOW_WIDTH/4 + WINDOW_WIDTH/2) - paddleWidth, WINDOW_HEIGHT/2 - paddleHeight, randomRGB(),'arrowup', 'arrowdown'));
  gameObjects.push(new Ball(radius, ballVelocity, WINDOW_WIDTH/2 - radius, WINDOW_HEIGHT/2 - radius, randomRGB()));
});

// start reading input from keyboardMapping constants
pongGameManager.inputHandling(InputMapping, pongGameManager);

//loop
pongGameManager.startGame();

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}


