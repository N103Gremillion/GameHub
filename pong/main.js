import { Manager } from '../Game_Manager.js';
import Paddle from './Paddle.js';
import Ball from './Ball.js';
import { InputMapping } from '../KeyboardMapping.js';


const PADDLE_WIDTH_PERCENTAGE = .05;
const PADDLE_HEIGHT_PERCENTAGE = .15;
const BALL_SIZE_PERCENTAGE = .01;
const WINDOW_WIDTH = window.innerWidth;
const WINDOW_HEIGHT = window.innerHeight;
const collisionTags = ["Ball", "Paddle"];

// sprite lists for each of the Games
// super goku
const superGokuSprites = ["./pongSprites/superGidle1.png", "./pongSprites/superGidle2.png", "./pongSprites/superGidle3.png", "./pongSprites/superGidle4.png", "./pongSprites/superGidle5.png", "./pongSprites/superGidle6.png", "./pongSprites/superGidle7.png", "./pongSprites/superGidle8.png"];
const gokuSprites = ["./pongSprites/goku1.png", "./pongSprites/goku2.png", "./pongSprites/goku3.png", "./pongSprites/goku4.png", "./pongSprites/goku5.png", "./pongSprites/goku6.png", "./pongSprites/goku7.png", "./pongSprites/goku8.png"];
const dragonBallSprites = ["./pongSprites/ball0.png", "./pongSprites/ball1.png", "./pongSprites/ball3.png", "./pongSprites/ball4.png", "./pongSprites/ball5.png", "./pongSprites/ball6.png"];
const superGokuCollisonSprites = ["./pongSprites/superGHit4.png", "./pongSprites/superGHit5.png", "./pongSprites/superGHit6.png", "./pongSprites/superGHit6.png", "./pongSprites/superGHit6.png"];
const gokuCollisionSprites = ["./pongSprites/gokuHit4.png", "./pongSprites/gokuHit5.png", "./pongSprites/gokuHit6.png", "./pongSprites/gokuHit6.png", "./pongSprites/gokuHit6.png"];
// setup gameObjects
Manager.setup((gameObjects) => {
  let paddleWidth = WINDOW_WIDTH * PADDLE_WIDTH_PERCENTAGE;
  let paddleHeight = WINDOW_HEIGHT * PADDLE_HEIGHT_PERCENTAGE;
  let radius = (WINDOW_WIDTH/2 + WINDOW_HEIGHT/2) * BALL_SIZE_PERCENTAGE;
  let ballVelocity = WINDOW_WIDTH/500 + WINDOW_HEIGHT/500;
  let paddleVelocity = WINDOW_HEIGHT/100;
  let paddle1X = WINDOW_WIDTH/4 - (paddleWidth*3);
  let paddle2X = WINDOW_WIDTH/4 + WINDOW_WIDTH/2 + (paddleWidth * 2);
  let paddleY = WINDOW_HEIGHT/2 - paddleHeight;
  let ballX = WINDOW_WIDTH/2 - radius;
  let ballY =  WINDOW_HEIGHT/2 - radius;
  let ballDirection = randomAngle(20, 70);
  
  gameObjects.push(new Paddle(paddleWidth, paddleHeight, paddleVelocity, paddle1X, paddleY, superGokuSprites, superGokuCollisonSprites, 'w', 's', "Paddle"));
  gameObjects.push(new Paddle(paddleWidth, paddleHeight, paddleVelocity, paddle2X, paddleY, gokuSprites, gokuCollisionSprites, 'arrowup', 'arrowdown', "Paddle"));
  gameObjects.push(new Ball(radius, ballVelocity, ballX, ballY, ballDirection, "Ball", dragonBallSprites));
  // testing the gameObjects ids
});

//backgroundImage
Manager.loadBackgroundImage("./pongSprites/background.gif", collisionTags);

// start reading input from keyboardMapping constants
Manager.inputHandling(InputMapping, Manager);

//loop
Manager.startGame(collisionTags);

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

function randomAngle(min, max){
  if (min > max) {
        [min, max] = [max, min];
  } 
  const range = (max - min);
  const bottomRight = Math.floor(Math.random() * range) + min;
  const topRight = bottomRight + 90;
  const topLeft = bottomRight + 180;
  const bottomLeft = bottomRight + 270;
  // get random number 1-4 to to chose from 
  const random = Math.floor(Math.random() * (5 - 1));
  if (random === 1){
    return bottomRight;
  }
  else if (random === 2){
    return topRight;
  } 
  else if (random === 3){
    return topLeft
  }
  else {
    return bottomLeft;
  }
}

export {
  randomRGB,
  randomAngle
}



