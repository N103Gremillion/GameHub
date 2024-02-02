//basic opening page
export default class OpeningPage{
  
  constructor(canvasTag){
    this.canvas = document.getElementById(canvasTag);
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.ctx = this.canvas.getContext('2d');
    this.buttons = [];

  }
  
  setup(specificSetup){
    specificSetup(this.buttons);
  }

  refill(ctx){
    ctx.fillStyle = "grey";
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  checkUserInput(buttons){
    window.addEventListener("resize", () => {
      //get old page demintions
      const oldCanvasWidth = this.canvas.width;
      const oldCanvasHeight = this.canvas.height;
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
      this.refill(this.ctx);
      this.buttons.forEach(button => {
        button.adjust(this.canvas.width, this.canvas.height, oldCanvasWidth, oldCanvasHeight); 
      });
    });

    //check for when mouse hovers over buttons
    buttons.forEach(button => { 
      button.newButton.addEventListener('mouseenter', () => { 
        button.setButtonSprite(button.SpriteList[1]); 
      });
      button.newButton.addEventListener("mouseleave", () => {
         button.setButtonSprite(button.SpriteList[0]); 
      });
      button.newButton.addEventListener('click', () => {
        //check the tags and then sent to corresponding file path
        if (button.tag === "PongButton"){
          window.location.href = "../pong/PongSelectionScreen/PongSelection.html";
        }

        else if(button.tag === "SpaceInvadersButton"){
          console.log("inside SpaceInvaders");
        }

        else if(button.tag === "SnakeButton"){
          console.log("inside Snake");
        }
      });
    });
  }

  renderBackground(ctx){
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.refill(ctx); 
  }
}



