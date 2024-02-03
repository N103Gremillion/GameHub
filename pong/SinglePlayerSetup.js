import Paddle from './Paddle.js';
import Ball from './Ball.js';
import Score from './Score.js';
import { InputMapping } from '../KeyboardMapping.js';
import { Manager } from '../Game_Manager.js';



// load Document and components before settin up game
document.addEventListener("DOMContentLoaded", () => {


  const PADDLE_WIDTH_PERCENTAGE = .05;
  const PADDLE_HEIGHT_PERCENTAGE = .15;
  const BALL_SIZE_PERCENTAGE = .01;
  const collisionTags = ["Ball", "Paddle"];

  // sprite lists for each of the Paddles and Ball
  const superGokuSprites = ["./pongSprites/superGidle1.png", "./pongSprites/superGidle2.png", "./pongSprites/superGidle3.png", "./pongSprites/superGidle4.png", "./pongSprites/superGidle5.png", "./pongSprites/superGidle6.png", "./pongSprites/superGidle7.png", "./pongSprites/superGidle8.png"];
  const gokuSprites = ["./pongSprites/goku1.png", "./pongSprites/goku2.png", "./pongSprites/goku3.png", "./pongSprites/goku4.png", "./pongSprites/goku5.png", "./pongSprites/goku6.png", "./pongSprites/goku7.png", "./pongSprites/goku8.png"];
  const dragonBallSprites = ["./pongSprites/ball0.png", "./pongSprites/ball1.png", "./pongSprites/ball3.png", "./pongSprites/ball4.png", "./pongSprites/ball5.png", "./pongSprites/ball6.png"];
  const superGokuCollisonSprites = ["./pongSprites/superGHit4.png", "./pongSprites/superGHit5.png", "./pongSprites/superGHit6.png", "./pongSprites/superGHit6.png", "./pongSprites/superGHit6.png"];
  const gokuCollisionSprites = ["./pongSprites/gokuHit4.png", "./pongSprites/gokuHit5.png", "./pongSprites/gokuHit6.png", "./pongSprites/gokuHit6.png", "./pongSprites/gokuHit6.png"];
  
  // specify the canvas to setup and run the game on (create it in htmlFile)
  Manager.setCanvasById("SinglePlayer_gameCanvas");

  // setup gameObjects
  Manager.setup((gameObjects, Scores, Game_Manager) => {
    let CANVAS_WIDTH = Game_Manager.canvas.width;
    let CANVAS_HEIGHT = Game_Manager.canvas.height;
    let paddleWidth = CANVAS_WIDTH * PADDLE_WIDTH_PERCENTAGE;
    let paddleHeight = CANVAS_HEIGHT * PADDLE_HEIGHT_PERCENTAGE;
    let radius = (CANVAS_WIDTH/2 + CANVAS_HEIGHT/2) * BALL_SIZE_PERCENTAGE;
    let ballVelocity = CANVAS_WIDTH/400;
    let paddleVelocity = CANVAS_HEIGHT/100;
    let paddle1X = CANVAS_WIDTH/4 - (paddleWidth*3);
    let paddle2X = CANVAS_WIDTH/4 + CANVAS_WIDTH/2 + (paddleWidth * 2);
    let paddleY = CANVAS_HEIGHT/2 - paddleHeight;
    let paddleSounds = ["./pongSounds/punch.mp3", "./pongSounds/powerHit.mp3"];
    let ballX = CANVAS_WIDTH/2 - radius;
    let ballY =  CANVAS_HEIGHT/2 - radius;
    let ballDirection = randomAngle(30, 60);
    let ballSound = "./pongSounds/ballBouncingSound.mp3";
    let player1ScoreX = CANVAS_WIDTH * 0.05;
    let player1ScoreY = CANVAS_HEIGHT * 0.10;
    let player1ScoreColor = 'blue';
    let player1fontSize = CANVAS_WIDTH/CANVAS_HEIGHT * 15;
    let player1font = 'cursive';
    let player1ScoreName = 'player1'; 
    let player2ScoreX = CANVAS_WIDTH * 0.80;
    let player2ScoreY = CANVAS_HEIGHT * 0.10;
    let player2ScoreColor = 'red';
    let player2fontSize = CANVAS_WIDTH/CANVAS_HEIGHT * 15;
    let player2font = 'cursive';
    let player2ScoreName = 'player2';
    

    gameObjects.push(new Paddle(paddleWidth, paddleHeight, paddleVelocity, paddle1X, paddleY, superGokuSprites, superGokuCollisonSprites, 'w', 's', "Paddle", paddleSounds));
    gameObjects.push(new Paddle(paddleWidth, paddleHeight, paddleVelocity, paddle2X, paddleY, gokuSprites, gokuCollisionSprites, 'arrowup', 'arrowdown', "Paddle", paddleSounds));
    gameObjects.push(new Ball(radius, ballVelocity, ballX, ballY, ballDirection, "Ball", dragonBallSprites, ballSound));
    //scores for the players
    Scores.push(new Score(player1ScoreX, player1ScoreY, player1ScoreColor, player1fontSize, player1font, player1ScoreName));
    Scores.push(new Score(player2ScoreX, player2ScoreY, player2ScoreColor, player2fontSize, player2font, player2ScoreName));
  });

  //backgroundImage
  Manager.loadBackgroundImage("./pongSprites/background.gif", collisionTags);

  // start reading input from keyboardMapping constants
  Manager.inputHandling(InputMapping, Manager);

  // setup background music
  Manager.setBackgroundMusicUrl("./pongSounds/normalBackgroundMusic.mp3");
  Manager.startBackgroundMusic();

  //loop
  Manager.startGame(collisionTags);

});



// random functions
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


//exports
export {
  randomRGB,
  randomAngle
}



