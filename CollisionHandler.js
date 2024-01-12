
export default class CollisionHandler{

  constructor(){  
    this.GameObjectsMap = new Map();
  }

  setupMapping(Game_Object){
    //check to make sure the obj has a tag
    if (Game_Object.tag) {
      //checking the tage already exist
      if (!this.GameObjectsMap.has(Game_Object.tag)){
        this.GameObjectsMap.set(Game_Object.tag, []);
      }
      // Add the object to the corresponding list in the hashMap
      this.GameObjectsMap.get(Game_Object.tag).push(Game_Object);
    }
  }

  isColliding(tag1, tag2) {

    // validate that the tags exist first
    if (this.GameObjectsMap.has(tag1) && this.GameObjectsMap.has(tag2)){
      const objects1 = this.GameObjectsMap.get(tag1);
      const objects2 = this.GameObjectsMap.get(tag2);
    

      //loop through the objects with each of these tags
      for (const obj1 of objects1){
        for (const obj2 of objects2){
          //check if the specific objects are colliding
          if (this.checkCollision(obj1, obj2)) {
            // perform operation for that collision
            obj1.onCollision(obj2);
            obj2.onCollision(obj1);
          }
        }
      }
    }
  }

  checkCollision(obj1, obj2) {
    //get the boundingBoxes of each object this is the top left point and bottom right point
    const object1Bounds = obj1.getCollisionBox();
    const object2Bounds = obj2.getCollisionBox();

    //get the x and y values
    // object1Bounds
    const obj1Left = object1Bounds.topLeft.x;
    const obj1Right = object1Bounds.bottomRight.x;
    const obj1Top = object1Bounds.topLeft.y;
    const obj1Bottom = object1Bounds.bottomRight.y;
    // object2Bounds
    const obj2Left = object2Bounds.topLeft.x;
    const obj2Right = object2Bounds.bottomRight.x;
    const obj2Top = object2Bounds.topLeft.y;
    const obj2Bottom = object2Bounds.bottomRight.y;

    // Checking for overlap
    const overlapX = obj1Right > obj2Left && obj1Left < obj2Right;
    const overlapY = obj1Top < obj2Bottom && obj1Bottom > obj2Top;

    // perform the logic for when the collisionBoxes overlap (colliding)
    if (overlapX && overlapY) {
      return true;
    }
    else {
      return false;
    }
  }
}

