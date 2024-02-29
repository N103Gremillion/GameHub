import HtmlElement from "./HtmlElement.js";

export default class TextBox {
  
  constructor(x, y, width, height, tag, GameRules_GameInstructions){

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.tag = tag;

    //create the textbox element
    this.htmlTextBox = new HtmlElement('textarea', tag);
    this.htmlTextBox.style.position = 'absolute';
    this.GameRules_GameInstructions = GameRules_GameInstructions;
    this.setTextBoxValues(this.x, this.y, this.width, this.height, this.GameRules_GameInstructions);

    // Append button to body
    document.body.appendChild(this.htmlTextBox);
  }

  // methods
  setTextBoxValues(x, y, width, height, GameRules_GameInstructions){
    this.htmlTextBox.setAttribute('readonly', true);
    this.htmlTextBox.style.resize = "none";
    this.htmlTextBox.style.width = `${width}px`;
    this.htmlTextBox.style.height = `${height}px`;
    this.htmlTextBox.style.left = `${x}px`;
    this.htmlTextBox.style.top = `${y}px`;
    this.htmlTextBox.style.backgroundColor = 'black';
    this.htmlTextBox.style.color = 'white';
    this.htmlTextBox.style.fontFamily = 'Courier New';
    this.htmlTextBox.style.fontSize = `${this.getFontSize(width, height)}px`;
    this.htmlTextBox.style.border = '3px solid white';
    this.htmlTextBox.style.textAlign = 'center';
    this.htmlTextBox.value = GameRules_GameInstructions;
  }

  getFontSize(textBoxWidth, textBoxHeight){
    //maintain the size of the font using textBox demintions
    const fontSize = textBoxWidth/textBoxHeight * 20;
    return fontSize;
  }

  changeTextAlignment(textLocation){
    
    this.htmlTextBox.style.textAlign = textLocation;

  }

  adjust( newCanvasWidth, newCanvasHeight, oldCanvasWidth, oldCanvasHeight){

    //aspect rotios (width/height)
    const xScale = newCanvasWidth/oldCanvasWidth;
    const yScale = newCanvasHeight/oldCanvasHeight;
    
    // scale the values and reapply them to the button
    this.height *= yScale;
    this.width *= xScale;
    this.x *= xScale;
    this.y *= yScale;

    // assign the new values to the button
    this.setTextBoxValues(this.x, this.y, this.width, this.height, this.GameRules_GameInstructions);
  }

  removeTextBox(textBoxTag){
    const textBoxToRemove = document.getElementById(textBoxTag);
    if (textBoxToRemove) {
        textBoxToRemove.parentNode.removeChild(textBoxToRemove);
    } 
    else {
        console.warn(`TextBox with id '${textBoxTag}' not found.`);
    } 
  }

}
