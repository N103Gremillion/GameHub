import { Manager } from "./Game_Manager.js";

export default class Game_Object {
  static baseId = 0;

  constructor(x, y, tag){
    this.objectId = this.generateObjectId();
    this.position = { x, y };
    this.tag = tag; 
    Manager.collisionHandler.setupMapping(this);
    }

  generateObjectId(){ 
    return Game_Object.baseId ++;
  }

  render(ctx){ 
  }

  update(){
  }
  
  adjustValues(newCanvasWidth, newCanvasHeight, oldCanvasWidth, oldCanvasHeight){
  }

  checkCollision(otherObject){
  }
}

