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
    if (InputMapping[this.keys.UP] == true && this.position.y > 0){
      this.position.y -= this.velocity;
    }
    else if (InputMapping[this.keys.DOWN] == true && this.position.y < (window.innerHeight - this.size.height) ){
      this.position.y += this.velocity;
    }
  }

  adjustValues(newCanvasWidth, newCanvasHeight, oldCanvasWidth, oldCanvasHeight) {
    const scaleX = newCanvasWidth / oldCanvasWidth;
    const scaleY = newCanvasHeight / oldCanvasHeight;
    const oldPaddleHeight = this.size.height;

    // Adjust positions
    this.position.x *= scaleX;
    this.position.y *= scaleY;

    // Adjust the size while maintaining aspect ratio 
    this.size.width *= scaleX;
    this.size.height = (newCanvasHeight * oldPaddleHeight) / oldCanvasHeight;
  }

  checkCollision(otherObject) {
  }
}


