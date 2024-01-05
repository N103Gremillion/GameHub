import Game_Manager from './Game_Manager.js';
import Paddle from './Paddle.js';
import Ball from './Ball.js';
import { InputMapping } from '../KeyboardMapping.js';

const PADDLE_WIDTH_PERCENTAGE = .03;
const PADDLE_HEIGHT_PERCENTAGE = .1;
const BALL_SIZE_PERCENTAGE = .0075;
const WINDOW_WIDTH = window.innerWidth;
const WINDOW_HEIGHT = window.innerHeight;

let pongGameManager = new Game_Manager; 

// setup gameObjects
pongGameManager.setup((gameObjects) => {
  let paddleWidth = WINDOW_WIDTH * PADDLE_WIDTH_PERCENTAGE;
  let paddleHeight = WINDOW_HEIGHT * PADDLE_HEIGHT_PERCENTAGE;
  let radius = WINDOW_WIDTH * BALL_SIZE_PERCENTAGE;
  let ballVelocity = WINDOW_WIDTH/50 + WINDOW_HEIGHT/50;
  let paddleVelocity = WINDOW_HEIGHT/100;
  let paddle1X = WINDOW_WIDTH/4 - (paddleWidth*3);
  let paddle2X = WINDOW_WIDTH/4 + WINDOW_WIDTH/2 + (paddleWidth * 2);
  let paddleY = WINDOW_HEIGHT/2 - paddleHeight;
  let ballX = WINDOW_WIDTH/2 - radius;
  let ballY =  WINDOW_HEIGHT/2 - radius;

  gameObjects.push(new Paddle(paddleWidth, paddleHeight, paddleVelocity, paddle1X, paddleY, randomRGB(), 'w', 's'));
  gameObjects.push(new Paddle(paddleWidth, paddleHeight, paddleVelocity, paddle2X, paddleY, randomRGB(),'arrowup', 'arrowdown'));
  gameObjects.push(new Ball(radius, ballVelocity, ballX, ballY, randomRGB()));
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


