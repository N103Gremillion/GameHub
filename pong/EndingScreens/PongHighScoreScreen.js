import Button from "../../Button.js";
import TextBox from "../../TextBox.js";
import getScores from "./requestScores.js"; 

export default class PongHighScoreScreen{
  
  constructor(tag){
    this.pongHighScoreScreen = false;
    this.buttons = [];
    this.textBoxes = [];
    this.tag = tag;
  }

  open(Game_Manager){

    // fetch values from database and compare to the given Scores
    

    // ending score
    const ENDINGSCORE = Game_Manager.Scores[0].getScore();
    const ENDINGSCREENBACKGROUND = "http://Localhost/pong/pongSprites/superBackground.gif";


    // change the background and redraw
    Game_Manager.backgroundImage.src = ENDINGSCREENBACKGROUND;
    Game_Manager.ctx.clearRect(0, 0, Game_Manager.canvas.width, Game_Manager.canvas.height);
    Game_Manager.ctx.drawImage(Game_Manager.backgroundImage, 0, 0, Game_Manager.canvas.width, Game_Manager.canvas.height);   
    // add component to page
    this.addElements(Game_Manager, ENDINGSCORE);
  }

  addElements(Game_Manager, SCORE){

    // exit button values
    const exitButtonX = Game_Manager.canvas.width * 0.4;
    const exitButtonY = Game_Manager.canvas.height * 0.85;
    const exitButtonWidth = Game_Manager.canvas.width * 0.2;
    const exitButtonHeight = Game_Manager.canvas.height * 0.1;
    const exitButtonSprites = ['http://Localhost/pong/pongSprites/exit.png', 'http://Localhost/pong/pongSprites/exitHovering.png'];
    const exitButtonTag = 'ExitButton';

    // add the text box that will hold the high scores 
    const HighScoreBoxX = Game_Manager.canvas.width * 0.3;
    const HighScoreBoxY = Game_Manager.canvas.height * 0.2;
    const HighScoreBoxWidth = Game_Manager.canvas.width * 0.4;
    const HighScoreBoxHeight = Game_Manager.canvas.height * 0.6;
    const HighScoreBoxTag = "PongHighScoreBox";
    const HighScoreBoxText = `
    HIGH SCORES
  ----------------------
PLACE    NAME        SCORE
   -------     ----------    ---------  

1st     Nathan          ${SCORE}

2nd

3rd

4th

5th

6th

7th

8th

9th

-----------------------
`;
    const HIGHSCORETEXTBOX = new TextBox(HighScoreBoxX, HighScoreBoxY, HighScoreBoxWidth, HighScoreBoxHeight, HighScoreBoxTag, HighScoreBoxText);
    this.textBoxes.push(HIGHSCORETEXTBOX);
    this.buttons.push(new Button(exitButtonX, exitButtonY, exitButtonWidth, exitButtonHeight, exitButtonSprites, exitButtonTag));
    this.checkUserInput(this.buttons, Game_Manager);
    Game_Manager.endingScreen = true;
  }

  checkUserInput(buttons, Game_Manager){

    // buttons 
    buttons.forEach(button => {

      button.newButton.addEventListener('mouseenter', () => {
        let buttonHoverImageUrl = button.SpriteList[1];
        button.setButtonSprite(buttonHoverImageUrl);
      });

      button.newButton.addEventListener("mouseleave", () => {
        let buttonNormalImageUrl = button.SpriteList[0];
        button.setButtonSprite(buttonNormalImageUrl);
      });

      button.newButton.addEventListener("click", () => {
        // Exit button pressed
        if (button.tag === "ExitButton"){ 
          console.log("Eixting game"); 
          window.location.href = "http://Localhost/pong/PongSelectionScreen/PongSelection.html";
        }
      });

    });

  }

  render(ctx){

  }
}
