import Button from "./Button.js";

//basic opening page
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
    specificSetup(this.buttons);
  }

  refill(ctx){
    ctx.fillStyle = "grey";
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  checkUserInput(buttons){
    window.addEventListener("resize", (() => {
      //get old page demintions
      const oldCanvasWidth = this.canvas.width;
      const oldCanvasHeight = this.canvas.height;
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
      this.refill(this.ctx);
      this.buttons.forEach(button => {
        button.adjust(this.canvas.width, this.canvas.height, oldCanvasWidth, oldCanvasHeight);
        button.render(this.ctx);
      });

      //check for when mouse hovers over buttons
      buttons.forEach(button => { 
        console.log(button);
        button.newButton.addEventListener('mouseenter', () => { 
          console.log("IN Button");
        });
        /*button.image.addEventListener("mouseleave", () => {
          button.image.style.border = "none";
          console.log("Leaving Button");
        });*/
      });

    }));
  }

  loop(ctx, buttons){
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.refill(ctx);
    buttons.forEach((button) => {
      button.render(ctx);
    });
  }
}

// setup
const Opening = new OpeningPage();

const PongButtonSprites = ["../OpeningPageSprites/pongButton.png", "../OpeningPageSprites/pongButtonHovering.png"];
const CommingSoonSprites1 = ["../OpeningPageSprites/commingSoonButton.png", "../OpeningPageSprites/commingSoonButtonHovering1.png"];
const CommingSoonSprites2 = ["../OpeningPageSprites/commingSoonButton.png", "..//OpeningPageSprites/commingSoonButtonHovering2.png"];

Opening.setup(Opening.ctx,(buttons) => {

  //pong button 
  let PongButtonX = window.innerWidth * .425;
  let PongButtonY = window.innerHeight * .20;
  let ButtonWidth = window.innerWidth * .15;
  let ButtonHeight = window.innerHeight * .20;
  let Game2ButtonX = window.innerWidth * .30;
  let Game2ButtonY = window.innerHeight * .50;
  let Game2ButtonWidth = window.innerWidth * .15;
  let Game2ButtonHeight = window.innerHeight * .20;
  let Game3ButtonX = window.innerWidth * .55;
  let Game3ButtonY = window.innerHeight * .50;
  let Game3ButtonWidth = window.innerWidth * .15;
  let Game3ButtonHeight = window.innerHeight * .20;


  let pongButton = new Button(PongButtonX, PongButtonY, ButtonWidth, ButtonHeight, PongButtonSprites, 'button');
  let game2Button = new Button(Game2ButtonX, Game2ButtonY, Game2ButtonWidth, Game2ButtonHeight, CommingSoonSprites1, 'button'); 
  let game3Button = new Button(Game3ButtonX, Game3ButtonY, Game3ButtonWidth, Game3ButtonHeight, CommingSoonSprites2, 'button');
  buttons.push(pongButton); 
  buttons.push(game2Button);
  buttons.push(game3Button);
});

//check for input on buttons and resizing
Opening.checkUserInput(Opening.buttons);

Opening.loop(Opening.ctx, Opening.buttons);



