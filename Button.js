import HtmlElement from "./HtmlElement.js";
export default class Button{
  
  constructor(x, y, width, height, SpriteList, tag) {
    this._x = x;
    this._y = y;
    this._width = width;
    this._height = height;
    this.SpriteList = SpriteList;
    this.tag = tag;

    // Create button element
    this.newButton = new HtmlElement('button', this.tag);
    this.newButton.style.position = 'absolute';
    this.setButtonValues(this._x, this._y, this._width, this._height);
    this.setButtonSprite(this.SpriteList[0]);
    this.newButton.style.backgroundSize = '100% 100%';

    // Append button to body
    document.body.appendChild(this.newButton);
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
  setButtonValues(x, y, width, height){
    this.newButton.style.width = `${width}px`;
    this.newButton.style.height = `${height}px`;
    this.newButton.style.left = `${x}px`;
    this.newButton.style.top = `${y}px`;
  }

  setButtonSprite(spriteUrl){
    this.newButton.style.backgroundImage = `url('${spriteUrl}')`;
  }

  adjust( newCanvasWidth, newCanvasHeight, oldCanvasWidth, oldCanvasHeight){
    //aspect rotios (width/height)
    const xScale = newCanvasWidth/oldCanvasWidth;
    const yScale = newCanvasHeight/oldCanvasHeight;
    
    // scale the values and reapply them to the button
    this._height *= yScale;
    this._width *= xScale;
    this._x *= xScale;
    this._y *= yScale;

    // assign the new values to the button
    this.setButtonValues(this._x, this._y, this._width, this._height);
  }

  //remove a button from screen
  removeButton(buttonId){
    const buttonToRemove = document.getElementById(buttonId);
    if (buttonToRemove) {
        buttonToRemove.parentNode.removeChild(buttonToRemove);
    } else {
        console.warn(`Button with id '${buttonId}' not found.`);
    }
  }

}
