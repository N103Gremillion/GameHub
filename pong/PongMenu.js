import Button from "../Button.js";
import TextBox from "../TextBox.js";

export default class PongMenu{

  constructor(ctx){
    this.optionsBoxOpen = false;
    this.buttons = [];
    this.textBoxes = [];
  }

  render(ctx){
    // make the menu background transparent
    ctx.globalAlpha = 0.5
  }
  
  open(Game_Manager){
    //setup buttons on menu
    //Play Button values
    const CANVAS_WIDTH = Game_Manager.canvas.width;
    const CANVAS_HEIGHT = Game_Manager.canvas.height;
    const PlayButtonX = CANVAS_WIDTH * 0.4;
    const PlayButtonY = CANVAS_HEIGHT * 0.175;
    const PlayButtonWidth = CANVAS_WIDTH * 0.2;
    const PlayButtonHeight = CANVAS_HEIGHT * 0.1;
    const PlayButtonTag = "PlayButton";
    const PlayButtonSprites = ["./pongSprites/PongMenu/Play3.png", "./pongSprites/PongMenu/Play1.png"];

    //Options Button values
    const OptionsButtonX = CANVAS_WIDTH * 0.4;
    const OptionsButtonY = CANVAS_HEIGHT * 0.45;
    const OptionsButtonWidth = CANVAS_WIDTH * 0.2;
    const OptionsButtonHeight = CANVAS_HEIGHT * 0.1;
    const OptionsButtonTag = "OptionsButton";
    const OptionsButtonSprites = ["./pongSprites/PongMenu/Options3.png", "./pongSprites/PongMenu/Options1.png"];

    //Quit Button values
    const QuitButtonX = CANVAS_WIDTH * 0.4;
    const QuitButtonY = CANVAS_HEIGHT * 0.725;
    const QuitButtonWidth = CANVAS_WIDTH * 0.2;
    const QuitButtonHeight = CANVAS_HEIGHT * 0.1;
    const QuitButtonTag = "QuitButton";
    const QuitButtonSprites = ["./pongSprites/PongMenu/Quit3.png", "./pongSprites/PongMenu/Quit1.png"];

    this.buttons.push(new Button(PlayButtonX, PlayButtonY, PlayButtonWidth, PlayButtonHeight, PlayButtonSprites, PlayButtonTag));
    this.buttons.push(new Button(OptionsButtonX, OptionsButtonY, OptionsButtonWidth, OptionsButtonHeight, OptionsButtonSprites, OptionsButtonTag));
    this.buttons.push(new Button(QuitButtonX, QuitButtonY, QuitButtonWidth, QuitButtonHeight, QuitButtonSprites, QuitButtonTag));

    // listen for user input on all buttons
    this.checkUserInput(this.buttons, Game_Manager);
  }

  close(Game_Manager, buttons){
    buttons.forEach(button => {
      button.removeButton(button.tag); 
    });
    //check if the Options is open or if everything is closed
    if (!this.optionsBoxOpen){
      Game_Manager.ctx.globalAlpha = 1;
      Game_Manager.menuOpen = false;
    }
  }

  openOptions(Game_Manager){

    //values for the OptoinsBox
    const OptionsX = Game_Manager.canvas.width * 0.3;
    const OptionsY = Game_Manager.canvas.height * 0.3;
    const OptionsWidth = Game_Manager.canvas.widht * 0.4;
    const OptionsHeight = Game_Manager.canvas.height * 0.4;
    const OptionsTag = "PongOptionsBox";

    //create the Options box and display appropriate text
    this.textBoxes.push(new TextBox(OptionsX, OptionsY, OptionsWidth, OptionsHeight, OptionsTag));
    
  }

  closeOptions(Game_Manager){
    Game_Manager.ctx.globalAlpha = 1;
  }

  toggleOptionsOpen(Game_Manager){
    this.optionsBoxOpen = !this.optionsBoxOpen;

    //checking weather to open or close the OptionsBox
    if (this.optionsBoxOpen){
      this.close(Game_Manager, this.buttons);
      this.openOptions(Game_Manager);
    }
    else{
      this.closeOptions(Game_Manager);
    }
  }
  
  checkUserInput(Menubuttons, Game_Manager){
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
          this.close(Game_Manager, this.buttons);
        }
        else if (button.tag === "OptionsButton"){
          this.toggleOptionsOpen(Game_Manager);
        }
        else if (button.tag === "QuitButton"){
           window.location.href = "./PongSelectionScreen/PongSelection.html";
        }
      });
    });
  }

}


