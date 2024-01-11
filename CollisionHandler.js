
export default class CollisionHandler{

  constructor(){  
    this.GameObjectsMap = new Map();
  }

  setupMapping(Game_Object){
    //check to make sure the obj has a tag
    if (obj.tag) {
      //checking the tage already exist
      if (!this.GameObjectsMap.has(obj.tag)){
        this.GameObjectsMap.set(obj.tag, []);
      }
      // Add the object to the corresponding list in the hashMap
      this.GameObjectsMap.get(obj.tag).push(obj);
    }
  }
}

