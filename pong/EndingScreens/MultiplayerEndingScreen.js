import Button from "../../Button.js";

export default class MultiplayerEndingScreen{

  constructor(tag){
    this.multiplayerEndingScreen = false;
    this.buttons = [];
    this.fontFamily;
    this.fontColor;
    this.fontSize;
    this.winner;
    this.tag = tag;
  }
  
  open(Game_Manager) {

    const superGokuScore = Game_Manager.Scores[0].getScore();
    const gokuScore = Game_Manager.Scores[1].getScore();
    const winningBackgroundImages = ["http://Localhost/pong/pongSprites/superGokuWinningBackground.jpg", "http://Localhost/pong/pongSprites/normalGokuWinningBackground.jpg"];
    
    if (superGokuScore >= Game_Manager.Scores[0].MAXSCORE){
      Game_Manager.backgroundImage.src = winningBackgroundImages[0];
      this.addElements(Game_Manager, 'Player1');
    }
    else if (gokuScore >= Game_Manager.Scores[1].MAXSCORE){
      Game_Manager.backgroundImage.src = winningBackgroundImages[1];
      this.addElements(Game_Manager, 'Player2');
    }
    Game_Manager.ctx.clearRect(0, 0, Game_Manager.canvas.width, Game_Manager.canvas.height);
    Game_Manager.ctx.drawImage(Game_Manager.backgroundImage, 0, 0, Game_Manager.canvas.width, Game_Manager.canvas.height);
  }

  addElements(Game_Manager, WinningPlayer){
    
    if (WinningPlayer === 'Player1'){
      this.addText(Game_Manager, WinningPlayer);
    }
    else if (WinningPlayer === 'Player2'){
      this.addText(Game_Manager, WinningPlayer);
    }
    
    // exit button values
    const exitButtonX = Game_Manager.canvas.width * 0.4;
    const exitButtonY = Game_Manager.canvas.height * 0.7;
    const exitButtonWidth = Game_Manager.canvas.width * 0.2;
    const exitButtonHeight = Game_Manager.canvas.height * 0.1;
    const exitButtonSprites = ['http://Localhost/pong/pongSprites/exit.png', 'http://Localhost/pong/pongSprites/exitHovering.png'];
    const exitButtonTag = 'ExitButton';
    this.buttons.push(new Button(exitButtonX, exitButtonY, exitButtonWidth, exitButtonHeight, exitButtonSprites, exitButtonTag));
    this.checkUserInput(this.buttons, Game_Manager);

  }

  addText(Game_Manager, WinningPlayer){

    
    this.fontFamily = 'Arial';
    this.fontSize = Game_Manager.canvas.width/Game_Manager.canvas.height * 20;

    if (WinningPlayer === 'Player1'){ 
      this.fontColor = 'Blue';
      this.winner = "SuperGoku";
      this.render(Game_Manager, Game_Manager.ctx);
    }
    else if (WinningPlayer === 'Player2'){
      this.fontColor = 'Red';
      this.winner = "NormalGoku";
      this.render(Game_Manager, Game_Manager.ctx);
    }
    Game_Manager.endingScreen = true;
  }

  render(Game_Manager, ctx){
    const textX = Game_Manager.canvas.width * .45;
    const textY = Game_Manager.canvas.height * .1;

    ctx.font = this.fontFamily;
    ctx.fillStyle = this.fontColor;
    ctx.fillText(`${this.winner} Wins`, textX, textY);
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
        // Exit button pressed
        if (button.tag === "ExitButton"){ 
          console.log("Eixting game"); 
          window.location.href = "http://Localhost/pong/PongSelectionScreen/PongSelection.html";
        }
      });
    });
  }

}
