import Game_Object from "./Game_Object.js";
import { randomAngle} from "./main.js";

export default class Ball extends Game_Object {
  constructor(radius,velocity,x,y,color, direction){
    super(x,y,color);
    this.radius = radius;
    this.velocity = velocity;
    this.direction = (direction/180 *Math.PI); 
  }
  
  render(ctx){
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.position.x, this.position.y, this.radius, 0, 2*Math.PI);
    ctx.fill();
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
      this.direction = randomAngle(0, 359);
      this.velocity = oldVelo;
    }, 1000);
  }
}


