
export default class Game_Manager {
  canvas = document.getElementById('game_canvas');
  ctx = this.canvas.getContext('2d');
  

  constructor(){
    this.gameObjects = [];
  }

  inputHandling(InputsArray) {
      //track when a key is pressed (not for special keys like shift)
      document.body.addEventListener('keydown', function(event){
        const key = event.key.toLowerCase();
        console.log(key);
        InputsArray[key] = true; 
        console.log(InputsArray[key]);
      });
      document.body.addEventListener('keyup', function(event){
        const key = event.key.toLowerCase();
        console.log(key);
        InputsArray[key] = false; 
        console.log(InputsArray[key]);
      });
      // keep track of when window is resized 
      window.addEventListener('resize', handleResize(Game_Manager));

      function handleResize(Game_Manager){
         Game_Manager.canvas.width = window.innerWidth;
         Game_Manager.canvas.height = window.innerHeight;  
      }
      
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
    
    // using lambda to prevent over use and recursion error (this helps to only run startGame() when necessary
    requestAnimationFrame(() => this.startGame());
    
  }

}













