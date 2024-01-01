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
}


