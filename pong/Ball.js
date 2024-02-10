import Game_Object from "../Game_Object.js";
import { randomAngle } from "./MultiplayerSetup.js";
import { Manager } from "../Game_Manager.js";

export default class Ball extends Game_Object {
  constructor(radius, velocity, x, y, direction, tag, spriteArray, bounceSound){ 
    super(x,y,tag);
    this.radius = radius;
    this.velocity = velocity;
    this.direction = (direction/180 *Math.PI); 
    this.image = new Image();
    this.spriteArray = spriteArray;
    this.image.src = spriteArray[0]; 
    this.timer = 0;
    this.bounceSound = bounceSound;
    }
  
  render(ctx){
    ctx.drawImage(
      this.image,
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
      this.playAudio(this.bounceSound);
    }
    // if it hits the top
    else if (this.position.y < 0){
      this.position.y = 0 + this.radius;
      this.direction = this.findResultingAngle_HorizontalWall(this.direction, Math.PI);
      this.moveBall();
      this.playAudio(this.bounceSound);
    }
    // if it hits the left wall
    else if (this.position.x < 0){ 
      this.position.x = 0 + this.radius;
      const oldVelo = this.velocity;
      this.velocity = 0;
      Manager.Scores[1].increaseScore(1);

      if (Manager.Scores[1].getScore() >= Manager.Scores[1].MAXSCORE){
        Manager.endingScreenPage.open(Manager);
        Manager.endingScreen = true;
        console.log("player2 has won the game");
      }

      setTimeout(() => this.respawnBall(oldVelo), 500);
    }
    // if it hits the right wall
    else if (this.position.x > window.innerWidth){
      this.position.x = window.innerWidth - (this.radius * 2);
      const oldVelo = this.velocity;
      this.velocity = 0;
      Manager.Scores[0].increaseScore(1);

      if (Manager.Scores[0].getScore() >= Manager.Scores[0].MAXSCORE){
        Manager.endingScreenPage.open(Manager);
        Manager.endingScreen = true;
        console.log("player1 has won the game");
      }

      setTimeout(() => this.respawnBall(oldVelo), 500);
    }
    //adjust the sprite src and only and splice off the baseUrl for checking purposses
    const baseUrl = "http://localhost/pong";
    const trimmedUrl = this.image.src.split(baseUrl);
    // since the sprite location are relative the . is necessary
    this.animateSprite(this.spriteArray.indexOf("." + trimmedUrl[1])); 
  }

  adjustValues(newCanvasWidth, newCanvasHeight, oldCanvasWidth, oldCanvasHeight) { 
    const scaleX = newCanvasWidth / oldCanvasWidth;
    const scaleY = newCanvasHeight / oldCanvasHeight;
    
    //get old and new aspect ratio
    const oldAspectRatio = oldCanvasWidth/oldCanvasHeight;
    const newAspectRatio = newCanvasWidth/newCanvasHeight;

    // Adjust positions
    this.position.x *= scaleX;
    this.position.y *= scaleY;

    // Adjust the radius while maintaining aspect ratio 
    this. radius *= newAspectRatio/oldAspectRatio;    

    // Adjust the velocity
    this.velocity = window.innerWidth/400; 
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
      this.direction = randomAngle(20, 70)/180 * Math.PI; 
      this.velocity = oldVelo;
    }, 1000);
  }  
  
  getCollisionBox(){
    const topLeft = { x : this.position.x - this.radius, y : this.position.y - this.radius};
    const bottomRight = { x : this.position.x + (this.radius), y : this.position.y + (this.radius) };

    return { topLeft, bottomRight };
  }
  
  onCollision(otherObject){
    
    const oldVelo = this.velocity;
    //this.velocity = 0;
    this.position.x -= 2 * (oldVelo * Math.sin(this.direction));
    this.position.y -= 2 * (oldVelo * Math.cos(this.direction));
    // if it hits the top of a Paddle
    const initialAngle = this.direction; 
    if ((this.position.y + this.radius) < otherObject.position.y){
      this.direction = this.findResultingAngle_HorizontalWall(initialAngle, 0);
    }
    // if it hits the bottom of the Paddle
    else if (this.position.y - this.radius > otherObject.position.y + otherObject.size.height){
      this.direction = this.findResultingAngle_HorizontalWall(initialAngle, 0);
    } 

    // if it hits the right side
    else if (this.position.x - this.radius > otherObject.position.x + otherObject.size.width){
      this.direction = this.findResultingAngle_VerticalWall(initialAngle, Math.PI);
    }
    // if it hits the left side
    else if (this.position.x + this.radius < otherObject.position.x){ 
      this.direction = this.findResultingAngle_VerticalWall(initialAngle, Math.PI); 
    }
  }

  animateSprite(oldIndex){
    const fps = 1;

    this.timer ++;

    // update the sprite src every 6 frames
    if (this.timer >= (60 / fps)){
      this.timer = 0;
      const newIndex = (oldIndex + 1) % this.spriteArray.length;
      this.image.src = this.spriteArray[newIndex];
    }
  }

  playAudio(url){
    const audio = new Audio(url);
    audio.play();
  }
}
