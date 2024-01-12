import Game_Object from "../Game_Object.js";
import { randomAngle } from "./main.js";

export default class Ball extends Game_Object {
  constructor(radius, velocity, x, y, direction, tag){ 
    super(x,y,tag);
    this.radius = radius;
    this.velocity = velocity;
    this.direction = (direction/180 *Math.PI); 
    this.ballImage = new Image();
    this.ballImage.src = "./pongSprites/ball0.png"; 
    }
  
  render(ctx){
    this.findNextImage(this.ballImage.src);
    ctx.drawImage(
      this.ballImage,
      this.position.x - this.radius, 
      this.position.y - this.radius, 
      this.radius * 2, this.radius * 2);
  }

  update(){
    const oldBallDirection = this.direction;
    //checking for collisions
    if (this.position.y < window.innerHeight && this.position.y > 0 && this.position.x < window.innerWidth && this.position.x > 0){
      this.moveBall(); 
    }
    // if it hits the bottom
    else if (this.position.y > window.innerHeight){
      this.position.y = window.innerHeight - this.radius;
      this.direction = this.findResultingAngle_HorizontalWall(this.direction, Math.PI);
      this.moveBall(); 
    }
    // if it hits the top
    else if (this.position.y < 0){
      this.position.y = 0 + this.radius;
      this.direction = this.findResultingAngle_HorizontalWall(this.direction, Math.PI);
      this.moveBall();
    }
    // if it hits the left wall
    else if (this.position.x < 0){ 
      this.position.x = 0 + this.radius;
      const oldVelo = this.velocity;
      this.velocity = 0;
      setTimeout(() => this.respawnBall(oldVelo), 500);
    }
    // if it hits the right wall
    else if (this.position.x > window.innerWidth){
      this.position.x = window.innerWidth - (this.radius * 2);
      const oldVelo = this.velocity;
      this.velocity = 0;
      setTimeout(() => this.respawnBall(oldVelo), 500);
    }
  }

  adjustValues(newCanvasWidth, newCanvasHeight, oldCanvasWidth, oldCanvasHeight) { 
    const scaleX = newCanvasWidth / oldCanvasWidth;
    const scaleY = newCanvasHeight / oldCanvasHeight;

    // Adjust positions
    this.position.x *= scaleX;
    this.position.y *= scaleY;

    // Adjust the radius while maintaining aspect ratio 
    const min = Math.min(scaleX, scaleY);
    const max = Math.max(scaleX, scaleY);
    this. radius *= (max + min) / 2;
}
  findResultingAngle_HorizontalWall(initialAngle, wallAngle){
    let relativeAngle = initialAngle - wallAngle;
    let reflection = wallAngle +  (Math.PI - relativeAngle + 2 * Math.PI) % (2 * Math.PI);
    return reflection % (2 * Math.PI);
  }
  
  findResultingAngle_VerticalWall(initialAngle, wallAngle){
    let relativeAngle = initialAngle - wallAngle;
    let reflection = wallAngle - relativeAngle;
    reflection += (2 * Math.PI);
    return reflection % (2 * Math.PI);
  }
  moveBall(){
    this.position.x += this.velocity * Math.sin(this.direction);
    this.position.y += this.velocity * Math.cos(this.direction); 
  }
  
  respawnBall(oldVelo){
    this.position.x = window.innerWidth/2 - this.radius;
    this.position.y = window.innerHeight/2 - this.radius;
    setTimeout(() => {
      this.direction = randomAngle(200, 340)/180 * Math.PI; 
      this.velocity = oldVelo;
    }, 1000);
  } 

  bounceRight(otherObject){
    this.direction = this.findResultingAngle_VerticalWall(this.direction , Math.PI);
    this.position.x =  otherObject.position.x + otherObject.size.width + this.radius; 
  }
  
  bounceLeft(otherObject){
    this.direction = this.findResultingAngle_VerticalWall(this.direction, Math.PI);
    this.position.x  = (otherObject.position.x - this.radius * 2);
  }

  bounceUp(otherObject){
    otherObject.velocity = 0;
    this.direction = this.findResultingAngle_HorizontalWall(this.direction, 0);
    this.position.y = (otherObject.position.y - this.radius * 2);
    otherObject.velocity = window.innerHeight/100;
  }
  
  bounceDown(otherObject){
    otherObject.velocity = 0;
    this.direction = this.findResultingAngle_HorizontalWall(this.direction, 0);
    this.position.y = (otherObject.position.y + otherObject.size.height + this.radius*2);
    otherObject.velocity = window.innerHeight/100;
  }

  findNextImage(){
      const BALL_SPRITES = [
      "./pongSprites/ball0.png",
      "./pongSprites/ball1.png",
      "./pongSprites/ball2.png",
      "./pongSprites/ball3.png",
      "./pongSprites/ball4.png",
      "./pongSprites/ball5.png",
      "./pongSprites/ball6.png"
    ];
    
    //get the index of the currentImage
    const currentIndex = BALL_SPRITES.indexOf(this.ballImage.src.split("/").slice(-1)[0]);   
    if (currentIndex === BALL_SPRITES.length - 1){
      this.ballImgae.src = BALL_SPRITES[0];
    }

    if (this.ballImage.src.split("/").slice(-1)[0] === BALL_SPRITES[0].split("/").slice(-1)[0]){ 
    }
  //console.log(this.ballImage.src.split("/").slice(-1)[0]);
  //console.log(BALL_SPRITES[0].split("/").slice(-1)[0]);
  }    
  
  getCollisionBox(){
    const topLeft = { x : this.position.x, y : this.position.y};
    const bottomRight = { x : this.position.x + (this.radius * 2), y : this.position.y + (this.radius * 2) };

    return { topLeft, bottomRight };
  }
  
  onCollision(otherObject){
    console.log("True");
  }
}
