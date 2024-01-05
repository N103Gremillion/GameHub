export default class Game_Object {
  constructor(x, y, color){
    this.position = { x, y };
    this.color = color;
  }

  render(ctx){ 
  }

  update(){
  }
  
   adjustValues(newCanvasWidth, newCanvasHeight, oldCanvasWidth, oldCanvasHeight){
   }
  
}
