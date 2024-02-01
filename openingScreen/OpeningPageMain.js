import Button from "../Button.js";
import OpeningPage from "./OpeningPage.js";



// setup
const Opening = new OpeningPage("openingCanvas");

const PongButtonSprites = ["../OpeningPageSprites/pongButton.png", "../OpeningPageSprites/pongButtonHovering.png"];
const CommingSoonSprites1 = ["../OpeningPageSprites/commingSoonButton.png", "../OpeningPageSprites/commingSoonButtonHovering1.png"];
const CommingSoonSprites2 = ["../OpeningPageSprites/commingSoonButton.png", "..//OpeningPageSprites/commingSoonButtonHovering2.png"];

Opening.setup((buttons) => {

  //pong button 
  let PongButtonX = window.innerWidth * .425;
  let PongButtonY = window.innerHeight * .20;
  let ButtonWidth = window.innerWidth * .15;
  let ButtonHeight = window.innerHeight * .20;
  let Game2ButtonX = window.innerWidth * .30;
  let Game2ButtonY = window.innerHeight * .50;
  let Game2ButtonWidth = window.innerWidth * .15;
  let Game2ButtonHeight = window.innerHeight * .20;
  let Game3ButtonX = window.innerWidth * .55;
  let Game3ButtonY = window.innerHeight * .50;
  let Game3ButtonWidth = window.innerWidth * .15;
  let Game3ButtonHeight = window.innerHeight * .20;


  let pongButton = new Button(PongButtonX, PongButtonY, ButtonWidth, ButtonHeight, PongButtonSprites, "PongButton");
  let game2Button = new Button(Game2ButtonX, Game2ButtonY, Game2ButtonWidth, Game2ButtonHeight, CommingSoonSprites1, "SpaceInvadersButton"); 
  let game3Button = new Button(Game3ButtonX, Game3ButtonY, Game3ButtonWidth, Game3ButtonHeight, CommingSoonSprites2, "SnakeButton");
  buttons.push(pongButton); 
  buttons.push(game2Button);
  buttons.push(game3Button);
});

//check for input on buttons and resizing
Opening.checkUserInput(Opening.buttons);

Opening.renderBackground(Opening.ctx);


