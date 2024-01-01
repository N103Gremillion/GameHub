import Game_Manager from './Game_Manager.js';
import Paddle from './Paddle.js';
import Ball from './Ball.js';

// add all object to keep track of what needs to be updated
let pongGameManager = new Game_Manager; 
pongGameManager.setup((gameObjects) => {
  gameObjects.push(new Paddle(50, 100, 0, window.innerWidth/4 - 50, window.innerHeight/2 - 100, randomRGB()));
  gameObjects.push(new Paddle(50, 100, 0, (window.innerWidth/4 + window.innerWidth/2) - 50, window.innerHeight/2 - 100, randomRGB()));
  gameObjects.push(new Ball(10,5,window.innerWidth/2,window.innerHeight/2,randomRGB));
});

//loop
pongGameManager.startGame();

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}


