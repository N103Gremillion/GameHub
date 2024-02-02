import Button from "../Button.js";
import { Manager } from "../Game_Manager.js";

export default class PongMenu{

  constructor(ctx){
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
    this.buttons = [];
  }

  render(ctx){
    // make the menu background transparent
    ctx.globalAlpha = 0.5
  }
  
  open(){
    //setup buttons on menu
    //Play Button values
    const PlayButtonX = window.innerWidth * 0.4;
    const PlayButtonY = window.innerHeight * 0.175;
    const PlayButtonWidth = window.innerWidth * 0.2;
    const PlayButtonHeight = window.innerHeight * 0.1;
    const PlayButtonTag = "PlayButton";
    const PlayButtonSprites = ["./pongSprites/PongMenu/Play3.png", "./pongSprites/PongMenu/Play1.png"];

    //Options Button values
    const OptionsButtonX = window.innerWidth * 0.4;
    const OptionsButtonY = window.innerHeight * 0.45;
    const OptionsButtonWidth = window.innerWidth * 0.2;
    const OptionsButtonHeight = window.innerHeight * 0.1;
    const OptionsButtonTag = "OptionsButton";
    const OptionsButtonSprites = ["./pongSprites/PongMenu/Options3.png", "./pongSprites/PongMenu/Options1.png"];

    //Quit Button values
    const QuitButtonX = window.innerWidth * 0.4;
    const QuitButtonY = window.innerHeight * 0.725;
    const QuitButtonWidth = window.innerWidth * 0.2;
    const QuitButtonHeight = window.innerHeight * 0.1;
    const QuitButtonTag = "QuitButton";
    const QuitButtonSprites = ["./pongSprites/PongMenu/Quit3.png", "./pongSprites/PongMenu/Quit1.png"];

    this.buttons.push(new Button(PlayButtonX, PlayButtonY, PlayButtonWidth, PlayButtonHeight, PlayButtonSprites, PlayButtonTag));
    this.buttons.push(new Button(OptionsButtonX, OptionsButtonY, OptionsButtonWidth, OptionsButtonHeight, OptionsButtonSprites, OptionsButtonTag));
    this.buttons.push(new Button(QuitButtonX, QuitButtonY, QuitButtonWidth, QuitButtonHeight, QuitButtonSprites, QuitButtonTag));

    // listen for user input on all buttons
    this.checkUserInput(this.buttons);
  }

  close(ctx, buttons){
    ctx.globalAlpha = 1;
    buttons.forEach(button => {
      button.removeButton(button.tag); 
    });
     Manager.menuOpen = false;
  }
  
  checkUserInput(Menubuttons){
    Menubuttons.forEach(button => {
      button.newButton.addEventListener("mouseenter", () => {
        let buttonHoverImageUrl = button.SpriteList[1];
        button.setButtonSprite(buttonHoverImageUrl);
      })
      button.newButton.addEventListener("mouseleave", () => {
        let buttonNormalImageUrl = button.SpriteList[0];
        button.setButtonSprite(buttonNormalImageUrl);
      })
      button.newButton.addEventListener("click", () => {
        // Play button pressed
        if (button.tag === "PlayButton"){ 
          console.log("PlayButtonPressed"); 
        }
        else if (button.tag === "OptionsButton"){
          console.log("OptionsButton");
        }
        else if (button.tag === "QuitButton"){
          console.log("QuitButton");
        }
      });
    });
  }

}


