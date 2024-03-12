import Button from "../Button.js";
import OpeningPage from "./OpeningPage.js";



// setup
const Opening = new OpeningPage("openingCanvas");

const PongButtonSprites = ["../OpeningPageSprites/pongButton.png", "../OpeningPageSprites/pongButtonHovering.png"];
const SpaceInvadersButtonSprites = ["../OpeningPageSprites/spaceInvadersLoginButtonStill.jpg", "../OpeningPageSprites/spaceInvadersLoginButton.jpg"];
const SnakeButtonSprites = ["../OpeningPageSprites/snakeLoginButtonStill.jpg", "../OpeningPageSprites/snakeLoginButton.jpg"];

Opening.setup((buttons) => {

  //pong button 
  let PongButtonX = window.innerWidth * .425;
  let PongButtonY = window.innerHeight * .20;
  let SpaceInvadersButtonX = window.innerWidth * .30;
  let SpaceInvadersButtonY = window.innerHeight * .50;
  let SnakeButtonX = window.innerWidth * .55;
  let SnakeButtonY = window.innerHeight * .50;
  let ButtonWidth = window.innerWidth * .15;
  let ButtonHeight = window.innerHeight * .20;

  let pongButton = new Button(PongButtonX, PongButtonY, ButtonWidth, ButtonHeight, PongButtonSprites, "PongButton");
  let spaceInvadersButton = new Button(SpaceInvadersButtonX, SpaceInvadersButtonY, ButtonWidth, ButtonHeight, SpaceInvadersButtonSprites, "SpaceInvadersButton"); 
  let snakeButton = new Button(SnakeButtonX, SnakeButtonY, ButtonWidth, ButtonHeight, SnakeButtonSprites, "SnakeButton");
  buttons.push(pongButton); 
  buttons.push(spaceInvadersButton);
  buttons.push(snakeButton);
});

//check for input on buttons and resizing
Opening.checkUserInput(Opening.buttons);

Opening.renderBackground(Opening.ctx);


