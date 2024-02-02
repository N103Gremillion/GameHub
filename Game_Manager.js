import CollisionHandler from "./CollisionHandler.js";
import PongMenu from "./pong/PongMenu.js";
import { InputMapping } from "./KeyboardMapping.js";

export default class Game_Manager {
  menu = new PongMenu();
  collisionHandler = new CollisionHandler();
  backgroundImage;

  constructor() {
    this.menuOpen = false;
    this.gameObjects = []; 
    this.Scores = [];
    this.backgroundMusic = new Audio();
    this.canvas;
    this.ctx;
    this.canvasId;
    this.menu;
  }

  setCanvasById(canvasId){
    this.canvasId = canvasId;
    this.canvas = document.getElementById(canvasId);
    this.ctx =  this.canvas.getContext('2d');
    this.backgroundImage = new Image();
    this.menu = new PongMenu(this.ctx);
  }

  //input backgroundImage
  loadBackgroundImage(imageSrc, collisionTags) {
    this.backgroundImage.onload = () => {
      requestAnimationFrame(() => this.startGame(collisionTags));
    };
    this.backgroundImage.src = imageSrc;
  }

  inputHandling(InputsArray, Game_Manager) {
    // Track when a key is pressed (this tracks when a key is held down so not ideal if you only what to track a keypress 1 time)
    document.body.addEventListener('keydown', function(event) {
      const key = event.key.toLowerCase();
      InputsArray[key] = true;  
    });

    document.body.addEventListener('keyup', function(event) {
      const key = event.key.toLowerCase();
      InputsArray[key] = false; 

    // toggle the menu 
    if (key === "escape"){
        Game_Manager.toggleMenu();
      }
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
          if (!Game_Manager.menuOpen){
            element.update();
          }
          element.render(Game_Manager.ctx);
        });
        Game_Manager.Scores.forEach((element) => {
          element.adjustValues(Game_Manager.canvas.width, Game_Manager.canvas.height, oldCanvasWidth, oldCanvasHeight);
          element.render(Game_Manager.ctx);
        });
        // when the menu is open update location and sizes of buttons
        if (Game_Manager.menuOpen){
          Game_Manager.menu.buttons.forEach(button => {
            button.adjust(Game_Manager.canvas.width, Game_Manager.canvas.height, oldCanvasWidth, oldCanvasHeight);
          });
        }
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
    if (!this.menuOpen){
      this.gameObjects.forEach((element) => {
        element.update();
      });
   
      this.performCollisionChecking(tagsToCheck);
    }

    //draw game
    this.gameObjects.forEach((element) => {
      element.render(this.ctx);
    });

    //draw scores
    this.Scores.forEach((element) => {
      element.render(this.ctx);
    });

    //check if menu is open
    if (this.menuOpen){
      this.menu.render(this.ctx);
    }
    
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
  
  toggleMenu(){
    this.menuOpen = !this.menuOpen;

    // pause the game and setup menu is this is opening the menu and close if this is clossing the menu
    if (this.menuOpen === true){
      this.openMenu();
    }
    else {
      this.closeMenu();
    } 
  }

  openMenu(){
    //setup buttons and stuff will slow down perform however will be done this way for simplicity
    this.menu.open();
  }

  closeMenu(){
    this.menu.close(this.ctx, this.menu.buttons);
  }
   
}

const Manager = new Game_Manager();

export{ Manager };










