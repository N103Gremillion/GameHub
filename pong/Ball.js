import Game_Object from "./Game_Object.js";

export default class Ball extends Game_Object {
  constructor(radius,velocity,x,y,color){
    super(x,y,color);
    this.radius = radius;
    this.velocity = velocity;
  }
  
  render(ctx){
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
  }
}


