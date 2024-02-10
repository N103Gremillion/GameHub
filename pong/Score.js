export default class Score{

  constructor(x, y, color, fontSize, fontFamily, playerName){
    this.MAXSCORE = 10;
    this.score = 0;
    this.x = x;
    this.y = y;
    this.color = color;
    this.fontSize = fontSize;
    this.fontFamily = fontFamily;
    this.font = `${fontSize}px ${fontFamily}`;
    this.playerName = playerName;
  }
  getScore(){
    return this.score;
  }
  increaseScore(amountToAdd){
    this.score += amountToAdd;
  }
  decreaseScore(amountToSubtract){
    this.score += amountToSubtract;
  }
  getScore(){
    return this.score;
  }
  increaseScore(amountToAdd){
    this.score += amountToAdd;
  }
  decreaseScore(amountToSubtract){
    this.score += amountToSubtract;
  }
  render(ctx){
    ctx.font = this.font;
    ctx.fillStyle = this.color;
    ctx.fillText(`${this.playerName}: ${this.score}`, this.x, this.y);
  }

  // function to help with the aspect ratio
  adjustValues(newCanvasWidth, newCanvasHeight, oldCanvasWidth, oldCanvasHeight) {
    const scaleX = newCanvasWidth / oldCanvasWidth;
    const scaleY = newCanvasHeight / oldCanvasHeight;
    
    //get old and new aspect ratio
    const oldAspectRatio = oldCanvasWidth/oldCanvasHeight;
    const newAspectRatio = newCanvasWidth/newCanvasHeight;
    
    // Adjust positions
    this.x *= scaleX;
    this.y *= scaleY;

    // adjust the font based on the aspect ratio
    this.fontSize *= newAspectRatio/oldAspectRatio;

    this.font = `${this.fontSize}px ${this.fontFamily}`;   
  }

}
