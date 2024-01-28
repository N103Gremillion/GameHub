import Button from "./Button.js";

// basic opening page
class OpeningPage{

  canvas = document.getElementById("openingCanvas");
  ctx = this.canvas.getContext('2d');

  constructor(){
    this.buttons = [];
  }
  
  setup(ctx, specificSetup){
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    ctx.fillStyle = "grey";
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    specificSetup(this.buttons);
  }

  refill(ctx){
    ctx.fillStyle = "grey";
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  checkUserInput(){
    window.addEventListener("resize", (() => {
      //get old page demintions
      const oldCanvasWidth = this.canvas.width;
      const oldCanvasHeight = this.canvas.height;
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
      this.refill(this.ctx);

    }));
  }
}

// setup
const Opening = new OpeningPage();

const PongButtonSprites = ["../pong/pongSprites/goku.png", "./OpeningPageSprites/pongButtonHovering.png"];

Opening.setup(Opening.ctx,(buttons) => {

  //pong button 
  let PongButtonX = window.innerWidth * .20;
  let PongButtonY = window.innerHeight * .40;
  let PongButtonWidth = window.innerWidth * .20;
  let PongButtonHeight = window.innerHeight * .30;
  let pongButton = new Button(PongButtonX, PongButtonY, PongButtonWidth, PongButtonHeight, PongButtonSprites);
  buttons.push(pongButton); 

});

Opening.checkUserInput();
console.log(Opening.buttons[0]);
Opening.buttons[0].image.onload = function(){  
    Opening.buttons[0].render(Opening.ctx);
}



