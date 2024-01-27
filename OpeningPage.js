
// basic opening page
/* class OpeningPage{

  canvas = document.getElementById("openingCanvas");
  ctx = this.canvas.getContext('2d');

  constructor(){
    this.buttons = []; 
  }
  
  setup(ctx, specificSetup){
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.refill(ctx);    
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

//setup the opening page
const Opening = new OpeningPage();
Opening.setup(Opening.ctx,(() => {
  
  let pongButtonSpriteList = [];
  //defining values for buttons
  let pongButtonX = window.innerWidth/3;
  let pongButtonY = window.innerHeight/3;
  let pongButtonWidth = window.innerWidth/3;
  let pongButtonHeight = window.innerHeight/3;
  this.buttons.push(new Button(pongButtonX, pongButtonY, pongButtonWidth, pongButtonHeight, pongButtonSpriteList)); 
}));

Opening.checkUserInput();
Opening.buttons[0].render(Opening.ctx);
console.log("YO"); */
