import CollisionHandler from "./CollisionHandler.js";
import PongMenu from "./pong/PongMenu.js";
import MultiplayerEndingScreen from "./pong/EndingScreens/MultiplayerEndingScreen.js";
import PongHighScoreScreen from "./pong/EndingScreens/PongHighScoreScreen.js";
import { InputMapping } from "./KeyboardMapping.js";

export default class Game_Manager {
  menu;
  collisionHandler = new CollisionHandler();
  
  constructor() {
    this.backgroundImage;
    this.menuOpen = false;
    this.endingScreen = false;
    this.gameObjects = []; 
    this.Scores = [];
    this.backgroundMusic = new Audio();
    this.canvas;
    this.ctx;
    this.canvasId;
    this.menu;
    this.gameMode;
    this.game;
    this.endingScreenPage;
  }
  
  // necessary to run this before setting up game so that the canvas is defined and can be drawn on
  setCanvasById(canvasId, gameMode, gameName){
    this.canvasId = canvasId;
    this.canvas = document.getElementById(canvasId);
    this.canvas.width = this.getValidCanvasWidth(window.innerWidth);
    this.canvas.height = this.getValidCanvasHeight(window.innerHeight);
    this.ctx =  this.canvas.getContext('2d');
    this.backgroundImage = new Image();
    if (gameName === "Pong"){
       this.menu = new PongMenu();
    }
    this.gameMode = gameMode;
    this.game = gameName;
    //checking for the possible games and adding the appropriate endingScreen
    // Pong
    if (this.game === 'Pong'){
      if (this.gameMode === 'MultiPlayerMode'){
        this.endingScreenPage = new MultiplayerEndingScreen();
      }
      else if (this.gameMode === 'SinglePlayerMode'){
        this.endingScreenPage = new PongHighScoreScreen();
      }
      this.menu = new PongMenu();
    }
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
        // check if optionsBoxOpen is true
        if (Game_Manager.menu !== undefined){
          Game_Manager.toggleMenu(Game_Manager);
        }
      }
    }); 

    // Keep track of when the window is resized 
    window.addEventListener('resize', () => handleResize(Game_Manager));

    function handleResize(Game_Manager) {

      //open menu to prevent bugginess with collisions and stuff
      if (!Game_Manager.menuOpen){
        Game_Manager.toggleMenu(Game_Manager);
      }

      // get old windowsize
      const oldCanvasWidth = Game_Manager.canvas.width;
      const oldCanvasHeight = Game_Manager.canvas.height;

      // set the minHeight and minWidth
      Game_Manager.canvas.width = Game_Manager.getValidCanvasWidth(window.innerWidth);
      Game_Manager.canvas.height = Game_Manager.getValidCanvasHeight(window.innerHeight);

      // Used to change the location of each element relative to the size of the window when being resized and there location
      Game_Manager.setup(() => {
        Game_Manager.gameObjects.forEach((element) => {
          element.adjustValues(Game_Manager.canvas.width, Game_Manager.canvas.height, oldCanvasWidth, oldCanvasHeight);
          if (!Game_Manager.menuOpen){
            element.update();
          }
        });
        Game_Manager.Scores.forEach((element) => {
          element.adjustValues(Game_Manager.canvas.width, Game_Manager.canvas.height, oldCanvasWidth, oldCanvasHeight);
        });
        // when the menu is open update location and sizes of buttons
        if (Game_Manager.menuOpen){
          Game_Manager.menu.buttons.forEach(button => {
            button.adjust(Game_Manager.canvas.width, Game_Manager.canvas.height, oldCanvasWidth, oldCanvasHeight);
          });
        }
        // when the OptionsBox is open
        if (Game_Manager.menu !== undefined){
          if (Game_Manager.menu.optionsBoxOpen){
             Game_Manager.menu.textBoxes.forEach(textBox => {
               textBox.adjust(Game_Manager.canvas.width, Game_Manager.canvas.height, oldCanvasWidth, oldCanvasHeight);
             });
          }
        }
      });
    }
  }

  setup(setupTrigger) {
    this.canvas.width = this.getValidCanvasWidth(window.innerWidth);
    this.canvas.height = this.getValidCanvasHeight(window.innerHeight);
    
    setupTrigger(this.gameObjects, this.Scores, this);
  }

  startGame(tagsToCheck) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
    //update game
    if (!this.menuOpen && !this.endingScreen){
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

    // when you hit the endingScreen
    if (this.endingScreen){
      this.endingScreenPage.render(this.ctx);
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
  
  toggleMenu(Game_Manager){
    this.menuOpen = !this.menuOpen;

    // pause the game and setup menu if this is opening and closses the menu if this is clossing the menu
    if (this.menuOpen === true){
      this.openMenu(Game_Manager);
    }
    else {
      this.closeMenu(Game_Manager);
    } 
  }

  openMenu(Game_Manager){

    //setup buttons and stuff will slow down perform however will be done this way for simplicity
    this.menu.open(Game_Manager);
  }

  closeMenu(Game_Manager){
    if (Game_Manager.menu.optionsBoxOpen){
       this.menu.toggleOptionsOpen(Game_Manager, Game_Manager.menu.buttons, Game_Manager.menu.textBoxes); 
    }
    else{
      this.menu.close(Game_Manager, Game_Manager.menu.buttons);
    }
  }
  
  // used to prevent the canvas from getting to small
  getValidCanvasWidth(windowWidth){
    // min sizes for the canvas width
    const minWidth = 700;
    if (windowWidth <= minWidth){
      return minWidth;
    }
    else{
      return windowWidth; 
    }
  }

  // used to prevent the canvas from getting to small
  getValidCanvasHeight(windowHeight){
    // min sizes for the canvas height
    const minHeight = 500;
    if (windowHeight <= minHeight){
      return minHeight;
    }
    else{
      return windowHeight; 
    }

  }
   
}

const Manager = new Game_Manager();

export{ Manager };










