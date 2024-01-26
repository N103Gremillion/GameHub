import CollisionHandler from "./CollisionHandler.js";

export default class Game_Manager {
  collisionHandler = new CollisionHandler();
  canvas = document.getElementById('game_canvas');
  ctx = this.canvas.getContext('2d');
  backgroundImage = new Image();

  constructor() {
    this.gameObjects = []; 
    this.Scores = [];
    this.backgroundMusic = new Audio();
  }

  //input backgroundImage
  loadBackgroundImage(imageSrc, collisionTags) {
    this.backgroundImage.onload = () => {
      requestAnimationFrame(() => this.startGame(collisionTags));
    };
    this.backgroundImage.src = imageSrc;
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
    });

    // Keep track of when the window is resized 
    window.addEventListener('resize', () => handleResize(Game_Manager));

    function handleResize(Game_Manager) {
      // get old windowsize
      const oldCanvasWidth = Game_Manager.canvas.width;
      const oldCanvasHeight = Game_Manager.canvas.height; 
      // Used to change the location of each element relative to the size of the window when being resized and there location
      Game_Manager.setup(() => {
        Game_Manager.gameObjects.forEach((element) => {
          element.adjustValues(Game_Manager.canvas.width, Game_Manager.canvas.height, oldCanvasWidth, oldCanvasHeight);
          element.update();
          element.render(Game_Manager.ctx);
        });
        Game_Manager.Scores.forEach((element) => {
          element.adjustValues(Game_Manager.canvas.width, Game_Manager.canvas.height, oldCanvasWidth, oldCanvasHeight);
          element.render(Game_Manager.ctx);
        });
      });
    }
  }

  setup(setupTrigger) {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight; 
    setupTrigger(this.gameObjects, this.Scores);
  }

  startGame(tagsToCheck) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
    //update game
    this.gameObjects.forEach((element) => {
      element.update();
    });
   
    this.performCollisionChecking(tagsToCheck);

    //draw game
    this.gameObjects.forEach((element) => {
      element.render(this.ctx);
    });

    //draw scores
    this.Scores.forEach((element) => {
      element.render(this.ctx);
    });
    
    // Using lambda to prevent overuse and recursion error (this helps to only run startGame() when necessary)
    requestAnimationFrame(() => this.startGame(tagsToCheck));
  } 

  performCollisionChecking(tagsToCheck){
    
    // looping through the object where collisions matter
    for (let i = 0; i < tagsToCheck.length; i++) {
      for (let j = i + 1; j < tagsToCheck.length; j++) {
        const tag1 = tagsToCheck[i];
        const tag2 = tagsToCheck[j];

        this.collisionHandler.isColliding(tag1, tag2);
      }
    }
  }
  

  setBackgroundMusicUrl(url){
    this.backgroundMusic.src = url;
  }

  startBackgroundMusic(){
    // loop for the entirity of the game
    this.backgroundMusic.loop = true;

    // Mute initially
    this.backgroundMusic.muted = true;

    // Start playback
    this.backgroundMusic.play().then(() => {
      // delay the song by a little bit 
      setTimeout(() => {
         this.backgroundMusic.muted = false;
      }, 5000);
     
    }).catch((error) => {
      // Handle any errors
      console.error('Error starting background music:', error);
    });
  }

  stopBackgroundMusic() {
    this.backgroundMusic.pause();
  }
  
  
}

const Manager = new Game_Manager();

export{ Manager };










