export default class HtmlButton {
  constructor(elemntType, buttonId) {
    const button = document.createElement(elemntType);
    button.id = buttonId;
    return button;
    
  }
}
