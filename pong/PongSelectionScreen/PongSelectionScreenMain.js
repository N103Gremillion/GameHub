import PongSelectionScreen from "./PongSelectionScreen.js";
import Button from "../../Button.js";


document.addEventListener("DOMContentLoaded", () => {
  const backgroundList = ["./PongSelectionScreenSprites/PongSelectionScreenBackground2.jpg", "./PongSelectionScreenSprites/PongSelectionScreenBackground2Hovering.jpg"];
  const SelectionScreen = new PongSelectionScreen(backgroundList);

  //setup

  //button SpriteList
  const Player1ButtonSprites = ["./PongSelectionScreenSprites/SinglePlayer1.png", "./PongSelectionScreenSprites/SinglePlayer3.png"];
  const Player2ButtonSprites = ["./PongSelectionScreenSprites/Multiplayer1.png", "./PongSelectionScreenSprites/Multiplayer3.png"];
  const BackButtonSprites = ["./PongSelectionScreenSprites/backButton.png", "./PongSelectionScreenSprites/backButtonHovering.png"];

  SelectionScreen.setup((buttons) => {

  //pong button 
  let Player1ButtonX = window.innerWidth * .375;
  let Player1ButtonY = window.innerHeight * .20;
  let Player1ButtonWidth = window.innerWidth * .25;
  let Player1ButtonHeight = window.innerHeight * .15;
  let Player2ButtonX = window.innerWidth * .375;
  let Player2ButtonY = window.innerHeight * .60;
  let Player2ButtonWidth = window.innerWidth * .25;
  let Player2ButtonHeight = window.innerHeight * .15;
  let BackButtonX = window.innerWidth * .01;
  let BackButtonY = window.innerHeight * .01;
  let BackButtonWidth = window.innerWidth * .05;
  let BackButtonHeight = window.innerHeight * .05;

  

  let Player1Button = new Button(Player1ButtonX, Player1ButtonY, Player1ButtonWidth, Player1ButtonHeight, Player1ButtonSprites, "1PlayerButton");
  let Player2Button = new Button(Player2ButtonX, Player2ButtonY, Player2ButtonWidth, Player2ButtonHeight, Player2ButtonSprites, "2PlayerButton"); 
  let BackButton = new Button(BackButtonX, BackButtonY, BackButtonWidth, BackButtonHeight, BackButtonSprites, "BackButton");
  buttons.push(Player1Button); 
  buttons.push(Player2Button);
  buttons.push(BackButton);
  });

  SelectionScreen.checkUserInput(SelectionScreen.buttons);

});
