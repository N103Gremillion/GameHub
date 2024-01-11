
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


}

