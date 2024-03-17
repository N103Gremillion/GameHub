import Game_Object from "../Game_Object.js";

export default class Spaceship extends Game_Object{
  
  constructor(x, y, width, height, tag, spriteList){
    super(x,y, tag);
    this.width = width;
    this.height = height;
    this.image = new Image();
    this.image.src = spriteList[0];
    this.spriteList = spriteList;
  }

}
