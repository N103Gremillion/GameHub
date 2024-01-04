import Game_Object from "./Game_Object.js";
import { InputMapping } from "../KeyboardMapping.js";

export default class Paddle extends Game_Object {
  constructor(width, height,velocity,x,y,color, UP, DOWN){
    super(x,y,color);
    this.size = {width, height};
    this.velocity = velocity;
    this.keys = {UP, DOWN};
  }

  render(ctx){
    ctx.fillStyle = this.color;
    ctx.fillRect(this.position.x, this.position.y, this.size.width, this.size.height);
  }

  update(){
    if (InputMapping[this.keys.UP] == true){
      this.position.y -= this.velocity;
      console.log(this.position.y);
    }
    else if (InputMapping[this.keys.DOWN] == true){
      this.position.y += this.velocity;
      console.log(this.position.y);
    }
  } 
}


