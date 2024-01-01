import Game_Object from "./Game_Object.js";

export default class Paddle extends Game_Object {
  constructor(width, height,velocity,x,y,color){
    super(x,y,color);
    this.size = {width, height};
    this.velocity = velocity;
  }

  render(ctx){
    ctx.fillStyle = this.color;
    ctx.fillRect(this.position.x, this.position.y, this.size.width, this.size.height);
  }

  update(){
    if (this.position.y > 0 && ){
      
}


