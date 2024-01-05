export default class Game_Manager {
  canvas = document.getElementById('game_canvas');
  ctx = this.canvas.getContext('2d');
  
  constructor() {
    this.gameObjects = []; 
  }

  inputHandling(InputsArray, Game_Manager) {
    // Track when a key is pressed (not for special keys like shift)
    document.body.addEventListener('keydown', function(event) {
      const key = event.key.toLowerCase();
      InputsArray[key] = true;  
    });

    document.body.addEventListener('keyup', function(event) {
      const key = event.key.toLowerCase();
      InputsArray[key] = false; 
      console.log(InputsArray[key]);
    });

    // Keep track of when the window is resized 
    window.addEventListener('resize', () => handleResize(Game_Manager));

    function handleResize(Game_Manager) {
      // get old windowsize
      const oldCanvasWidth = Game_Manager.canvas.width;
      const oldCanvasHeight = Game_Manager.canvas.height;
      //console.log(oldCanvasWidth);
      //console.log(oldCanvasHeight);
      // Used to change the location of each element relative to the size of the window when being resized and there location
      Game_Manager.setup((gameObjects) => {
      Game_Manager.gameObjects.forEach((element) => {
        //console.log(Game_Manager.canvas.width);
        //console.log(Game_Manager.canvas.height);
        element.adjustValues(Game_Manager.canvas.width, Game_Manager.canvas.height, oldCanvasWidth, oldCanvasHeight);
        element.update();
        element.render(Game_Manager.ctx);
      });
    });
  }
}

  setup(setupTrigger) {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight; 
    setupTrigger(this.gameObjects);
  }

  startGame() {
    this.ctx.fillStyle = 'rgba(0, 0, 0, 255)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.gameObjects.forEach((element) => {
      element.update();
    });

    this.gameObjects.forEach((element) => {
      element.render(this.ctx);
    });
    
    // Using lambda to prevent overuse and recursion error (this helps to only run startGame() when necessary)
    requestAnimationFrame(() => this.startGame());
  } 
  
}










