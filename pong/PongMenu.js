import Button from "../Button.js";

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
    const QuitButtonTag = "QuitButtonTag";
    const QuitButtonSprites = ["./pongSprites/PongMenu/Quit3.png", "./pongSprites/PongMenu/Quit1.png"];

    this.buttons.push(new Button(PlayButtonX, PlayButtonY, PlayButtonWidth, PlayButtonHeight, PlayButtonTag, PlayButtonSprites));
    this.buttons.push(new Button(OptionsButtonX, OptionsButtonY, OptionsButtonWidth, OptionsButtonHeight, OptionsButtonTag, OptionsButtonSprites));
    this.buttons.push(new Button(QuitButtonX, QuitButtonY, QuitButtonWidth, QuitButtonHeight, QuitButtonTag, QuitButtonSprites));
  }

  close(){

  }

}
