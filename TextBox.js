import HtmlElement from "./HtmlElement.js";

export default class TextBox {
  
  constructor(x, y, width, height, tag){

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.tag = tag;

    //create the textbox element
    this.htmlTextBox = new HtmlElement('textarea', tag);
    this.htmlTextBox.style.position = 'absolute';
    this.setButtonValues(this.x, this.y, this.width, this.height);

    // Append button to body
    document.body.appendChild(this.htmlTextBox);
  }

  // methods
  setButtonValues(x, y, width, height){
    this.htmlTextBox.style.resize = "none";
    this.htmlTextBox.style.width = `${width}px`;
    this.htmlTextBox.style.height = `${height}px`;
    this.htmlTextBox.style.left = `${x}px`;
    this.htmlTextBox.style.top = `${y}px`;
  }

}
