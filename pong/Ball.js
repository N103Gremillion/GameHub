import Game_Object from "./Game_Object.js";

export default class Ball extends Game_Object {
  constructor(radius,velocity,x,y,color){
    super(x,y,color);
    this.radius = radius;
    this.velocity = velocity;
  }
  
  render(ctx){
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.position.x, this.position.y, this.radius, 0, 2*Math.PI);
    ctx.fill();
  }

 adjustValues(newCanvasWidth, newCanvasHeight, oldCanvasWidth, oldCanvasHeight) {
   console.log(oldCanvasWidth);
   console.log(newCanvasWidth);
    const scaleX = newCanvasWidth / oldCanvasWidth;
    const scaleY = newCanvasHeight / oldCanvasHeight;

    // Adjust positions
    this.position.x *= scaleX;
    this.position.y *= scaleY;

    // Adjust the radius while maintaining aspect ratio 
    const min = Math.min(scaleX, scaleY);
    const max = Math.max(scaleX, scaleY);
    this. radius *= (max + min) / 2;
}

}


