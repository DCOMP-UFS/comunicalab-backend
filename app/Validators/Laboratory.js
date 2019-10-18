'use strict'

class Laboratory {
  
  get validateAll() {
  return true;
}
  get rules () {
    return {
      name: "string|max:100",
      location: "string|max:10000",
      latitude: "exists:location,id",
      longitude: "",
      status: "",
      capacity: "",
      isDeleted: "boolean",
    
    }
  }
  get messages() {
    return Antl.list("validation");
  }
}

module.exports = Laboratory
