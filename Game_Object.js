

export default class Game_Object {
  static baseId = 0;

  constructor(x, y, tag){
    this.objectId = this.generateObjectId();
    this.position = { x, y };
    this.tag = tag; 
    
    console.log(this.objectId);
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

