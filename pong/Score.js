
export default class Score{

  constructor(x, y, color, fontSize, fontFamily, playerName){
    this.score = 0;
    this.x = x;
    this.y = y;
    this.color = color;
    this.font = '${fontSize}px ${fontFamily}';
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
  render(ctx){
    ctx.font = this.font;
    ctx.fillStyle = this.color;
    ctx.fillText(`${this.playerName}: ${this.score}`, this.x, this.y);
  }
}
