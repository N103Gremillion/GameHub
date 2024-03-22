import Game_Object from "../Game_Object";
import { Manager } from "../Game_Manager";
import { InputMapping } from "../KeyboardMapping";

export class Bullets extends Game_Object{

  Bullets(x, y, width, height, tag, spriteList){
    super(x, y , tag);
    this.width = width;
    this.height = height;
    this.image = new Image();
    this.image.src = spriteList[0];
    this.spriteList = spriteList;
    this.velocity = window.innerHeight/200;
  }
  
  update(){
    if (position.y < 0){
       position.y += velocity;
    }
    else{
      let index = Manager.gameObjects.indexOf(this);
      Manager.gameObjects.splice(index, 1);    
    }
  }

  render(){

  }
}
