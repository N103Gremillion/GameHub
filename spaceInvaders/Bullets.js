import Game_Object from "../Game_Object.js";
import { Manager } from "../Game_Manager.js";
import { InputMapping } from "../KeyboardMapping.js";

export default class Bullet extends Game_Object{

  constructor(x, y, width, height, tag, spriteList){
    super(x, y , tag);
    this.width = width;
    this.height = height;
    this.image = new Image();
    this.image.src = spriteList[0];
    this.spriteList = spriteList;
    this.velocity = 1;
    //this.velocity = window.innerHeight/200;
  }
  
  update(){
    console.log(this.position.y);
    if (this.position.y < 0){
      Manager.Bullets.shift(); 
    }
    else{
      this.position.y -= this.velocity;
    }
  }

  render(ctx){
    ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
  }
}
