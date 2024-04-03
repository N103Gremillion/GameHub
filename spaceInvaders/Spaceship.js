import Game_Object from "../Game_Object.js";
import Bullet from "./Bullets.js";
import { InputMapping } from "../KeyboardMapping.js";
import { Manager } from "../Game_Manager.js";

export default class Spaceship extends Game_Object{
  
  constructor(x, y, width, height, tag, spriteList, velocity){
    super(x,y, tag);
    this.width = width;
    this.height = height;
    this.image = new Image();
    this.image.src = spriteList[0];
    this.spriteList = spriteList;
    this.right = 'd';
    this.left = 'a';
    this.shoot = ' ';
    // this is in frames
    this.cooldown = 60;
    this.velocity = velocity;
  }

  render(ctx){
    ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
  }

  update(){
    
    if (InputMapping[this.right] === true && this.position.x < (window.innerWidth - this.width)){
      this.position.x += this.velocity;
    }
    else if (InputMapping[this.left] === true && this.position.x > 0){
      this.position.x -= this.velocity;
    }
    
    //checking for when to shoot a Bullets
    this.cooldown--;
    if (InputMapping[this.shoot] === true && this.cooldown <= 0){
      this.spawnBullet();
      this.cooldown = 60;
    }
  }

  spawnBullet(){
    const BULLETX = this.position.x + this.width/2 - this.width/10;
    const BULLETY = this.position.y + this.height/4;
    const BULLETWIDTH = this.width/5;
    const BULLETHEIGHT = this.height/4;
    const TAG = 'bullet';
    const SPRITES = ["/spaceInvaders/sprites/bullet1.png"];
    Manager.Bullets.push(new Bullet(BULLETX, BULLETY, BULLETWIDTH, BULLETHEIGHT, TAG, SPRITES));    
  }

  adjustValues(newCanvasWidth, newCanvasHeight, oldCanvasWidth, oldCanvasHeight) {
    const scaleX = newCanvasWidth / oldCanvasWidth;
    const scaleY = newCanvasHeight / oldCanvasHeight;
    const oldHeight = this.height;

    // Adjust positions
    this.position.x *= scaleX;
    this.position.y *= scaleY;

    // Adjust the size while maintaining aspect ratio 
    this.width *= scaleX;
    this.height = (newCanvasHeight * oldHeight) / oldCanvasHeight;

    // Adjust the velocity
    this.velocity = window.innerHeight/200;
  }

}
