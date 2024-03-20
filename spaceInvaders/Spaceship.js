import Game_Object from "../Game_Object.js";
import { InputMapping } from "../KeyboardMapping.js";

export default class Spaceship extends Game_Object{
  
  constructor(x, y, width, height, tag, spriteList, velocity){
    super(x,y, tag);
    this.width = width;
    this.height = height;
    this.image = new Image();
    this.image.src = spriteList[0];
    this.spriteList = spriteList;
    this.right = 'd';
    this.left = 'a';
    this.velocity = velocity;
  }

  render(ctx){
    ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
  }

  update(){
    
    if (InputMapping[this.right] === true && this.position.x < (window.innerWidth - this.width)){
      this.position.x += this.velocity;
    }
    else if (InputMapping[this.left] === true && this.position.x > 0){
      this.position.x -= this.velocity;
    }
  }

  adjustValues(newCanvasWidth, newCanvasHeight, oldCanvasWidth, oldCanvasHeight) {
    const scaleX = newCanvasWidth / oldCanvasWidth;
    const scaleY = newCanvasHeight / oldCanvasHeight;
    const oldHeight = this.height;

    // Adjust positions
    this.position.x *= scaleX;
    this.position.y *= scaleY;

    // Adjust the size while maintaining aspect ratio 
    this.width *= scaleX;
    this.height = (newCanvasHeight * oldHeight) / oldCanvasHeight;

    // Adjust the velocity
    this.velocity = window.innerHeight/200;
  }

}
