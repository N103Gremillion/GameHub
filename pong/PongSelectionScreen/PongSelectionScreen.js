import OpeningPage from "../../openingScreen/OpeningPage.js";

export default class PongSelectionScreen extends OpeningPage{

  constructor(backgroundList){
    super("PongSelectionScreen");
    this.background = new Image();
    this.backgroundList = backgroundList;
    //ensure the backgroundImage loades
    this.loadBackgroundImage(backgroundList[0]);
  }

  loadBackgroundImage(BackgroundImage){
    this.background.onload = () => { 
      this.renderBackground();
    };
    this.background.src = BackgroundImage;
  }

  renderBackground(){
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.drawImage(this.background, 0, 0, this.canvas.width, this.canvas.height);
  }

  checkUserInput(buttons){

    window.addEventListener("resize", () => {
      //get old page demintions
      const oldCanvasWidth = this.canvas.width;
      const oldCanvasHeight = this.canvas.height;
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
      this.renderBackground();
      this.buttons.forEach(button => {
        button.adjust(this.canvas.width, this.canvas.height, oldCanvasWidth, oldCanvasHeight); 
      });
    });

    //check for when mouse hovers over buttons
    buttons.forEach(button => { 
      button.newButton.addEventListener('mouseenter', () => { 
        button.setButtonSprite(button.SpriteList[1]); 
        this.loadBackgroundImage(this.backgroundList[1]);
      });
      button.newButton.addEventListener("mouseleave", () => {
        button.setButtonSprite(button.SpriteList[0]);
        this.loadBackgroundImage(this.backgroundList[0]);
      });
      button.newButton.addEventListener('click', () => {
        //check the tags and then sent to corresponding file path
        if (button.tag === "1PlayerButton"){
          window.location.href = "../SinglePlayerSetup.html";
        }

        else if(button.tag === "2PlayerButton"){
          window.location.href = "../MultiplayerSetup.html";
        }
      });
    });
  }

}



