export default class Game_Manager {
  canvas = document.getElementById('game_canvas');
  ctx = this.canvas.getContext('2d');

  constructor(){
    this.gameObjects = [];
  }

  setup(setupTrigger) {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    setupTrigger(this.gameObjects);
  }

  startGame(){
    this.ctx.fillStyle = 'rgba(0, 0, 0, 255)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.gameObjects.forEach((element) => {
      element.update();
    });

    this.gameObjects.forEach((element) => {
      element.render(this.ctx);
    });
    
  }

}













