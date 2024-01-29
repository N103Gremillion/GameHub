export default class Button{
  
  constructor(x, y, width, height, SpriteList){
    this._x = x;
    this._y = y;
    this._width = width;
    this._height = height;
    this.SpriteList = SpriteList;
    this.image = new Image();
    this.image.src = SpriteList[0]; 
  }

  //getters and setters for practice
  getx(){
    return this._x;
  }
  
  gety(){
    return this._y;
  }

  getwidth(){
    return this._width;
  }

  getheight(){
    return this._height;
  }

  setx(value){
    if (value > 0 && value < window.innerWidth){
      this._x = value;
    }
    else{
      console.error("x value is either to large or to small");
    }
  }

  sety(value){
    if (value > 0 && value < window.innerHeight){
      this._y = value;
    }
    else{
      console.error("y value is either to large or to small");
    }
  }

  setwidth(value){
    if (value > 0 && value < (window.innerWidth / 2)){
      this._width = value;
    }
    else{
      console.error("width value is either to large or to small");
    }
  }

  setheight(value){
    if (value > 0 && value < window.innerHeight / 2){
      this._height = value;
    }
    else{
      console.error("height value is either to large or to small");
    }
  }
  

  // methods
  render(ctx){ 
    ctx.drawImage(this.image, this._x, this._y, this._width, this._height);
  }

  adjust( newCanvasWidth, newCanvasHeight, oldCanvasWidth, oldCanvasHeight){
    //aspect rotios (width/height)
    const xScale = newCanvasWidth/oldCanvasWidth;
    const yScale = newCanvasHeight/oldCanvasHeight;

    this._height *= yScale;
    this._width *= xScale;
    this._x *= xScale;
    this._y *= yScale;
  }

}
