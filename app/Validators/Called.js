'use strict'

class Called {
  get rules () {
    return {
      // validation rules
    }
  }
  get messages() {
    return Antl.list("validation");
  }
}

module.exports = Called
