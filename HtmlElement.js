export default class HtmlElement {
  constructor(elementType, elementId) {
    const element = document.createElement(elementType);
    element.id = elementId;
    return element;
    
  }
}
