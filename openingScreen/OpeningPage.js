// basic opening page
class OpeningPage{

  canvas = document.getElementById("openingCanvas");
  ctx = this.canvas.getContext('2d');

  constructor(){
    
  }
  
  setup(ctx){
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    ctx.fillStyle = "grey";
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
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

const Opening = new OpeningPage();
Opening.setup(Opening.ctx);
Opening.checkUserInput();
