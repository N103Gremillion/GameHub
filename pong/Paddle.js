import Game_Object from "../Game_Object.js";
import { InputMapping } from "../KeyboardMapping.js";

export default class Paddle extends Game_Object {
  constructor(width, height,velocity,x,y, spriteArray, collisionSpriteArray, UP, DOWN, tag, soundList){
    super(x,y, tag);
    this.image = new Image();
    // default to the 1st sprite in the list
    this.spriteArray =  spriteArray;
    this.image.src = spriteArray[0];
    this.size = {width, height};
    this.velocity = velocity;
    this.keys = {UP, DOWN};
    this.timer = 0;
    this.collisionSpriteArray = collisionSpriteArray;
    this.collisionSprite = collisionSpriteArray[0];
    this.isColliding =  false;
    this.soundList = soundList;
  }

  render(ctx){
    ctx.drawImage(this.image, this.position.x, this.position.y, this.size.width, this.size.height); 
  }

  update(){
    // when hitting the boarders
    if (InputMapping[this.keys.UP] == true && this.position.y > 0){
      this.position.y -= this.velocity;
    }
    else if (InputMapping[this.keys.DOWN] == true && this.position.y < (window.innerHeight - this.size.height) ){
      this.position.y += this.velocity;
    }

    //adjust the sprite src and only and splice off the baseUrl for checking purposses
    const baseUrl = "http://localhost/pong";
    const trimmedUrl = this.image.src.split(baseUrl);
    // since the sprite location are relative the . is necessary
    this.animateSprite(this.spriteArray.indexOf("." + trimmedUrl[1])); 
  }

  // function to help with the aspect ratio
  adjustValues(newCanvasWidth, newCanvasHeight, oldCanvasWidth, oldCanvasHeight) {
    const scaleX = newCanvasWidth / oldCanvasWidth;
    const scaleY = newCanvasHeight / oldCanvasHeight;
    const oldPaddleHeight = this.size.height;

    // Adjust positions
    this.position.x *= scaleX;
    this.position.y *= scaleY;

    // Adjust the size while maintaining aspect ratio 
    this.size.width *= scaleX;
    this.size.height = (newCanvasHeight * oldPaddleHeight) / oldCanvasHeight;

    // Adjust the velocity
    this.velocity = window.innerHeight/100;
  }

  getCollisionBox(){
    const topLeft = {x : this.position.x, y : this.position.y};
    const bottomRight = { x : this.position.x + this.size.width, y : this.position.y + this.size.height};
    return {topLeft, bottomRight};
  }
  
  onCollision(otherObject){
    // pass in the basic hit sound when the objects collide
    this.playSound(this.soundList[0]);
    this.isColliding = true;    
  }

  animateCollision(oldIndex){
    const fps = 6; 
    // this helps to run every frame the SpriteList 1 time
    const frameDuration = 500 / (fps * this.collisionSpriteArray.length);

    if (this.timer >= frameDuration){
      this.timer = 0;
      const newIndex = (oldIndex + 1) % this.collisionSpriteArray.length;
      this.collisionSprite = this.collisionSpriteArray[newIndex]; 
      this.image.src = this.collisionSprite;
    }

    setTimeout(() => {
      this.isColliding = false;
    }, 250);
  }

  animateSprite(oldIndex){
    const fps = 3;

    this.timer ++;
    
    if (this.isColliding){
      // run animateSprite
      this.animateCollision(this.collisionSpriteArray.indexOf(this.collisionSprite));

    }
    // update the sprite src
    else if (this.timer >= (60 / fps)){
      this.timer = 0;
      const newIndex = (oldIndex + 1) % this.spriteArray.length;
      this.image.src = this.spriteArray[newIndex];
    }
  }

  playSound(url){

    const audio = new Audio(url);
    if (url === this.soundList[0]){
      // decrease the sound a little cuz it is kinda a loud sound 
      audio.volume *= 0.3;
    }
    audio.play();
  }
}


